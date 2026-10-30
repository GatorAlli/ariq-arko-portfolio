import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Document, NodeIO } from '@gltf-transform/core';
import { dedup, weld } from '@gltf-transform/functions';

const source = process.argv[2];
if (!source) throw new Error('Pass the directory containing camera.obj and tex/');
const output = path.resolve('public/models');
await fs.mkdir(output, { recursive: true });
const object = new OBJLoader().parse(await fs.readFile(path.join(source, 'camera.obj'), 'utf8'));
const document = new Document();
const buffer = document.createBuffer();
const scene = document.createScene('Camera');
const texture = async (suffix, mime = 'image/jpeg') => {
  const encoded = await sharp(path.join(source, 'tex', `camera_camera_${suffix}.png`))
    .resize(2048, 2048, { fit: 'inside' }).jpeg({ quality: suffix === 'BaseColor' ? 90 : 88 }).toBuffer();
  return document.createTexture(suffix).setImage(encoded).setMimeType(mime);
};
const base = await texture('BaseColor');
const normal = await texture('NormalOpenGL');
// glTF packs roughness into G and metalness into B. The source maps are 16-bit grayscale.
const rough = await sharp(path.join(source,'tex/camera_camera_Roughness.png')).resize(1024,1024).removeAlpha().toColourspace('b-w').raw().toBuffer();
const metal = await sharp(path.join(source,'tex/camera_camera_Metallic.png')).resize(1024,1024).removeAlpha().toColourspace('b-w').raw().toBuffer();
const packed = Buffer.alloc(1024 * 1024 * 3);
for (let i=0;i<1024*1024;i++) { packed[i*3]=255; packed[i*3+1]=rough[i]; packed[i*3+2]=metal[i]; }
const packedImage = await sharp(packed,{raw:{width:1024,height:1024,channels:3}}).png().toBuffer();
const mr = document.createTexture('RoughnessMetallic').setImage(packedImage).setMimeType('image/png');
const material = document.createMaterial('Camera PBR').setBaseColorTexture(base).setNormalTexture(normal)
  .setNormalScale(.5).setMetallicRoughnessTexture(mr).setMetallicFactor(1).setRoughnessFactor(1);
object.traverse(child => {
  if (!child.isMesh) return;
  const geometry = child.geometry;
  const primitive = document.createPrimitive().setMaterial(material);
  for (const [from,to] of [['position','POSITION'],['normal','NORMAL'],['uv','TEXCOORD_0']]) {
    const attr = geometry.getAttribute(from);
    if (!attr) continue;
    const array = new Float32Array(attr.array);
    // OBJ maps use the lower-left origin, glTF image coordinates use the upper-left.
    if (from === 'uv') for(let i=1;i<array.length;i+=2) array[i]=1-array[i];
    const accessor = document.createAccessor(to).setType(attr.itemSize===2?'VEC2':'VEC3').setArray(array).setBuffer(buffer);
    primitive.setAttribute(to,accessor);
  }
  const mesh = document.createMesh(child.name || 'Camera').addPrimitive(primitive);
  scene.addChild(document.createNode('Camera body').setMesh(mesh));
});
await document.transform(weld(), dedup());
await new NodeIO().write(path.join(output, 'camera.glb'), document);
console.log('Prepared camera.glb:',(await fs.stat(path.join(output,'camera.glb'))).size,'bytes');
