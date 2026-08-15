"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_motion;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float rainLayer(vec2 uv, float density, float speed, float seed) {
    vec2 grid = uv * vec2(density, density * 0.48);
    grid.x += grid.y * 0.18;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;
    float random = hash21(cell + seed);
    float fall = fract(local.y + 0.5 + u_time * speed * u_motion + random);
    float horizontal = abs(local.x + (random - 0.5) * 0.72);
    float line = smoothstep(0.036, 0.0, horizontal);
    float head = smoothstep(0.22, 0.0, abs(fall - 0.14));
    float tail = smoothstep(0.94, 0.18, fall);
    return line * head * tail * step(0.37, random);
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    uv.x *= aspect;

    float rain = rainLayer(uv, 25.0, 0.31, 1.0);
    rain += rainLayer(uv + vec2(0.17, 0.08), 39.0, 0.43, 8.0) * 0.58;
    rain += rainLayer(uv + vec2(0.38, 0.22), 61.0, 0.57, 19.0) * 0.25;

    float horizon = smoothstep(0.02, 0.7, v_uv.y) * (1.0 - smoothstep(0.8, 1.0, v_uv.y));
    float pulse = 0.5 + 0.5 * sin(u_time * 0.12);
    vec3 cold = vec3(0.35, 0.83, 0.89);
    vec3 warm = vec3(0.88, 0.25, 0.16);
    vec3 color = mix(warm, cold, smoothstep(0.18, 0.82, v_uv.x));
    float alpha = rain * 0.24 + horizon * pulse * 0.012;

    gl_FragColor = vec4(color * (0.58 + rain), alpha);
  }
`;

type LeftRightAtmosphereProps = {
  active: boolean;
};

export function LeftRightAtmosphere({ active }: LeftRightAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      premultipliedAlpha: true,
    });
    if (!context) {
      canvas.dataset.supported = "false";
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = context.createShader(type);
      if (!shader) throw new Error("Unable to create WebGL shader.");
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        const message = context.getShaderInfoLog(shader) ?? "Unknown WebGL shader error.";
        context.deleteShader(shader);
        throw new Error(message);
      }
      return shader;
    };

    let animationFrame = 0;
    let program: WebGLProgram | null = null;

    try {
      const vertex = createShader(context.VERTEX_SHADER, vertexShader);
      const fragment = createShader(context.FRAGMENT_SHADER, fragmentShader);
      program = context.createProgram();
      if (!program) throw new Error("Unable to create WebGL program.");
      context.attachShader(program, vertex);
      context.attachShader(program, fragment);
      context.linkProgram(program);
      context.deleteShader(vertex);
      context.deleteShader(fragment);
      if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        throw new Error(context.getProgramInfoLog(program) ?? "Unable to link WebGL program.");
      }
    } catch {
      canvas.dataset.supported = "false";
      return;
    }

    canvas.dataset.supported = "true";
    context.useProgram(program);
    const position = context.getAttribLocation(program, "a_position");
    const resolution = context.getUniformLocation(program, "u_resolution");
    const time = context.getUniformLocation(program, "u_time");
    const motion = context.getUniformLocation(program, "u_motion");
    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      context.STATIC_DRAW,
    );
    context.enableVertexAttribArray(position);
    context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.viewport(0, 0, width, height);
    };

    const startedAt = performance.now();
    const render = (now: number) => {
      resize();
      context.clearColor(0, 0, 0, 0);
      context.clear(context.COLOR_BUFFER_BIT);
      context.uniform2f(resolution, canvas.width, canvas.height);
      context.uniform1f(time, (now - startedAt) / 1000);
      context.uniform1f(motion, active ? 1 : 0);
      context.drawArrays(context.TRIANGLES, 0, 6);
      if (active && !document.hidden) animationFrame = window.requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      window.cancelAnimationFrame(animationFrame);
      if (!document.hidden) animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
      if (buffer) context.deleteBuffer(buffer);
      if (program) context.deleteProgram(program);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="left-right-rain" aria-hidden="true" />;
}
