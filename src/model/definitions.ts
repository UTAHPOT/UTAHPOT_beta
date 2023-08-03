import { mat4, vec3 } from 'gl-matrix';

export enum object_types {
  TRIANGLE,
  QUAD,
}

export interface RenderData {
  view_transform: mat4;
  model_transforms: Float32Array;
  light_position: vec3;
  object_counts: { [obj in object_types]: number };
}
