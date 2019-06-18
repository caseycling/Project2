$(document).ready(function () {

    let nameInput = $("#signUpName");
    let emailInput = $("#signUpEmail");
    let passwordInput = $("#signUpPassword");

    $("#signUpButton").on("click", function () {
        event.preventDefault();
        console.log("made it")

        // check if all values are entered
        if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val()) {
            alert("You must enter all fields!");
            return;
        }

        let newUser = {
            name: nameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        console.log(newUser.name + "<--newUser.name")

        // call sign up function 
        signUp();
        nameInput.val("");
        emailInput.val("");
        passwordInput.val("");

        // function that make ajax call
        function signUp() {
            $.ajax("/api/new", {
                type: "POST",
                data: newUser
            }).then(function (dbEntry) {
                if (dbEntry == "SequelizeUniqueConstraintError") {
                    alert("Already existing email. Try login");
                } else if (dbEntry == "SequelizeValidationError") {
                    alert("Please enter valid email address");
                } else {
                    // console.log(dbEntry);
                    window.location.replace("/market")
                }
            }).catch(function (err) {
                // console.log("wow")
                console.log(err);
            })
        }
    })
})