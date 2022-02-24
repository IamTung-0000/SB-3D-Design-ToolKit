//Create RGB Slider
$(function () {
    $("#red, #green, #blue, #ambient_red, #ambient_green, #ambient_blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 255  //Default value, Light colour of model set to median value (grey colour)
    });
}); 

// Front Light intensity slider
$("#light_intensity").slider({
    orientation: "horizontal",
    min: 0,
    max: 1,
    //update step
    step: 0.01,
    value: 0.8,
    slide: function (event, ui) {
        // frontLight.intensity = ui.value;
        // leftLight.intensity = ui.value;
    },
    change: function (event, ui) {
        // frontLight.intensity = ui.value;
        // leftLight.intensity = ui.value;
    }
});

// change light
function changeLight() {

    var x = document.getElementById("dir_light").value;
    // console.log(x);
    switch (x) {
        case "front":
            $('#light_intensity').slider("value",last_frontLight_value);
            break;
        case "left":
            $('#light_intensity').slider("value",last_leftLight_value);
            break;
        case "right":
            $('#light_intensity').slider("value",last_rightLight_value);
            break;
        case "top":
            $('#light_intensity').slider("value",last_topLight_value);
            break;
    
        default:
            break;
    }
    


}




