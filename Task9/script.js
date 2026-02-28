var formdetail = {

   allfields:[
       {label: "Name:", type: "text", id: "name"},
       {label: "Email:", type: "email", id: "email"},
       {label: "Password:", type: "password", id: "password"},
       {
        label: "Country:", type: "select", id: "country",
        options: ["Select Country","India", "USA", "Canada", "Australia"]
       },
       {
        label: "Role:", type: "select", id: "role",
        options:[" Role","Student", "Employee"]
       }
   ],

   states:{
       "India": ["State","Bihar","Delhi","Maharashtra","Karnataka"],
       "USA": ["State","California","Texas","Florida"],
       "Canada": ["State","Ontario","Quebec","Alberta"],
       "Australia": ["State","Sydney","Melbourne","Perth"]
   }
};

$(document).ready(function()
{
    var form = $("<form></form>");

    for(var i = 0; i < formdetail.allfields.length; i++){

        var field = formdetail.allfields[i];

        form.append("<label>" + field.label + "</label><br>");

        if(field.type === "select"){

            var select = "<select id='" + field.id + "'>";

            for(var j = 0; j < field.options.length; j++){
                select += "<option>" + field.options[j] + "</option>";
            }

            select += "</select>";

            form.append(select);
        }
        else{

            form.append(
                "<input type='" + field.type + "' id='" + field.id + "'>"
            );
        }

        form.append("<br><br>");
    }

    form.append("<div id='stateContainer'></div>");

    form.append("<div id='extraFields'></div>");
    form.append("<button type='submit'>Submit</button>");

    $("#form").append(form);
});

$(document).on("change", "#country", function(){

    $("#stateContainer").empty();

    var selectedCountry = $(this).val();

    if(formdetail.states[selectedCountry]){

        var stateDropdown = "<label>State:</label><br>";
        stateDropdown += "<select id='state'>";

        var states = formdetail.states[selectedCountry];

        for(var i = 0; i < states.length; i++){
            stateDropdown += "<option>" + states[i] + "</option>";
        }

        stateDropdown += "</select><br><br>";

        $("#stateContainer").append(stateDropdown);
    }
});

$(document).on("change", "#role", function(){

    $("#extraFields").empty();

    if($(this).val() === "Student"){

        $("#extraFields").append(
            "<label>College Name:</label><br>" +
            "<input type='text' id='college'><br><br>"
        );
    }

    if($(this).val() === "Employee"){

        $("#extraFields").append(
            "<label>Company Name:</label><br>" +
            "<input type='text' id='company'><br><br>"
        );
    }
});



$(document).on("submit", "form", function(e){

    e.preventDefault();
    $(".error").remove();

    var valid = true;

    if($("#name").val().trim() === ""){
        $("#name").after("<span class='error'> Name Required </span>");
        valid = false;
    }

    var email = $("#email").val().trim();
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email === ""){
        $("#email").after("<span class='error'> Email Required </span>");
        valid = false;
    }
    else if(!emailPattern.test(email)){
        $("#email").after("<span class='error'> Enter Valid Email </span>");
        valid = false;
    }

    var password = $("#password").val().trim();

    if(password === ""){
        $("#password").after("<span class='error'> Password Required </span>");
        valid = false;
    }
    else if(password.length < 6){
        $("#password").after("<span class='error'> Minimum 6 Characters </span>");
        valid = false;
    }

   
    if($("#state").length && $("#state").val() === "State"){
        $("#state").after("<span class='error'> State </span>");
        valid = false;
    }

    if($("#role").val() === "Student"){
        if($("#college").val() === ""){
            $("#college").after("<span class='error'> College Required </span>");
            valid = false;
        }
    }

    if($("#role").val() === "Employee"){
        if($("#company").val() === ""){
            $("#company").after("<span class='error'> Company Required </span>");
            valid = false;
        }
    }

    if(valid){
        alert("Form Submitted Successfully");
    }

});