import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
  styles: [`
    #canvas-box {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: none;
    }

    @media (width <= 720px) {
      #canvas-box {
        display: none;
      }
    }
  `]
})
export class LogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasBox', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input({ required: true }) screenTexture!: string;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private clock!: THREE.Clock;
  private logoMesh: THREE.Object3D | null = null;
  private logoMesh1: THREE.Object3D | null = null;
  private logoMesh2: THREE.Object3D | null = null;
  private animationId!: number;
  private readonly cameraGroup: THREE.Group;
  private previousTime: number = 0;
  private cursor = { x: 0, y: 0 };

  meshRotation: number = 0;
  scrollY: number = 0;

  constructor() {
    this.cameraGroup = new THREE.Group();
  }

  ngAfterViewInit(): void {
    if (window.innerWidth > 720) {
      this.initThreeJs();
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
  }

  private initThreeJs(): void {
    const canvas = this.canvasRef.nativeElement;

    this.scene = new THREE.Scene();
    this.loadModels();
    this.setupLights();
    this.setupCamera();
    this.setupRenderer(canvas);
    this.setupResizeListener();
    this.setupMouseListener();
    this.clock = new THREE.Clock();
    this.animate();
  }

  private loadModels(): void {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load('/models/logoNew.glb', (gltf) => {
      this.logoMesh = gltf.scene;
      this.logoMesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).castShadow = true;
        }
      });
      this.logoMesh1 = gltf.scene.children[0];
      this.logoMesh2 = gltf.scene.children[1];
      gltf.scene.scale.set(0.3, 0.3, 0.3);
      gltf.scene.position.y = -1.3;
      gltf.scene.position.x = 2;
      gltf.scene.rotation.y = Math.PI * 0.9;
      this.meshRotation = gltf.scene.rotation.y;
      this.scene.add(gltf.scene);
    });

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.2 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.8;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 2, 2);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.near = 0.5;
    pointLight.shadow.camera.far = 500;
    this.scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
    directionalLight.position.set(1, 1, 0);
    this.scene.add(directionalLight);
  }

  private setupCamera(): void {
    const sizes = this.getCanvasSizes();
    this.camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
    this.camera.position.z = 6;
    this.cameraGroup.add(this.camera);
    this.scene.add(this.cameraGroup);
  }

  private setupRenderer(canvas: HTMLCanvasElement): void {
    const sizes = this.getCanvasSizes();
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private setupMouseListener(): void {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
  }

  private onResize(): void {
    const sizes = this.getCanvasSizes();
    if (this.camera) {
      this.camera.aspect = sizes.width / sizes.height;
      this.camera.updateProjectionMatrix();
    }
    if (this.renderer) {
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  private onMouseMove(event: MouseEvent): void {
    this.cursor.x = event.clientX / window.innerWidth - 0.5;
    this.cursor.y = event.clientY / window.innerHeight - 0.5;
  }

  private getCanvasSizes() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousTime;
    this.previousTime = elapsedTime;

    if (this.logoMesh1 && this.logoMesh2 && this.logoMesh) {
      this.logoMesh1.rotation.y = elapsedTime * 0.1;
      this.logoMesh2.rotation.y = elapsedTime * 0.1;
      const oscillation = Math.sin(elapsedTime * 0.5) * 0.4;
      this.logoMesh.rotation.y = this.meshRotation + oscillation;
    }

    if (this.camera) {
      this.camera.position.y = (-this.scrollY / window.innerHeight) * 4;

      const parallaxX = this.cursor.x * 0.5;
      const parallaxY = -this.cursor.y * 0.5;
      this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 5 * deltaTime;
      this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 5 * deltaTime;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
