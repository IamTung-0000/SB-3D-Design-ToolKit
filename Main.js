/*

ThreeJS Mascot Loader
Author: IamTung
email: iamtung.asia@gmailcom

*/
//test

import * as THREE from './build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';



export let camera, controls, scene, renderer;
export let cube;
export let material;
export let stats, container;
//Light variable
var dirLight1, dirLight2, pointLight, ambientLight;

const objects = [];
//Folder Path
var MascotFolderPath = 'https://github.com/IamTung-0000/SB-3D-Design-ToolKit/blob/master/Models/obj/SBmascot/';


// const testFolder = './tests/';
// const fs = require('fs');

// fs.readdir(MascotFolderPath, (err, files) => {
//   files.forEach(file => {    
//     console.log(file);
//   });
// });


function createStatsGUI() {

    var thisParent;

    //Create new Graph (FPS, MS, MB)
    let stats1 = new Stats();

    //Display different panel
    stats1.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats1.domElement.style.width = '400px';
    stats1.domElement.style.height = '400px';

    //Add Stats to Document - modal 4
    thisParent.appendChild( stats1.domElement );
}

const aboutGlobe = document.getElementById("aboutGlobe");


init(aboutGlobe);1

main();
render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();





function init(target=null, showStat=false) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xF7F9FA );
    //scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( target.offsetWidth, target.offsetHeight );
    if (target) {
        target.appendChild( renderer.domElement );
    } else {
        document.body.appendChild( renderer.domElement );
    }

    if (showStat) {
        stats = new Stats();
        document.body.appendChild( stats.dom );
    }

    camera = new THREE.PerspectiveCamera( 50, target.offsetWidth / target.offsetHeight, 1, 1000 );
    camera.position.set( 0, 0, -280 );


    //Controls
    controls = new OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = false;
    controls.maxPolarAngle = Math.PI / 2;

}




function main() {

    // model

    const onProgress = function ( xhr ) {

        if ( xhr.lengthComputable ) {

            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

        }

    };



    new MTLLoader()
        .setPath( MascotFolderPath )
        .load( 'SB-Default.mtl', function ( materials ) {

            materials.preload();

            new OBJLoader()
                .setMaterials( materials )
                .setPath( MascotFolderPath )
                .load( 'SB-Default.obj', function ( object ) {

                    object.position.y = -70;
                    object.scale.set(50,50,50)
                    object.traverse( function( node ) {
                        if( node.material ) {
                            node.material.side = THREE.DoubleSide;
                        }
                    });
                    scene.add( object );

                }, onProgress );

        } );
        

    //


    

    //Draw Light
    Light();
    window.addEventListener( 'resize', onWindowResize );

    //print ui value
    $("#red, #green, #blue, #ambient_red, #ambient_green, #ambient_blue").slider({
        change: function (event, ui) {
            console.log(ui.value);
            render();
        }
    });

};

function getColours(r, g, b) {

    var colour = [r.valueOf() / 255, g.valueOf() / 255, b.valueOf() / 255];
    return colour;
}

function setColours() {

    var colour = getColours($('#red').slider("value"), $('#green').slider("value"), $('#blue').slider("value"));
    dirLight1.color.setRGB(colour[0], colour[1], colour[2]);
    dirLight2.color.setRGB(colour[0], colour[1], colour[2]);
    pointLight.color.setRGB(colour[0], colour[1], colour[2]);

    var colour = getColours($('#ambient_red').slider("value"), $('#ambient_green').slider("value"),
                            $('#ambient_blue').slider("value"));
    ambientLight.color.setRGB(colour[0], colour[1], colour[2]);

}


function Light() {

    dirLight1 = new THREE.DirectionalLight( 0xffffff );
    dirLight1.position.set( 1, 1, 1 );
    scene.add( dirLight1 );

    dirLight2 = new THREE.DirectionalLight( 0x002288 );
    dirLight2.position.set( - 1, - 1, - 1 );
    scene.add( dirLight2 );

    pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );

    ambientLight = new THREE.AmbientLight( 0x222222 );
    scene.add( ambientLight );

}

function onWindowResize() {

    camera.aspect = aboutGlobe.offsetWidth / aboutGlobe.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( aboutGlobe.offsetWidth, aboutGlobe.offsetHeight );

}

function animate() {

    requestAnimationFrame( animate ); 

    
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
    // stats.update()

}



function render() {
    renderer.setClearColor( 0x000000, 0 ); // the default
    setColours();
    renderer.render( scene, camera );
}