$(document).ready(function () {

    $(".menu_item > li > a").on("click", function (e) {

        if (!$(this).hasClass("active")) {
            //Create File list when expand
            var FileListStr = [];

            for (let file_index = 0; file_index < mascot_files.length; file_index++) {
                FileListStr.push("<li> <span>" + "<a onclick" +  "= 'LoadScene(" + file_index + ")';>" + mascot_files[file_index] + "</a> </span> </li> " );
              }
              var newFileListStr = FileListStr.toString();
              var trimStr = newFileListStr.replaceAll(",","");
            document.getElementById("FileList").innerHTML = trimStr;

            // hide any open menus and remove all other classes
            $(".menu_item li ul").slideUp(350);
            $(".menu_item li a").removeClass("active");
            
            // open new menu and add the open class
            
            $(this).next("ul").slideDown(350);
            $(this).addClass("active");

            $(this).next("li > ul").slideDown(350);
            $(this).addClass("active");

            
        } else if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).next("ul").slideUp(350);
        }
    });

});
