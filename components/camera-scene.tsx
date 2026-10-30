"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import clips from "@/lib/camera-clips.json";
import modelInfo from "@/lib/camera-model.json";

export type CameraControls = { previous: [number, number]; next: [number, number]; visible: boolean };
export type CameraHandle = { reset: () => void; press: (direction: number, held?: boolean) => void; release: () => void; capture: () => string };
type Props = {
  videoRefs: RefObject<(HTMLVideoElement | null)[]>;
  handleRef: RefObject<CameraHandle | null>;
  selected: number;
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
  onControls: (controls: CameraControls) => void;
  onWatch?: () => void;
};

export default function CameraScene({ videoRefs, handleRef, selected, active, onReady, onFailure, onControls, onWatch }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const isActive = useRef(active);
  const select = useRef<((index: number) => void) | null>(null);
  const selection = useRef(selected);
  useEffect(() => { isActive.current = active; }, [active]);
  useEffect(() => { selection.current = selected; select.current?.(selected); }, [selected]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false, frame = 0, needsRender = true, interacting = false;
    let model: THREE.Group | null = null;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
    catch { onFailure(); return; }
    renderer.setPixelRatio(container.clientWidth < 600 ? Math.min(Math.max(window.devicePixelRatio,1.5),1.75) : 2);
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    const canvas = renderer.domElement;
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "3D camera. Drag or use arrow keys to rotate and tilt. Home resets the view. Enter watches the film.");
    container.appendChild(canvas);
    const scene = new THREE.Scene();
    const tilt = new THREE.Group();
    const pivot = new THREE.Group();
    const body = new THREE.Group();
    // Center the complete supplied geometry, including the lens, before allowing rotation.
    pivot.add(body);
    tilt.add(pivot);
    scene.add(tilt);
    let targetTiltY = 0, targetTiltZ = 0;
    const camera = new THREE.OrthographicCamera(-2.3, 2.3, 1.4, -1.4, .1, 40);
    camera.position.set(8, .22, .20);
    camera.lookAt(0, 0, 0);
    const controls = new OrbitControls(camera, canvas);
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = false;
    controls.dampingFactor = .13;
    controls.rotateSpeed = .7;
    controls.cursorStyle = "grab";
    controls.update();
    controls.saveState();
    const home = new THREE.Spherical().setFromVector3(camera.position);
    let returning = false, returnStarted = 0, fromTheta = home.theta, fromPhi = home.phi;
    const returnHome = () => {
      if (motionPreference.matches) { controls.reset(); returning = false; needsRender = true; return; }
      fromTheta = controls.getAzimuthalAngle(); fromPhi = controls.getPolarAngle(); returnStarted = performance.now(); returning = true; needsRender = true;
    };
    const change = () => { needsRender = true; };
    const start = () => { interacting = true; returning = false; targetTiltY = targetTiltZ = 0; };
    const end = () => { interacting = false; returnHome(); };
    controls.addEventListener("change", change);
    controls.addEventListener("start", start);
    controls.addEventListener("end", end);
    const updateMotion = () => { if (motionPreference.matches) { targetTiltY = targetTiltZ = 0; tilt.rotation.set(0,0,0); if (returning) { controls.reset(); returning = false; } } needsRender = true; };
    motionPreference.addEventListener('change',updateMotion);
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); onWatch?.(); return; }
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      targetTiltY = targetTiltZ = 0;
      returning = false;
      if (event.key === 'Home') controls.reset();
      else if (event.key === 'ArrowLeft') controls.rotateLeft(.16);
      else if (event.key === 'ArrowRight') controls.rotateLeft(-.16);
      else if (event.key === 'ArrowUp') controls.rotateUp(.16);
      else controls.rotateUp(-.16);
      controls.update(); needsRender = true;
    };
    canvas.addEventListener("keydown", keyboard);
    const keyboardUp = (event: KeyboardEvent) => { if (event.key.startsWith('Arrow')) returnHome(); };
    canvas.addEventListener('keyup', keyboardUp);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .04);
    room.dispose();
    scene.environment = environment.texture;
    scene.environmentIntensity = .8;
    scene.add(new THREE.HemisphereLight(0xf8f4ff, 0x171020, 1));
    const key = new THREE.DirectionalLight(0xfff5e9, 3.8);
    key.position.set(4, 5, 4); scene.add(key);
    const fill = new THREE.DirectionalLight(0xc8d4ff, .85);
    fill.position.set(5, -.5, -4); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xc58dff, 1.25);
    rim.position.set(-2, 2, -5); scene.add(rim);
    const screenWidth = modelInfo.screen.width, screenHeight = modelInfo.screen.height;
    const [screenX, screenY, screenZ] = modelInfo.screen.position;
    const backing = new THREE.Mesh(new THREE.PlaneGeometry(screenWidth, screenHeight), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    backing.rotation.y = Math.PI / 2;
    backing.position.set(screenX + .002, screenY, screenZ); body.add(backing);
    const material = new THREE.MeshBasicMaterial({ toneMapped: false, color: 0xebebeb });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    screen.position.set(screenX + .004, screenY, screenZ); screen.visible = false; body.add(screen);
    const raycaster = new THREE.Raycaster();
    let pointerStart: [number, number] | null = null, dragged = false;
    const screenHit = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((event.clientX-rect.left)/rect.width*2-1,1-(event.clientY-rect.top)/rect.height*2),camera);
      return screen.visible && raycaster.intersectObject(screen).length > 0;
    };
    const pointerDown = (event: PointerEvent) => { pointerStart = [event.clientX,event.clientY]; dragged = false; targetTiltY = targetTiltZ = 0; };
    const pointerUp = (event: PointerEvent) => {
      if (pointerStart && !dragged && Math.hypot(event.clientX-pointerStart[0],event.clientY-pointerStart[1])<5 && screenHit(event)) onWatch?.();
      pointerStart = null;
    };
    const pointerMove = (event: PointerEvent) => {
      if (pointerStart && Math.hypot(event.clientX-pointerStart[0],event.clientY-pointerStart[1])>5) dragged = true;
      if (!pointerStart) {
        canvas.style.cursor = screenHit(event) ? 'pointer' : 'grab';
        if (event.pointerType === 'mouse' && !motionPreference.matches && !interacting) {
          const rect = canvas.getBoundingClientRect();
          targetTiltY = ((event.clientX-rect.left)/rect.width-.5)*.16;
          targetTiltZ = ((event.clientY-rect.top)/rect.height-.5)*.12;
          needsRender = true;
        }
      }
    };
    const pointerLeave = () => { targetTiltY = targetTiltZ = 0; needsRender = true; };
    const pointerCancel = () => { pointerStart = null; pointerLeave(); };
    canvas.addEventListener('pointerdown',pointerDown); canvas.addEventListener('pointerup',pointerUp); canvas.addEventListener('pointermove',pointerMove); canvas.addEventListener('pointerleave',pointerLeave); canvas.addEventListener('pointercancel',pointerCancel);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(screenWidth, screenHeight), new THREE.MeshPhysicalMaterial({ color: 0xe9e5ef, metalness: 0, roughness: .12, clearcoat: 1, clearcoatRoughness: .08, transparent: true, opacity: .045, depthWrite: false }));
    glass.rotation.y = Math.PI / 2; glass.position.set(screenX + .007, screenY, screenZ); body.add(glass);
    const hudCanvas = document.createElement('canvas'); hudCanvas.width = 1024; hudCanvas.height = 1024;
    const hudTexture = new THREE.CanvasTexture(hudCanvas); hudTexture.colorSpace = THREE.SRGBColorSpace;
    const hudMaterial = new THREE.MeshBasicMaterial({ map: hudTexture, transparent: true, depthWrite: false, toneMapped: false });
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), hudMaterial);
    hud.position.set(screenX + .009, screenY, screenZ); body.add(hud);
    const textures: (THREE.VideoTexture | null)[] = clips.map(() => null);
    const posters: (THREE.Texture | null)[] = clips.map(() => null);
    let portrait = false, targetRoll = 0, halfWidth = 2.1;
    const fit = (aspect: number) => {
      const sine = Math.abs(Math.sin(pivot.rotation.x)), cosine = Math.abs(Math.cos(pivot.rotation.x));
      const height = Math.min(screenWidth / (cosine * aspect + sine), screenHeight / (sine * aspect + cosine));
      const width = height * aspect;
      screen.rotation.set(0, Math.PI / 2, 0);
      screen.rotateZ(-pivot.rotation.x);
      screen.scale.set(width, width / aspect, 1); screen.visible = true;
    };
    const applyFilm = (index: number) => {
      if (selection.current !== index || disposed) return;
      const video = videoRefs.current[index];
      const vertical = clips[index].height > clips[index].width;
      portrait = vertical;
      targetRoll = vertical ? Math.PI / 2 : 0;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) pivot.rotation.x = targetRoll;
      const poster = posters[index];
      if (video && video.readyState >= 2) {
        if (!textures[index]) { textures[index] = new THREE.VideoTexture(video); textures[index]!.colorSpace = THREE.SRGBColorSpace; }
        material.map = textures[index];
      } else if (poster) material.map = poster;
      else material.map = null;
      material.needsUpdate = true;
      fit(clips[index].width / clips[index].height);
      needsRender = true;
    };
    select.current = applyFilm;
    const listeners = clips.map((clip, index) => {
      const video = videoRefs.current[index];
      const loaded = () => applyFilm(index);
      video?.addEventListener("loadeddata", loaded);
      new THREE.TextureLoader().load(clip.poster, poster => {
        if (disposed) { poster.dispose(); return; }
        poster.colorSpace = THREE.SRGBColorSpace; posters[index] = poster; applyFilm(index);
      });
      return () => video?.removeEventListener("loadeddata", loaded);
    });
    applyFilm(selection.current);

    const pressAmount = { value: 0 };
    const pressDirection = { value: -1 };
    const pressPoint = { value: new THREE.Vector3(...modelInfo.wheel.center as [number, number, number]) };
    let holdingButton = false, pressPulseUntil = -1000;
    handleRef.current = {
      reset: () => returnHome(),
      press: (direction, held = false) => { pressDirection.value = direction < 0 ? -1 : 1; pressPoint.value.z = modelInfo.wheel.center[2] + (direction < 0 ? 1 : -1) * modelInfo.wheel.offset; holdingButton = held; pressPulseUntil = performance.now()+90; needsRender = true; },
      release: () => { holdingButton = false; needsRender = true; },
      capture: () => { renderer.render(scene, camera); return canvas.toDataURL('image/png'); },
    };
    new GLTFLoader().load('/models/camera.glb', async gltf => {
      if (disposed) { disposeModel(gltf.scene); return; }
      model = gltf.scene;
      // Move only the actual isolated key. Keep its printed face and surrounding
      // housing intact; lighting responds to its physical tilt without a dark overlay.
      model.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          for (const value of Object.values(material)) if (value instanceof THREE.Texture) { value.anisotropy = renderer.capabilities.getMaxAnisotropy(); value.needsUpdate = true; }
          if (material.transparent) material.depthWrite = false;
          if (!object.geometry.hasAttribute('_camera_button')) continue;
          material.onBeforeCompile = (shader: Parameters<THREE.Material['onBeforeCompile']>[0]) => {
            shader.uniforms.uCameraPress = pressAmount;
            shader.uniforms.uCameraPressDirection = pressDirection;
            shader.uniforms.uCameraPressPoint = pressPoint;
            shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>
uniform float uCameraPress;
uniform float uCameraPressDirection;
uniform vec3 uCameraPressPoint;
attribute float _camera_button;
float cameraButtonWeight() {
  return step(0.5, abs(_camera_button)) * (1.0-step(0.5,abs(_camera_button-uCameraPressDirection))) * uCameraPress;
}
mat3 cameraButtonRotation(float weight) {
  float angle = weight * uCameraPressDirection * 0.035;
  float c = cos(angle), s = sin(angle);
  return mat3(c,0.0,-s, 0.0,1.0,0.0, s,0.0,c);
}`).replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
objectNormal = cameraButtonRotation(cameraButtonWeight()) * objectNormal;
`).replace('#include <begin_vertex>', `#include <begin_vertex>
float cameraPressWeight = cameraButtonWeight();
transformed = cameraButtonRotation(cameraPressWeight) * (position-uCameraPressPoint) + uCameraPressPoint;
// Keep the printed face above the housing even at full travel. A deeper
// displacement hides the face inside the wheel and leaves a black spot.
transformed.x -= cameraPressWeight * 0.009;
`);
          };
          material.customProgramCacheKey = () => 'pentax-isolated-rocker-v3';
        }
      });
      body.add(model);
      await renderer.compileAsync(scene, camera);
      if (disposed) return;
      renderer.render(scene, camera); needsRender = true; onReady();
    }, undefined, () => { if (!disposed) onFailure(); });

    let aspect = 1.7;
    const resize = () => {
      const width = container.clientWidth, height = container.clientHeight;
      if (!width || !height) return;
      aspect = width / height; renderer.setSize(width, height, false); needsRender = true;
    };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    let lastRender = 0, lastControls = '', lastHud = '';
    const hudFont = getComputedStyle(container).fontFamily;
    document.fonts.ready.then(() => { if (!disposed) { lastHud = ''; needsRender = true; } });
    const corners = [0,1,2,3,4,5,6,7].map(index => new THREE.Vector3(...modelInfo.bounds.min.map((min, axis) => index & (1 << axis) ? modelInfo.bounds.max[axis] : min) as [number,number,number]));
    const updateHud = (video: HTMLVideoElement | null) => {
      const seconds = Math.floor(video?.currentTime ?? 0);
      const key = `${selection.current}:${portrait}:${seconds}:${video?.paused}`;
      if (key === lastHud) return;
      lastHud = key;
      const context = hudCanvas.getContext('2d'); if (!context) return;
      const width = 720, height = width / (portrait ? screenHeight / screenWidth : screenWidth / screenHeight);
      context.setTransform(1,0,0,1,0,0); context.clearRect(0,0,hudCanvas.width,hudCanvas.height); context.scale(hudCanvas.width/width,hudCanvas.height/height);
      context.fillStyle = 'rgba(255,255,255,.84)'; context.strokeStyle = context.fillStyle; context.lineWidth = 2;
      context.font = '20px monospace'; context.fillText(video?.paused ? 'Ⅱ' : '▶', 20, 34);
      context.strokeRect(width-62, 20, 34, 15); context.fillRect(width-26,24,3,7); context.fillRect(width-59,23,25,9);
      context.font = `600 32px ${hudFont}`; context.fillText(`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`,20,height-20);
      hudTexture.needsUpdate = true; needsRender = true;
    };
    const publishControls = () => {
      const project = (z: number): [number, number] => {
        const point = body.localToWorld(new THREE.Vector3(modelInfo.wheel.center[0], modelInfo.wheel.center[1], z)).project(camera);
        return [(point.x + 1) * 50, (1 - point.y) * 50];
      };
      const rearNormal = new THREE.Vector3(1, 0, 0).transformDirection(pivot.matrixWorld);
      const towardsViewer = camera.position.clone().normalize();
      const positions = { previous: project(modelInfo.wheel.center[2]+modelInfo.wheel.offset), next: project(modelInfo.wheel.center[2]-modelInfo.wheel.offset), visible: rearNormal.dot(towardsViewer) > .65 };
      const fingerprint = JSON.stringify(positions, (_key, value) => typeof value === 'number' ? Math.round(value * 10) / 10 : value);
      if (fingerprint !== lastControls) { lastControls = fingerprint; onControls(positions); }
    };
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!isActive.current || document.hidden) return;
      controls.update();
      if (returning && !interacting) {
        const progress = Math.min((now-returnStarted)/480,1);
        const eased = progress*progress*(3-2*progress);
        const thetaDelta = Math.atan2(Math.sin(home.theta-fromTheta),Math.cos(home.theta-fromTheta));
        camera.position.setFromSpherical(new THREE.Spherical(home.radius,THREE.MathUtils.lerp(fromPhi,home.phi,eased),fromTheta+thetaDelta*eased));
        controls.update(); needsRender = true;
        if (progress===1) returning = false;
      }
      const moving = Math.abs(pivot.rotation.x - targetRoll) > .001;
      if (moving) { pivot.rotation.x = motionPreference.matches ? targetRoll : THREE.MathUtils.lerp(pivot.rotation.x, targetRoll, .2); needsRender = true; }
      if (Math.abs(tilt.rotation.y-targetTiltY)>.0001 || Math.abs(tilt.rotation.z-targetTiltZ)>.0001) {
        tilt.rotation.y = motionPreference.matches ? 0 : THREE.MathUtils.lerp(tilt.rotation.y,targetTiltY,.14);
        tilt.rotation.z = motionPreference.matches ? 0 : THREE.MathUtils.lerp(tilt.rotation.z,targetTiltZ,.14);
        needsRender = true;
      }
      tilt.updateMatrixWorld(true); camera.updateMatrixWorld();
      let xExtent = 0, yExtent = 0;
      for (const corner of corners) { const point = corner.clone().applyMatrix4(pivot.matrixWorld).applyMatrix4(camera.matrixWorldInverse); xExtent = Math.max(xExtent,Math.abs(point.x)); yExtent = Math.max(yExtent,Math.abs(point.y)); }
      const targetWidth = Math.max(xExtent, yExtent * aspect) * 1.09;
      if (Math.abs(halfWidth - targetWidth) > .001) { halfWidth = motionPreference.matches ? targetWidth : THREE.MathUtils.lerp(halfWidth, targetWidth, .2); needsRender = true; }
      camera.left = -halfWidth; camera.right = halfWidth; camera.top = halfWidth / aspect; camera.bottom = -halfWidth / aspect; camera.updateProjectionMatrix();
      const desiredPress = holdingButton || now < pressPulseUntil ? 1 : 0;
      if (Math.abs(pressAmount.value-desiredPress)>.002) { pressAmount.value = motionPreference.matches ? desiredPress : THREE.MathUtils.lerp(pressAmount.value,desiredPress,.45); needsRender = true; }
      else pressAmount.value = desiredPress;
      const video = videoRefs.current[selection.current];
      fit(clips[selection.current].width / clips[selection.current].height);
      const normalToViewer = new THREE.Vector3(1,0,0).transformDirection(pivot.matrixWorld).dot(camera.position.clone().normalize());
      material.color.setScalar(.92 * (.7 + .3 * Math.max(0, normalToViewer)));
      if (hud.visible === moving) { hud.visible = !moving; needsRender = true; }
      hud.rotation.copy(screen.rotation); hud.scale.set(portrait ? screenHeight : screenWidth, portrait ? screenWidth : screenHeight, 1);
      updateHud(video);
      const playing = video && !video.paused && video.readyState >= 2;
      if (!needsRender && (!playing || now - lastRender < 1000 / 30)) return;
      renderer.render(scene, camera); lastRender = now; needsRender = interacting;
      publishControls();
    };
    frame = requestAnimationFrame(draw);
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener('webglcontextlost', lost);
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); listeners.forEach(remove => remove());
      select.current = null; handleRef.current = null;
      controls.dispose(); canvas.removeEventListener('keydown', keyboard); canvas.removeEventListener('keyup',keyboardUp); canvas.removeEventListener('webglcontextlost', lost);
      motionPreference.removeEventListener('change',updateMotion);
      canvas.removeEventListener('pointerdown',pointerDown); canvas.removeEventListener('pointerup',pointerUp); canvas.removeEventListener('pointermove',pointerMove); canvas.removeEventListener('pointerleave',pointerLeave); canvas.removeEventListener('pointercancel',pointerCancel);
      textures.forEach(texture => texture?.dispose()); posters.forEach(texture => texture?.dispose());
      screen.geometry.dispose(); material.dispose(); backing.geometry.dispose(); (backing.material as THREE.Material).dispose();
      glass.geometry.dispose(); (glass.material as THREE.Material).dispose(); hudTexture.dispose(); hud.geometry.dispose(); hudMaterial.dispose();
      if (model) disposeModel(model);
      environment.dispose(); pmrem.dispose(); renderer.dispose(); canvas.remove();
    };
  }, [videoRefs, handleRef, onReady, onFailure, onControls, onWatch]);
  return <div className="camera-webgl" ref={host} />;
}

function disposeModel(model: THREE.Object3D) {
  model.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose();
      material.dispose();
    }
  });
}
