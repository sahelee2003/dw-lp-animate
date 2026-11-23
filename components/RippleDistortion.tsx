"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface RippleDistortionProps {
  src: string;
  alt: string;
  className?: string;
  circleRadius?: number; // Normalized radius (e.g. 0.22)
  strength?: number; // Ripple displacement strength (e.g. 0.035)
  frequency?: number; // Ripple wave frequency (e.g. 40.0)
  speed?: number; // Ripple wave speed (e.g. 4.5)
  dispersion?: number; // Chromatic aberration (e.g. 0.06)
  onHoverStateChange?: (isHovered: boolean, mouseX: number, mouseY: number) => void;
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  v_uv.y = 1.0 - v_uv.y; // Invert Y for correct image orientation
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_hover;
uniform float u_radius;
uniform float u_strength;
uniform float u_frequency;
uniform float u_speed;
uniform float u_dispersion;

// Click shockwave uniforms
uniform vec2 u_click_pos;
uniform float u_click_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  // Aspect ratio correction so the ripple boundary is a perfect circle
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
  vec2 c = vec2(u_click_pos.x * aspect, u_click_pos.y);

  float dist = distance(p, m);
  float radius = u_radius;

  vec2 displacement = vec2(0.0);
  float rimHighlight = 0.0;

  // Continuous fluid ripple distortion inside the circle
  if (dist < radius && u_hover > 0.001) {
    float normDist = dist / radius; // 0.0 at center, 1.0 at edge
    
    // Multi-harmonic sinusoidal ripple waves
    float wave1 = sin(dist * u_frequency - u_time * u_speed);
    float wave2 = cos(dist * (u_frequency * 0.6) - u_time * (u_speed * 0.8));
    float combinedWave = (wave1 * 0.65 + wave2 * 0.35);

    // Fade out near the center and near the circular edge for organic liquid feel
    float envelope = sin(normDist * 3.14159265);
    float rippleIntensity = combinedWave * envelope * u_hover * u_strength;

    vec2 dir = (dist > 0.0001) ? normalize(p - m) : vec2(0.0);
    displacement += dir * rippleIntensity;

    // Elegant circular perimeter rim highlight
    float rimDist = abs(dist - radius);
    rimHighlight = smoothstep(0.008, 0.0, rimDist) * u_hover * 0.32;
  }

  // Click shockwave expanding outward from click position
  if (u_click_time > 0.0 && u_click_time < 1.6) {
    float clickDist = distance(p, c);
    float shockRadius = u_click_time * 0.6;
    float shockWidth = 0.09;
    float shockDiff = abs(clickDist - shockRadius);

    if (shockDiff < shockWidth) {
      float shockDecay = exp(-u_click_time * 2.2);
      float shockFactor = (1.0 - shockDiff / shockWidth);
      float shockWave = sin((clickDist - shockRadius) * 45.0) * shockDecay * shockFactor * 0.045;
      vec2 shockDir = (clickDist > 0.0001) ? normalize(p - c) : vec2(0.0);
      displacement += shockDir * shockWave;
    }
  }

  // Chromatic dispersion (RGB refraction separation)
  vec2 uvR = uv + displacement * (1.0 + u_dispersion);
  vec2 uvG = uv + displacement;
  vec2 uvB = uv + displacement * (1.0 - u_dispersion);

  // Clamp UVs to avoid edge bleeding
  uvR = clamp(uvR, 0.001, 0.999);
  uvG = clamp(uvG, 0.001, 0.999);
  uvB = clamp(uvB, 0.001, 0.999);

  float r = texture2D(u_texture, uvR).r;
  float g = texture2D(u_texture, uvG).g;
  float b = texture2D(u_texture, uvB).b;

  // Add specular rim light to circular boundary
  vec3 color = vec3(r, g, b) + vec3(rimHighlight);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function RippleDistortion({
  src,
  alt,
  className = "",
  circleRadius = 0.24,
  strength = 0.038,
  frequency = 42.0,
  speed = 4.8,
  dispersion = 0.065,
  onHoverStateChange,
}: RippleDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Mouse & animation state refs
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const hoverRef = useRef({ current: 0.0, target: 0.0 });
  const clickRef = useRef({ time: 99.0, x: 0.5, y: 0.5 });
  const animFrameRef = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      hoverRef.current.target = 1.0;

      onHoverStateChange?.(true, e.clientX, e.clientY);
    },
    [onHoverStateChange]
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      hoverRef.current.target = 1.0;

      onHoverStateChange?.(true, e.clientX, e.clientY);
    },
    [onHoverStateChange]
  );

  const handlePointerLeave = useCallback(() => {
    hoverRef.current.target = 0.0;
    onHoverStateChange?.(false, 0, 0);
  }, [onHoverStateChange]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      clickRef.current.x = x;
      clickRef.current.y = y;
      clickRef.current.time = 0.0;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        (canvas.getContext("webgl", {
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }) as WebGLRenderingContext | null) ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering [-1, 1]
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uRadius = gl.getUniformLocation(program, "u_radius");
    const uStrength = gl.getUniformLocation(program, "u_strength");
    const uFrequency = gl.getUniformLocation(program, "u_frequency");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uDispersion = gl.getUniformLocation(program, "u_dispersion");
    const uClickPos = gl.getUniformLocation(program, "u_click_pos");
    const uClickTime = gl.getUniformLocation(program, "u_click_time");

    // Load texture
    const texture = gl.createTexture();
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    let textureLoaded = false;
    image.onload = () => {
      if (!gl) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      textureLoaded = true;
      setIsLoaded(true);
    };

    const updateSize = () => {
      if (!canvas || !container || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    let startTime = performance.now();
    let lastTime = startTime;

    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;

      // Smooth lerp for mouse coordinates
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.14;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.14;

      // Smooth lerp for hover transition
      hoverRef.current.current +=
        (hoverRef.current.target - hoverRef.current.current) * 0.08;

      // Update click shockwave time
      if (clickRef.current.time < 2.0) {
        clickRef.current.time += dt;
      }

      if (textureLoaded && gl) {
        gl.uniform1f(uTime, elapsedTime);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uHover, hoverRef.current.current);
        gl.uniform1f(uRadius, circleRadius);
        gl.uniform1f(uStrength, strength);
        gl.uniform1f(uFrequency, frequency);
        gl.uniform1f(uSpeed, speed);
        gl.uniform1f(uDispersion, dispersion);
        gl.uniform2f(uClickPos, clickRef.current.x, clickRef.current.y);
        gl.uniform1f(uClickTime, clickRef.current.time);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(positionBuffer);
        gl.deleteTexture(texture);
      }
    };
  }, [
    src,
    circleRadius,
    strength,
    frequency,
    speed,
    dispersion,
  ]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`relative h-full w-full select-none overflow-hidden ${className}`}
    >
      {/* Fallback & Initial Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        priority
        className={`object-cover transition-opacity duration-500 ${
          isLoaded && webglSupported ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Interactive WebGL Ripple Distortion Canvas */}
      {webglSupported && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full pointer-events-none"
        />
      )}
    </div>
  );
}
