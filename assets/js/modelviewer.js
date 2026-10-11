// Generic 3D model viewer for the static site.
// Loads a .3mf model passed via ?model=<relative path> and renders it with three.js.
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

(async function main() {
  const container = document.getElementById('viewer');
  const statusEl = document.getElementById('viewer-status');
  if (!container) return;

  const modelParam =
    new URLSearchParams(window.location.search).get('model') ||
    'models/AQM2/HAQ-Case-Final-Body.3mf';

  // Keep the viewer same-origin: refuse absolute URLs.
  if (/^(https?:)?\/\//i.test(modelParam)) {
    statusEl.textContent = 'Only local model paths are allowed.';
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 5000);
  camera.position.set(12, 8, 16);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(1, 1.5, 1);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-1, -0.5, -1);
  scene.add(fill);

  function resize() {
    const width = container.clientWidth || 320;
    const height = Math.max(container.clientHeight || 420, 300);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  statusEl.textContent = 'Loading ' + modelParam + '…';

  try {
    const res = await fetch(modelParam);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + modelParam);
    const buffer = await res.arrayBuffer();

    const loader = new ThreeMFLoader();
    const object = await loader.parse(buffer);

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 10 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    scene.add(object);

    camera.position.set(maxDim * scale * 0.7, maxDim * scale * 0.5, maxDim * scale * 0.9);
    camera.lookAt(0, 0, 0);
    controls.update();

    statusEl.textContent = 'Drag to rotate · scroll to zoom · right-drag to pan';
  } catch (err) {
    statusEl.textContent = 'Failed to load model: ' + (err && err.message ? err.message : err);
  }

  renderer.setAnimationLoop(function () {
    controls.update();
    renderer.render(scene, camera);
  });
})();
