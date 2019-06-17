// get inputs from handlebars
var $product_name = $("#product_name");
var $desription = $("#description");
var $file_path = $("#file_path");
var $availableList = $("#available-list");
var $submitBtn = $("#addImage");
var data;

// api object 
var API = {
  // when called, make ajax call to post
  save: function (db) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/upload",
      data: JSON.stringify(db)
    });
  }
}

// function to submit the first form 
var handleFormSubmit = function (event) {
  event.preventDefault();

  var upload = {
    product_name: $product_name.val().trim(),
    description: $desription.val().trim(),
  };

  if (!(upload.product_name && upload.description)) {
    alert("You must enter a title and description!");
    return;
  }
  // call api save function
  API.save(upload).then(function (res) {
  console.log(res);
  
  // make sure no data is overloaded
  if(res < 30){
    $(".create-form").hide();
     $("#fileForm").show();
  }else {
    alert("List full! please try later");
    window.location.pathname = '/market'
  }
  });

  $product_name.val("");
  $desription.val("");
};

$submitBtn.on("click", handleFormSubmit);
$("#fileForm").hide();