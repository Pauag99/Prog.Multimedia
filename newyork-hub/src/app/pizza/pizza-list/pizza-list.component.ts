import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimationMixer } from 'three';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  mixer!: THREE.AnimationMixer;
  clock = new THREE.Clock();
  animationId: number = 0;
  pizzaModel: THREE.Object3D | null = null; // Variable para el modelo de pizza
  isPizzaFlipped: boolean = false; // Estado para saber si la pizza está volteada

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

    // Obtener el tamaño del contenedor
    const container = this.canvasContainer.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Establecer tamaño del renderer según el contenedor
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

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

    // LOAD 3D MODEL (Pizza)
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./3D/pizza (1).glb', (gltf) => {
      this.pizzaModel = gltf.scene;
      this.pizzaModel.scale.set(2, 2, 2);
      this.pizzaModel.position.set(0, 0.1, 0);
      this.pizzaModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
        }
      });
      this.scene.add(this.pizzaModel);

      // Animation
      if (gltf.animations.length > 0) {
        this.mixer = new AnimationMixer(this.pizzaModel);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      }
    });

    // Keyboard interaction
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.pizzaModel) return; // Verifica si el modelo está cargado
      
      if (e.key === 'l') {
        directionalLight.intensity = directionalLight.intensity === 0 ? 1 : 0;
      }
      // Rotación de la pizza
      if (e.key === 'ArrowRight') {
        this.pizzaModel.rotation.y -= 0.1; // Rota a la derecha
      }
      if (e.key === 'ArrowLeft') {
        this.pizzaModel.rotation.y += 0.1; // Rota a la izquierda
      }

      // Ver la parte de abajo con la tecla "R" (y restaurar al estado original)
      if (e.key === 'r') {
        if (this.isPizzaFlipped) {
          // Si está volteada, la restauramos a su rotación original
          this.pizzaModel.rotation.x = 0; // Vuelve a su posición inicial
          this.isPizzaFlipped = false; // Actualizamos el estado
        } else {
          // Si no está volteada, la rotamos 180 grados para ver la parte de abajo
          this.pizzaModel.rotation.x = Math.PI; // Rota 180 grados sobre el eje X
          this.isPizzaFlipped = true; // Actualizamos el estado
        }
      }
    });

    // Responsive: actualizar el tamaño cuando cambie la ventana
    window.addEventListener('resize', () => {
      const container = this.canvasContainer.nativeElement;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    if (this.mixer) this.mixer.update(delta);
    this.renderer.render(this.scene, this.camera);
  };
}
 