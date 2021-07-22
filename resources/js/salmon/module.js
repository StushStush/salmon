import * as THREE from "three";
import innerHeight from "ios-inner-height";

import gsap from "gsap";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

import getOffset from "@model/getOffset";

import "@components/animateModal";

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();
    this.container = options.dom;
    this.width = window.innerWidth;
    this.height = innerHeight();
    this.$videoSlideshow = document.querySelector('[x-data="videoSlideshow"]');
    this.$footer = document.querySelector(".footer");

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.physicallyCorrectLight = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.container.appendChild(this.renderer.domElement);

    this.loaderFbx = new FBXLoader();
    this.camera = new THREE.PerspectiveCamera(
      2,
      this.width / this.height,
      1,
      10000
    );

    this.camera.position.z = 2000;
    this.camera.fov = 2 * Math.atan(this.height / 2 / 2000) * (180 / Math.PI);

    this.imageStore = [];
    this.imagesBounds = [];
    this.images = [...document.querySelectorAll("[data-model-box]")];

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.timeX = 0;
    this.timeY = 0;
    this.deepY = 0;
    this.currentScroll = 0;
    this.scroll = 0;
    this.active = false;

    this.addModel();
    this.addLight();
    this.mouseMovement();
    this.rayCasterInit();
    this.resize();
    this.setupResize();
    // this.setPositions();
    this.updateImageBounds();
    this.render();
    this.handleModalTrigger();
  }

  handleModalTrigger() {
    window.addEventListener("modal:opened", () => {
      this.toggleTween();
    });
    window.addEventListener("modal:closed", () => {
      this.toggleTween();
    });
  }

  toggleTween() {
    this.active = !this.active;

    gsap.to(this.mesh.scale, {
      duration: 1.0,
      x: this.active ? 10.5 : 3.5,
      y: this.active ? 10.5 : 3.5,
      z: this.active ? 10.5 : 3.5,
      ease: "Bounce.easeOut",
    });
  }

  mouseMovement() {
    window.addEventListener(
      "mousemove",
      (event) => {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;
      },
      false
    );
  }

  rayCasterInit() {
    window.addEventListener("click", (event) => {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.intersects = this.raycaster.intersectObjects(
        this.scene.children[1].children
      );

      if (this.intersects.length > 0) {
        const event = this.active ? "modal:close" : "modal:open";
        window.dispatchEvent(new CustomEvent(event));
      }
    });
  }

  updateImageBounds() {
    this.imagesBounds.forEach((u) => {
      const offset = u.img.getBoundingClientRect();

      (u.mesh = this.mesh),
        (u.top = offset.top),
        (u.left = offset.left),
        (u.width = offset.width),
        (u.height = offset.height);
    });
  }

  addModel() {
    this.bTex = new THREE.TextureLoader().load(
      "/assets/static/textures/bump.jpg"
    );
    this.matTex = new THREE.TextureLoader().load(
      "/assets/static/textures/r20.png"
    );
    this.mapTex = new THREE.TextureLoader().load(
      "/assets/static/textures/float_tex.jpg"
    );

    this.material = new THREE.MeshMatcapMaterial({
      map: this.mapTex,
      matcap: this.matTex,
      bumpMap: this.bTex,
      bumpScale: 1.5,
    });

    gsap.to(this.container, {
      y: "100%",
    });

    this.imageStore = this.images.map(($img) => {
      const offset = $img.getBoundingClientRect();

      this.loaderFbx.load("/assets/static/float.fbx", (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = this.material;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.mesh = object;

        this.updateImageBounds()

        // this.mesh.position.y = -offset.top + this.height / 2 - offset.height;
        // this.mesh.position.x = offset.left - this.width / 2 + offset.width / 2;

        this.mesh.scale.set(3.5, 3.5, 3.5);
        this.scene.add(this.mesh);
      });

      this.imagesBounds.push({
        img: $img,
        mesh: this.mesh,
        top: offset.top,
        left: offset.left,
        width: offset.width,
        height: offset.height,
      });
    });
  }

  setPositions() {
    this.imagesBounds.forEach((u) => {
      if (u.mesh) {
        u.mesh.position.y = -u.top + this.height / 2 - u.height / 2;
        u.mesh.position.x = u.left - this.width / 2 + u.width / 2;
      }
    });
  }

  addLight() {
    this.directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    this.directionalLight.position.set(0.25, 3, -2.25);
    this.directionalLight.castShadow = true;
    this.directionalLight.receiveShadow = true;
    this.directionalLight.shadow.camera.far = 15;
    this.directionalLight.shadow.mapSize.set(1024, 1024);
    this.directionalLight.shadow.normalBias = 0.05;
    this.scene.add(this.directionalLight);
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.updateImageBounds();

    this.width = window.innerWidth;
    this.height = innerHeight();

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.setPositions()

    const offsetSlideshow = getOffset(this.$videoSlideshow);
    const offsetFooter = getOffset(this.$footer);

    this.timeY += 0.005;
    this.timeX += 0.005;

    if (this.mesh) {
      gsap.to(this.mesh.rotation, {
        duration: 0.5,
        x: -this.mouse.y,
        z: -this.mouse.x,
        ease: "Bounce.easeOut",
      });

      if (window.__viewport.vw < 1024) {
        if (
          window.__viewport.scrollBottom >= offsetSlideshow.bottom &&
          window.__viewport.scrollBottom < offsetFooter.top
        ) {
          gsap.to(this.container, {
            y: 0,
          });
        } else {
          gsap.to(this.container, {
            y: !this.active ? "30%" : 0,
          });
        }
      } else {
        gsap.set(this.container, {
          y: 0,
        });
      }
    }

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
