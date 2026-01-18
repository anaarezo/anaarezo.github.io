"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Scene,
  FogExp2,
  PerspectiveCamera,
  WebGLRenderer,
  CircleGeometry,
  ShaderMaterial,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  Clock,
} from "three";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new Scene();
    // Darker, more atmospheric fog
    scene.fog = new FogExp2(0x020205, 0.04);

    const camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 15);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- 1. The Large Horizon Sun ---
    // const sunGeom = new CircleGeometry(25, 64);
    // const sunMat = new ShaderMaterial({
    //   transparent: true,
    //   uniforms: { uTime: { value: 0 } },
    //   vertexShader: `
    //     varying vec2 vUv;
    //     void main() {
    //       vUv = uv;
    //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //     }
    //   `,
    //   fragmentShader: `
    //     uniform float uTime;
    //     varying vec2 vUv;
    //     void main() {
    //       // Subtle moving scanlines
    //       float stripe = step(0.1, mod(vUv.y * 15.0 - uTime * 0.1, 1.0));
    //       // Gradient from hot pink to golden orange
    //       vec3 top = vec3(1.0, 0.1, 0.7);
    //       vec3 bottom = vec3(1.0, 0.6, 0.1);
    //       vec3 color = mix(bottom, top, vUv.y);
    //       // Soften the edges and apply stripes
    //       float mask = smoothstep(0.4, 0.5, 1.0 - length(vUv - 0.5) * 2.0);
    //       gl_FragColor = vec4(color, stripe * mask);
    //     }
    //   `,
    // });
    // const sun = new Mesh(sunGeom, sunMat);
    // sun.position.set(0, 15, -120);
    // scene.add(sun);

    // --- 2. High-Jagged Mountains ---
    const gridLimit = 120;
    const geometry = new PlaneGeometry(120, gridLimit, 80, 80);
    const vertices = geometry.attributes.position.array;

    // Create the valley and jagged mountain peaks
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const distFromCenter = Math.abs(x);
      // Valley floor (flat road)
      if (distFromCenter > 12) {
        // High, irregular peaks using a simple noise-like math function
        const noise =
          Math.sin(vertices[i] * 0.3) * Math.cos(vertices[i + 1] * 0.3);
        vertices[i + 2] =
          Math.pow(distFromCenter - 12, 1.4) * 0.4 + noise * 3.0;
      }
    }
    geometry.attributes.position.needsUpdate = true;

    const terrainMat = new MeshBasicMaterial({
      color: 0x870eb4, // Deep neon blue
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const terrain = new Mesh(geometry, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    scene.add(terrain);

    const terrain2 = terrain.clone();
    terrain2.position.z = -gridLimit;
    scene.add(terrain2);

    // --- 3. Star Field Background ---
    const starGeom = new BufferGeometry();
    const starCount = 1000;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starCoords[i] = (Math.random() - 0.5) * 400;
    }
    starGeom.setAttribute("position", new BufferAttribute(starCoords, 3));
    const stars = new Points(
      starGeom,
      new PointsMaterial({ color: 0xffffff, size: 0.1 })
    );
    scene.add(stars);

    // --- Animation Logic ---
    let animationId: number;
    const speed = 0.01; // Very slow and cinematic
    const clock = new Clock();

    const animate = () => {
      // const elapsed = clock.getElapsedTime();
      // sunMat.uniforms.uTime.value = elapsed;

      terrain.position.z += speed;
      terrain2.position.z += speed;

      if (terrain.position.z >= gridLimit)
        terrain.position.z = terrain2.position.z - gridLimit;
      if (terrain2.position.z >= gridLimit)
        terrain2.position.z = terrain.position.z - gridLimit;

      // Mouse-based tilt for a premium feel
      // camera.rotation.y = Math.sin(elapsed * 0.2) * 0.02;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020205] overflow-hidden">
      <div ref={containerRef} className="fixed inset-0 z-0" />
      <div className="relative flex flex-col items-center text-center space-y-8 min-h-screen py-16 z-20">
        <Image
          src="/assets/profile.png"
          alt="Ana Arezo"
          width={200}
          height={200}
          className="rounded-full border-4 border-blue-500 shadow-lg"
        />
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ana Arezo
          </h1>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 mt-2">
            Software Engineer
          </p>
          <p className="text-md text-zinc-600 dark:text-zinc-400">
            📍 London, UK
          </p>
        </div>
        <p className="max-w-md text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          I'm a passionate software engineer with a focus on creating beautiful
          and user-friendly applications. I have experience in a variety of
          technologies and I'm always eager to learn new things.
        </p>
        {/* <div className="flex gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            View Projects
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          Contact Me
        </Link>
        </div> */}
      </div>

      {/* Retro Polish: Vignette and CRT Lines */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
