import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 200;
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Mix of blue, purple, cyan
      const t = Math.random();
      if (t < 0.33) {
        col[i * 3] = 0.3; col[i * 3 + 1] = 0.5; col[i * 3 + 2] = 1.0;
      } else if (t < 0.66) {
        col[i * 3] = 0.5; col[i * 3 + 1] = 0.3; col[i * 3 + 2] = 0.9;
      } else {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 0.9;
      }
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Orbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        Math.sin(i * 1.05) * 5,
        Math.cos(i * 0.8) * 3,
        Math.sin(i * 1.3) * 4 - 3,
      ] as [number, number, number],
      scale: 0.15 + Math.random() * 0.25,
      color: i % 3 === 0 ? "#4d8eff" : i % 3 === 1 ? "#8b5cf6" : "#22d3ee",
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <Particles />
        <Orbs />
      </Canvas>
      {/* Ambient glow overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 30% 40%, hsl(210 100% 60% / 0.06), transparent),
            radial-gradient(ellipse 40% 50% at 70% 60%, hsl(260 60% 60% / 0.05), transparent),
            radial-gradient(ellipse 60% 40% at 50% 80%, hsl(185 80% 55% / 0.04), transparent)
          `
        }}
      />
    </div>
  );
};

export default HeroScene;
