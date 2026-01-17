'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1e);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0x00ff99, 0xff007f);
    gridHelper.position.z = -10;
    gridHelper.rotation.x = Math.PI * 0.3;
    scene.add(gridHelper);

    // Rotating Torus
    const torusGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      emissive: 0xff007f,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -8;
    scene.add(torus);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 50;
      positionArray[i + 1] = (Math.random() - 0.5) * 50;
      positionArray[i + 2] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Floating Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff99,
      emissive: 0x00ff99,
      wireframe: true,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-3, 2, -5);
    scene.add(cube);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Rotate grid
      gridHelper.rotation.x -= 0.0001;
      gridHelper.position.y = Math.sin(time * 0.5) * 0.3;

      // Rotate torus
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      // Animate particles
      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0003;

      // Animate cube
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.008;
      cube.position.y += Math.sin(time * 0.5) * 0.01;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse follow (optional subtle effect)
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x += (x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-0"
      />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-cyan-900/10 z-1 pointer-events-none" />
      
      {/* Content */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #ff007f, 0 0 40px #ff007f, 0 0 60px #ff007f; }
          50% { text-shadow: 0 0 30px #ff007f, 0 0 50px #ff007f, 0 0 80px #ff007f; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px #00ff99, inset 0 0 20px rgba(0, 255, 153, 0.2); }
          50% { box-shadow: 0 0 40px #00ff99, inset 0 0 30px rgba(0, 255, 153, 0.3); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .glow-text {
          animation: glow 2s ease-in-out infinite;
        }
        .pulse-glow-btn {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 min-h-screen py-16 justify-center px-4">
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-pink-500/30 rounded-full blur-xl animate-pulse" />

        {/* Profile Image */}
        <div className="float-animation relative z-20 slide-in">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-75 animate-pulse" />
          <Image
            src="/assets/profile.png"
            alt="Ana Arezo"
            width={200}
            height={200}
            className="relative rounded-full border-4 border-cyan-400 shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 153, 0.6), 0 0 80px rgba(255, 0, 127, 0.3)'
            }}
          />
        </div>

        {/* Title and Info */}
        <div className="slide-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-6xl md:text-7xl font-black glow-text" style={{ color: '#FF007F' }}>
            ANA AREZO
          </h1>
          <p className="text-2xl mt-4" style={{ color: '#00FF99', textShadow: '0 0 10px #00FF99' }}>
            // SOFTWARE ENGINEER
          </p>
          <p className="text-lg mt-2" style={{ color: '#00D9FF', textShadow: '0 0 8px #00D9FF' }}>
            📍 LONDON, UK
          </p>
        </div>

        {/* Bio */}
        <p className="max-w-md text-lg leading-8" style={{ color: '#E0E0E0' }} >
          Crafting digital experiences with cutting-edge technology and creative vision. Full-stack engineer obsessed with beautiful code and user-first design.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 flex-wrap justify-center pt-8 slide-in" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/projects"
            className="pulse-glow-btn px-8 py-4 font-bold text-lg relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #FF007F, #FF0099)',
              color: '#000',
              border: '2px solid #FF007F',
            }}
          >
            <span className="relative z-10">VIEW PROJECTS</span>
          </Link>

          <Link
            href="/about"
            className="pulse-glow-btn px-8 py-4 font-bold text-lg relative overflow-hidden"
            style={{
              background: 'transparent',
              border: '2px solid #00FF99',
              color: '#00FF99',
              textShadow: '0 0 10px #00FF99',
            }}
          >
            ABOUT ME
          </Link>
        </div>

        {/* Decorative Code-like Text */}
        <div className="mt-12 text-xs font-mono opacity-50 slide-in" style={{ color: '#00D9FF', animationDelay: '0.3s' }}>
          <p>&lt;/ web_developer &gt;</p>
          <p style={{ color: '#00FF99' }}>$ npm run create-magic()</p>
        </div>
      </div>
    </div>
  );
}

