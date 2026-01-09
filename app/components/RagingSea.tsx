"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying float vElevation;

vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Break grid pattern with initial noise offset
    float noiseOffset = cnoise(vec3(modelPosition.xz * 0.3, 0.0)) * 0.8;
    float px = modelPosition.x + noiseOffset;
    float pz = modelPosition.z + noiseOffset * 0.6;

    // Main dramatic wave - Hokusai style with sharp peaks
    float mainWave = sin(px * uBigWavesFrequency.x + uTime * uBigWavesSpeed);
    mainWave = pow(abs(mainWave), 0.6) * sign(mainWave); // Sharpen the peaks
    float elevation = mainWave * sin(pz * uBigWavesFrequency.y + uTime * uBigWavesSpeed * 0.7) * uBigWavesElevation;

    // Dramatic curling wave crests
    float curlWave = sin(px * 1.5 + pz * 0.8 + uTime * uBigWavesSpeed * 1.2);
    curlWave = pow(max(curlWave, 0.0), 1.5); // Only positive peaks, sharper
    elevation += curlWave * uBigWavesElevation * 0.8;

    // Rolling waves from one direction (like ocean swells)
    float swell = sin(px * 2.0 + uTime * uBigWavesSpeed * 0.8);
    swell = pow(max(swell, 0.0), 0.8);
    elevation += swell * uBigWavesElevation * 0.5;

    // Large organic swells
    elevation += cnoise(vec3(modelPosition.xz * 0.4, uTime * 0.1)) * uBigWavesElevation * 0.6;

    // Dramatic foam-like peaks using sharp noise
    for(float i = 1.0; i <= uSmallIterations; i++) {
        float freq = uSmallWavesFrequency * i * 0.6;
        float speed = uSmallWavesSpeed * (0.6 + i * 0.2);

        float noise = cnoise(vec3(modelPosition.xz * freq, uTime * speed));
        // Sharpen the peaks for foam effect
        float sharpNoise = pow(abs(noise), 0.7) * sign(noise);
        elevation -= abs(sharpNoise * uSmallWavesElevation / i);

        // Add curling detail
        float curl = cnoise(vec3(modelPosition.xz * freq * 1.5 + 100.0, uTime * speed * 1.3));
        elevation += max(curl, 0.0) * uSmallWavesElevation / (i * 1.2) * 0.5;
    }

    // Extra dramatic peaks
    float peaks = cnoise(vec3(modelPosition.xz * 1.2, uTime * 0.3));
    peaks = pow(max(peaks, 0.0), 2.0);
    elevation += peaks * uBigWavesElevation * 0.4;

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vElevation = elevation;
}
`;

const fragmentShader = `
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength = clamp(mixStrength, 0.0, 1.0);

    // Base color mix - Hokusai style Prussian blue
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    // Add white foam on highest peaks (Hokusai style)
    float foam = smoothstep(0.55, 0.9, mixStrength);
    vec3 foamColor = vec3(0.98, 0.98, 1.0); // Pure white foam
    color = mix(color, foamColor, foam * 0.9);

    // Add darker troughs for more contrast - deep Prussian blue
    float trough = smoothstep(0.3, 0.0, mixStrength);
    vec3 deepColor = uDepthColor * 0.5;
    color = mix(color, deepColor, trough * 0.6);

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}
`;

interface CardData {
  title: string;
  content: React.ReactNode;
  expandedContent?: React.ReactNode;
}

// Mt Fuji shader with snow based on height + noise
const mtFujiVertexShader = `
varying vec3 vPosition;

void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const mtFujiFragmentShader = `
varying vec3 vPosition;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec3 rockColor = vec3(0.35, 0.38, 0.44);
    vec3 snowColor = vec3(1.0, 1.0, 1.0);

    // Use angle around Y axis for noise variation
    float angle = atan(vPosition.x, vPosition.z);
    float noiseVal = noise(vec2(angle * 2.0, vPosition.y * 3.0)) * 0.2
                   + noise(vec2(angle * 5.0, vPosition.y * 2.0)) * 0.15;

    // Snow line - lower value = more snow coverage, hard cut
    float snowLine = 0.7 + noiseVal;
    float isSnow = step(snowLine, vPosition.y);

    vec3 color = mix(rockColor, snowColor, isSnow);
    gl_FragColor = vec4(color, 1.0);
}
`;

function MtFuji() {
  // Create Mt. Fuji profile using LatheGeometry for realistic silhouette
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // Base (wide)
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(1.4, 0));
    // Lower slopes (gentle)
    pts.push(new THREE.Vector2(1.3, 0.15));
    pts.push(new THREE.Vector2(1.15, 0.3));
    pts.push(new THREE.Vector2(1.0, 0.45));
    // Mid slopes (steeper)
    pts.push(new THREE.Vector2(0.8, 0.65));
    pts.push(new THREE.Vector2(0.6, 0.85));
    // Upper slopes (steep with ridges)
    pts.push(new THREE.Vector2(0.45, 1.0));
    pts.push(new THREE.Vector2(0.35, 1.15));
    pts.push(new THREE.Vector2(0.28, 1.25));
    // Near summit
    pts.push(new THREE.Vector2(0.22, 1.35));
    pts.push(new THREE.Vector2(0.18, 1.42));
    // Crater rim (slight outward then in)
    pts.push(new THREE.Vector2(0.15, 1.48));
    pts.push(new THREE.Vector2(0.12, 1.52));
    pts.push(new THREE.Vector2(0.08, 1.54));
    pts.push(new THREE.Vector2(0, 1.55));
    return pts;
  }, []);

  return (
    <group position={[0, -0.55, 0]}>
      {/* Outline - inverted hull for silhouette highlight */}
      <mesh scale={[1.015, 1.0, 1.015]}>
        <latheGeometry args={[points, 32]} />
        <meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} />
      </mesh>

      {/* Ring to cover the bottom edge of the outline */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 64]} />
        <shaderMaterial
          fragmentShader={`void main() { gl_FragColor = vec4(0.35, 0.38, 0.44, 1.0); }`}
          vertexShader={`void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        />
      </mesh>

      {/* Main mountain */}
      <mesh>
        <latheGeometry args={[points, 32]} />
        <shaderMaterial
          vertexShader={mtFujiVertexShader}
          fragmentShader={mtFujiFragmentShader}
        />
      </mesh>

      {/* Rocks around the base - varied sizes with outlines */}
      {/* Large rocks */}
      <group position={[1.3, 0.18, 0.4]} rotation={[0.1, 0.5, 0.2]}>
        <mesh scale={1.03}><dodecahedronGeometry args={[0.4, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.4, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-1.2, 0.15, 0.6]} rotation={[0.2, 1.2, 0.1]}>
        <mesh scale={1.03}><icosahedronGeometry args={[0.35, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.35, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[0.2, 0.12, -1.4]} rotation={[0.22, 1.1, 0.18]}>
        <mesh scale={1.03}><dodecahedronGeometry args={[0.38, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.38, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>

      {/* Medium rocks */}
      <group position={[1.0, 0.1, -0.9]} rotation={[0.15, 2.1, 0.25]}>
        <mesh scale={1.04}><dodecahedronGeometry args={[0.25, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.25, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-0.8, 0.09, -1.0]} rotation={[0.3, 0.8, 0.1]}>
        <mesh scale={1.04}><icosahedronGeometry args={[0.22, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.22, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[0.6, 0.08, 1.2]} rotation={[0.15, 2.5, 0.1]}>
        <mesh scale={1.04}><dodecahedronGeometry args={[0.2, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.2, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-1.5, 0.1, 0.9]} rotation={[0.18, 2.2, 0.1]}>
        <mesh scale={1.04}><icosahedronGeometry args={[0.24, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.24, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>

      {/* Small rocks */}
      <group position={[1.5, 0.04, -0.3]} rotation={[0.1, 1.5, 0.15]}>
        <mesh scale={1.05}><dodecahedronGeometry args={[0.1, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.1, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-1.4, 0.03, -0.4]} rotation={[0.2, 0.3, 0.2]}>
        <mesh scale={1.05}><icosahedronGeometry args={[0.08, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.08, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-0.5, 0.04, 1.3]} rotation={[0.25, 1.8, 0.2]}>
        <mesh scale={1.05}><icosahedronGeometry args={[0.09, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.09, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[1.6, 0.03, 0.8]} rotation={[0.12, 0.9, 0.15]}>
        <mesh scale={1.05}><dodecahedronGeometry args={[0.07, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.07, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-0.3, 0.03, -1.3]} rotation={[0.1, 0.6, 0.12]}>
        <mesh scale={1.05}><icosahedronGeometry args={[0.06, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.06, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[1.1, 0.04, 1.0]} rotation={[0.2, 1.7, 0.22]}>
        <mesh scale={1.05}><dodecahedronGeometry args={[0.08, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.08, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-1.0, 0.05, 1.1]} rotation={[0.15, 2.8, 0.1]}>
        <mesh scale={1.05}><icosahedronGeometry args={[0.11, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.11, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[0.8, 0.03, 0.7]} rotation={[0.08, 0.4, 0.2]}>
        <mesh scale={1.05}><dodecahedronGeometry args={[0.05, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><dodecahedronGeometry args={[0.05, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
      <group position={[-0.9, 0.04, 0.2]} rotation={[0.25, 1.4, 0.15]}>
        <mesh scale={1.05}><icosahedronGeometry args={[0.07, 0]} /><meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} /></mesh>
        <mesh><icosahedronGeometry args={[0.07, 0]} /><meshBasicMaterial color="#595f70" /></mesh>
      </group>
    </group>
  );
}

// Hokusai-style sky shader
const skyVertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const skyFragmentShader = `
uniform vec3 uSkyColor;
uniform vec3 uCloudColor;
uniform float uCameraAngle;

varying vec2 vUv;
varying vec3 vPosition;

// Seamless noise using 2D coordinates on cylinder surface
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    float height = vPosition.y;

    // Create wavy cloud edge using noise based on angle around cylinder
    float angle = atan(vPosition.x, vPosition.z);
    float wavyEdge = noise(vec2(angle * 2.0, 0.0)) * 0.5
                   + noise(vec2(angle * 4.0, 1.0)) * 0.3
                   + noise(vec2(angle * 8.0, 2.0)) * 0.2;

    // Sharp cloud boundary
    float cloudBoundary = 0.1 + wavyEdge * 0.6;

    // Day/night transition based on camera angle
    // Camera at ±π (sun side) = day, camera at 0 (moon side) = night
    float normalizedAngle = abs(uCameraAngle) / 3.14159; // 0 at moon, 1 at sun
    float dayAmount = smoothstep(0.3, 0.7, normalizedAngle); // gradual transition

    // Night colors
    vec3 nightSkyColor = vec3(0.05, 0.08, 0.15);
    vec3 nightCloudColor = vec3(0.15, 0.18, 0.25);

    // Interpolate between day and night
    vec3 currentSkyColor = mix(nightSkyColor, uSkyColor, dayAmount);
    vec3 currentCloudColor = mix(nightCloudColor, uCloudColor, dayAmount);

    vec3 color = height < cloudBoundary ? currentCloudColor : currentSkyColor;

    // Moon (at angle ≈ ±π, which is -Z direction) - covers the seam
    float sunAngleDist = abs(abs(angle) - 3.14159);
    float sunHeight = 0.42;
    float sunRadius = 0.1;
    float distToSun = sqrt(sunAngleDist * sunAngleDist + (height - sunHeight) * (height - sunHeight) * 0.5);
    if (distToSun < sunRadius) {
        color = vec3(0.95, 0.95, 0.85); // Pale moon
    }

    // Sun (at angle ≈ 0, which is +Z direction)
    float moonAngleDist = abs(angle);
    float moonHeight = 0.45;
    float moonRadius = 0.08;
    float distToMoon = sqrt(moonAngleDist * moonAngleDist + (height - moonHeight) * (height - moonHeight) * 0.5);
    if (distToMoon < moonRadius) {
        color = vec3(0.85, 0.15, 0.15); // Japanese red sun
    }

    gl_FragColor = vec4(color, 1.0);
}
`;

function HokusaiSky({ skyColor, cloudColor, cameraAngle }: { skyColor: string; cloudColor: string; cameraAngle: number }) {
  const uniforms = useMemo(
    () => ({
      uSkyColor: { value: new THREE.Color(skyColor) },
      uCloudColor: { value: new THREE.Color(cloudColor) },
      uCameraAngle: { value: 0 },
    }),
    [skyColor, cloudColor]
  );

  // Update camera angle uniform
  useFrame(() => {
    uniforms.uCameraAngle.value = cameraAngle;
  });

  return (
    <mesh scale={[20, 15, 20]} position={[0, 2, 0]}>
      <cylinderGeometry args={[1, 1, 2, 64, 1, true]} />
      <shaderMaterial
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

interface WaterProps {
  depthColor: string;
  surfaceColor: string;
}

function Water({ depthColor, surfaceColor }: WaterProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBigWavesElevation: { value: 0.25 },
      uBigWavesFrequency: { value: new THREE.Vector2(2.5, 3.2) },
      uBigWavesSpeed: { value: 0.5 },
      uSmallWavesElevation: { value: 0.18 },
      uSmallWavesFrequency: { value: 2.5 },
      uSmallWavesSpeed: { value: 0.3 },
      uSmallIterations: { value: 5 },
      uDepthColor: { value: new THREE.Color(depthColor) },
      uSurfaceColor: { value: new THREE.Color(surfaceColor) },
      uColorOffset: { value: 0.15 },
      uColorMultiplier: { value: 4 },
    }),
    [depthColor, surfaceColor]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20, 512, 512]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface ContentCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  children: React.ReactNode;
  isActive: boolean;
  onCardClick: () => void;
}

function ContentCard({ position, rotation, children, isActive, onCardClick }: ContentCardProps) {
  return (
    <group position={position} rotation={rotation}>
      <Html
        center
        transform
        scale={0.1}
        style={{
          opacity: isActive ? 1 : 0.3,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {/* SVG Filter for liquid glass distortion */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.012"
                numOctaves={3}
                seed={42}
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurred"
                scale={50}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <div
          className="w-[450px] rounded-[28px] relative overflow-hidden cursor-pointer"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
          onClick={onCardClick}
        >
          {/* Blur layer - separate from distortion */}
          <div
            className="absolute inset-0 rounded-[28px]"
            style={{
              backdropFilter: "blur(100px) saturate(200%)",
              WebkitBackdropFilter: "blur(100px) saturate(200%)",
            }}
          />

          {/* Distortion layer */}
          <div
            className="absolute inset-0 rounded-[28px]"
            style={{
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              filter: "url(#liquid-glass)",
            }}
          />

          {/* Tint + inner shadow layer */}
          <div
            className="absolute inset-0 rounded-[28px]"
            style={{
              backgroundColor: "rgba(20, 40, 70, 0.5)",
              boxShadow: "inset 0 0 30px -5px rgba(255, 255, 255, 0.5)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6">{children}</div>
        </div>
      </Html>
    </group>
  );
}

interface SceneProps {
  cards: CardData[];
  depthColor: string;
  surfaceColor: string;
  bgColor: string;
  activeIndex: number;
  dragOffset: number;
  isDragging: boolean;
  onCardClick: (index: number) => void;
  onDayAmountChange: (amount: number) => void;
}

function Scene({ cards, depthColor, surfaceColor, bgColor, activeIndex, dragOffset, isDragging, onCardClick, onDayAmountChange }: SceneProps) {
  const { camera } = useThree();
  const totalSections = cards.length;
  const currentAngleRef = useRef(Math.PI); // Start at sun side
  const prevIndexRef = useRef(0);
  const [cameraAngle, setCameraAngle] = useState(Math.PI);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirLight1Ref = useRef<THREE.DirectionalLight>(null);
  const dirLight2Ref = useRef<THREE.DirectionalLight>(null);

  // Position cards around the scene
  // Offset by π so first card is near the sun (at ±π) instead of moon (at 0)
  const cardPositions: Array<{
    position: [number, number, number];
    rotation: [number, number, number];
  }> = useMemo(() => {
    return cards.map((_, index) => {
      const angle = (index / totalSections) * Math.PI * 2 + Math.PI; // offset by π
      const radius = 1.8;
      return {
        position: [
          Math.sin(angle) * radius,
          0.5,
          Math.cos(angle) * radius,
        ] as [number, number, number],
        // Face outward from center (toward camera)
        rotation: [0, angle, 0] as [number, number, number],
      };
    });
  }, [cards, totalSections]);

  useFrame(() => {
    const radius = 3.5;
    let targetAngle: number;

    if (isDragging) {
      // Free rotation while dragging
      targetAngle = currentAngleRef.current + dragOffset;
    } else {
      // Calculate target angle for current index (offset by π to match card positions)
      const baseAngle = (activeIndex / totalSections) * Math.PI * 2 + Math.PI;

      // Handle circular wrap - find shortest rotation path
      const currentNormalized = currentAngleRef.current % (Math.PI * 2);
      let diff = baseAngle - currentNormalized;

      // Adjust for circular transition (e.g., from last to first)
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;

      targetAngle = currentAngleRef.current + diff;
    }

    // Smooth interpolation
    const lerpFactor = isDragging ? 0.15 : 0.08;
    currentAngleRef.current += (targetAngle - currentAngleRef.current) * lerpFactor;

    const targetX = Math.sin(currentAngleRef.current) * radius;
    const targetZ = Math.cos(currentAngleRef.current) * radius;

    camera.position.x = targetX;
    camera.position.z = targetZ;
    camera.position.y = 1.2;
    camera.lookAt(0, 0.3, 0);

    // Update camera angle for sky (normalize to -π to π)
    let normalizedAngle = currentAngleRef.current % (Math.PI * 2);
    if (normalizedAngle > Math.PI) normalizedAngle -= Math.PI * 2;
    if (normalizedAngle < -Math.PI) normalizedAngle += Math.PI * 2;
    setCameraAngle(normalizedAngle);

    // Day/night lighting transition
    // At angle ±π (sun) = day, at 0 (moon) = night
    const dayAmount = Math.abs(normalizedAngle) / Math.PI; // 0 at moon, 1 at sun
    const smoothDay = dayAmount * dayAmount * (3 - 2 * dayAmount); // smoothstep: 0 at moon, 1 at sun
    onDayAmountChange(smoothDay);

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.2 + smoothDay * 0.5;
    }
    if (dirLight1Ref.current) {
      dirLight1Ref.current.intensity = 0.3 + smoothDay * 0.9;
    }
    if (dirLight2Ref.current) {
      dirLight2Ref.current.intensity = 0.1 + smoothDay * 0.3;
    }

    prevIndexRef.current = activeIndex;
  });

  return (
    <>
      <HokusaiSky skyColor={bgColor} cloudColor="#fffef7" cameraAngle={cameraAngle} />
      <Water depthColor={depthColor} surfaceColor={surfaceColor} />
      <MtFuji />

      {cards.map((card, index) => (
        <ContentCard
          key={index}
          position={cardPositions[index].position}
          rotation={cardPositions[index].rotation}
          isActive={index === activeIndex}
          onCardClick={() => onCardClick(index)}
        >
          {card.content}
        </ContentCard>
      ))}

      <ambientLight ref={ambientRef} intensity={0.7} />
      <directionalLight ref={dirLight1Ref} position={[5, 5, 5]} intensity={1.2} />
      <directionalLight ref={dirLight2Ref} position={[-3, 3, -3]} intensity={0.4} />
    </>
  );
}

interface RagingSeaProps {
  cards: CardData[];
  depthColor?: string;
  surfaceColor?: string;
  bgColor?: string;
}

export default function RagingSea({
  cards,
  depthColor = "#1a3a5c",
  surfaceColor = "#4a7c9b",
  bgColor = "#f7edd8",
}: RagingSeaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [dayAmount, setDayAmount] = useState(1); // 0 = night, 1 = day
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const isScrolling = useRef(false);

  const handleCardClick = (index: number) => {
    setExpandedCardIndex(index);
  };

  const handleCloseExpanded = () => {
    setExpandedCardIndex(null);
  };

  // Scroll to move one slide at a time (circular)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't handle scroll when card is expanded
      if (expandedCardIndex !== null) return;

      e.preventDefault();

      // Ignore tiny scroll events (trackpad sensitivity)
      if (Math.abs(e.deltaY) < 10) return;

      // Debounce - only allow one scroll action at a time
      if (isScrolling.current) return;
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      setActiveIndex((prev) => {
        const next = prev + direction;
        // Circular navigation
        if (next < 0) return cards.length - 1;
        if (next >= cards.length) return 0;
        return next;
      });

      // Reset debounce after animation (longer to prevent multiple triggers)
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [cards.length, expandedCardIndex]);

  // Mouse drag to rotate freely
  useEffect(() => {
    const anglePerCard = (Math.PI * 2) / cards.length;
    const snapThreshold = anglePerCard * 0.3; // 30% of card angle to trigger snap

    const handleMouseDown = (e: MouseEvent) => {
      // Don't handle drag when card is expanded
      if (expandedCardIndex !== null) return;
      setIsDragging(true);
      dragStartX.current = e.clientX;
      setDragOffset(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      setDragOffset(-deltaX * 0.001); // Inverted and reduced sensitivity
    };

    const handleMouseUp = () => {
      if (isDragging) {
        // Check if dragged past threshold to snap to next/prev card
        if (Math.abs(dragOffset) > snapThreshold) {
          const direction = dragOffset > 0 ? 1 : -1;
          setActiveIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return cards.length - 1;
            if (next >= cards.length) return 0;
            return next;
          });
        }
        setIsDragging(false);
        setDragOffset(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, cards.length, expandedCardIndex]);

  // Touch drag support
  useEffect(() => {
    const anglePerCard = (Math.PI * 2) / cards.length;
    const snapThreshold = anglePerCard * 0.3;
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalDrag = false;
    let hasScrolled = false;
    let currentDragOffset = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Don't handle touch when card is expanded
      if (expandedCardIndex !== null) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isHorizontalDrag = false;
      hasScrolled = false;
      currentDragOffset = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Don't handle touch when card is expanded
      if (expandedCardIndex !== null) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - touchStartX;
      const deltaY = touchY - touchStartY;

      // Determine if horizontal or vertical swipe
      if (!isHorizontalDrag && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isHorizontalDrag = true;
        setIsDragging(true);
      }

      if (isHorizontalDrag) {
        e.preventDefault();
        currentDragOffset = -deltaX * 0.001;
        setDragOffset(currentDragOffset);
      } else if (Math.abs(deltaY) > 50 && !hasScrolled) {
        // Vertical swipe - move one slide (with threshold)
        e.preventDefault();
        hasScrolled = true;
        const direction = deltaY > 0 ? -1 : 1;
        setActiveIndex((prev) => {
          const next = prev + direction;
          if (next < 0) return cards.length - 1;
          if (next >= cards.length) return 0;
          return next;
        });
      }
    };

    const handleTouchEnd = () => {
      // Don't handle touch when card is expanded
      if (expandedCardIndex !== null) return;

      if (isHorizontalDrag) {
        // Check if dragged past threshold to snap to next/prev card
        if (Math.abs(currentDragOffset) > snapThreshold) {
          const direction = currentDragOffset > 0 ? 1 : -1;
          setActiveIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return cards.length - 1;
            if (next >= cards.length) return 0;
            return next;
          });
        }
        setIsDragging(false);
        setDragOffset(0);
      }
      isHorizontalDrag = false;
      hasScrolled = false;
      currentDragOffset = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: false });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isDragging, expandedCardIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ cursor: isDragging ? "grabbing" : "grab", backgroundColor: bgColor }}
    >
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-end md:justify-between items-start px-6 py-4">
        <a
          href="/"
          className="bg-white hover:bg-gray-50 transition-colors hidden md:block"
          style={{
            padding: "4px",
            border: "2px solid #1a1a1a",
          }}
        >
          <span
            style={{
              display: "block",
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.15em",
              padding: "10px 6px",
              border: "2px solid #1a1a1a",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#1a1a1a",
            }}
          >
            コーン
          </span>
        </a>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 pt-2">
          <a
            href="/"
            className="text-sm font-semibold transition-colors"
            style={{ color: dayAmount > 0.5 ? "rgb(30, 41, 59)" : "rgba(255, 255, 255, 1)" }}
          >
            Home
          </a>
          <a
            href="/projects"
            className="text-sm transition-colors"
            style={{ color: dayAmount > 0.5 ? "rgba(51, 65, 85, 0.7)" : "rgba(255, 255, 255, 0.8)" }}
          >
            Projects
          </a>
          <a
            href="/blogs"
            className="text-sm transition-colors"
            style={{ color: dayAmount > 0.5 ? "rgba(51, 65, 85, 0.7)" : "rgba(255, 255, 255, 0.8)" }}
          >
            Blogs
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: dayAmount > 0.5 ? "rgb(30, 41, 59)" : "rgba(255, 255, 255, 0.9)" }}
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="fixed top-14 right-4 z-50 md:hidden rounded-lg shadow-lg"
          style={{ backgroundColor: dayAmount > 0.5 ? "white" : "rgb(31, 41, 55)" }}
        >
          <nav className="flex flex-col py-2">
            <a
              href="/"
              className="px-6 py-3 text-sm font-semibold transition-colors"
              style={{
                color: dayAmount > 0.5 ? "rgb(30, 41, 59)" : "rgba(255, 255, 255, 1)",
                backgroundColor: dayAmount > 0.5 ? "rgb(243, 244, 246)" : "rgb(55, 65, 81)"
              }}
            >
              Home
            </a>
            <a
              href="/projects"
              className="px-6 py-3 text-sm transition-colors"
              style={{ color: dayAmount > 0.5 ? "rgba(51, 65, 85, 0.9)" : "rgba(255, 255, 255, 0.8)" }}
            >
              Projects
            </a>
            <a
              href="/blogs"
              className="px-6 py-3 text-sm transition-colors"
              style={{ color: dayAmount > 0.5 ? "rgba(51, 65, 85, 0.9)" : "rgba(255, 255, 255, 0.8)" }}
            >
              Blogs
            </a>
          </nav>
        </div>
      )}

      {/* Overlay to close menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Canvas
        camera={{ position: [0, 1.2, 3.5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
      >
        <Scene
          cards={cards}
          depthColor={depthColor}
          surfaceColor={surfaceColor}
          bgColor={bgColor}
          activeIndex={activeIndex}
          dragOffset={dragOffset}
          isDragging={isDragging}
          onCardClick={handleCardClick}
          onDayAmountChange={setDayAmount}
        />
      </Canvas>

      {/* Expanded Card Modal */}
      {expandedCardIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={handleCloseExpanded}
        >
          {/* SVG Filter for liquid glass distortion */}
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="liquid-glass-modal" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.012"
                  numOctaves={3}
                  seed={42}
                  result="noise"
                />
                <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="blurred"
                  scale={50}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          <div
            className="relative w-[90%] max-w-2xl rounded-[28px] overflow-hidden"
            style={{ height: "85vh", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blur layer */}
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
              }}
            />

            {/* Distortion layer */}
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                filter: "url(#liquid-glass-modal)",
              }}
            />

            {/* Tint + inner shadow layer */}
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{
                backgroundColor: "rgba(20, 40, 70, 0.5)",
                boxShadow: "inset 0 0 30px -5px rgba(255, 255, 255, 0.5)",
              }}
            />

            {/* Close button */}
            <button
              onClick={handleCloseExpanded}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white text-2xl font-light cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            {/* Content */}
            <div className="relative z-10 h-full overflow-y-auto p-8 pt-16">
              {cards[expandedCardIndex].expandedContent || cards[expandedCardIndex].content}
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-white scale-125"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
        <p className="text-white/70 text-sm text-center">Drag to look around | Scroll to navigate</p>
      </div>
    </div>
  );
}

export type { CardData };
