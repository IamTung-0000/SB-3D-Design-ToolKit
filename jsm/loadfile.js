function loadFile(modelIndex) {

     const onProgress = function ( xhr ) {

        if ( xhr.lengthComputable ) {

            const percentComplete = xhr.loaded / xhr.total * 25;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
            var info = "SB 3D Design ToolKits v0.1 Beta";
            var margin = "</br>--------------------------------" 
            var email = "iamtung.asia@gmail.com";
            document.getElementById("stats").innerHTML = Math.round( percentComplete, 2 ) + '%' + ' Tải Dữ Liệu ' + margin+ "</br>" + info + "</br>" + email  ;

        }

    };
    //Folder Path
    var MascotFolderPath = 'https://raw.githubusercontent.com/IamTung-0000/SB-3D-Design-ToolKit/master/Models/obj/SBmascot/';
    // var MascotFolderPath = "/Models/obj/SBmascot/"; 

    var mtl_sel = [mascot_files[modelIndex] + '.mtl'];
    var obj_sel = [mascot_files[modelIndex] + '.obj'];

    new THREE.MTLLoader()
        .setPath( MascotFolderPath )
        .load( mtl_sel, function ( materials ) {

            materials.preload();
            // console.log(materials.materials);
            

            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( MascotFolderPath )
                .load( obj_sel, function ( object ) {
                    

                    //Object transform
                    object.position.y = -90;
                    object.rotation.y = (Math.PI / 2)*2;
                    object.scale.set(50,50,50)

                    //Material Setting
                    object.traverse( function( node ) {
                        if( node.material ) {
                            //Side setting
                            node.material.side = THREE.DoubleSide;
                            //shininess
                            node.material.shininess = 4;
                            // node.material.flatShading = true;
                            // materials.materials.black_pupil.shininess = 300;
                            
                        }
                    });

                    scene.add( object );
                    

                }, onProgress );

        });

    
        
    

}