/** Fold the supplied rigged Pentax back to its bind pose and bake a lightweight static model. */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld } from '@gltf-transform/functions';
import { buttonLegends, makeButtonAtlas } from './camera-button-labels.mjs';

const input = process.argv[2];
if (!input) throw new Error('Pass the downloaded Pentax GLB path.');
globalThis.ProgressEvent ??= class ProgressEvent extends Event { constructor(type, properties) { super(type); Object.assign(this, properties); } };
const bytes = await fs.readFile(input);
const jsonLength = bytes.readUInt32LE(12);
const json = JSON.parse(bytes.subarray(20, 20 + jsonLength).toString());
const binary = bytes.subarray(28 + jsonLength);
const geometryJson = structuredClone(json);
geometryJson.buffers[0].uri = 'data:application/octet-stream;base64,' + binary.toString('base64');
geometryJson.materials = json.materials.map(material => ({ name: material.name }));
delete geometryJson.images; delete geometryJson.textures; delete geometryJson.samplers;
delete geometryJson.extensionsUsed; delete geometryJson.extensionsRequired;
const loaded = await new GLTFLoader().parseAsync(JSON.stringify(geometryJson), '');
const meshes = [];
loaded.scene.traverse(object => { if (object.isSkinnedMesh) meshes.push(object); });
meshes.forEach(mesh => mesh.skeleton.pose());
loaded.scene.updateMatrixWorld(true);
meshes.forEach(mesh => mesh.skeleton.update());
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const document = await io.read(input);
const root = document.getRoot();
const originalMeshes = root.listMeshes();
const buffer = root.listBuffers()[0];
const scale = 20;
// Original rest pose has the lens along +Y and the top along -Z. Canonical rear is +X.
const canonical = new THREE.Matrix4().set(0,-scale,0,0, 0,0,-scale,0, scale,0,0,0, 0,0,0,1);
const bounds = new THREE.Box3();
const baked = meshes.map(mesh => {
  const geometry = mesh.geometry;
  const positions = new Float32Array(geometry.attributes.position.count * 3);
  const normals = new Float32Array(positions.length);
  const world = canonical.clone().multiply(mesh.matrixWorld);
  const normalMatrix = new THREE.Matrix3().getNormalMatrix(world);
  for (let i=0; i<geometry.attributes.position.count; i++) {
    const position = new THREE.Vector3().fromBufferAttribute(geometry.attributes.position, i);
    mesh.applyBoneTransform(i, position); position.applyMatrix4(world);
    bounds.expandByPoint(position); position.toArray(positions, i*3);
    new THREE.Vector3().fromBufferAttribute(geometry.attributes.normal, i).applyMatrix3(normalMatrix).normalize().toArray(normals, i*3);
  }
  const sourceNode = json.nodes.find(node => node.name === mesh.name && node.mesh !== undefined);
  return { mesh: originalMeshes[sourceNode.mesh], positions, normals };
});
const center = bounds.getCenter(new THREE.Vector3());
const buttonCenters = [[2.4325082302,-.3073801249,-.6373452246],[2.4325082302,-.3073801398,-.9490352273]];
// Preserve the two real, disconnected rocker-key components. A radial shader mask
// also moved the surrounding housing, creating a dark spot rather than a key press.
async function rebuildRearControls(mesh, primitive, positions) {
  const count = positions.length / 3;
  const indices = primitive.getIndices().getArray();
  const parents = Uint32Array.from({length:count},(_,index)=>index);
  const find = index => { while (parents[index] !== index) { parents[index] = parents[parents[index]]; index = parents[index]; } return index; };
  const join = (a,b) => { parents[find(a)] = find(b); };
  const coordinates = new Map();
  for (let index=0;index<count;index++) {
    const key = Array.from(positions.subarray(index*3,index*3+3), value=>Math.round(value*100000)).join(',');
    if (coordinates.has(key)) join(index,coordinates.get(key));
    else coordinates.set(key,index);
  }
  for (let index=0;index<indices.length;index+=3) { join(indices[index],indices[index+1]); join(indices[index],indices[index+2]); }
  const parts = new Map();
  for (let index=0;index<count;index++) {
    const key = find(index);
    if (!parts.has(key)) parts.set(key,{vertices:[],min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity]});
    const part = parts.get(key); part.vertices.push(index);
    for (let axis=0;axis<3;axis++) { part.min[axis]=Math.min(part.min[axis],positions[index*3+axis]); part.max[axis]=Math.max(part.max[axis],positions[index*3+axis]); }
  }
  const controls = buttonLegends.map(legend=>{
    const part = [...parts.values()].find(part=>Math.hypot(...part.min.map((value,axis)=>(value+part.max[axis])/2-legend.center[axis]))<.001);
    if (!part) throw new Error(`Cannot identify the physical Pentax ${legend.name} key.`);
    return {legend,part};
  });
  const normals = primitive.getAttribute('NORMAL').getArray();
  const keyPositions=[],keyNormals=[],keyUvs=[],keyTags=[],keyIndices=[],housingIndices=[];
  const selectedVertices = new Set(controls.flatMap(({part})=>part.vertices));
  for (let index=0;index<indices.length;index+=3) if (!selectedVertices.has(indices[index])) housingIndices.push(indices[index],indices[index+1],indices[index+2]);
  for (const [tile,{legend,part}] of controls.entries()) {
    const remap = new Map();
    for (const vertex of part.vertices) {
      remap.set(vertex,keyPositions.length/3);
      keyPositions.push(...positions.subarray(vertex*3,vertex*3+3)); keyNormals.push(...normals.subarray(vertex*3,vertex*3+3));
      const u=(part.max[2]-positions[vertex*3+2])/(part.max[2]-part.min[2]);
      const v=(part.max[1]-positions[vertex*3+1])/(part.max[1]-part.min[1]);
      keyUvs.push((tile%4+u)/4,(Math.floor(tile/4)+v)/4); keyTags.push(legend.direction??0);
    }
    for (let index=0;index<indices.length;index+=3) if (remap.has(indices[index])) keyIndices.push(remap.get(indices[index]),remap.get(indices[index+1]),remap.get(indices[index+2]));
  }
  const accessor = (type,array)=>document.createAccessor().setType(type).setArray(array).setBuffer(buffer);
  primitive.setIndices(accessor('SCALAR',new Uint16Array(housingIndices)));
  const atlas = document.createTexture('Vector rear-control legends').setMimeType('image/png').setImage(await sharp(Buffer.from(makeButtonAtlas(controls))).png().toBuffer());
  const ink = document.createMaterial('Pentax rubber controls and crisp print').setBaseColorTexture(atlas).setRoughnessFactor(.56).setMetallicFactor(.03);
  const keys = document.createPrimitive().setMaterial(ink).setIndices(accessor('SCALAR',new Uint16Array(keyIndices)));
  keys.setAttribute('POSITION',accessor('VEC3',new Float32Array(keyPositions)));
  keys.setAttribute('NORMAL',accessor('VEC3',new Float32Array(keyNormals)));
  keys.setAttribute('TEXCOORD_0',accessor('VEC2',new Float32Array(keyUvs)));
  keys.setAttribute('_CAMERA_BUTTON',accessor('SCALAR',new Float32Array(keyTags)));
  mesh.addPrimitive(keys);
}
for (const scene of root.listScenes()) for (const child of scene.listChildren()) scene.removeChild(child);
const scene = root.listScenes()[0];
for (const item of baked) {
  for (let i=0;i<item.positions.length;i+=3) { item.positions[i]-=center.x; item.positions[i+1]-=center.y; item.positions[i+2]-=center.z; }
  const primitive = item.mesh.listPrimitives()[0];
  primitive.setAttribute('POSITION', document.createAccessor().setType('VEC3').setArray(item.positions).setBuffer(buffer));
  primitive.setAttribute('NORMAL', document.createAccessor().setType('VEC3').setArray(item.normals).setBuffer(buffer));
  for (const attribute of ['JOINTS_0','WEIGHTS_0','TANGENT']) primitive.setAttribute(attribute, null);
  if (item.mesh.getName() === 'Body_mat_K-I_0') await rebuildRearControls(item.mesh,primitive,item.positions);
  scene.addChild(document.createNode(item.mesh.getName()).setMesh(item.mesh));
}
const largeTextures = new Set();
const colorTextures = new Set();
for (const material of root.listMaterials()) {
  largeTextures.add(material.getBaseColorTexture()); largeTextures.add(material.getNormalTexture()); colorTextures.add(material.getBaseColorTexture());
  // The exported barrel/hood wrongly use alpha blending. Only the optical lens is glass.
  if (material.getName() !== 'mat_DAF85mm_Lens') {
    material.setAlphaMode('OPAQUE');
    const factor = material.getBaseColorFactor(); factor[3] = 1; material.setBaseColorFactor(factor);
  }
}
for (const texture of root.listTextures()) {
  const pipeline = sharp(texture.getImage()).resize(largeTextures.has(texture) ? 2048 : 1024, undefined, { withoutEnlargement: true });
  const stats = await pipeline.stats();
  const hasAlpha = stats.channels.length === 4 && stats.channels[3].min < 255;
  const lossless = colorTextures.has(texture) || hasAlpha;
  const image = lossless ? await (colorTextures.has(texture) ? pipeline.sharpen({sigma:.55,m1:.3,m2:1}) : pipeline).png({compressionLevel:9}).toBuffer() : await pipeline.removeAlpha().jpeg({quality:94}).toBuffer();
  texture.setImage(image).setMimeType(lossless ? 'image/png' : 'image/jpeg');
}
await document.transform(prune(), weld(), dedup());
root.setDefaultScene(scene);
const output = path.resolve('public/models/camera.glb');
await io.write(output, document);
const convert = point => new THREE.Vector3(...point).applyMatrix4(canonical).sub(center).toArray();
const configuration = {
  screen: { position: convert([.00333429873, -.039948265, .00227776634]), width: .06702235341*scale, height: .04568118975*scale },
  wheel: { center: buttonCenters[0].map((value,axis)=>(value+buttonCenters[1][axis])/2), offset: (buttonCenters[0][2]-buttonCenters[1][2])/2 },
  bounds: { min: bounds.min.sub(center).toArray(), max: bounds.max.sub(center).toArray() },
  credit: { title: 'PENTAX K-1 DSLR', author: 'tuma_youzyo/T_Y', url: 'https://sketchfab.com/3d-models/pentax-k-1-dslr-19d8c0bf6c814424a6a0dd54d726e475', license: 'https://creativecommons.org/licenses/by/4.0/' },
};
await fs.writeFile('lib/camera-model.json', JSON.stringify(configuration,null,2)+'\n');
console.log(JSON.stringify({bytes:(await fs.stat(output)).size,configuration},null,2));
