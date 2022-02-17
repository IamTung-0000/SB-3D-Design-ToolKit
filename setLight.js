
function setColours() {


    colour = getColours($('#ambient_red').slider("value"), $('#ambient_green').slider("value"),
                            $('#ambient_blue').slider("value"));
    

    ambientLight.color.setRGB(colour[0], colour[1], colour[2]);
    
      
    //front light
    
    
    colour = getColours($('#red').slider("value"), $('#green').slider("value"), $('#blue').slider("value"));
    

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
        case "top":
            // rightLight.color.setRGB(colour[0], colour[1], colour[2]);
            slider_value = $('#light_intensity').slider("value");
            if (last_topLight_value != slider_value) {
                topLight.intensity = $('#light_intensity').slider("value") * 50;
                last_topLight_value = slider_value;
            }
            break;
    
        default:
            break;
    }




}

function getColours(r, g, b) {
    var colour = [r.valueOf() / 255, g.valueOf() / 255, b.valueOf() / 255];
    return colour;
}

