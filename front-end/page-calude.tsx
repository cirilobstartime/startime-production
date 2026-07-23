"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';  
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Create Horizontal Curve Path (left to right)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, 2, 5),    // Far left
      new THREE.Vector3(-10, 3, 0),    // Left-center
      new THREE.Vector3(0, 2, -3),     // Center
      new THREE.Vector3(10, 1, 0),     // Right-center
      new THREE.Vector3(20, 2, 5),     // Far right
    ], false, 'catmullrom', 0.5);
  }, []);

  useGSAP(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Three.js Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 10);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: false 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Add a simple sphere for testing (if model doesn't load)
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    // Load Model
    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();
    loader.load(
      '/vr_art_gallery.glb', 
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        scene.add(model);
        // Hide test sphere when model loads
        sphere.visible = false;
      },
      undefined,
      (error) => {
        console.log('Model loading error (using sphere instead):', error);
      }
    );

    // 2. Horizontal Scroll Animation with Body Scroll
    const scrollObj = { progress: 0 };
    
    const horizontalScroll = gsap.to(scrollObj, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        markers: true, // Debug markers - remove in production
      },
      onUpdate: () => {
        // Update Camera Position along curve
        const point = curve.getPoint(scrollObj.progress);
        camera.position.copy(point);
        
        // Camera looks ahead on the curve
        const lookAheadProgress = Math.min(scrollObj.progress + 0.05, 1);
        const lookAtPoint = curve.getPoint(lookAheadProgress);
        camera.lookAt(lookAtPoint);
        
        // Rotate model/sphere based on scroll
        if (model) {
          model.rotation.y = scrollObj.progress * Math.PI * 2;
        }
        sphere.rotation.y = scrollObj.progress * Math.PI * 2;
      }
    });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render Loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      horizontalScroll.kill();
      renderer.dispose();
      scene.clear();
    };

  }, { scope: containerRef });

  return (
    <div className="w-full">
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Content overlay to show scroll progress */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm pointer-events-none">
          Scroll down to navigate horizontally through the scene
        </div>
      </div>
      
      {/* This creates the scroll space */}
      <div className="h-[400vh]" />
    </div>
  );
}