import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AnimationMixer } from 'three';

@Component({
  selector: 'app-fruitshop-list',
  imports: [],
  templateUrl: './fruitshop-list.component.html',
  styleUrl: './fruitshop-list.component.scss'
})
export class FruitshopListComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  mixer!: THREE.AnimationMixer;
  clock = new THREE.Clock();
  animationId: number = 0;

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  initThreeJS(): void {
    // SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfd1e5);
    this.scene.fog = new THREE.Fog(0xbfd1e5, 10, 50);

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 5);

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // GROUND with TEXTURE
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load('');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);

    const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // CUBO con TEXTURA
    const cubeTexture = textureLoader.load('./img/Cube.jpg'); // Cargar textura para el cubo
    const cubeMaterial = new THREE.MeshStandardMaterial({ map: cubeTexture });
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
    cube.position.set(-2, 0.5, 0);
    cube.castShadow = true;
    this.scene.add(cube);

    // ESFERA con TEXTURA
    const sphereTexture = textureLoader.load('./img/Sphere.jpg'); // Cargar textura para la esfera
    const sphereMaterial = new THREE.MeshStandardMaterial({ map: sphereTexture });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5), sphereMaterial);
    sphere.position.set(2, 0.5, 0);
    sphere.castShadow = true;
    this.scene.add(sphere);

    // Keyboard interaction
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'l') {
        directionalLight.intensity = directionalLight.intensity === 0 ? 1 : 0;
      }

      //Cube Movement
      if (e.key === 'ArrowRight') {
        cube.position.x += 0.5;
      }
      if (e.key === 'ArrowLeft') {
        cube.position.x -= 0.5;
      }
      if(e.key === 'ArrowUp'){
        cube.position.y += 0.5;
      }
      if(e.key === 'ArrowDown'){
        cube.position.y -= 0.5;
      }

      //Sphere Movement
      if (e.key === 'd') {
        sphere.position.x += 0.5;
      }
      if (e.key === 'a') {
        sphere.position.x -= 0.5;
      }
      if(e.key === 'w'){
        sphere.position.y += 0.5;
      }
      if(e.key === 's'){
        sphere.position.y -= 0.5;
      }

      if (e.key === 'e') {
        sphere.rotation.y += 0.1;
      }
      if (e.key === 'c') {
        cube.rotation.y += 0.1;
      }
    });

    // Responsive
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    if (this.mixer) this.mixer.update(delta);
    this.renderer.render(this.scene, this.camera);
  };
}
