$("#login-button").click(function () {
    $("#register-button").removeClass("active");
    $("#login-button").addClass("active");
    $("#login-form").removeClass("d-none");
    $("#signup-form").addClass("d-none");
});

$("#register-button").click(function () {
    $("#login-button").removeClass("active");
    $("#register-button").addClass("active");
    $("#login-form").addClass("d-none");
    $("#signup-form").removeClass("d-none");
});

$(".form-input").on("keypress", function (e) { 
    if (e.which == 32) {
        return false;
    }
});

$('#cvUpload').on('change',function(){
    //get the file name
    var fileName = $(this).val();
    var cleanFileName = fileName.replace('C:\\fakepath\\', " ");
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(cleanFileName);
})
