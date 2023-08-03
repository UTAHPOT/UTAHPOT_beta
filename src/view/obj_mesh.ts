import { vec2, vec3 } from 'gl-matrix';

export class ObjMesh {
  buffer?: GPUBuffer;
  bufferLayout?: GPUVertexBufferLayout;
  v: vec3[];
  vt: vec2[];
  vn: vec3[];
  vertices?: Float32Array;
  vertexCount?: number;

  constructor() {
    this.v = [];
    this.vt = [];
    this.vn = [];
  }

  async initialize(device: GPUDevice, url: string) {
    await this.readFile(url);

    if (typeof this.vertices === 'undefined') {
      throw new Error('Vertices are not initialized.');
    }

    this.vertexCount = this.vertices.length / 8;

    const usage: GPUBufferUsageFlags =
      GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
    //VERTEX: the buffer can be used as a vertex buffer
    //COPY_DST: data can be copied to the buffer

    const descriptor: GPUBufferDescriptor = {
      size: this.vertices.byteLength,
      usage: usage,
      mappedAtCreation: true, // similar to HOST_VISIBLE, allows buffer to be written by the CPU
    };

    this.buffer = device.createBuffer(descriptor);

    //Buffer has been created, now load in the vertices
    new Float32Array(this.buffer.getMappedRange()).set(this.vertices);
    this.buffer.unmap();

    //now define the buffer layout
    this.bufferLayout = {
      arrayStride: 32,
      attributes: [
        {
          shaderLocation: 0,
          format: 'float32x3',
          offset: 0,
        },
        {
          shaderLocation: 1,
          format: 'float32x2',
          offset: 12,
        },
        {
          shaderLocation: 2,
          format: 'float32x3',
          offset: 20,
        },
      ],
    };
  }

  async readFile(url: string) {
    const result: number[] = [];

    const response: Response = await fetch(url);
    const blob: Blob = await response.blob();
    const file_contents = await blob.text();
    const lines = file_contents.split('\n');

    lines.forEach((line) => {
      //console.log(line);
      if (line[0] == 'v' && line[1] == ' ') {
        this.read_vertex_data(line);
      } else if (line[0] == 'v' && line[1] == 't') {
        this.read_texcoord_data(line);
      } else if (line[0] == 'v' && line[1] == 'n') {
        this.read_normal_data(line);
      } else if (line[0] == 'f') {
        this.read_face_data(line, result);
      }
    });

    this.vertices = new Float32Array(result);
  }

  read_vertex_data(line: string) {
    const components = line.split(' ');
    // ["v", "x", "y", "z"]
    const new_vertex: vec3 = [
      Number(components[1]).valueOf(),
      Number(components[2]).valueOf(),
      Number(components[3]).valueOf(),
    ];

    this.v.push(new_vertex);
  }

  read_texcoord_data(line: string) {
    const components = line.split(' ');
    // ["vt", "u", "v"]
    const new_texcoord: vec2 = [
      Number(components[1]).valueOf(),
      Number(components[2]).valueOf(),
    ];

    this.vt.push(new_texcoord);
  }

  read_normal_data(line: string) {
    const components = line.split(' ');
    // ["vn", "nx", "ny", "nz"]
    const new_normal: vec3 = [
      Number(components[1]).valueOf(),
      Number(components[2]).valueOf(),
      Number(components[3]).valueOf(),
    ];

    this.vn.push(new_normal);
  }

  read_face_data(line: string, result: number[]) {
    line = line.replace('\n', '');
    const vertex_descriptions = line.split(' ');
    // ["f", "v1", "v2", ...]
    /*
            triangle fan
            v1 v2 v3 v4 => (v1, v2, v3), (v1, v3, v4)
        */

    const triangle_count = vertex_descriptions.length - 3;
    for (let i = 0; i < triangle_count; i++) {
      this.read_corner(vertex_descriptions[1], result);
      this.read_corner(vertex_descriptions[2 + i], result);
      this.read_corner(vertex_descriptions[3 + i], result);
    }
  }

  read_corner(vertex_description: string, result: number[]) {
    const v_vt_vn = vertex_description.split('/');
    const v = this.v[Number(v_vt_vn[0]).valueOf() - 1];
    const vt = this.vt[Number(v_vt_vn[1]).valueOf() - 1];
    const vn = this.vn[Number(v_vt_vn[2]).valueOf() - 1];

    result.push(v[0]);
    result.push(v[1]);
    result.push(v[2]);
    result.push(vt[0]);
    result.push(vt[1]);
    result.push(vn[0]);
    result.push(vn[1]);
    result.push(vn[2]);
  }
}
