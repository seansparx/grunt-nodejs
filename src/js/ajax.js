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

