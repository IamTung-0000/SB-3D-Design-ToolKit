/* 
Loop through all dropdown buttons to toggle between hiding
and showing its dropdown content -
This allows the user to have multiple dropdowns without any conflict
*/
    
function DropDownMenu(classNameParent, classNameChild) {

    var dropdown = document.getElementsByClassName(classNameParent);
    var i;

    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;

            // Collapse
            if (dropdownContent.style.display === "block") {
                // dropdownContent.style.display = "none";
                $(dropdownContent).slideUp(350);
            } else { // dropdown
                $(classNameChild).slideUp(350);
                $(dropdownContent).slideDown(350);
                dropdownContent.style.display = "block";
            }
        });
    }
}


// Jquerry function to load html
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'MenuContentView/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})




