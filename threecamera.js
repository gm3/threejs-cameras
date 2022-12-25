// Three.js - Responsive
// from https://r105.threejsfundamentals.org/threejs/threejs-render-target.html

  'use strict';

/* global THREE */

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const rtWidth = 1920;
  const rtHeight = 1080;
  const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);

  const rtFov = 75;
  const rtAspect = rtWidth / rtHeight;
  const rtNear = 0.1;
  const rtFar = 5;
  var rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
  rtCamera.position.z = 2;

  const rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color('red');

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    rtScene.add(light);
  }



  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  
  // define cameras and positions
  
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set( 0, 0, 2 );
  const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera2.position.set( 0, 0, 2.5 );
  const camera3 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera3.position.set( 0, 0, 3 );
  const camera4 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera4.position.set( -1, 0, 1 );
  const camera5 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera5.position.set( -1, 0, 2 );
  const camera6 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera6.position.set( -1, 0, 3 );
  const camera7 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera7.position.set( 1, 0, 1 );
  const camera8 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera8.position.set( 1, 0, 2 );
  const camera9 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera9.position.set( 1, 0, 3 );
  
 
  // create variable for current camera
  var currentCamera = camera;

  const scene = new THREE.Scene();
  
  
  // listen for keyboard input to change cameras
   window.addEventListener('keydown', function(event) {
  if (event.key === '1') {
  	console.log("You changed to Camera " + event.key);
    currentCamera = camera;
    rtCamera = currentCamera;
  } else if (event.key === '2') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera2;
    rtCamera = currentCamera;
  }else if (event.key === '3') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera3;
    rtCamera = currentCamera;
  }else if (event.key === '4') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera4;
    rtCamera = currentCamera;
  }else if (event.key === '5') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera5;
    rtCamera = currentCamera;
  }else if (event.key === '6') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera6;
    rtCamera = currentCamera;
  }else if (event.key === '7') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera7;
    rtCamera = currentCamera;
  }else if (event.key === '8') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera8;
    rtCamera = currentCamera;
  }else if (event.key === '9') {
  console.log("You changed to Camera " + event.key);
    currentCamera = camera9;
    rtCamera = currentCamera;
  }
  
});

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

// ad boxes
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);
    rtScene.add(cube);

    cube.position.x = x;

    return cube;
  }
  
 
  const rtCubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];


// map the render texture to the material
  const material = new THREE.MeshPhongMaterial({
    map: renderTarget.texture,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  // create monitor plane
  const monitorGeometry = new THREE.PlaneGeometry(5, 3);
  const monitorOutput = new THREE.Mesh(monitorGeometry, material);
  scene.add(monitorOutput);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  
  // render

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // rotate all the cubes in the render target scene
    rtCubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    // draw render target scene to render target
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    // rotate the cube in the scene
    cube.rotation.x = time;
    cube.rotation.y = time * 1.1;

    // render the scene to the canvas
    renderer.render(scene, currentCamera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}




main();
