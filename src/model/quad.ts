import { vec3, mat4 } from 'gl-matrix';
import { Deg2Rad } from './math';

export class Quad {
  position: vec3;
  model: mat4;
  eulers: vec3;

  constructor(position: vec3) {
    this.position = position;
    this.model = mat4.create();
    this.eulers = vec3.create();
  }

  update() {
    this.model = mat4.create();
    mat4.translate(this.model, this.model, this.position);
  }

  get_model(): mat4 {
    return this.model;
  }

  set_position(position: vec3) {
    this.position = position;
  }

  get_position(): vec3 {
    return this.position;
  }

  set_eulers(eulers: vec3) {
    this.eulers = eulers;
  }

  get_eulers(): vec3 {
    return this.eulers;
  }

  rotateX(deg: number) {
    this.eulers[0] += deg;
    this.eulers[0] %= 360;
    this.model = mat4.create();
    mat4.translate(this.model, this.model, this.position);
    mat4.rotateZ(this.model, this.model, Deg2Rad(this.eulers[0])); 
  }

  rotateY(deg: number) {
    this.eulers[1] += deg;
    this.eulers[1] %= 360;
    this.model = mat4.create();
    mat4.translate(this.model, this.model, this.position);
    mat4.rotateZ(this.model, this.model, Deg2Rad(this.eulers[1])); 
  }

  rotateZ(deg: number) {
    this.eulers[2] += deg;
    this.eulers[2] %= 360;
    this.model = mat4.create();
    mat4.translate(this.model, this.model, this.position);
    mat4.rotateZ(this.model, this.model, Deg2Rad(this.eulers[2])); 
  }
}
