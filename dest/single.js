var checked = false;

/* function to get site url.
 * 
 * acccess public 
 * return string
 */
function site_url() 
{
    return document.getElementById("site_url").value+'admin/';
}

/* function to get base url.
 * 
 * acccess public 
 * return string
 */
 function base_url() 
{
    return document.getElementById("base_url").value;
}

/* function to display success_message.
 * 
 * acccess public 
 * return void
 */
 
function success_msg(msg)
{
    $(".alert-success").html('<button data-dismiss="alert" class="close" type="button">×</button><strong>Success!</strong> '+msg);
    $(".alert-success").show();
    setTimeout(function(){
        $(".alert-success").fadeOut();
    }, 5000);
}

/* function to display error_message.
 * 
 * acccess public 
 * return void
 */
function error_msg(msg)
{
    $(".alert-error").html('<button data-dismiss="alert" class="close" type="button">×</button><strong>Warning!</strong>&nbsp;&nbsp;'+msg);
    $(".alert-error").show();
    setTimeout(function(){
        $(".alert-error").fadeOut();
    }, 5000);
}

/* function to copy value one field to other field.
 * 
 * acccess public 
 * return void
 */
function same_value() 
{
    document.getElementById("menu_title").value = document.getElementById("page_title").value;
}

/* function to unblock people  with ajax.
 * 
 * acccess public 
 * return void
 */

function unblock_record(id, module) 
{
    bootbox.confirm("Are you sure want to unblock this ?", function(result) 
    {
        if(result == true) {
                do_unblock(id, module);
        } else {
                return false;
        }
    });
    
}

function do_unblock(id, module)
{
    var url, params;
    
    switch($.trim(module)) {
        
        case 'block_people' 			:   url = site_url() + "people/unblock_people";
	                                                                     	
        
        default     : '';
    }
    
    $.getJSON(url, {'id': id}, function (output) { 
        
        if(output.record){
            
            refresh_datatable(module, output.record);
        }else{
             var table = $('.dynamicTable').DataTable();
              table.fnClearTable();
        }
        
        if(output.success){
            success_msg(output.message);
        }
        else{
            error_msg(output.message);
        }
        
    });
}


/* function to block people  with ajax.
 * 
 * acccess public 
 * return void
 */

function block_record(id, module) 
{
    bootbox.confirm("Are you sure want to block this ?", function(result) 
    {
        if(result == true) {
                do_block(id, module);
        } else {
                return false;
        }
    });
    
}

function do_block(id, module)
{
    var url, params;
    
    switch($.trim(module)) {
        
        case 'people' 			:   url = site_url() + "people/block_people";
	                                                                     	
        
        default     : '';
    }
    
    $.getJSON(url, {'id': id}, function (output) { 
        
        if(output.record){
            
            refresh_datatable(module, output.record);
        }else{
             var table = $('.dynamicTable').DataTable();
              table.fnClearTable();
        }
        
        if(output.success){
            success_msg(output.message);
        }
        else{
            error_msg(output.message);
        }
        
    });
}


/* function to delete page record with ajax.
 * 
 * acccess public 
 * return void
 */

function delete_record(id, module) 
{
   //alert(module);
    bootbox.confirm("Are you sure want to delete?", function(result) 
    {
        
        if(result == true) {
                do_delete(id, module);
        } else {
                return false;
        }
    });
    
}


function do_delete(id, module)
{
    //alert(id);
    var url, params;
    
    switch($.trim(module)) {
        
        case 'user' 			:   url = site_url() + "users/delete";
									break;		                      
        case 'page' 			:   url = site_url() + "page/delete";
									break;
        case 'email_template' 	:   url = site_url() + "email_temp/delete";
									break;
        case 'people' 			:   url = site_url() + "people/delete";
									break;
		case 'organisation' 	:   url = site_url() + "organisation/delete";
									break;
        case 'post' 			:   url = site_url() + "posts/delete";
									break;                                                                        
		case 'location' 		:   url = site_url() + "location/delete";
									break; 																			
        case 'comments' 		:   url = site_url() + "comments/delete";
                                    break;
        case 'plan' 			:  	url = site_url() + "plan/delete";
                                    break;
        case 'faq' 				:  	url = site_url() + "faq/delete";
                                    break;
        case 'challenge' 		:  	url = site_url() + "organisation/challenge_delete";
                                    break;
        case 'order' 			:  	url = site_url() + "order/delete_order";
                                    break;
        case 'people_order' 	:  	url = site_url() + "order/delete_people_order";
                                    break;

        default     : '';
    }
    
    
    $.getJSON(url, {'id': id}, function (output) {
        console.log(output);
        if(output.record){
            refresh_datatable(module, output.record);
        }else{
             var table = $('.dynamicTable').DataTable();
              table.fnClearTable();
        }
        
        if(output.success){
            success_msg(output.message);
        }
        else{
            error_msg(output.message);
        }
        
    });
}


/* function to display record on listing page  after delete record. 
 * 
 * acccess public 
 * return void
 */
function refresh_datatable(module, output)
{
	switch($.trim(module)) {
        
        case 'user' 			:   users_table(output);
									break;
        case 'page' 			:   page_table(output);
									break;
        case 'email_template'           :   email_template_table(output);
									break;
        case 'organisation'             :   organisation_table(output);
									break;
        case 'people' 			:   people_table(output);
									break;  
        case 'post' 			:   post_table(output);
									break;                                                                     
        case 'comments' 		:   comments_table(output);
									break;  
        case 'block_people'             :   unblock_people_table(output);
									break;
	case 'location' 		:   location_table(output);
									break; 
	case 'plan' 			:   plan_table(output);
									break;                                                                                                                                          
        case 'faq' 				:   faq_table(output);
									break;
	case 'challenge' 		:   challenge_table(output);
									break;
	case 'order' 			:   order_table(output);
									break; 
	case 'people_order'             :   people_order_table(output);
									break;                                                        
        case 'people'                   :   block_people_table(output);
									break;
        default                 : '';

    }
    
    
}

function unblock_people_table(output)
{ 
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) { 
        
        if (output.hasOwnProperty(key)) {
              table.fnAddData([output[key].incheckbox,i++,output[key].first_name, output[key].last_name, output[key].gender, output[key].email_id, output[key].unblock,output[key].actions]);
        }
    }
   
}

function block_people_table(output)
{ 
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) { 
        
        if (output.hasOwnProperty(key)) {
              table.fnAddData([output[key].incheckbox,i++, output[key].first_name, output[key].last_name, output[key].gender, output[key].email_id, output[key].status, output[key].ut,output[key].actions]);
        }
    }
   
}

function comments_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox,i++,output[key].comments, output[key].postFKName, output[key].peoplesFKName, output[key].ut, output[key].status, output[key].actions]);
        }
    }
}


function page_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].title, output[key].url, output[key].created_at, output[key].updated_at, output[key].display_status, output[key].actions]);
        }
    }
}


function users_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([i++,output[key].user_image, output[key].username, output[key].emailId, output[key].addDate, output[key].lastLogin, output[key].status, output[key].actions]);
        }
    }
}



function people_table(output)
{ 
    alert(output); return false;
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            
            table.fnAddData([output[key].incheckbox,i++, output[key].first_name, output[key].last_name, output[key].gender, output[key].email_id, output[key].status, output[key].ut,output[key].actions]);
          
        }
       
    }
}



function post_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox,i++,output[key].file_name,output[key].title, output[key].file_type, output[key].total_votes, output[key].peoplesFKName,output[key].status, output[key].ut,output[key].actions]);
        }
    }
}


function email_template_table(output)
{
    var table = $('.dynamicTable').DataTable();
    var i = 1;
    table.fnClearTable();
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox, i++, output[key].title, output[key].created_at, output[key].updated_at, output[key].display_status, output[key].actions]);
        }
    }
}

function organisation_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i = 1;
    
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox, output[key].logo, output[key].name, output[key].sector, output[key].country, output[key].email_id, output[key].telephone, output[key].telephone, output[key].ut, output[key].display_status, output[key].actions]);
        }
    }
}
function plan_table(output)
{ 
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
			            
            table.fnAddData([output[key].incheckbox,i++,output[key].title, output[key].price, output[key].challenges, output[key].user_posts, output[key].validity,output[key].trial_period,output[key].status, output[key].ut,output[key].actions]);
          
        }
       
    }
}



function location_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i = 1;
    
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox, i++, output[key].name, output[key].country_code, output[key].created_at, output[key].updated_at, output[key].display_status, output[key].actions]);
        }
    }
}


function faq_table(output)
{ 
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i=1;
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            
            table.fnAddData([output[key].incheckbox,i++, output[key].question, output[key].answer, output[key].status, output[key].ut,output[key].actions]);
          
        }
       
    }
}


function challenge_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i = 1;
    
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox, i++, output[key].title, output[key].prizes, output[key].post_format, output[key].lang_name, output[key].min_votes, output[key].org_name, output[key].challenge_status, output[key].launch_date, output[key].actions]);
        }
    }
}


function order_table(output)
{
    var table = $('.dynamicTable').DataTable();
    table.fnClearTable();
    var i = 1;
    
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox, i++, output[key].org_name, output[key].price_plan, output[key].no_of_challenges, output[key].no_of_posts, output[key].customize_page, output[key].statistics, output[key].valid_from, output[key].expire_on, output[key].payment_status, output[key].actions]);
        }
    }
}



function people_order_table(output)
{
    var table = $('.dynamicTable2').DataTable();
    table.fnClearTable();
    var i = 1;
    
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
            table.fnAddData([output[key].incheckbox, i++, output[key].people_name, output[key].title, output[key].amount, output[key].currency_code, output[key].payment_status, output[key].ut, output[key].actions]);
        }
    }
}




/* function to change page status view. 
 * 
 * acccess public 
 * return void
 */
 
 function changeStatus(element, id, status, type) {
	 
	 var url;
	 switch($.trim(type)) {
        
        case 'page' 			:   url = site_url() + "page/changestatus";
									break;
        case 'admin_user'       :   url = site_url() + "users/changestatus"
                                    break;
        case 'email_template' 	:   url = site_url() + "email_temp/changestatus";
									break;
		case 'organisation' 	:   url = site_url() + "organisation/changestatus";
									break;
        case 'people'           :   url = site_url() + "people/changestatus";
									break;
        case 'post'             :   url = site_url() + "posts/changestatus";
									break;
		case 'location'         :   url = site_url() + "location/changestatus";
									break; 
        case 'comments'         :   url = site_url() + "comments/changestatus";
									break;                                                                
        case 'plan'           	:   url = site_url() + "plan/changestatus";
									break;
        case 'faq'           	:   url = site_url() + "faq/changestatus";
									break;                                                          

        default     : '';
    }
    
  
	 $(element).attr('src', base_url() + 'assets/images/loading2.gif');
	 $.ajax({
		  url: url,
		  type: 'POST',
		  data: {'id': id, 'status': status, 'type': type},
		  success: function(data) { 
			//called when successful
			$(element).parent().html(data);
		  }
	});
 }

/* function to select all checkbox in form . 
 * 
 * acccess public 
 * return void
 */

function checkAllCheckboxes(frm)
{ 

 var ctr=0;
 if(checked == false){checked = true}else{checked = false}
 for (var ctr= 0; ctr < frm.length; ctr++)
 { 
  
  field_name = frm.elements[ctr].name;

  if (field_name.indexOf("chk") != -1)
  { 
   if (frm.elements[ctr].checked == false)
    {
    frm.elements[ctr].checked = true;
   
    }else{
    frm.elements[ctr].checked = true;

    }
  }
 }
 document.getElementById('selectAllCheckBox').setAttribute("onclick","uncheckAllCheckboxes(document.dynamicForm)");

}
/* function to deselect all checkbox in form . 
 * 
 * acccess public 
 * return void
 */
function uncheckAllCheckboxes(frm)
{ 
 
 for (ctr=0; ctr < frm.length; ctr++)
 {
  field_name = frm.elements[ctr].name;
  if (field_name.indexOf("chk") != -1)
  {
  
    frm.elements[ctr].checked = false;

  }
 }
 document.getElementById('selectAllCheckBox').setAttribute("onclick","checkAllCheckboxes(document.dynamicForm)");

}



/* function to select all checkbox in order form . 
 * 
 * acccess public 
 * return void
 */

function checkPeopleCheckbox(frm)
{ 
 var ctr=0;
 if(checked == false){checked = true}else{checked = false}
 for (var ctr= 0; ctr < frm.length; ctr++)
 { 
  
  field_name = frm.elements[ctr].name;

  if (field_name.indexOf("chk2") != -1)
  { 
   if (frm.elements[ctr].checked == false)
    {
    frm.elements[ctr].checked = true;
   
    }else{
    frm.elements[ctr].checked = true;

    }
  }
 }
 document.getElementById('selectAllCheckBox2').setAttribute("onclick","uncheckPeopleCheckboxes(document.dynamicForm2)");

}
/* function to deselect all checkbox in form . 
 * 
 * acccess public 
 * return void
 */
function uncheckPeopleCheckboxes(frm)
{ 
 
 for (ctr=0; ctr < frm.length; ctr++)
 {
  field_name = frm.elements[ctr].name;
  if (field_name.indexOf("chk2") != -1)
  {
  
    frm.elements[ctr].checked = false;

  }
 }
 document.getElementById('selectAllCheckBox2').setAttribute("onclick","checkPeopleCheckbox(document.dynamicForm2)");

}



function goback(cObje){
    
    window.location=base_url()+"admin/"+cObje.id;
}

function redirect(url)
{
    window.location = url;
}

;// When the browser is ready...
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


;$(document).ready(function(){
    user_form_wizard();
    org_form_wizard();
});

function user_form_next()
{
    $(".bwizard-steps li:last a").trigger('click');
}

function org_form_next()
{
    //$(".step-first").trigger('click');
}


function org_tab(tab)
{
//    switch(tab) {
//        case '1' : $("#org_tabs ul li:first a").trigger('click'); break;
//        case '2' : $("#org_tabs ul li").eq(1).children('a').trigger('click'); break;
//        case '3' : $("#org_tabs ul li:last a").trigger('click'); break;
//        default : console.log(tab+' case not found.');
//    }
}


function user_form_wizard()
{
    var bWizardTabClass = 'bwizard-steps';



    var wiz = $('#admin-wizard');

    $('#admin-wizard').bootstrapWizard(
            {
                onNext: function (tab, navigation, index)
                {
                    alert('1243');
//                            if (index == 1)
//                            {
//                                return $("#form-add-user").valid();
//                                // Make sure we entered the title
////                                if (!wiz.find('#username').val()) {
////                                    alert('You must enter the username ');
////                                    wiz.find('#username').focus();
////                                    return false;
////                                }
//                            }
                },
                onLast: function (tab, navigation, index)
                {
                    // Make sure we entered the title
                    if (!wiz.find('#inputTitle').val()) {
                        alert('You must enter the product title');
                        wiz.find('#inputTitle').focus();
                        return false;
                    }
                },
                onTabClick: function (tab, navigation, index)
                {
                    return $("#form-add-user").valid();
                    // Make sure we entered the title
//                            if (!wiz.find('#username').val()) {
//                                alert('You must enter the username ');
//                                wiz.find('#username').focus();
//                                return false;
//                            }
                },
                onTabShow: function (tab, navigation, index)
                {
                    var $total = navigation.find('li:not(.status)').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;

                    if (wiz.find('.bar').length)
                    {
                        wiz.find('.bar').css({width: $percent + '%'});
                        wiz.find('.bar')
                                .find('.step-current').html($current)
                                .parent().find('.steps-total').html($total)
                                .parent().find('.steps-percent').html(Math.round($percent) + "%");
                    }

                    // update status
                    if (wiz.find('.step-current').length)
                        wiz.find('.step-current').html($current);
                    if (wiz.find('.steps-total').length)
                        wiz.find('.steps-total').html($total);
                    if (wiz.find('.steps-complete').length)
                        wiz.find('.steps-complete').html(($current - 1));

                    // mark all previous tabs as complete
                    navigation.find('li:not(.status)').removeClass('primary');
                    navigation.find('li:not(.status):lt(' + ($current - 1) + ')').addClass('primary');

                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total) {
                        wiz.find('.pagination .next').hide();
                        wiz.find('.pagination .finish').show();
                        wiz.find('.pagination .finish').removeClass('disabled');
                    } else {
                        wiz.find('.pagination .next').show();
                        wiz.find('.pagination .finish').hide();
                    }
                },
                tabClass: bWizardTabClass,
                nextSelector: '.next',
                previousSelector: '.previous',
                firstSelector: '.first',
                lastSelector: '.last'
            });

    wiz.find('.finish').click(function ()
    {
        alert('Finished!, Starting over!');
        wiz.find("a[data-toggle*='tab']:first").trigger('click');
    });
}


function org_form_wizard() {
	var bWizardTabClass = 'bwizard-steps';



    var wiz = $('#org-wizard');

    $('#org-wizard').bootstrapWizard(
            {
                onNext: function (tab, navigation, index)
                {
                },
                onLast: function (tab, navigation, index)
                {
                },
                onTabClick: function (tab, navigation, index)
                {   
                    if(index=='0'){
                        return $("#form-add-org-step-1").valid();
                    }
                    if(index=='1'){
                        return $("#form-add-org-step-2").valid();
                    }
                    if(index=='2'){
                        return $("#form-add-org-step-3").valid();
                    }
                },
                onTabShow: function (tab, navigation, index)
                {
                    var $total = navigation.find('li:not(.status)').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;

                    if (wiz.find('.bar').length)
                    {
                        wiz.find('.bar').css({width: $percent + '%'});
                        wiz.find('.bar')
                                .find('.step-current').html($current)
                                .parent().find('.steps-total').html($total)
                                .parent().find('.steps-percent').html(Math.round($percent) + "%");
                    }

                    // update status
                    if (wiz.find('.step-current').length)
                        wiz.find('.step-current').html($current);
                    if (wiz.find('.steps-total').length)
                        wiz.find('.steps-total').html($total);
                    if (wiz.find('.steps-complete').length)
                        wiz.find('.steps-complete').html(($current - 1));

                    // mark all previous tabs as complete
                    navigation.find('li:not(.status)').removeClass('primary');
                    navigation.find('li:not(.status):lt(' + ($current - 1) + ')').addClass('primary');

                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total) {
                        wiz.find('.pagination .next').hide();
                        wiz.find('.pagination .finish').show();
                        wiz.find('.pagination .finish').removeClass('disabled');
                    } else {
                        wiz.find('.pagination .next').show();
                        wiz.find('.pagination .finish').hide();
                    }
                },
                tabClass: bWizardTabClass,
                nextSelector: '.next',
                previousSelector: '.previous',
                firstSelector: '.first',
                lastSelector: '.last'
            });

    wiz.find('.finish').click(function ()
    {
        //alert('Finished!, Starting over!');
        //wiz.find("a[data-toggle*='tab']:first").trigger('click');
    });
	
}

