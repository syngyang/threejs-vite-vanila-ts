import './style.css'
import * as THREE from 'three'

class App {
  private renderer : THREE.WebGLRenderer;
  private domApp: Element;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private ambientLight?: THREE.AmbientLight;
  private cube?: THREE.Mesh ;

  constructor(){
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    this.domApp = document.querySelector<HTMLDivElement>('#app')!
    this.domApp.appendChild(this.renderer.domElement);// domElement는 canvas 타입의 element
    
    this.scene = new THREE.Scene()

    this.setupCamera()
    this.setupLight()
    this.setupModels()
    this.setupEvents()
    this.resize() // 첫 화면에서 private setupEvents(){ }의 onresize는 작동하지 않으므로
    console.log('hi three.js')
  }
  private setupCamera(){
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1,100);
    this.camera.position.z = 2; //0,0,2
  }
  private setupLight(){
     // ambient light which is for the whole scene
     this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
     this.ambientLight.castShadow = true;
     this.scene.add(this.ambientLight);

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 32, 64);
    // light.position.set(-1, 2, 4)

    this.scene.add(light)
  }
  private setupModels(){
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial();
    // const material = new THREE.MeshPhongMaterial({color:0x44aa88})

    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }
  private setupEvents(){
    window.onresize = this.resize.bind(this)
    // this.resize() 도 가능하지만, constructor에 넣었음

    this.renderer.setAnimationLoop(this.render.bind(this))
  }
  private resize(){
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    const camera = this.camera;
    if(camera){
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height)
  }
  private update(time: number){
    time *= 0.001; // ms -> s
    
    const cube = this.cube;
    if(cube) {
      cube.rotation.x = time;
      cube.rotation.y = time;
    }
  }
  private render(time: number){// time은 timeStamp 로 시간 올라감
    // console.log("time", time)
    this.update(time)
    this.renderer.render(this.scene, this.camera!)
  }
}

new App()
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  