/*

ThreeJS Mascot Loader
Author: IamTung
email: iamtung.asia@gmailcom

*/

let current_window_w, current_window_h;
var view = document.getElementById('WebGLViewer');

let camera, ratio, controls, scene, renderer;
let cube;
let material;
let stats, container;
//Light variable

var frontLight, leftLight, rightLight, ambientLight;
var last_frontLight_value = 0.5, last_leftLight_value = 0.5, last_rightLight_value = 0.5;
var last_R_value = 127, last_G_value = 127, last_B_value = 127;

var filenameArr = []; 
const objects = [];



init();
LoadScene(0); //default model load 
animate();





function init() {

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xF7F9FA );
    //scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    current_window_w = view.offsetWidth;
    current_window_h = window.innerHeight;
    ratio = current_window_w / current_window_h;

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, preserveDrawingBuffer: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( current_window_w, current_window_h );

    // document.body.appendChild( renderer.domElement );
    view.appendChild( renderer.domElement );

    // console.log(view.offsetWidth);
    // console.log(view.offsetHeight);

    //listen to resize
    window.addEventListener( 'resize', onWindowResize );
    //create new camera
    camera = new THREE.PerspectiveCamera( 50, ratio, 1, 50000 );


    //Controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = false;
    // controls.maxPolarAngle = Math.PI / 2;

}

function onWindowResize() {
    const ASPECT_RATIO = view.offsetWidth / window.innerHeight;
    current_window_w =  view.offsetWidth
    current_window_h = window.innerHeight;

    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();
    renderer.setSize( current_window_w, current_window_h );

}



function LoadScene(modelIndex) {

    //remove old scene
    scene.clear()
    //reset camera to default
    camera.position.set( 0, 0, -300 );
    //Load Model
    loadFile(modelIndex);
    //Draw Light
    Light();


};






function setColours() {
      
    //front light
    var colour = getColours($('#red').slider("value"), $('#green').slider("value"), $('#blue').slider("value"));
    var slider_value;
    switch (document.getElementById("dir_light").value) {
        case "front":
            //intensity
            slider_value = $('#light_intensity').slider("value");
            if (last_frontLight_value != slider_value) {
                frontLight.intensity = $('#light_intensity').slider("value") * 2;
                last_frontLight_value = slider_value;
            }
            break;
        case "left":
            slider_value = $('#light_intensity').slider("value");
            if (last_leftLight_value != slider_value) {
                leftLight.intensity = $('#light_intensity').slider("value") * 2;
                last_leftLight_value = slider_value;
            }
            break;
        case "right":
            // rightLight.color.setRGB(colour[0], colour[1], colour[2]);
            slider_value = $('#light_intensity').slider("value");
            if (last_rightLight_value != slider_value) {
                rightLight.intensity = $('#light_intensity').slider("value") * 2;
                last_rightLight_value = slider_value;
            }
            break;
    
        default:
            break;
    }


    var colour = getColours($('#ambient_red').slider("value"), $('#ambient_green').slider("value"),
                            $('#ambient_blue').slider("value"));

    ambientLight.color.setRGB(colour[0], colour[1], colour[2]);


}

function getColours(r, g, b) {
    var colour = [r.valueOf() / 255, g.valueOf() / 255, b.valueOf() / 255];
    return colour;
}

function Light() {

    frontLight = new THREE.DirectionalLight( 0xffffff );
    frontLight.position.set( 0, 0, 200 );
    scene.add( frontLight );
    const front_helper = new THREE.DirectionalLightHelper( frontLight, 50 );
    scene.add( front_helper );



    leftLight = new THREE.DirectionalLight( 0x002288 );
    leftLight.position.set( -200, 0, 0 );
    scene.add( leftLight );
    const left_helper = new THREE.DirectionalLightHelper( leftLight, 50 );
    scene.add( left_helper );


    rightLight = new THREE.DirectionalLight( 0x002288 );
    rightLight.position.set( 200, 0, 0 );
    scene.add( rightLight );
    const right_helper = new THREE.DirectionalLightHelper( rightLight, 50 );
    scene.add( right_helper );



    ambientLight = new THREE.AmbientLight( 0x222222 );
    scene.add( ambientLight );

}


function animate() {

    requestAnimationFrame( animate ); 
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();

}


function render() {
    setColours();
    renderer.render( scene, camera );
}


// Save PNG
window.onload = function(){ 
    document.getElementById('SaveBtn').onclick=()=> {
        console.log("save!");
        saveImage()
        }
};

function saveImage() {

    
    let renderWidth = 2048;
    let renderHeight = renderWidth/ratio;
    renderer.setSize( renderWidth, renderHeight);

    render();

    const canvas =  document.getElementsByTagName("canvas")[0]
    // console.log(canvas);
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    a.download="image.png"
    a.click();

    // back to current renderer size
    renderer.setSize( current_window_w, current_window_h);
    
}
//




document.getElementById('getval').addEventListener('change', readURL, true);

function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.getElementById('WebGLViewer').style.backgroundImage = "url(" + reader.result + ")";        
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}







