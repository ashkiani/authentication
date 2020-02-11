$(function () {
    console.log("ready!");
    $(".submit").on("click", function (event) {
        event.preventDefault();
        let userPass = { user: $("#email").val(), pass: $("#password").val() };
        $.post("/register", userPass, function (data) {
            if (data === true) {

                // alert(window.location.href);
            }
            else {
                // alert("Login successful");
            }
        }).done(() => {
            // alert(window.location.href);
        });
    });
});