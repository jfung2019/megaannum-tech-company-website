"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Euler,
  Float32BufferAttribute,
  InstancedMesh,
  LinearFilter,
  Line as ThreeLine,
  LineBasicMaterial,
  MathUtils,
  Object3D,
  SRGBColorSpace,
  Vector3,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type Points,
  type Texture,
} from "three";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

const PANEL_HEIGHT = 1.32;

type PanelSpec = {
  title: string;
  eyebrow: string;
  tint: string;
};

type RibbonSlot = {
  angle: number;
  radius: [number, number];
  centerY: number;
  z: number;
  scale: [number, number, number];
  opacity: number;
  phase: number;
};

const PANELS: PanelSpec[] = [
  {
    title: "MARKET SIGNALS",
    eyebrow: "LIVE INTELLIGENCE",
    tint: "#8fd8ff",
  },
  {
    title: "DEAL FLOW",
    eyebrow: "PIPELINE VIEW",
    tint: "#b8ecff",
  },
  {
    title: "PORTFOLIO OS",
    eyebrow: "CAPITAL DASHBOARD",
    tint: "#5bb6ff",
  },
  {
    title: "AI ANALYST",
    eyebrow: "MODEL OUTPUT",
    tint: "#d8f4ff",
  },
  {
    title: "RISK RADAR",
    eyebrow: "SIGNAL MONITOR",
    tint: "#8fd8ff",
  },
  {
    title: "TREASURY VIEW",
    eyebrow: "CAPITAL FLOW",
    tint: "#5bb6ff",
  },
  {
    title: "AUDIENCE GRAPH",
    eyebrow: "PROJECT MAP",
    tint: "#b8ecff",
  },
  {
    title: "DASHBOARD",
    eyebrow: "LIVE PRODUCT",
    tint: "#d8f4ff",
  },
  {
    title: "AUTOMATION",
    eyebrow: "OPS SYSTEM",
    tint: "#8fd8ff",
  },
  {
    title: "RESEARCH OS",
    eyebrow: "KNOWLEDGE BASE",
    tint: "#5bb6ff",
  },
];

const RIBBON_SLOTS: RibbonSlot[] = [
  {
    angle: -2.28,
    radius: [3.75, 0.62],
    centerY: 0.52,
    z: 0.02,
    scale: [0.92, 0.52, 1],
    opacity: 0.76,
    phase: 0,
  },
  {
    angle: -1.35,
    radius: [2.75, 0.48],
    centerY: 0.32,
    z: 0.26,
    scale: [0.72, 0.42, 1],
    opacity: 0.68,
    phase: 0.9,
  },
  {
    angle: 1.28,
    radius: [2.7, 0.5],
    centerY: 0.28,
    z: 0.22,
    scale: [0.72, 0.42, 1],
    opacity: 0.68,
    phase: 1.8,
  },
  {
    angle: 2.24,
    radius: [3.85, 0.64],
    centerY: 0.5,
    z: -0.02,
    scale: [0.92, 0.52, 1],
    opacity: 0.76,
    phase: 2.7,
  },
  {
    angle: -2.58,
    radius: [3.25, 0.5],
    centerY: -0.36,
    z: 0.38,
    scale: [0.76, 0.43, 1],
    opacity: 0.7,
    phase: 3.6,
  },
  {
    angle: 2.55,
    radius: [3.25, 0.5],
    centerY: -0.38,
    z: 0.36,
    scale: [0.76, 0.43, 1],
    opacity: 0.7,
    phase: 4.5,
  },
];

function makePanelTexture(panel: PanelSpec, index: number) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 540;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#201409");
  gradient.addColorStop(0.46, "#070707");
  gradient.addColorStop(1, "#3b1a06");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let x = 0; x < canvas.width; x += 42) {
    ctx.fillRect(x, 0, 1, canvas.height);
  }
  for (let y = 0; y < canvas.height; y += 42) {
    ctx.fillRect(0, y, canvas.width, 1);
  }

  const frameX = 58;
  const frameY = 52;
  const frameW = 844;
  const frameH = 430;
  const screenshotGradient = ctx.createLinearGradient(frameX, frameY, frameX + frameW, frameY + frameH);
  screenshotGradient.addColorStop(0, "rgba(255,255,255,0.18)");
  screenshotGradient.addColorStop(0.24, panel.tint);
  screenshotGradient.addColorStop(0.56, "#1a120a");
  screenshotGradient.addColorStop(1, "#050505");
  ctx.fillStyle = screenshotGradient;
  ctx.fillRect(frameX, frameY, frameW, frameH);

  ctx.fillStyle = "rgba(0,0,0,0.34)";
  ctx.fillRect(frameX, frameY, frameW, 54);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.arc(frameX + 28 + i * 24, frameY + 27, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fillRect(frameX + 126, frameY + 18, 270, 16);

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(frameX, frameY, frameW, frameH);

  const variant = index % 4;

  if (variant === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "700 42px Arial";
    ctx.fillText("PROJECT", frameX + 52, frameY + 142);
    ctx.fillStyle = panel.tint;
    ctx.font = "700 58px Arial";
    ctx.fillText("SHOWCASE", frameX + 52, frameY + 204);

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(frameX + 52, frameY + 242, 330, 18);
    ctx.fillRect(frameX + 52, frameY + 276, 248, 18);

    const heroGlow = ctx.createRadialGradient(frameX + 650, frameY + 242, 20, frameX + 650, frameY + 242, 190);
    heroGlow.addColorStop(0, "rgba(255,255,255,0.78)");
    heroGlow.addColorStop(0.42, panel.tint);
    heroGlow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = heroGlow;
    ctx.beginPath();
    ctx.arc(frameX + 650, frameY + 242, 190, 0, Math.PI * 2);
    ctx.fill();
  } else if (variant === 1) {
    for (let i = 0; i < 4; i += 1) {
      const cardX = frameX + 72 + i * 184;
      const cardY = frameY + 120 + Math.sin(index + i) * 20;
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.fillRect(cardX, cardY, 138, 224);
      ctx.strokeStyle = "rgba(255,255,255,0.38)";
      ctx.strokeRect(cardX, cardY, 138, 224);
      ctx.fillStyle = i % 2 === 0 ? panel.tint : "rgba(255,255,255,0.72)";
      ctx.fillRect(cardX + 18, cardY + 24, 102, 92);
      ctx.fillStyle = "rgba(255,255,255,0.26)";
      ctx.fillRect(cardX + 18, cardY + 142, 86, 12);
      ctx.fillRect(cardX + 18, cardY + 168, 64, 12);
    }
  } else if (variant === 2) {
    ctx.strokeStyle = panel.tint;
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < 9; i += 1) {
      const x = frameX + 82 + i * 86;
      const y = frameY + 270 + Math.sin(index * 0.9 + i * 0.8) * 86;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    for (let i = 0; i < 9; i += 1) {
      const x = frameX + 82 + i * 86;
      const y = frameY + 270 + Math.sin(index * 0.9 + i * 0.8) * 86;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const tileX = frameX + 72 + col * 178;
        const tileY = frameY + 112 + row * 86;
        ctx.fillStyle = (row + col + index) % 2 === 0 ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.32)";
        ctx.fillRect(tileX, tileY, 132, 52);
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.strokeRect(tileX, tileY, 132, 52);
        ctx.fillStyle = row === 1 ? panel.tint : "rgba(255,255,255,0.5)";
        ctx.fillRect(tileX + 16, tileY + 17, 78, 8);
      }
    }
  }

  ctx.fillStyle = "rgba(0,0,0,0.48)";
  ctx.fillRect(frameX, frameY + frameH - 76, frameW, 76);

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "700 34px Arial";
  ctx.fillText(panel.title, frameX + 34, frameY + frameH - 30);

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "600 16px Arial";
  ctx.fillText("REPLACE WITH PROJECT IMAGE", frameX + 34, frameY + 92);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;

  return texture;
}

const MEMORY_PLANE_COUNT = 120;
const MEMORY_TEXTURE_COUNT = 6;
const MEMORY_PLACEHOLDER_IMAGES = [
  "https://picsum.photos/seed/megaannum-memory-1/640/400",
  "https://picsum.photos/seed/megaannum-memory-2/640/400",
  "https://picsum.photos/seed/megaannum-memory-3/640/400",
  "https://i.imgur.com/8Km9tLL.jpg",
  "https://i.imgur.com/BbKBET2.jpg",
  "https://i.imgur.com/CzXTtJV.jpg",
];

function hashRandom(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

type MemoryPlaneInstance = {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  opacity: number;
};

function createMemoryPlaneInstances(count: number): MemoryPlaneInstance[] {
  const dummy = new Object3D();
  const instances: MemoryPlaneInstance[] = [];

  for (let i = 0; i < count; i += 1) {
    const depth = hashRandom(i * 1.7);
    const angle = hashRandom(i * 2.3) * Math.PI * 2;
    const z = MathUtils.lerp(-4.8, -0.95, Math.pow(depth, 0.72));
    const depthFactor = MathUtils.smoothstep(z, -4.8, -0.95);
    const tunnelRadius = MathUtils.lerp(6.4, 2.1, depthFactor) * (0.55 + hashRandom(i * 3.1) * 0.75);
    const x = Math.sin(angle) * tunnelRadius;
    const y = MathUtils.lerp(-1.8, 1.9, hashRandom(i * 4.2)) + Math.cos(angle) * tunnelRadius * 0.22;
    const width = MathUtils.lerp(0.1, 0.28, depthFactor) * (0.82 + hashRandom(i * 5.4) * 0.36);

    dummy.position.set(x, y, z);
    dummy.lookAt(x * 0.12, y * 0.12 + 0.08, z + 2.8);
    dummy.rotateZ((hashRandom(i * 6.8) - 0.5) * 0.28);
    dummy.rotateX((hashRandom(i * 7.2) - 0.5) * 0.16);

    instances.push({
      position: dummy.position.clone(),
      rotation: dummy.rotation.clone(),
      scale: new Vector3(width, width * 0.62, 1),
      opacity: MathUtils.lerp(0.22, 0.68, depthFactor) * (0.72 + hashRandom(i * 8.1) * 0.28),
    });
  }

  return instances;
}

function MemoryPlaneBatch({
  instances,
  texture,
}: {
  instances: MemoryPlaneInstance[];
  texture: Texture;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    instances.forEach((instance, index) => {
      dummy.position.copy(instance.position);
      dummy.rotation.copy(instance.rotation);
      dummy.scale.copy(instance.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy, instances]);

  if (instances.length === 0) return null;

  const opacity =
    instances.reduce((sum, instance) => sum + instance.opacity, 0) / instances.length;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, instances.length]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function MemoryPlanesContent() {
  const groupRef = useRef<Group>(null);
  const textures = useTexture(MEMORY_PLACEHOLDER_IMAGES);
  const instances = useMemo(() => createMemoryPlaneInstances(MEMORY_PLANE_COUNT), []);

  useMemo(() => {
    textures.forEach((texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
    });
  }, [textures]);

  const groupedInstances = useMemo(() => {
    const groups = Array.from({ length: MEMORY_TEXTURE_COUNT }, () => [] as MemoryPlaneInstance[]);

    instances.forEach((instance, index) => {
      groups[index % MEMORY_TEXTURE_COUNT].push(instance);
    });

    return groups;
  }, [instances]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(elapsed * 0.07) * 0.035;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.018;
  });

  return (
    <group ref={groupRef}>
      {groupedInstances.map((batch, index) => (
        <MemoryPlaneBatch
          key={`memory-plane-batch-${index}`}
          instances={batch}
          texture={textures[index]}
        />
      ))}
    </group>
  );
}

function MemoryPlanes() {
  return (
    <Suspense fallback={null}>
      <MemoryPlanesContent />
    </Suspense>
  );
}

function makeRibbonPathGeometry(slot: RibbonSlot) {
  const samples = 72;
  const positions: number[] = [];
  const arcSpan = 1.42;

  for (let i = 0; i <= samples; i += 1) {
    const angle = slot.angle - arcSpan / 2 + (i / samples) * arcSpan;
    positions.push(
      Math.sin(angle) * slot.radius[0],
      slot.centerY + Math.cos(angle) * slot.radius[1],
      slot.z + Math.cos(angle) * 1.05,
    );
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  return geometry;
}

function getLanePoint(slot: RibbonSlot, angle: number) {
  return {
    x: Math.sin(angle) * slot.radius[0],
    y: slot.centerY + Math.cos(angle) * slot.radius[1],
    z: slot.z + Math.cos(angle) * 1.05,
  };
}

function makeLaneRibbonGeometry({
  slot,
  centerAngle,
  height = PANEL_HEIGHT,
  arcSpan = 0.62,
  zOffset = 0,
}: {
  slot: RibbonSlot;
  centerAngle: number;
  height?: number;
  arcSpan?: number;
  zOffset?: number;
}) {
  const segments = 36;
  const center = getLanePoint(slot, centerAngle);
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let ix = 0; ix <= segments; ix += 1) {
    const u = ix / segments;
    const angle = centerAngle - arcSpan / 2 + u * arcSpan;
    const point = getLanePoint(slot, angle);
    const x = point.x - center.x;
    const y = point.y - center.y;
    const z = point.z - center.z + zOffset;

    positions.push(x, y + height / 2, z);
    positions.push(x, y - height / 2, z);
    uvs.push(u, 1, u, 0);
  }

  for (let ix = 0; ix < segments; ix += 1) {
    const topLeft = ix * 2;
    const bottomLeft = topLeft + 1;
    const topRight = topLeft + 2;
    const bottomRight = topLeft + 3;
    indices.push(topLeft, bottomLeft, topRight, bottomLeft, bottomRight, topRight);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

function makeLaneEdgeGeometry({
  slot,
  centerAngle,
  yOffset,
  arcSpan = 0.62,
  zOffset = 0.05,
}: {
  slot: RibbonSlot;
  centerAngle: number;
  yOffset: number;
  arcSpan?: number;
  zOffset?: number;
}) {
  const samples = 48;
  const center = getLanePoint(slot, centerAngle);
  const positions: number[] = [];

  for (let ix = 0; ix <= samples; ix += 1) {
    const u = ix / samples;
    const angle = centerAngle - arcSpan / 2 + u * arcSpan;
    const point = getLanePoint(slot, angle);
    positions.push(point.x - center.x, point.y - center.y + yOffset, point.z - center.z + zOffset);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  return geometry;
}

function updateLaneRibbonGeometry({
  geometry,
  slot,
  centerAngle,
  height,
  arcSpan,
  zOffset,
}: {
  geometry: BufferGeometry;
  slot: RibbonSlot;
  centerAngle: number;
  height: number;
  arcSpan: number;
  zOffset: number;
}) {
  const position = geometry.getAttribute("position") as Float32BufferAttribute;
  const center = getLanePoint(slot, centerAngle);
  const segments = (position.count / 2) - 1;

  for (let ix = 0; ix <= segments; ix += 1) {
    const u = ix / segments;
    const angle = centerAngle - arcSpan / 2 + u * arcSpan;
    const point = getLanePoint(slot, angle);
    const x = point.x - center.x;
    const y = point.y - center.y;
    const z = point.z - center.z + zOffset;

    position.setXYZ(ix * 2, x, y + height / 2, z);
    position.setXYZ(ix * 2 + 1, x, y - height / 2, z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

function updateLaneEdgeGeometry({
  geometry,
  slot,
  centerAngle,
  yOffset,
  arcSpan,
  zOffset,
}: {
  geometry: BufferGeometry;
  slot: RibbonSlot;
  centerAngle: number;
  yOffset: number;
  arcSpan: number;
  zOffset: number;
}) {
  const position = geometry.getAttribute("position") as Float32BufferAttribute;
  const center = getLanePoint(slot, centerAngle);
  const samples = position.count - 1;

  for (let ix = 0; ix <= samples; ix += 1) {
    const u = ix / samples;
    const angle = centerAngle - arcSpan / 2 + u * arcSpan;
    const point = getLanePoint(slot, angle);
    position.setXYZ(ix, point.x - center.x, point.y - center.y + yOffset, point.z - center.z + zOffset);
  }

  position.needsUpdate = true;
}

function getRibbonPanelState(elapsed: number, index: number) {
  const slot = RIBBON_SLOTS[index % RIBBON_SLOTS.length];
  const phase = elapsed * 0.24 + slot.phase;
  const slowPhase = elapsed * 0.16 + slot.phase;
  const angle = slot.angle + elapsed * 0.16 + Math.sin(phase) * 0.035;
  const x = Math.sin(angle) * slot.radius[0];
  const y = slot.centerY + Math.cos(angle) * slot.radius[1];
  const z = slot.z + Math.cos(angle) * 1.05 + Math.sin(slowPhase) * 0.08;
  const sideSign = x < 0 ? 1 : -1;
  const depthProgress = (Math.cos(angle) + 1) / 2;
  const centerFade = MathUtils.smoothstep(Math.abs(x), 1.45, 2.35);
  const scalePulse = 0.9 + depthProgress * 0.18 + Math.sin(slowPhase) * 0.025;

  return {
    centerAngle: angle,
    position: {
      x,
      y,
      z,
    },
    rotation: {
      x: -0.03 + Math.sin(phase * 0.7) * 0.018,
      y: sideSign * (0.42 + centerFade * 0.24) - Math.sin(angle) * 0.18 + Math.cos(slowPhase) * 0.025,
      z: -Math.sin(angle) * 0.08 + Math.sin(phase * 0.62) * 0.014,
    },
    opacity: (slot.opacity + depthProgress * 0.12 + Math.sin(slowPhase) * 0.04) * (0.2 + centerFade * 0.8),
    scale: [
      slot.scale[0] * scalePulse,
      slot.scale[1] * scalePulse,
      slot.scale[2],
    ] as [number, number, number],
  };
}

function LaneRibbonPanel({ panel, index }: { panel: PanelSpec; index: number }) {
  const slot = RIBBON_SLOTS[index % RIBBON_SLOTS.length];
  const initialState = getRibbonPanelState(0, index);
  const arcSpan = index < 4 ? 0.72 : 0.58;
  const panelHeight = PANEL_HEIGHT * slot.scale[1] * 1.12;
  const ref = useRef<Group>(null);
  const panelMaterial = useRef<MeshBasicMaterial>(null);
  const glowMaterial = useRef<MeshBasicMaterial>(null);
  const texture = useMemo(() => makePanelTexture(panel, index), [index, panel]);
  const frontGeometry = useMemo(
    () =>
      makeLaneRibbonGeometry({
        slot,
        centerAngle: initialState.centerAngle,
        height: panelHeight,
        arcSpan,
        zOffset: 0.04,
      }),
    [arcSpan, initialState.centerAngle, panelHeight, slot],
  );
  const backingGeometry = useMemo(
    () =>
      makeLaneRibbonGeometry({
        slot,
        centerAngle: initialState.centerAngle,
        height: panelHeight + 0.08,
        arcSpan: arcSpan + 0.04,
        zOffset: -0.035,
      }),
    [arcSpan, initialState.centerAngle, panelHeight, slot],
  );
  const glowGeometry = useMemo(
    () =>
      makeLaneRibbonGeometry({
        slot,
        centerAngle: initialState.centerAngle,
        height: panelHeight + 0.16,
        arcSpan: arcSpan + 0.08,
        zOffset: -0.08,
      }),
    [arcSpan, initialState.centerAngle, panelHeight, slot],
  );
  const rimLines = useMemo(
    () => [
      new ThreeLine(
        makeLaneEdgeGeometry({
          slot,
          centerAngle: initialState.centerAngle,
          yOffset: panelHeight / 2 + 0.05,
          arcSpan: arcSpan + 0.04,
        }),
        new LineBasicMaterial({
          color: "#f7f7f5",
          transparent: true,
          opacity: 0.66,
          depthWrite: false,
          blending: AdditiveBlending,
        }),
      ),
      new ThreeLine(
        makeLaneEdgeGeometry({
          slot,
          centerAngle: initialState.centerAngle,
          yOffset: -panelHeight / 2 - 0.05,
          arcSpan: arcSpan + 0.04,
        }),
        new LineBasicMaterial({
          color: panel.tint,
          transparent: true,
          opacity: 0.44,
          depthWrite: false,
          blending: AdditiveBlending,
        }),
      ),
    ],
    [arcSpan, initialState.centerAngle, panel.tint, panelHeight, slot],
  );

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;

    const elapsed = clock.getElapsedTime();
    const slotState = getRibbonPanelState(elapsed, index);

    ref.current.position.x = MathUtils.damp(ref.current.position.x, slotState.position.x, 3, delta);
    ref.current.position.y = MathUtils.damp(ref.current.position.y, slotState.position.y, 3, delta);
    ref.current.position.z = MathUtils.damp(ref.current.position.z, slotState.position.z, 3, delta);

    updateLaneRibbonGeometry({
      geometry: frontGeometry,
      slot,
      centerAngle: slotState.centerAngle,
      height: panelHeight,
      arcSpan,
      zOffset: 0.04,
    });
    updateLaneRibbonGeometry({
      geometry: backingGeometry,
      slot,
      centerAngle: slotState.centerAngle,
      height: panelHeight + 0.08,
      arcSpan: arcSpan + 0.04,
      zOffset: -0.035,
    });
    updateLaneRibbonGeometry({
      geometry: glowGeometry,
      slot,
      centerAngle: slotState.centerAngle,
      height: panelHeight + 0.16,
      arcSpan: arcSpan + 0.08,
      zOffset: -0.08,
    });

    updateLaneEdgeGeometry({
      geometry: rimLines[0].geometry,
      slot,
      centerAngle: slotState.centerAngle,
      yOffset: panelHeight / 2 + 0.05,
      arcSpan: arcSpan + 0.04,
      zOffset: 0.05,
    });
    updateLaneEdgeGeometry({
      geometry: rimLines[1].geometry,
      slot,
      centerAngle: slotState.centerAngle,
      yOffset: -panelHeight / 2 - 0.05,
      arcSpan: arcSpan + 0.04,
      zOffset: 0.05,
    });

    if (panelMaterial.current) {
      panelMaterial.current.opacity = MathUtils.damp(
        panelMaterial.current.opacity,
        slotState.opacity,
        3,
        delta,
      );
    }

    if (glowMaterial.current) {
      glowMaterial.current.opacity = MathUtils.damp(
        glowMaterial.current.opacity,
        0.05 + slotState.opacity * 0.11,
        3,
        delta,
      );
    }
  });

  return (
    <group
      ref={ref}
      position={[initialState.position.x, initialState.position.y, initialState.position.z]}
    >
      <mesh geometry={backingGeometry}>
        <meshStandardMaterial
          color="#080706"
          emissive={panel.tint}
          emissiveIntensity={0.1}
          metalness={0.18}
          roughness={0.48}
          transparent
          opacity={0.76}
        />
      </mesh>
      <mesh geometry={frontGeometry}>
        <meshBasicMaterial
          ref={panelMaterial}
          map={texture ?? undefined}
          opacity={initialState.opacity}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          ref={glowMaterial}
          color={panel.tint}
          opacity={0.12}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      {rimLines.map((line, lineIndex) => (
        <primitive key={`lane-rim-${panel.title}-${lineIndex}`} object={line} />
      ))}
    </group>
  );
}

function RibbonPathLines() {
  const lines = useMemo(
    () =>
      RIBBON_SLOTS.map((slot, index) => {
        const material = new LineBasicMaterial({
          color: index % 2 === 0 ? "#8fd8ff" : "#FFFFFF",
          transparent: true,
          opacity: index % 2 === 0 ? 0.2 : 0.13,
          depthWrite: false,
          blending: AdditiveBlending,
        });

        return new ThreeLine(makeRibbonPathGeometry(slot), material);
      }),
    [],
  );

  return (
    <group>
      {lines.map((line, index) => (
        <primitive key={`ribbon-path-${index}`} object={line} />
      ))}
    </group>
  );
}

function OperatorModel() {
  const { scene } = useGLTF("/models/3d_figure.glb");

  return (
    <group position={[0, -0.86, 1.34]} rotation={[0, Math.PI, 0]} scale={[1.04, 1.04, 1.04]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/3d_figure.glb");

function AiParticleOrb() {
  const blob = useRef<Mesh>(null);
  const orb = useRef<Points>(null);
  const blobBasePositions = useRef<Float32Array | null>(null);
  const normalizedX = useHeroMotionStore((s) => s.normalizedX);
  const normalizedY = useHeroMotionStore((s) => s.normalizedY);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < 1250; i += 1) {
      const radius = 0.28 + Math.random() * 0.92;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const noise =
        Math.sin(theta * 4.2) * 0.13 +
        Math.cos(phi * 5.8) * 0.08 +
        Math.sin((theta + phi) * 3.2) * 0.07;
      const warpedRadius = radius + noise;

      positions.push(
        Math.sin(phi) * Math.cos(theta) * warpedRadius * 1.02,
        Math.cos(phi) * warpedRadius * 0.98,
        Math.sin(phi) * Math.sin(theta) * warpedRadius * 1.12,
      );

      const warmth = Math.random();
      colors.push(0.48 + warmth * 0.24, 0.82 + warmth * 0.14, 1);
    }

    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

    return bufferGeometry;
  }, []);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (blob.current) {
      const geometry = blob.current.geometry as BufferGeometry;
      const position = geometry.getAttribute("position") as Float32BufferAttribute;

      if (!blobBasePositions.current) {
        blobBasePositions.current = new Float32Array(position.array as Float32Array);
      }

      const base = blobBasePositions.current;
      for (let i = 0; i < position.count; i += 1) {
        const x = base[i * 3];
        const y = base[i * 3 + 1];
        const z = base[i * 3 + 2];
        const wave =
          Math.sin(x * 4.8 + elapsed * 1.2) * 0.08 +
          Math.cos(y * 5.4 + elapsed * 1.45) * 0.07 +
          Math.sin((x + y + z) * 3.5 + elapsed * 0.95) * 0.06;

        position.setXYZ(i, x * (1 + wave), y * (1 + wave * 0.84), z * (1 + wave * 1.2));
      }

      position.needsUpdate = true;
      geometry.computeVertexNormals();
      blob.current.rotation.y += delta * 0.12;
      blob.current.rotation.x = MathUtils.damp(
        blob.current.rotation.x,
        normalizedY * 0.12,
        3.2,
        delta,
      );
      blob.current.rotation.z = MathUtils.damp(
        blob.current.rotation.z,
        normalizedX * 0.1 + Math.sin(elapsed * 0.42) * 0.06,
        3.2,
        delta,
      );
    }

    if (orb.current) {
      orb.current.rotation.y += delta * 0.18;
      orb.current.rotation.x = MathUtils.damp(
        orb.current.rotation.x,
        normalizedY * 0.18 + Math.sin(elapsed * 0.7) * 0.04,
        3.5,
        delta,
      );
      orb.current.rotation.z = MathUtils.damp(
        orb.current.rotation.z,
        normalizedX * 0.16,
        3.5,
        delta,
      );
      const pulse = 1 + Math.sin(elapsed * 1.5) * 0.035;
      orb.current.scale.setScalar(pulse);
    }

  });

  return (
    <group position={[0, -0.08, 0.5]} scale={[0.82, 0.82, 0.82]}>
      <mesh ref={blob} scale={[1, 0.96, 1.08]}>
        <icosahedronGeometry args={[0.78, 5]} />
        <meshBasicMaterial
          color="#8fd8ff"
          opacity={0.22}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh scale={[1.22, 1.08, 1.28]}>
        <sphereGeometry args={[0.84, 48, 48]} />
        <meshBasicMaterial
          color="#c9f1ff"
          opacity={0.075}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh scale={[1.52, 1.34, 1.58]}>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshBasicMaterial
          color="#5bb6ff"
          opacity={0.045}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <points ref={orb} geometry={geometry}>
        <pointsMaterial
          size={0.019}
          vertexColors
          transparent
          opacity={0.78}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>

    </group>
  );
}

function PlaneStack() {
  const normalizedX = useHeroMotionStore((s) => s.normalizedX);
  const normalizedY = useHeroMotionStore((s) => s.normalizedY);
  const group = useRef<Group>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        x: MathUtils.randFloatSpread(4.1),
        y: MathUtils.randFloatSpread(2.5),
        z: MathUtils.randFloat(-0.95, 1.25),
        scale: index % 4 === 0 ? 0.032 : 0.016,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      normalizedX * 0.22,
      3.6,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -normalizedY * 0.16,
      3.6,
      delta,
    );
    group.current.position.x = MathUtils.damp(
      group.current.position.x,
      normalizedX * 0.12,
      3.2,
      delta,
    );
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      -normalizedY * 0.08,
      3.2,
      delta,
    );
  });

  return (
    <group ref={group} rotation={[0.02, -0.08, 0]}>
      <mesh position={[0, -0.02, -0.72]} scale={[1.5, 1.5, 1]}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial
          color="#d8f4ff"
          opacity={0.14}
          transparent
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, -1.12, 0.38]} rotation={[-1.12, 0, 0]} scale={[2.4, 0.82, 1]}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial
          color="#f4f7fa"
          opacity={0.2}
          transparent
          depthWrite={false}
        />
      </mesh>

      <RibbonPathLines />

      <MemoryPlanes />

      {PANELS.slice(0, 6).map((panel, index) => (
        <LaneRibbonPanel key={`ribbon-${panel.title}-${index}`} panel={panel} index={index} />
      ))}

      <AiParticleOrb />
      <Suspense fallback={null}>
        <OperatorModel />
      </Suspense>

      {particles.map((particle, index) => (
        <mesh
          key={`${particle.x}-${particle.y}-${index}`}
          position={[particle.x, particle.y, particle.z]}
          scale={particle.scale}
        >
          <circleGeometry args={[1, 12]} />
          <meshBasicMaterial
            color={index % 5 === 0 ? "#8fd8ff" : "#FFFFFF"}
            opacity={index % 5 === 0 ? 0.58 : 0.28}
            transparent
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ThreePlanesHero() {
  const isHeroInView = useHeroMotionStore((s) => s.isHeroInView);

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.35], fov: 46 }}
        dpr={[1, 1.75]}
        frameloop={isHeroInView ? "always" : "never"}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.15} />
        <hemisphereLight color="#f4f7fa" groundColor="#1a1b1d" intensity={1.2} />
        <directionalLight color="#f4f8ff" intensity={1.55} position={[0.2, 4.2, 2.8]} />
        <directionalLight color="#dbe7f2" intensity={0.75} position={[-3.2, 2.4, 2.2]} />
        <pointLight color="#8fd8ff" intensity={1.35} position={[0, 0.12, 1.7]} distance={3.8} />
        <PlaneStack />
      </Canvas>
    </div>
  );
}
