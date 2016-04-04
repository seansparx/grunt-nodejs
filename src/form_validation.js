// When the browser is ready...
$(document).ready(function(){
    // Setup form validation on the #register-form element
    validate_admin_user();
    validate_admin_login();
    validate_orgnisation();
    validate_page();
    
    validate_org_change_pass();
    validate_location();
    
    custom_rules(); // call in last.
});


var ajax_req;

function custom_rules()
{   
    /** Rule to check duplicate email of admin user. */
    $.validator.addMethod("admin_unique_email", function (value, element) {
        if(ajax_req) { ajax_req.abort(); }
        var flag = false;
        
        ajax_req = $.ajax({
            url : base_url()+'admin/users/is_email_unique',
            data:{"value": value},
            type:'post',
            async: false,
            success: function(response){
                if (response) {
                    flag = true;
                }
                else {
                    flag = false;
                }
            },
            complete:function(response){
                
            }
        });
       
        return flag;

    }, "Email already exists."); 
    
    
    /** Rule to validate image format. */
    $.validator.addMethod("image_format", function (value, element) {
        
        var fd = new FormData();    
        fd.append( 'file', input.files[0] );
        
        if(ajax_req) { ajax_req.abort(); }
        var flag = false;
        
        ajax_req = $.ajax({
            url : base_url()+'admin/ajax/is_valid_image',
            type:'post',
            data: fd,
            processData: false,
            contentType: false,
            async: false,
            success: function(response){
                if (response) {
                    flag = true;
                }
                else {
                    flag = false;
                }
            },
            complete:function(response){
                
            }
        });
       
        return flag;

    }, "Invalid image format."); 
}

function submit_user_form()
{
    if($("#form-add-user").valid()){
        $("#form-add-user").submit();
    }
}


function validate_admin_user()
{
    $("#form-add-user").validate({
        // Specify the validation rules
        rules: {
            username: {
                required: true
            },
            emailidadd: {
                required :true,
                email:true
            },
            inputPasswordNew: {
				required: true,
                minlength: 8
			},
            inputPasswordNew2: {
                equalTo: "#inputPasswordNew"
            },
             userimage: {
                    required: false,
                    accept: "jpg,png,jpeg,gif"
            } 

        },
        // Specify the validation error messages
        messages: {
            username: {
                required: "<p class='error help-block'><span class='label label-important'>Please Enter Username.!</span></p>"
            },
            emailidadd: {
                required :"<p class='error help-block'><span class='label label-important'>Please Enter Email id.!</span></p>",
                email:"<p class='error help-block'><span class='label label-important'>Please Enter Valid Email Id.!</span></p>"
                
            },
            inputPasswordNew: {
                required: "<p class='error help-block'><span class='label label-important'>Please Enter Password.!</span></p>",
                minlength: "<p class='error help-block'><span class='label label-important'>Password Length should be 8 Character!</span></p>"
            }
            ,
            userimage: {
                accept: "<p class='error help-block'><span class='label label-important'>Please Select Valid File.</span></p>"
            }
            ,
            inputPasswordNew2: {
                equalTo: "<p class='error help-block'><span class='label label-important'>Confirm password is not  matching .!</span></p>"
            }
        },
        submitHandler: function (form) {
            var chk_menus = $("#module-permission input[name='menuCheck[]']:checked").length;
            if(chk_menus > 0) {
                form.submit();
            }
            else if($(".bwizard-steps li:last").hasClass('active')){
                bootbox.alert("Select module permission.");
            }
        }
    });
}
/* Function to validate of Admin Login.
 *
 *	return void
 */

function validate_admin_login()
{
    $("#form-login-submit").validate({
        // Specify the validation rules
        rules: {
            username: "required",
            password: {
				required: true
			}
        },
        // Specify the validation error messages
        messages: {
            username: "<span class='gritter-add-primary btn btn-primary btn-block'>Please Enter Username.!</span></p>",
            password: {
                required: "<span class='gritter-add-primary btn btn-primary btn-block'>Please Enter Password.!</span></p>"
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
}

 /* Function to validate of Organisation form.
 *
 *	return void
 */


function validate_orgnisation()
{
    $("#form-add-org-step-1").validate({
        // Specify the validation rules
        rules: {
            price_plan: "required",
            org_name: "required",
            org_sector: "required",
            org_employee_no: "required",
            no_of_employees: "required",
            org_address: "required",
            org_city: "required",
            org_country: "required",
            org_postal_code: {
                required: true,
                number: true
            },
            org_website: {
                required: true,
                url: true
            },
            org_facebook_url: {
                url: true
            },
            org_twitter_url: {
                url: true
            },
            org_instagram_url: {
                url: true
            },
            org_google_url: {
                url: true
            },
            org_linkedin_url: {
                url: true
            },
            org_email:{
                email:true
            },
            org_contact_person_job:{
                required: true
            },
            org_contact_person:{
                required: true
            },
            org_telephone:{
                required: true,
                number: true
            }
        },
        // Specify the validation error messages
        messages: {
            
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    
    
    
    
    $("#form-add-org-step-2").validate({
        // Specify the validation rules
        rules: {
            org_contact_person: {
                required: true
            },
            org_contact_person_job:{
                required: true
            },
            org_telephone:{
                required: true,
                number: true
            },
            org_email:{
                required: true,
                email:true
            }
        },
        // Specify the validation error messages
        messages: {
            
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    
    
    $("#form-add-org-step-3").validate({
        // Specify the validation rules
        rules: {
            org_page_name: {
                required: true
            }
        },
        // Specify the validation error messages
        messages: {
            
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
}

/* Function to validate of organisation reset password.
 *
 *	return void
 */

function validate_org_change_pass()
{
    $("#org-change-pass").validate({
        // Specify the validation rules
        rules: {
            org_new_password: {
				required: true,
                minlength: 8
			},
            org_password_confirm: {
                equalTo: "#org_new_password"
            }
        },
        // Specify the validation error messages
        messages: {
            org_new_password: {
                required: "<p class='error help-block'><span class='label label-important'>Please Enter Password.!</span></p>",
                minlength: "<p class='error help-block'><span class='label label-important'>Password Length should be 8 Character!</span></p>"
            }
            ,
            org_password_confirm: "<p class='error help-block'><span class='label label-important'>Confirm password is not  matching .!</span></p>"  
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
}




/* Function to validate of Page form.
 *
 *	return void
 */

function validate_page()
{
    $("#form-add-page").validate({
        // Specify the validation rules
        rules: {
            title: "required",
            menu_title: "required",
            meta_title: "required",
            meta_content: "required",
            status: "required"
        },
        // Specify the validation error messages
        messages: {
            title: "<p class='error help-block'><span class='label label-important'>Please Enter Page Title.!</span></p>",
            menu_title: "<p class='error help-block'><span class='label label-important'>Please Enter Menu Title.!</span></p>",
            email_title: "<p class='error help-block'><span class='label label-important'>Please enter your email title.!</span></p>",
            template_content: "<p class='error help-block'><span class='label label-important'>Please enter your email content.!</span></p>",
            userfile: "<p class='error help-block'><span class='label label-important'>Please Select file for logo.!</span></p>"   
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
}

function validate_location()
{
    $("#form-add-location").validate({
        // Specify the validation rules
        rules: {
            country_name: "required",
            country_code: "required",
            status: "required"
        },
        // Specify the validation error messages
        messages: {
            country_name: "<p class='error help-block'><span class='label label-important'>Please Enter Country Name.!</span></p>",
            country_code: "<p class='error help-block'><span class='label label-important'>Please Enter Country Code.!</span></p>",
            status: "<p class='error help-block'><span class='label label-important'>Please Select Status.!</span></p>"
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
}


