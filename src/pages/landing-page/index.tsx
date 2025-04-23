import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import "./index.css";

export function LandingPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Camera settings
    camera.position.set(0, 8, 24); // Adjust camera position

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 1);
    light.position.set(0, 50, 50); // Position the light above the TV
    light.castShadow = true; // Enable shadow casting
    scene.add(light);

    // Room Environment (Background)
    const textureLoader = new THREE.TextureLoader();
    const roomTexture = textureLoader.load("room.png"); // Replace with your image path
    const roomMaterial = new THREE.MeshBasicMaterial({
      map: roomTexture,
      side: THREE.BackSide, // Render the inside of the box
    });
    const roomGeometry = new THREE.BoxGeometry(50, 50, 50); // Large box for the room
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    // make it darker
    roomMaterial.opacity = 0.1; // Set the opacity to 0.5
    roomMaterial.transparent = true; // Enable transparency
    roomMaterial.depthWrite = false; // Disable depth writing
    scene.add(room);

    // Floor
    // const floorGeometry = new THREE.PlaneGeometry(20, 20);
    // const floorMaterial = new THREE.MeshBasicMaterial({
    //   color: 0x808080, // Gray color for the floor
    //   side: THREE.DoubleSide,
    //   transparent: true,
    //   opacity: 0.1, // Set the opacity to 0.5
    //   depthWrite: false, // Disable depth writing
    // });
    // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    // floor.position.y = -1; // Position it below the TV
    // floor.receiveShadow = true; // Allow shadows to be cast on the floor
    // scene.add(floor);

    // Load Font and Add Floating Text
    const fontLoader = new FontLoader();
    fontLoader.load("Aesthetic Moment_Italic.json", (font) => {
      const textGeometry = new TextGeometry("THUNDERSE", {
        font: font,
        size: 2, // Size of the text
        depth: 0.5, // Depth of the text,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
      });

      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x9900ff, // Purple color,
        emissive: 0x000000, // No emissive light
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-7.5, 20, 0); // Position the text above the TV
      scene.add(textMesh);

      // Add hover effect
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(textMesh);

        if (intersects.length > 0) {
          textMaterial.emissive.set(0xad33ff); // Light up the text (white)
          textMaterial.emissiveIntensity = 0.1; // Set emissive intensity
        } else {
          textMaterial.emissive.set(0x000000); // Reset to no emissive light
          textMaterial.emissiveIntensity = 1; // Set emissive intensity
        }
      };

      document.addEventListener("mousemove", onMouseMove);
    });

    // Coming soon Text
    // Load Font and Add "Coming Soon..." Text
    fontLoader.load("Aesthetic Moment_Italic.json", (font) => {
      const comingSoonGeometry = new TextGeometry("Coming Soon...", {
        font: font,
        size: 0.5, // Adjust the size of the text
        depth: 0.2, // Depth of the text
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
      });

      const comingSoonMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, // White color
        emissive: 0xffffff, // No emissive light
        emissiveIntensity: 0.3, // Set emissive intensity
      });

      const comingSoonMesh = new THREE.Mesh(
        comingSoonGeometry,
        comingSoonMaterial,
      );
      comingSoonMesh.position.set(-3, 7, 4); // Adjust position to fit your scene
      scene.add(comingSoonMesh);
    });

    // Load Vintage TV Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "vintage_tv.glb", // Path to your 3D model
      (gltf) => {
        const tvModel = gltf.scene;
        tvModel.scale.set(0.1, 0.1, 0.1); // Scale down the model
        tvModel.position.set(0, -2, 1); // Move the TV up
        tvModel.castShadow = true; // Allow the TV to cast shadows
        scene.add(tvModel);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      },
    );

    // Camera rotation on mouse move
    let mouseX = 0,
      mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // Add FilmPass for grainy effect
    const filmPass = new FilmPass(
      0.85, // Noise intensity
      false, // Grayscale
    );
    composer.addPass(filmPass);

    const RadialBlurShader = {
      uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2() },
        center: { value: new THREE.Vector2(0.1, 0.1) }, // Center of the blur
        strength: { value: 0.5 }, // Strength of the blur
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform vec2 center;
        uniform float strength;
        varying vec2 vUv;
    
        void main() {
          vec2 texCoord = vUv;
          vec2 dir = texCoord - center;
          float dist = length(dir);
          vec4 color = vec4(0.0);
          float total = 0.0;
    
          for (float i = 0.0; i < 1.0; i += 0.1) {
            float weight = (1.0 - dist) * (1.0 - i);
            color += texture2D(tDiffuse, texCoord - dir * i * strength) * weight;
            total += weight;
          }
    
          gl_FragColor = color / total;
        }
      `,
    };
    const radialBlurPass = new ShaderPass(RadialBlurShader);
    radialBlurPass.uniforms["resolution"].value.set(
      window.innerWidth,
      window.innerHeight,
    );
    radialBlurPass.uniforms["center"].value.set(0.5, 0.5); // Center of the screen
    radialBlurPass.uniforms["strength"].value = 0.05; // Adjust blur strength
    composer.addPass(radialBlurPass);

    // Update the animate function to use the composer
    const animate = () => {
      requestAnimationFrame(animate);
      camera.rotation.y = mouseX * 0.2;
      camera.rotation.x = mouseY * 0.1;
      composer.render(); // Use composer instead of renderer
    };
    animate();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="landing-page-main" ref={mountRef} />;
}
