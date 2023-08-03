import { vec3, mat4 } from 'gl-matrix';
import { Deg2Rad } from './math';

export class Light {
  position: vec3;
  eulers: vec3;
  forwards: vec3;
  right: vec3;
  up: vec3;

  constructor(position: vec3) {
    this.position = position;
    this.eulers = vec3.create();
    this.forwards = vec3.create();
    this.right = vec3.create();
    this.up = vec3.create();
  }

  update() {
    this.forwards = [
      Math.cos(Deg2Rad(this.eulers[2])) * Math.cos(Deg2Rad(this.eulers[1])),
      Math.sin(Deg2Rad(this.eulers[2])) * Math.cos(Deg2Rad(this.eulers[1])),
      Math.sin(Deg2Rad(this.eulers[1])),
    ];

    vec3.cross(this.right, this.forwards, [0, 0, 1]);

    vec3.cross(this.up, this.right, this.forwards);
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

  move_light(forwards_amount: number, right_amount: number, up_amount: number) {
    vec3.scaleAndAdd(
      this.position, this.position, this.forwards, forwards_amount
    );

    vec3.scaleAndAdd(
      this.position, this.position, this.right, right_amount
    );

    vec3.scaleAndAdd(
      this.position, this.position, this.up, up_amount
    );
  }
}
