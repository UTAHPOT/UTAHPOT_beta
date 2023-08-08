# UtahPot
#### BETA. Use at your own risk
#### Library and documentation are under active development
#### You can find developers, join team, leave issues or suggestions on [GitHub](https://github.com/UTAHPOT/UTAHPOT_beta) or [Reddit](https://www.reddit.com/r/Utahpot/)

This repository contains UtahPot library, which
help when using WebGPU (WGPU) in your projects.

> To install:  
> npm i utahpot

##### Here is the [example](https://github.com/Saerafi/UtahPot_landing) of using this library on our landing page.

##### Here is the documentation for [WebGPU](https://www.w3.org/TR/webgpu/)

We reccomend to use this architecture:  

![Architecture](https://user-images.githubusercontent.com/88333424/258939046-c3215ed6-13c8-4a29-9598-07ab752b6784.jpg)

#### Documentation:

##### ♦ Camera

* position: vec3 -> position of this camera in the scene  
* eulers: vec3 -> euler angles / tilt of this camera  
* view: mat4 -> visible part of the scene for this camera in frame  
* forwards, right, up: vec3 -> camera movement information

> constuctor(position: vec3, thetha: number, phi: number)

Creates a new camera at the "position" with "eulers" of "thetha" and "phi"

> update()

Updates all info about camera for new frame

> get_view()

Returns "view"

> get_position() / set_position(position: vec3)

Returns or sets "position"

> get_eulers() / set_eulers(eulers: vec3)

Returns or sets "eulers"

> spin_camera(dX: number, dY: number)

Tilts the camera along X and Y axes for "dX" and "dY" degrees

> move_camera(forwards_amount: number, right_amount: number, up_amount: number)

Moves camera for "forwards_amound", "right_amount", "up_amount"

##### ♦ Light

* position: vec3 -> position of this light in the scene  
* eulers: vec3 -> euler angles / tilt of this light   
* forwards, right, up: vec3 -> light movement information

> constuctor(position: vec3)

Creates a new light at the "position"

> update()

Updates all info about light for new frame  

> get_position() / set_position(position: vec3)

Returns or sets "position"

> get_eulers() / set_eulers(eulers: vec3)

Returns or sets "eulers"

> move_camera(forwards_amount: number, right_amount: number, up_amount: number)

Moves light for "forwards_amound", "right_amount", "up_amount"  

##### ♦ Triangle / Quad / Subject

* position: vec3 -> position of this object in the scene  
* eulers: vec3 -> euler angles / tilt of this object   
* model: mat4 -> object model information

> constuctor(position: vec3)

Creates a new object at the "position"

> update()

Updates all info about object for new frame

> get_model()

Returns "model"

> get_position() / set_position(position: vec3)

Returns or sets "position"

> get_eulers() / set_eulers(eulers: vec3)

Returns or sets "eulers"

> rotateX(deg: number) / rotateY(deg: number) / rotateZ(deg: number)

Rotates the object for "deg" degrees 

##### ♦ Material  

* texture?: GPUTexture   
* view?: GPUTextureView  
* sampler?: GPUSampler
* bindGroup?: GPUBindGroup

> initialize(device: GPUDevice, url: string, bindGroupLayout)

Initializing a new Material(texture) from "url" for the "device" with "bindGroupLayout"

##### ♦ Triangle_mesh / Quad_mesh

* buffer: GPUBuffer
* bufferLayout: GPUVertexBufferLayout

> constructor(device: GPUDevice)

Creates a new mesh for the "device"

##### ♦ Obj_mesh

* buffer?: GPUBuffer
* bufferLayout: GPUVertexBufferLayout
* v: vec3[] -> vertexes 
* vt: vec2[] -> uv coords
* vn: vec3[] -> normals
* vertices?: Float32Array -> all faces data in a row
* vertexCount?: number -> number of vertices

> constructor()

Creates an empty obj file mesh

> initialize(device: GPUDevice, url: string)

Initializing a new .obj file mesh from "url" for the "device" ready for rendering
