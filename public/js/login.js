$(document).ready(function () {

    let emailInput = $("#signInEmail");
    let passwordInput = $("#signInPassword");

    $("#signInButton").on("click", function () {
        event.preventDefault();
        console.log("made it")
        // check if all values are entered
        if (!emailInput.val().trim() || !passwordInput.val()) {
            alert("You must enter all fields!");
            return;
        }

        let user = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        // call login function with values obtained
        logIn(user);
        emailInput.val("");
        passwordInput.val("");

        // login function to make ajax call 
        function logIn(user) {
            $.ajax("/api/login", {
                type: "POST",
                data: user
            }).then(function () {
                console.log(user)
                window.location.replace("/market")
            }).catch(function (err) {
                console.log(err);
                alert("Wrong email or password. Please try again");
            })
        }
    })
})