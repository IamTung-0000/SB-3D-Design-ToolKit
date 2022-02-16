//Create RGB Slider
$(function () {
    $("#red, #green, #blue, #ambient_red, #ambient_green, #ambient_blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127  //Default value, Light colour of model set to median value (grey colour)
    });
}); 

// Front Light intensity slider
$("#light_intensity").slider({
    orientation: "horizontal",
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.5,
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
    
        default:
            break;
    }
    


}




