import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/carouselShaders';
 
const IMAGE_PATHS = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
  '/images/hero-6.jpg',
  '/images/hero-7.jpg',
  '/images/hero-8.jpg',
];
 
const config = {
  angle: 0,
  diagonalAngle: 45,
  wheelFactor: 0.4,
  dragFactor: 0.7,
};
 
const planeWidth = 0.3;
 
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
 
interface CarouselMesh {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
}
 
export default function DiagonalCarousel({ onLoad }: { onLoad?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
 
  // Note: onWheel and onResize are defined inside the useEffect below where they have access to local variables.
 
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
 
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      1 / -2, 1 / 2, 1 / 2, 1 / -2,
      -1000, 1000
    );
    camera.position.z = 1;
 
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    // Set a non‑transparent clear color to ensure the canvas is visible even if no animation runs
    renderer.setClearColor(0x111111, 1);
    container.appendChild(renderer.domElement);
 
    // Shared geometry
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 16, 16);
 
    // Loading manager
    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);
 
    // Trigger onLoad when all textures are loaded
    loadingManager.onLoad = () => {
      if (onLoad) onLoad();
    };
 
    // Create mesh helper
    function createMesh({ texture, angle }: { texture: THREE.Texture; angle: number }): CarouselMesh {
      const image = texture.image as HTMLImageElement;
      const ratio = image.naturalWidth / image.naturalHeight;
      const scaleY = planeWidth * ratio;
 
      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: texture },
          uResolution: { value: new THREE.Vector2(image.naturalWidth, image.naturalHeight) },
          uContainerResolution: { value: new THREE.Vector2(canvasWidth, canvasHeight) },
          uUvScale: { value: new THREE.Vector2(1.0, 1.0) },
          uSpeed: { value: 0.0 },
          uTime: { value: 0.0 },
          uOverlayColor: { value: new THREE.Color(0.2, 0.1, 0.0) },
        },
        vertexShader,
        fragmentShader,
      });
 
      const mesh = new THREE.Mesh(planeGeometry, material);
      mesh.scale.set(planeWidth, scaleY, 1);
      mesh.rotation.z = (Math.PI * angle) / 180;
      mesh.userData.originalScale = mesh.scale.clone();
 
      return { mesh, material };
    }
 
    // Load textures and create meshes
    const objs: CarouselMesh[] = [];
    const textures: THREE.Texture[] = [];
 
    IMAGE_PATHS.forEach((path, index) => {
      const texture = textureLoader.load(path);
      textures.push(texture);
      const { mesh, material } = createMesh({
        texture,
        angle: config.diagonalAngle,
      });
 
      // Position meshes along the diagonal axis
      const spacing = 0.45;
      const totalLength = IMAGE_PATHS.length * spacing;
      const startOffset = -totalLength / 2;
      const yPos = startOffset + index * spacing;
 
      const angleRad = (Math.PI * config.diagonalAngle) / 180;
      mesh.position.x = Math.sin(angleRad) * yPos;
      mesh.position.y = Math.cos(angleRad) * yPos;
 
      scene.add(mesh);
      objs.push({ mesh, material });
    });
 
    // Infinite wrap logic
    let currentSpeed = 0;
    let targetSpeed = 0;
    let scrollTargetSpeed = 0;
 
    const infiniteAxis = new THREE.Vector3(0, 1, 0).applyAxisAngle(
      new THREE.Vector3(0, 0, 1),
      THREE.MathUtils.degToRad(45)
    );
 
    const diagonalLimit = Math.sqrt(canvasWidth * canvasWidth + canvasHeight * canvasHeight) / 800;
 
    // Wheel handler
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollTargetSpeed += event.deltaY * config.wheelFactor;
      targetSpeed = scrollTargetSpeed;
      scrollTargetSpeed *= 0.85;
    };
 
    // Add wheel listener with passive: false
    window.addEventListener('wheel', onWheel, { passive: false });
 
    // Animation loop
    const clock = new THREE.Clock();
    let animFrameId: number;
    // Render initial frame (required when animation may be disabled)
    renderer.render(scene, camera);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shouldAnimate = !prefersReduced.matches;
 
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
 
      // Decay speed
      currentSpeed = lerp(currentSpeed, targetSpeed, 0.03);
      targetSpeed *= 0.85;
 
      // Update each mesh
      for (const obj of objs) {
        const { mesh, material } = obj;
 
        // Move along diagonal axis
        mesh.position.add(infiniteAxis.clone().multiplyScalar(currentSpeed * 0.001));
 
        // Update shader uniforms
        material.uniforms.uSpeed.value = currentSpeed * 0.01;
        material.uniforms.uTime.value = elapsed;
 
        // Add subtle color overlay animation for richer visual effects
        material.uniforms.uOverlayColor.value.set(
          new THREE.Color(
            0.5 + 0.5 * Math.sin(elapsed * 0.2),
            0.5,
            0.2 + 0.2 * Math.sin(elapsed * 0.3)
          )
        );
 
        // Wraparound
        const meshScaleY = mesh.scale.y;
        const wrapThreshold = diagonalLimit + planeWidth * meshScaleY;
 
        if (mesh.position.y > wrapThreshold) {
          mesh.position.y -= 2 * wrapThreshold;
          mesh.position.x -= 2 * wrapThreshold * Math.sin((Math.PI * config.diagonalAngle) / 180);
        } else if (mesh.position.y < -wrapThreshold) {
          mesh.position.y += 2 * wrapThreshold;
          mesh.position.x += 2 * wrapThreshold * Math.sin((Math.PI * config.diagonalAngle) / 180);
        }
      }
 
      renderer.render(scene, camera);
    };
 
    if (shouldAnimate) {
      animate();
    }
 
    // Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      for (const obj of objs) {
        obj.material.uniforms.uContainerResolution.value.set(w, h);
      }
    };
 
    window.addEventListener('resize', onResize);
 
    // Cleanup
    cleanupRef.current = () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
 
      for (const obj of objs) {
        obj.mesh.geometry.dispose();
        obj.material.dispose();
      }
      planeGeometry.dispose();
      for (const tex of textures) {
        tex.dispose();
      }
      renderer.dispose();
 
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
 
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [onLoad]);
 
  return (
    <div
      id="carousel-canvas"
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
