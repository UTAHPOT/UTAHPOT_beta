import { vec3, mat4 } from 'gl-matrix';
import { Deg2Rad } from './math';

export class Camera {
  position: vec3;
  eulers: vec3;
  view: mat4;
  forwards: vec3;
  right: vec3;
  up: vec3;

  constructor(position: vec3, theta: number, phi: number) {
    this.position = position;
    this.eulers = vec3.create();
    this.view = mat4.create();
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

    const target: vec3 = vec3.create();
    vec3.add(target, this.position, this.forwards);

    this.view = mat4.create();
    mat4.lookAt(this.view, this.position, target, this.up);
  }

  get_view(): mat4 {
    return this.view;
  }

  set_position(position: vec3) {
    this.position = position;
    this.update();
  }

  get_position(): vec3 {
    return this.position;
  }

  set_eulers(eulers: vec3) {
    this.eulers = eulers;
    this.update();
  }

  get_eulers(): vec3 {
    return this.eulers;
  }

  spin_camera(dX: number, dY: number) {
    this.eulers[2] -= dX;
    this.eulers[2] %= 360;

    this.eulers[1] = Math.min(
      89, Math.max(
        -89, this.eulers[1] - dY
      )
    );
  }

  move_camera(forwards_amount: number, right_amount: number, up_amount: number) {
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
