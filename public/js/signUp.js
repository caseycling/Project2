$(document).ready(function() {

    let nameInput = $("#signUpName");
    let emailInput = $("#signUpEmail");
    let passwordInput = $("#signUpPassword");

    $("#signUpButton").on("click", function() {
        event.preventDefault();
        console.log("made it")

         // check if all values are entered
        if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val()) {
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
            }).then(function(dbEntry) {
                console.log(dbEntry);
                window.location.replace("/market")
            })
        }

    
        
    })
       
})