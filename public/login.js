$(function () {
    console.log("ready!");
    $(".submit").on("click", function (event) {
        event.preventDefault();
        let userPass = { user: $("#email").val(), pass: $("#password").val() };
        $.post("/login", userPass, function (data) {
            if (data) {
                alert("Login successful");
            }
            else {
                alert("Login successful");
            }
        });
    });
});