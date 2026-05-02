"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BRAND } from "@/lib/constants";

function PulsingOrb() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const torusRef = useRef<THREE.Mesh | null>(null);
  const torus2Ref = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      const scale = 1 + Math.sin(t * 1.6) * 0.06;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.y = t * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.25;
      torusRef.current.rotation.y = t * 0.1;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = -t * 0.15;
      torus2Ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshPhongMaterial
          color="#5B3FBF"
          emissive={new THREE.Color("#3D2785")}
          emissiveIntensity={0.95}
          shininess={80}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={4} color="#A78BFA" distance={5} />
      <mesh ref={torusRef}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.5} wireframe />
      </mesh>
      <mesh ref={torus2Ref}>
        <torusGeometry args={[2.7, 0.015, 16, 100]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.35} wireframe />
      </mesh>
    </group>
  );
}

function GravityParticles() {
  const ref = useRef<THREE.Points | null>(null);
  const COUNT = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += (0 - arr[i * 3]) * 0.003;
      arr[i * 3 + 1] += (0 - arr[i * 3 + 1]) * 0.003;
      arr[i * 3 + 2] += (0 - arr[i * 3 + 2]) * 0.003;
      const dx = arr[i * 3];
      const dy = arr[i * 3 + 1];
      const dz = arr[i * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 0.4) {
        const r = 3 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#A78BFA"
        size={0.04}
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function OrbCanvas() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#A78BFA" />
      <PulsingOrb />
      <GravityParticles />
    </Canvas>
  );
}

const OrbCanvasNoSSR = dynamic(
  () => Promise.resolve({ default: OrbCanvas }),
  { ssr: false }
);

export default function CTASection() {
  const [enableWebGL, setEnableWebGL] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setEnableWebGL(!reduced && !isMobile);
  }, []);

  return (
    <section
      id="download"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-24 sm:py-28 md:py-32"
    >
      {/* Orb canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {enableWebGL ? (
          <OrbCanvasNoSSR />
        ) : (
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#5B3FBF] to-[#A78BFA] opacity-60 blur-3xl" />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,8,18,0.6)_70%,rgba(10,8,18,1)_100%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8C97A]" />
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            Available now
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
        >
          Your home,
          <br />
          <span className="heading-gradient">handled with care.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-base text-text-secondary md:text-lg"
        >
          Download Thalatha and get matched with verified providers in minutes.
          Free to use. No subscription. Real humans, real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={BRAND.appStore}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="shimmer-btn group inline-flex items-center gap-3 rounded-2xl border border-[#E8C97A]/50 bg-[#E8C97A]/15 px-6 py-3.5 text-sm font-medium text-[#E8C97A] backdrop-blur-md transition-all hover:bg-[#E8C97A]/25 hover:shadow-[0_0_40px_rgba(232,201,122,0.3)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.6 12.7c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2.9-4.1.9-.9 0-2.2-.9-3.6-.9-1.9 0-3.6 1.1-4.6 2.7-1.9 3.4-.5 8.4 1.4 11.1.9 1.3 2 2.8 3.4 2.7 1.4 0 1.9-.9 3.5-.9 1.6 0 2.1.9 3.5.9 1.5 0 2.4-1.3 3.3-2.6.6-.9 1-1.8 1.4-2.7-.1-.1-2.6-1-2.6-4.1zM14.7 4.6c.7-.9 1.2-2.2 1.1-3.4-1 0-2.3.6-3 1.5-.6.8-1.2 2-1 3.2 1.1.1 2.2-.5 2.9-1.3z" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-[#E8C97A]/80">
                Download on
              </span>
              <span className="text-base font-semibold">App Store</span>
            </div>
          </a>

          <a
            href={BRAND.playStore}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="shimmer-btn group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3.6 2.7C3.2 3.1 3 3.7 3 4.5v15c0 .8.2 1.4.6 1.8L13 12 3.6 2.7zM14.5 13.4l2.6 2.6-12.4 7c-.5.3-1 .3-1.5 0l11.3-9.6zM18.7 11.2l3.1 1.7c1 .6 1 2.2 0 2.8l-3.1 1.7-2.9-2.9 2.9-3.3zM4.7 1.1c.5-.3 1-.3 1.5 0l12.4 7-2.6 2.6-11.3-9.6z"
                fill="currentColor"
              />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-white/70">
                Get it on
              </span>
              <span className="text-base font-semibold">Google Play</span>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary"
        >
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Free forever
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            No credit card
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verified providers
          </span>
        </motion.div>
      </div>
    </section>
  );
}
