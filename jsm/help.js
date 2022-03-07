function HelpOn() {
    document.getElementById("overlay").style.display = "block";
}

function HelpOff() {
    document.getElementById("overlay").style.display = "none";
}
document.addEventListener('DOMContentLoaded', function() {HelpOn(); }, false);