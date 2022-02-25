

function loadFile(modelIndex) {

     const onProgress = function ( xhr ) {

        if ( xhr.lengthComputable ) {

            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
            var info = "SB 3D Design ToolKits v0.1.1 Beta";
            var margin = "</br>--------------------------------" 
            var email = "iamtung.asia@gmail.com";
            document.getElementById("stats").innerHTML = Math.round( percentComplete, 2 ) + '%' + ' Tải Dữ Liệu ' + margin+"</br>" + email  ;

        }

    };

    //Folder Path
    var MascotFolderPath = 'https://raw.githubusercontent.com/IamTung-0000/SB-3D-Design-ToolKit/master/Models/gltf/';
    
    // var MascotFolderPath = "/Models/gltf/"; 

    var obj_sel = [mascot_files[modelIndex] + '.gltf'];
    var resourceURL = MascotFolderPath + obj_sel;
    console.log(resourceURL);

    function degrees_to_radians(degrees)
    {
      var pi = Math.PI;
      return degrees * (pi/180);
    }
    

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        resourceURL,
        // called when the resource is loaded
        function ( gltf ) {

            model = gltf.scene;

            scene.add( model );

            model.scale.set(30,30,30);
            model.position.y = -50;
            model.rotation.y = degrees_to_radians(180);
            

        }, onProgress

    );   

}