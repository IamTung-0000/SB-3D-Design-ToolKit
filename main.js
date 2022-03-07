/*

ShopBase 3D Design Toolkits
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

var frontLight, leftLight, rightLight, ambientLight, topLight;
var last_frontLight_value = 0.8, last_leftLight_value = 0.8, last_rightLight_value = 0.8, last_topLight_value = 0.8;
var last_R_value = 127, last_G_value = 127, last_B_value = 127;
var colour = [0,0,0];

const objects = [];


//Auto Hide Menu
DropDownMenu("dropdown-btn", ".dropdown-container");
DropDownMenu("dropdown-btn-folder",".dropdown-container-folder");
//init scene
init();
LoadScene(logo_files[0]); //default model load 
animate();


function getThreeDivSize() {
    current_window_w =  view.clientWidth
    current_window_h = view.clientHeight;
    ratio = current_window_w / current_window_h;
}

function init() {

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xF7F9FA );
    //scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    getThreeDivSize();

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
    //update Div Size
    getThreeDivSize();
    const ASPECT_RATIO = current_window_w / current_window_h;
    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();
    renderer.setSize( current_window_w, current_window_h );

}



function LoadScene(modelIndex) {
    

    //remove old scene
    scene.clear()
    //reset camera to default
    camera.position.set( 0, 0, -300 );
    //Draw Light
    Light();
    //Load Model
    loadFile(modelIndex);


};



function Light() {



    frontLight = new THREE.SpotLight( 0xffffff );
    frontLight.position.set( 0, 0, -600 );
    scene.add( frontLight );

    leftLight = new THREE.SpotLight( 0xffffff );
    leftLight.position.set( -600, 0, 0 );
    scene.add( leftLight );

    rightLight = new THREE.SpotLight( 0xffffff );
    rightLight.position.set( 600, 0, 0 );
    scene.add( rightLight );

    topLight = new THREE.SpotLight( 0xffffff );
    topLight.position.set( 0, 600, 200 );
    scene.add( topLight );



  



    // const front_helper = new THREE.SpotLightHelper( frontLight, 1 );
    // scene.add( front_helper );

    // const left_helper = new THREE.SpotLightHelper( leftLight, 1 );
    // scene.add( left_helper );


    // // const right_helper = new THREE.SpotLightHelper( rightLight, 1 );
    // // scene.add( right_helper );

    // // const top_helper = new THREE.SpotLightHelper( topLight, 1 );
    // // scene.add( top_helper );





    ambientLight = new THREE.AmbientLight( 0x222222 );
    scene.add( ambientLight );

}

var lastWidth = 0;

function animate() {

    // if (view.offsetWidth != lastWidth) {
    //     console.log(view.offsetWidth);
    //     console.log(view.offsetHeight);
    //     console.log(ratio);
    //     lastWidth = view.offsetWidth;

    // }

    requestAnimationFrame( animate ); 
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();


}


function render() {

    setTimeout(function(){
        setColours();
    },300); // 300 = 0.3 seconds = 300 miliseconds


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








