"use client";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { Vector2, PlaneGeometry, MeshBasicMaterial } from "three";

// Custom Shader interface
interface CustomShader {
  uniforms: { [uniform: string]: { value: any } };
  vertexShader: string;
  fragmentShader: string;
}

// CurvedPlaneGeometry
export class CurvedPlaneGeometry extends PlaneGeometry {
  constructor(
    radius: number,
    width: number = 1,
    height: number = 1,
    widthSegments: number = 20,
    heightSegments: number = 20
  ) {
    super(width, height, widthSegments, heightSegments);

    const hw = width * 0.5;
    const a = new Vector2(-hw, 0);
    const b = new Vector2(0, radius);
    const c = new Vector2(hw, 0);

    const ab = new Vector2().subVectors(a, b);
    const bc = new Vector2().subVectors(b, c);
    const ac = new Vector2().subVectors(a, c);

    const r =
      (ab.length() * bc.length() * ac.length()) /
      (2 * Math.abs(ab.cross(ac)));

    const center = new Vector2(0, radius - r);
    const baseV = new Vector2().subVectors(a, center);
    const baseAngle = baseV.angle() - Math.PI * 0.5;
    const arc = baseAngle * 2;

    const uv = this.attributes.uv;
    const pos = this.attributes.position;
    const mainV = new Vector2();

    for (let i = 0; i < uv.count; i++) {
      const uvRatio = 1 - uv.getX(i);
      const y = pos.getY(i);
      mainV.copy(c).rotateAround(center, arc * uvRatio);
      pos.setXYZ(i, mainV.x, y, -mainV.y);
    }

    pos.needsUpdate = true;
  }
}

// SineWaveMaterial
export class SineWaveMaterial extends MeshBasicMaterial {
  time: { value: number };

  constructor(parameters: THREE.MeshBasicMaterialParameters = {}) {
    super(parameters);
    this.time = { value: 0 };
  }

  onBeforeCompile(shader: CustomShader) {
    shader.uniforms.time = this.time;

    shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `vec3 transformed = vec3(
        position.x,
        position.y + sin(time + uv.x * 3.141592653589793 * 4.0) / 4.0,
        position.z
      );`
    );
  }
}

// Register custom classes with R3F
extend({ CurvedPlaneGeometry, SineWaveMaterial });

// 🔹 Correct type augmentation for R3F v9
declare module "@react-three/fiber" {
  interface ThreeElements {
    curvedPlaneGeometry: {
      args?: [
        radius: number,
        width?: number,
        height?: number,
        widthSegments?: number,
        heightSegments?: number
      ];
    };
    sineWaveMaterial: {
      time?: { value: number };
    };
  }
}
