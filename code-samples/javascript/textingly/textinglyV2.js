

var getApiKey = function() {
	$.ajax({
	    type: "POST",
        url: textingly_base + "customer/get_api",
        success: function( data ) {
			
        },
        error: function(){
             alert( 'failure' );
        }
    }); 
}

var countCharacters = function() {
	
	var $textarea = $(this)
	var id = $(this).attr("id");
	var $countarea = $("#"+id+"_count")
	var outputString = $textarea.val();
	
	if(plan) {
		if(plan==1) {
			var limit = freeMsgLength;
		}
		else {
		    var limit = paidMsgLength;
		}
	}
	else {
		var limit = freeMsgLength;
	}
	var numerator
	$countarea.html(limit);
	var count = outputString.length;
	var remaining = limit-count;
	if(remaining<1) {
		numerator = '0'
		var message = $textarea.val();
		var replace = message.substring(0, limit);
		$textarea.val(replace);  
                $textarea.addClass("redFont");
	}
	else {
		numerator = remaining;
                $textarea.removeClass("redFont");
	}
	$countarea.html('<span class="numerator">'+numerator+'</span><span class="slash">/</span><span class="limit">'+limit+'</span>')

	var regexTester = new RegExp(supportedCharRegex,'g')
	
	if(! regexTester.test(outputString)){
		$countarea.append(' - Warning: Unsupported characters in message')
		$textarea.addClass('unsupportedChars');
	}else{
		$textarea.removeClass('unsupportedChars');
	}

	
	
}	

//*********************contact page*****************
//for add contact
var phoneAssistAdd = function() {
	var box = $(this).attr("id");
	var str = $(this).val();
	if(box == "ph1") {
		if(str.length==3) {
			$("#ph2").focus();
		}
	}
	else if (box == "ph2") {
		if(str.length==3) {
			$("#ph3").focus();
		}
	}
}

//for edit contact
var phoneAssistEdit = function() {
	var box = $(this).attr("id");
	var str = $(this).val();
	if(box == "contact_phone1") {
		if(str.length==3) {
			$("#contact_phone2").focus();
		}
	}
	else if (box == "contact_phone2") {
		if(str.length==3) {
			$("#contact_phone3").focus();
		}
	}
}


function removeContact( id ) {
        $.post ( textingly_base + "widgets/remove_contact/",
                 { id: id },
                 function ( data ) {
                     location.reload();
                 }
        );
}
function addContact( listId ) {
      window.location = textingly_base+"widgets/add_contact/"+listId;
}
function editContact( id , listId , phone ) {

      var urlinfo = id + '-' + listId + '-' + phone;
      window.location = textingly_base+"widgets/edit_contact/"+urlinfo;

}

//*******not sure where this is used.  see also save_contact
function insertContact( listId ) {
      var p1 = $("#contact_phone1").val();
      var p2 = $("#contact_phone2").val();
      var p3 = $("#contact_phone3").val();
      var p = '1'+p1+p2+p3;

      $.post ( textingly_base + "widgets/insert_contact/",
              { phone: p , listId : listId },
               function ( data ) {
                   location.reload();
               }
      );

      //var url = textingly_base + "widgets/contact/" + listId; 
      var url = textingly_base + "widgets"; 
      $("#main").load(url);
 
}
//*****************

$(function(){
    $("#selectall").live( 'click', function () {
		var isChecked = this.checked
		if(isChecked){
			$('#items').find('.del_arr').attr( "checked" , "checked" ).parent().addClass( "checked" );
		}else{
			$('#items').find('.del_arr').removeAttr("checked").parent().removeClass('checked');
		}
        	
    });
    
    $(".del_arr").click( function(){
        if( $(".del_arr").length == $(".del_arr:checked").length ) {
            $("#selectall").attr( "checked" , "checked" ).parent().addClass( "checked" );
        } else {
            $("#selectall").removeAttr("checked").parent().removeClass('checked');
        }
    });
    
    $("input.add_assist").live('keyup', phoneAssistAdd);
    $("input.edit_assist").live('keyup', phoneAssistEdit);

    $("#btn_edit_contact").live('click', function(e) {
    	e.preventDefault();
    	var contactId = $(this).attr('_id');
    	//hide previously opened edit dialog
    	$("li#edit_dialog").hide();
    	//show previous hidden 
    	var previous_edit_id = $("#hdn_contact_selected_id").val();
    	if(previous_edit_id != -1) {
    		$("#"+previous_edit_id).show();
    	}
    	$("#hdn_contact_selected_id").val(contactId);
    	//call to put current phone number in a hidden input
    	$.ajax({
    	    type: "POST",
            url: textingly_base + "contact/getPhoneNumber/",
            data: ({ 'contactId': contactId  }),
            success: function( data ) {
    			var phone = data.substr(1, 10);
    			$("#hdn_contact_current_phone").val(phone);
    			populate_edit_fields(contactId);
            },
            error: function(){
                 //alert( 'failure' );
            }
        }); 
    });
    
    function populate_edit_fields(contactId) {
    	var editLI = $("#edit_dialog_template").html();
    	$("#"+contactId).hide().after("<li id='edit_dialog'>"+editLI+"</li>");
    	$.ajax ({
			url:textingly_base+'contact/edit_popup/'+contactId,
			success:function(data){
				var Data = data.split("|");
                var contactPhone = Data[0];
                var contactFirst = Data[1];
                var contactLast = Data[2];
				var subPhone1 = contactPhone.substring(1,4);
                var subPhone2 = contactPhone.substring(4,7);
                var subPhone3 = contactPhone.substring(7);
                $("input#contact_phone1").val(subPhone1);
                $("input#contact_phone2").val(subPhone2);
                $("input#contact_phone3").val(subPhone3);
                $("input#contact_first").val(contactFirst);
                $("input#contact_last").val(contactLast);
                //insert_edit_list_item(contactId);
			}
		});
    }
    
    function insert_edit_list_item(contactId) {
    	//console.log(contactId);
    	//take $("#items") and add an <li> tag after the li tage that has _edit of contactId and then add inside that $("#edit_secton").html();
    	//var currentListTag = 
    	
    	
    	
    }
    
    $("#btn_save_edit_contact").live('click', function() {
    	save_contact();
    });
    
    $("#btn_cancel_edit_contact").live('click', function() {
    	//hide previously opened edit dialog
    	$("li#edit_dialog").hide();
    	//show previous hidden 
    	var previous_edit_id = $("#hdn_contact_selected_id").val();
    	$("#"+previous_edit_id).show();
    });
});

function save_contact() {  
	var campaignId  = $("#con_id").val();
    var listId = $("#list_id").val();

    var contactSelectedId = $("#hdn_contact_selected_id").val();
	if(contactSelectedId == -1) {
		contactSelectedId = "";
		var type = "add";
	}
	else {
		var type="edit";
	}
	
	//if edit then using the input boxes inline otherwise using the drop down area at the bottom
	if(type=="edit") {
		var ph1 = $("#contact_phone1").val();
	    var ph2 = $("#contact_phone2").val();
	    var ph3 = $("#contact_phone3").val();
	    var first = $("#contact_first").val();
	    var last = $("#contact_last").val();
	    //replace the edit area with what it was before in case there is an error
	    //if there is no error then it will be replaced automatically
	}
	else {
	    var ph1 = $("#ph1").val();
	    var ph2 = $("#ph2").val();
	    var ph3 = $("#ph3").val();
	    var first = $("#first_add").val();
	    var last = $("#last_add").val();
	    close_contact_button();
	}
    
	
	
	var currentPhone = ph1+ph2+ph3;
	//this gets entered when the edit button is pushed
	var previousPhone = $("#hdn_contact_current_phone").val();
				
	if(currentPhone == previousPhone) {
		var contactSelectedId = $("#hdn_contact_selected_id").val();
		$.post (textingly_base+"contact/edit_contact", 
				{'id': contactSelectedId,'first': first, 'last': last},
				function(data){
					if(checkAjaxData(data)){
						$('#maincontent').html( data );
                        	load_notify(14);
					}
					
				}
			);
	}
	else {
		var contactId = contactSelectedId;
	    var ph  = ph1+ph2+ph3;
	    if ( ph1 != '' && ph2 != '' && ph3 != '' ) {
	         $.ajax({
	             type: "POST",
	             url: textingly_base + "contact/insert_contact/",
	             data: ({ contactId: contactId, phone : ph , listId : listId , campaignId : campaignId, first: first, last: last}),
	             success: function( data ) {
		
					if(checkAjaxData(data)){
		                  if(data=="restricted") {
		                  	alertModal("This contact has been removed from your conversation. You can no longer send them messages.");
		                  }
		                  else if(data=="exists") {
		                    	alertModal("This contact is already in this conversation.");
		                    }
		                  else if(data=="failure") {
	                                        load_notify(11);
		                  } else {
		                	 
		                  		$('#maincontent').html( data );
	                            if(type=="edit") {
	                            	load_notify(14);
	                            }
	                            else {
	                            	load_notify(2);
	                            }
		                  		
		                  }
					}
	               
	             },
	             error: function(){
	                  //alert( 'failure' );
	             }
	
	         });
	
	    }
	}

}
function refresh_page() {
	location.reload();
}

function close_contact_button(){
	$('#add-contact').hide();
	$('#add_contact_button').show();
	
	$("#ph1").val('');
	$("#ph2").val('');
	$("#ph3").val('');
	
}

function insert_contact_button(){
	$('#add-contact').show()
	$('#add_contact_button').hide();
	var previous_edit_id = $("#hdn_contact_selected_id").val();
	$("#"+previous_edit_id).show();
	$('#hdn_contact_selected_id').val(-1);
	$('#hdn_contact_current_phone').val('');
	$("li#edit_dialog").hide();
	
}

function delete_contact() {
    var campaignId  = $("#con_id").val();
    var count = 0;

    $(".del_arr").each( function(i) {
  	 var checked_status = this.checked;    
         if ( checked_status == true ) {
              count = count + 1;
         }
    });
  
    var vars = {campaignId: campaignId};
    var headerMsg = "Confirm Contact Delete";
    if(count==1) {
    	var bodyMsg = "Are you sure you want to delete 1 Contact?";
    }
    else {
    	var bodyMsg = "Are you sure you want to delete "+count+" Contacts?";
    }
    var buttonText = "Delete";
    confirmModal(confirm_delete_contact, vars, headerMsg, bodyMsg, buttonText);
}

function confirm_delete_contact(vars) {
	var idString = '';
	var j = 1;
	$(".del_arr").each( function(i) {
	  	  var checked_status = this.checked;    
	         if ( checked_status == true ) {
	        	 var id = this.value;
	        	 if(j != 1) {
	              	idString +=  (i?',':''  )+ id;
	        	 }
	        	 else {
	        		 idString = idString + id;
	        	 }
	              j++;
	         }
	    }); 
	if( idString == '' ) return;
	
	$.ajax({
	    type: "POST",
        url: textingly_base + "contact/remove_contact/",
        data: ({ id : idString , campaignId : vars.campaignId  }),
        success: function( data ) {
	
			if(checkAjaxData(data)){
            	            $('#maincontent').html( data );
                            load_notify(7);
			}
        },
        error: function(){
             //alert( 'failure' );
        }
    }); 
	
}

//**************end js for contact page

function export2csv() {
    var conId = $("#con_id").val();
    var url = textingly_base + "contact/export2csv/" + conId;
    window.location = url; 
}
function report_messages_csv() {
    var conId     = $("#conversation_selector").val();
    var startDate = $("#start_date").val();
    var endDate   = $("#end_date").val();

    var tmpDateOne = startDate.split("/");
    var tmpDateTwo = endDate.split("/");
    startDate = tmpDateOne[2]+'-'+tmpDateOne[0]+'-'+tmpDateOne[1];
    endDate = tmpDateTwo[2]+'-'+tmpDateTwo[0]+'-'+tmpDateTwo[1];

    var url = textingly_base + "reports/exportMessages2csv/" + conId +"/" + startDate + "/" +endDate;
    window.location = url;
}
function report_responses_csv() {
    var conId = $("#conversation_selector").val();
    var startDate = $("#start_date").val();
    var endDate   = $("#end_date").val();

    var tmpDateOne = startDate.split("/");
    var tmpDateTwo = endDate.split("/");
    startDate = tmpDateOne[2]+'-'+tmpDateOne[0]+'-'+tmpDateOne[1];
    endDate = tmpDateTwo[2]+'-'+tmpDateTwo[0]+'-'+tmpDateTwo[1];

    var url = textingly_base + "reports/exportResponses2csv/" + conId +"/" + startDate + "/" +endDate;
    window.location = url;
}
function report_contacts_csv() {
    var conId = $("#conversation_selector").val();
    var startDate = $("#start_date").val();
    var endDate   = $("#end_date").val();

    var tmpDateOne = startDate.split("/");
    var tmpDateTwo = endDate.split("/");
    startDate = tmpDateOne[2]+'-'+tmpDateOne[0]+'-'+tmpDateOne[1];
    endDate = tmpDateTwo[2]+'-'+tmpDateTwo[0]+'-'+tmpDateTwo[1];

    var url = textingly_base + "reports/exportContacts2csv/" + conId +"/" + startDate + "/" +endDate;
    window.location = url;
}

function uploadcsv () {

    // $('#csvupload').toggle();
    if ( $('#csvupload').css('display') == 'none' ) {
         $('#csvupload').show();
    } else {
         $('#csvupload').hide();
    }
	
	$('#addnewcontact').parents('.button').toggle();
	
    $('#contact_phone_number').toggle();
    $('#multiple_contact').toggle();
    $('#individual_contact').toggle();
   
}

// This will be use in the future.  
$( function() {  
    $('#uploadbutt').click( function () {

         var listId  = $('#listId').val(); 
         var userfile = $('#userfile'); 

         // alert( listId );
         //  alert( userfile ); 

         $.ajax( {
               type: "POST",
               url: textingly_base + "contact/do_upload/",
               data: ({ listId : listId , userfile : userfile }),
               success: function( data ) {
                    $('#maincontent').html( data );
               },
               error: function(){
                    alert( 'failure' );
               }
         } ); 
    } );

} );


$( function () {
	
	$('#deletebutt').live('click',function(){
		
        var campaignId = $('#con_id').val();

		delconversationFromConversation(campaignId)
		
	})
	
    $('#editbutt').live( 'click' , function () {

         var campaignId = $('#con_id').val();

         $.ajax( {
               type: "POST",
               url: textingly_base + "conversation_info/setting_edit/",
               data: ({ campaignId : campaignId }),
               success: function( data ) {
					
					if(checkAjaxData(data)){
						$('#maincontent').html( data );
						load_conversation_info_edit_support()
					}
                    
               },
               error: function(){
                    alert( 'failure' );
               }
         } ); 

    } );

} );



var load_conversation_info_edit_dirty = false;
var load_conversation_info_edit_tmpurl = '';
var load_conversation_info_edit_tmpfunction = '';

function load_conversation_info_edit_support(){
		
	$("#maincontent").find('textarea,input[type=text],select').click(function(){
		if(load_conversation_info_edit_dirty) return;
		
		load_conversation_info_edit_dirty = true
		$('#sidebar a').click(function(){
			load_conversation_info_edit_tmpurl = $(this).attr('href')
			load_conversation_info_url_modal();
			return false;
		})
		
		$('#header_wrap a').click(function(){
			load_conversation_info_edit_tmpurl = $(this).attr('href')
			load_conversation_info_url_module();
			return false;
		})
		
	
		$('#savebutt1,#savebutt2,#savebutt3').click(function(){
			unload_conversation_info_edit_support()
		});
	 	$('#cancelbutt').click(function(){
			unload_conversation_info_edit_support()
		})
	})
}

function unload_conversation_info_edit_support(){
	$('#sidebar a').unbind('click')
	$('#header_wrap a').unbind('click')
	load_conversation_info_edit_tmpurl=''
	load_conversation_info_edit_tmpfunction=''
	load_conversation_info_edit_dirty = false
}

function load_conversation_info_url_modal(){
	if(load_conversation_info_edit_dirty){
		
		confirmModal(load_conversation_info_url_modal_callback, {}, 'Leaving edit screen', 'Are you sure you want to leave', 'Yes'	);
		return true;
	}
}


function load_conversation_info_url_modal_callback(){
	load_conversation_info_edit_dirty = false
	
	if(load_conversation_info_edit_tmpurl){
		window.location = load_conversation_info_edit_tmpurl
	}else{
		load_conversation_info_edit_tmpfunction()
		unload_conversation_info_edit_support()
	}
	
}




$( function () {
    $('#cancelbutt').live( 'click' , function (e) {
		load_conversation_info_edit_dirty = false
    	e.preventDefault;

         var campaignId = $('#con_id').val();

         $.ajax( {
               type: "POST",
               url: textingly_base + "conversation_info/setting_cancel/",
               data: ({ campaignId : campaignId }),
               success: function( data ) {
	
					if(checkAjaxData(data)){
						$('#maincontent').html( data );
					}
					
               },
               error: function(){
                    alert( 'failure' );
               }
         } );

    } );

} );


function deltriggers( c1 , c2 ) { 
    var vars = {c1: c1, c2: c2};
    var headerMsg = "Confirm Trigger Delete";
    var bodyMsg = "Are you sure you want to delete this trigger?";
    var buttonText = "Delete";
    confirmModal(confirm_deltriggers, vars, headerMsg, bodyMsg, buttonText);
}

function confirm_deltriggers(vars) {
	var commandId  = vars.c1;
	var campaignId = vars.c2;
	$.ajax( {
	   type: "POST",
	   url: textingly_base + "conversation_info/setting_delete/",
	   data: ({ commandId : commandId , campaignId : campaignId }),
	   success: function( data ) {
		
			if(checkAjaxData(data)){
	        	$('#TriggerRow'+commandId).remove(); 
                        load_notify(12);
			}
			
	   },
	   error: function(){
	        alert( 'failure' );
	   }
	});
}


$( function () {
     $('#addtriggersbutt').live( 'click' , function () {
		
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 8;
		var newId = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			newId += chars.substring(rnum,rnum+1);
		}
		
		var newTriggerHtml =$('#AddTriggersLegend').html()
		newTriggerHtml = newTriggerHtml.replace(/@@id@@/g,newId)
		
		$('#AddTriggersSection').append(newTriggerHtml)
		
     } ); 

} );

$( function () {
     $('#addkeywordsbutt').live( 'click' , function () {
         var campaignId = $('#con_id').val();
         // var customer_plan = $('#customer_plan').val();

         // if ( customer_plan > 1 ) {
              // window.location = textingly_base + "keywords/lists/" + campaignId;
              window.location = textingly_base + "keywords/cheatlists/" + campaignId;
         //} else {
         //     alert( 'Please upgrade your acount.' );
         //}

     } );
} );


$( function () {
     $('.saveCampaignAndCreate').live( 'click' , function () {
		 
		 if($('.unsupportedChars').length) {
			alertModal('Cannot save with unsupported characters')
			return
		 }
		
         var campaignId     = $('#con_id').val();


         var keywordcreate  = $('#keywordcreate').val();
         var text_greeting  = $('#text_greeting').val(); 
         var text_standard  = $('#text_standard').val(); 
         var max_optins  	= $('#maxoptinselect').val(); 
         var groupdata1     = keywordcreate + '<=>' + text_greeting + '<=>' + text_standard;  

         var groupdata2 = ''; 
         var all_triggers   = $('#all_triggers').val();
         if ( all_triggers > 0 ) {
              for ( i = 1 ; i <= all_triggers ; i++ ) { 
                    var commandId     = $('#com_Id'+i).val();
                    var triggers_text = $('#TriggerText'+i).val();
                    var response_text = $('#ResponseText'+i).val(); 
                    if ( i == 1 ) { 
                         groupdata2 = commandId+'|'+triggers_text+'|'+response_text;
                    } else {
                         groupdata2 += commandId+'|'+triggers_text+'|'+response_text;
                    }   
                    if ( i < all_triggers ) { 
                         groupdata2 += '<=>';
                    }   
              }
         }    
 
         var groupdata3 = ''; 
         var add_triggers   = $('#add_triggers').val();
         if ( add_triggers > 0 ) {
              for ( i = 1 ; i <= add_triggers ; i++ ) { 
                    var triggers_text = $('#AddTrigger'+i).val();
                    var response_text = $('#AddResponse'+i).val(); 
                    if ( i == 1 ) { 
                         groupdata3 = triggers_text+'|'+response_text;
                    } else {
                         groupdata3 += triggers_text+'|'+response_text;
                    }   
                    if ( i < add_triggers ) { 
                         groupdata3 += '<=>';
                    }   
              }
         }    

       var checkwords = 0;
       for (var i = 0; i < textinglybadwords.length; i++) {
            if ( keywordcreate == textinglybadwords[i] ) {
                 checkwords = 1;
            }
       }
       if ( checkwords == 1 ) {
            alertModal("Sorry we do not allow you to use impolite words !.");
       } else if ( checkwords == 0 ) {  
         $.ajax( {
               type: "POST",
               url: textingly_base + "conversation_info/setting_create/",
               data: ({ max_optins: max_optins, campaignId : campaignId , groupdata1 : groupdata1 , groupdata2 : groupdata2 , groupdata3 : groupdata3 }),
               success: function( data ) {
	
					if(checkAjaxData(data)){
 					   $('#maincontent').html( data );
                       load_notify(4);   
					}
					
               },
               error: function(){
                    alert( 'failure' );
               }
         } );
       }
 
     } );
} );

$( function () {
     $('.saveCampaign').live( 'click' , function () {
		 if($('.unsupportedChars').length ){
			alertModal('Cannot save with unsupported characters')
			return
		 }
		 
         var campaignId     = $('#con_id').val();

         var keywordId      = $('#keywordselect').val();
         var text_greeting  = $('#text_greeting').val(); 
         var text_standard  = $('#text_standard').val(); 
         var max_optins  	= $('#maxoptinselect').val(); 
         var groupdata1     = keywordId + '<=>' + text_greeting + '<=>' + text_standard;  
		 var saveForExistingTriggers = true
         var groupdata2 = ''; 

         // var all_triggers   = $('#all_triggers').val();
         var all_triggers   = $('#maincontent').find('.TriggerRow').length -1;  // -1 because of legend 
         all_triggers   -= $('#AddTriggersSection').find('.TriggerRow').length;   
		
		
         if ( all_triggers > 0 ) {
              for ( i = 1 ; i <= all_triggers ; i++ ) {
                    var commandId     = $('#com_Id'+i).val();
                    var triggers_text = $('#TriggerText'+i).val();
                    var response_text = $('#ResponseText'+i).val(); 
					if(!triggers_text || !response_text)
						saveForExistingTriggers = false
                    if ( i == 1 ) {
                         groupdata2 = commandId+'|'+triggers_text+'|'+response_text;
                    } else {
                         groupdata2 += commandId+'|'+triggers_text+'|'+response_text;
                    }
                    if ( i < all_triggers ) {
                         groupdata2 += '<=>';
                    }
              }
         }
 		
         var groupdata3 = ''; 
		 var $addTriggerRows = $('#AddTriggersSection').find('.TriggerRow')
		 
		$addTriggerRows.each(function(i){
			var $this = $(this)
			var triggers_text = $this.find('input').val();
            var response_text = $this.find('textarea').val(); 
            
            if ( i ) {
                 groupdata3 += '<=>';
            }

            groupdata3 += triggers_text+'|'+response_text;
            
			
		})
		
		
		if(!saveForExistingTriggers){
			alertModal('Please fill in all required information for existing triggers')
			return;
		}
		
         $.ajax( {
               type: "POST",
               url: textingly_base + "conversation_info/setting_save/",
               data: ({ max_optins: max_optins, campaignId : campaignId , groupdata1 : groupdata1 , groupdata2 : groupdata2 , groupdata3 : groupdata3 }),
               success: function( data ) { 
					if(checkAjaxData(data)){
                    	$('#maincontent').html( data );
	                    load_notify(4);   
					}
               },
               error: function(){
                    alert( 'failure' );
               }
         } ); 

    
     } ); 
} ); 

function delkeyword( c1 ) {

	var vars = {c1: c1 };
    var headerMsg = "Confirm Keyword Delete";
    var bodyMsg = "Are you sure you want to delete this keyword? This action cannot be undone.";
    var buttonText = "Delete";
    confirmModal(confirm_delkeyword, vars, headerMsg, bodyMsg, buttonText);
}

function confirm_delkeyword (vars) {
		var keywordId  = vars.c1;
     	
		var url = "keywords/key_delete/"
		var $returnArea = $('#maincontent')
		
		//Twilio Hack
		// TODO: Make more robust
		if(_xTwilio._bIsTwilioPage){
			url = 'apps/twilio/deleteKeyword'
			$returnArea = $('#twilio_phonenumber_list');
		}
		
       $.ajax( {
            type: "POST",
            url: textingly_base + url,
            data: ({  keywordId : keywordId }),
            success: function( data ) {
				
				if(checkAjaxData(data)){
                 	           $returnArea.html( data );
                                   load_notify(8);
				}
				
            },
            error: function(){
                 alert( 'failure' );
            }
       } );
}

function delconversation( id ) {

         var vars = {campaignId: id};
         var headerMsg = "Confirm Conversation Delete";
         var bodyMsg = "Are you sure you want to delete this conversation? This will make your conversation inactive, and you will no longer be able to send messages to contacts in this conversation, and you will not receive any responses they text in?";
         var buttonText = "Delete";
         confirmModal(confirm_delconversation, vars, headerMsg, bodyMsg, buttonText);
        

       
}
function confirm_delconversation(vars) {
	
	var campaignId  = vars.campaignId;
	$.ajax( {
	    type: "POST",
	    url: textingly_base + "conversation/conversation_delete/",
	    data: ({ campaignId : campaignId }),
	    success: function( data ) {
		
			if(checkAjaxData(data)){
	         	$('#maincontent').html( data );
                        load_notify(6);
                //update conversation counts via JS
                $.post ( textingly_base + "conversation/countConversation",
                        function ( data ) {
                            $("input#sb_conversationstotal").val(data);
                        }
               );
			}
			
	    },
	    error: function(){
	         alert( 'failure' );
	    }
	} );
}

function delconversationFromConversation( id ) {

         var vars = {campaignId: id};
         var headerMsg = "Confirm Conversation Delete";
         var bodyMsg = "Are you sure you want to delete this Conversation?";
         var buttonText = "Delete";
         confirmModal(confirm_delconversation_from_conversation, vars, headerMsg, bodyMsg, buttonText);
       
}

function confirm_delconversation_from_conversation(vars){
	
	var campaignId  = vars.campaignId;
	$.ajax( {
	    type: "POST",
	    url: textingly_base + "conversation/conversation_delete_from_conversation/",
	    data: ({ campaignId : campaignId }),
	    success: function( data ) {
		
			if(checkAjaxData(data)){
       			window.location = textingly_base + 'conversation/lists/1/';  
			}
					
	    },
	    error: function(){
	         alert( 'failure' );
	    }
	} );
}

function deldashcon( id ) {

         var campaignId = id;

         if ( confirm('Please confirm delete.') ) {
            $.ajax( {
                 type: "POST",
                 url: textingly_base + "dashboard/conversation_delete/",
                 data: ({ campaignId : campaignId }),
                 success: function( data ) {
	
					if(checkAjaxData(data)){
                      $('#maincontent').html( data );
					}
					
                 },
                 error: function(){
                      alert( 'failure' );
                 }
            } );
         }
}

$( function () {
     $('#addkeywordbutt').live( 'click' , function () {
         var customerId = $('#custId').val();
         var addkeyword = $('#addkeyword').val();
  
         var customer_plan  = $('#customerplan').val();  
         var keywordstotal = $('#keywordstotal').val(); 
         var checkwords = 0;    
    
         if ( addkeyword.length >= 3 ) { 

           for (var i = 0; i < textinglybadwords.length; i++) { 
                if ( addkeyword == textinglybadwords[i] ) {
                     checkwords = 1; 
                } 
           }

           if ( checkwords == 1 ) {
 
                 $.ajax( {
                     type: "POST",
                     url: textingly_base + "keywords/key_bad/",
                     data: ({ customerId : customerId , addkeyword : addkeyword }),
                     success: function( data ) {
                          $('#maincontent').html( data );
                     },
                     error: function(){
                         alert( 'failure' );
                     }
                 } );
               

           } else if ( checkwords == 0 ) { 
 
             if ( customer_plan == 'paidCustomer' && keywordstotal >= 1 ) {
                //see payKeyword function
				
				
                $.ajax( {
                     type: "POST",
                     url: textingly_base + "keywords/key_dup/",
                     data: ({ customerId : customerId , addkeyword : addkeyword }),
                     success: function( data ) {
                         if ( data == 0 ) {
                            var vars = {keyword: addkeyword};
                            var headerMsg = "Confirm Keyword";
                            var keywordUppercase = addkeyword.toUpperCase();
                            var bodyMsg = "You have selected "+keywordUppercase+". You will be charged $10/month.";
                            var buttonText = "Purchase";
                            confirmModal(payKeyword, vars, headerMsg, bodyMsg, buttonText);
                         } else if ( data == 1 ) {
							
                             $.ajax( {
                                 type: "POST",
                                 url: textingly_base + "keywords/key_errormessage/",
                                 data: ({ customerId : customerId , addkeyword : addkeyword }),
                                 success: function( data ) {
                                   $('#maincontent').html( data );
                                 },
                                  error: function(){
                                   alert( 'failure' );
                                 }
                             }); 

                         }  
                     },
                     error: function(){
                         alert( 'failure' );
                     }
                 } );
	   
             } else {  
           
                 $.ajax( {
                     type: "POST",
                     url: textingly_base + "keywords/key_add/",
                     data: ({ customerId : customerId , addkeyword : addkeyword }),
                     success: function( data ) {
                          $('#maincontent').html( data ); 
                          load_notify(3);
                     },
                     error: function(){
                         alert( 'failure' );
                     }
                 } );
         
             } 

           }

         } else {
           alertModal( 'Keyword cannot be lower than 3 characters.' );
         }
     
     } );  
} );

//function called after customer confirms they'd like to buy a keyword - sends to credit card page
function payKeyword (vars) {

	$.ajax( {
        type: "POST",
        url: textingly_base + "keywords/create_session/",
        data: ({ addkeyword : vars.keyword }),
        success: function( data ) {
            window.location = textingly_base + 'payment';  
        },
        error: function(){
            alert( 'failure' );
        }
    } );    
}


function unlink ( c1 , c2 ) {
	var vars = {c1: c1, c2: c2};
    var headerMsg = "Confirm Unlink";
    var bodyMsg = "Are you sure you want to unlink this Keyword? This will make your conversation inactive, and you will no longer be able to send or receive messages in this conversation.";
    var buttonText = "Unlink";
    confirmModal(confirm_unlink, vars, headerMsg, bodyMsg, buttonText);
    
}

function confirm_unlink(vars) {
	
	var url = "keywords/key_unlink/";
	var $returnArea = $('#maincontent')
	
	//Twilio Hack
	// TODO: Make more robust
	if(_xTwilio._bIsTwilioPage){
		url = 'apps/twilio/unlinkKeyword'
		$returnArea = $('#twilio_phonenumber_list');
	}
	
	var keywordId  = vars.c1;
    var customerId = vars.c2;
    
        $.ajax( {
             type: "POST",
             url: textingly_base + url,
             data: ({ customerId : customerId , keywordId : keywordId }),
             success: function( data ) {
				
				if(checkAjaxData(data)){
		           $returnArea.html( data ); 
	               load_notify(10);
				}
             },
             error: function(){
                  alert( 'failure' );
             }
        } );
}


function link ( id ) {

    var i = id;

    if ( $('#myconversation'+i).css('display') == 'none' ) {
         $('#notyetlink'+i).hide();
         $('#myconversation'+i).show();
    } else {
         $('#notyetlink'+i).show();
         $('#myconversation'+i).hide();
    }

}


function register( ) {
  
  var customer_plan  = $('#customerplan').val();  
  var keywordstotal = $('#keywordstotal').val(); 

  if ( customer_plan == 'unpaidCustomer' && keywordstotal >= 1 ) {
       alertModal("You must <a href='"+textingly_base+"pricing'>upgrade</a> to a premium plan to register additional keywords.");
  // } else if ( customer_plan == 'paidCustomer' && keywordstotal >= 1 ) {
       // alert('You have selected KEYWORD. This keyword will be 10$/month.' )
  } else {  
       if ( $('#addkeybox').css('display') == 'none' ) {
            $('#addkeybox').show();
            $('#registerbutt').hide();
       }
  } 
	$('#addkeyword').focus();
}

function cancelkey( ) {

    if ( $('#addkeybox').css('display') == 'block' ) {
         $('#addkeyword').val('');
         $('#addkeybox').hide();
         $('#registerbutt').show();
    }

}
/////////////////////////////////////////

function keywordAlert() {

     var selectKeyId = $('#keywordselect').val();
     for (var i = 0; i < textinglydata.keywordinfo_static.length; i++) {
          if ( textinglydata.keywordinfo_static[i].Id  == selectKeyId ) {
               if ( textinglydata.keywordinfo_static[i].linkedstatus == 1 ) {
            	   alertModal("This keyword is currently linked to an existing conversation. Unlinking will make that conversation inactive, and you will no longer be able to send or receive messages in that conversation. ");
               } 
          }
     }

} 

function select_link_conversation( id ) {

         var campaignId = $('#conversationselect'+id).val();  
         var keywordId  = id;
 
         $.ajax( {
                 type: "POST",
                 url: textingly_base + "keywords/key_check/",
                 data: ({ campaignId : campaignId , keywordId : keywordId }),
                 success: function( data ) {
	
					if(checkAjaxData(data)){
	                      if ( data == 1 ) {
	                    	  var vars = {  'campaignId' : campaignId , 'keywordId' : keywordId };
	                  	    var headerMsg = "Confirm Unlink";
	                  	    var bodyMsg = "This coversation already linked to other key word. Please confirm to unlink exsiting key";
	                  	    var buttonText = "Confirm";
	                  	    confirmModal(do_link_conversation, vars, headerMsg, bodyMsg, buttonText);
	                      } else if ( data == 0 ) {
	                    	  var vars = { 'campaignId' : campaignId , 'keywordId' : keywordId };
	                           do_link_conversation( vars );
	                      } 
					}
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );
}
   
function do_link_conversation( vars ) {
	
	var campaignId = vars.campaignId;
	var keywordId = vars.keywordId;
	
	var url = "keywords/key_link/"
	var $returnArea = $('#maincontent')
	
	//Twilio Hack
	// TODO: Make more robust
	if(_xTwilio._bIsTwilioPage){
		url = 'apps/twilio/linkKeyword'
		$returnArea = $('#twilio_phonenumber_list');
	}
 
         $.ajax( {
                 type: "POST",
                 url: textingly_base + url,
                 data: ({ campaignId : campaignId , keywordId : keywordId }),
                 success: function( data ) {
					if(checkAjaxData(data)){
                      $returnArea.html( data );
					  load_notify(9);
					}
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

} 


function subkeyword() {
    if ( $('#subkeyword').css('display') == 'none' ) {
         $('#subkeyword').show();
    } else {
         $('#subkeyword').hide();
    }
    window.location = textingly_base + 'keywords/lists/';   
}

function domoredd() {
    if ( $('#dohidedd').css('display') == 'none' ) {
         $('#dohidedd').show();
         $('#domoredd').hide();
    }
}

function dolessdd() {
    if ( $('#dohidedd').css('display') == 'block' ) {
         $('#dohidedd').hide();
         $('#domoredd').show();
    }
}


function domore() {
    if ( $('#dohide').css('display') == 'none' ) {
         $('#dohide').show();
         $('#domore').hide();
    }
}

function doless() {
    if ( $('#dohide').css('display') == 'block' ) {
         $('#dohide').hide();
         $('#domore').show();
    }
}


function load_conversation_pg( p ) {

         var page   = p
		
         $.ajax( {
                 type: "POST",
                 url: textingly_base + "conversation/lists_pg/",
                 data: ({  page : page }),
                 success: function( data ) {
					if(checkAjaxData(data)){
						$('#maincontent').html( data );
					}
                      
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}

function load_conversation_info( id ) {

	var campaignId = id;

	$.ajax( {
        type: "POST",
        url: textingly_base + "conversation_info/settings/",
        data: ({ campaignId : campaignId }),
        success: function( data ) {
			if(checkAjaxData(data)){
				$('#maincontent').html( data );
			}
            
        },
        error: function(){
             alert( 'failure' );
        }
	} );
	
	
}



function load_contact( id ) {
		
		load_conversation_info_edit_tmpfunction = function(){load_contact(id)};
		
		if(load_conversation_info_url_modal())
			return false;
		
         var campaignId = id;

         $.ajax( {
                 type: "POST",
                 url: textingly_base + "contact/lists/",
                 data: ({ campaignId : campaignId , page : 1 }),
                 success: function( data ) {	
						if(checkAjaxData(data)){
	                        $('#maincontent').html( data );
	                        $('#maincontent').find('input[type=checkbox]').uniform();
						}
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } ); 

}

function load_contact_index_pg(page){
	
         $.ajax( {
                 type: "POST",
                 url: textingly_base + "contact/lists_index_pg/",
                 data: ({ page : page }),
                 success: function( data ) {
						if(checkAjaxData(data)){
		                      $('#contact_page').html( data );
		                      $('#contact_page').find('input[type=checkbox]').uniform();
						}
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}

function load_contact_pg( id , p ) { 

         var campaignId = id;
         var page = p;

         $.ajax( {
                 type: "POST",
                 url: textingly_base + "contact/lists_pg/",
                 data: ({ campaignId : campaignId , page : page }),
                 success: function( data ) {
						if(checkAjaxData(data)){
		                      $('#contact_page').html( data );
		                      $('#contact_page').find('input[type=checkbox]').uniform();
						}
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}


function load_conversationhistory( id ) {

		load_conversation_info_edit_tmpfunction = function(){load_conversationhistory(id)};

		if(load_conversation_info_url_modal())
			return false;
			
         var campaignId = id;

         $.ajax( {
                 type: "POST",
                 url: textingly_base + "conversationhistory/lists/",
                 data: ({ campaignId : campaignId }),
                 success: function( data ) {
					if(checkAjaxData(data)){
						$('#maincontent').html( data );
					}
                      
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}


function load_contacthistory( id ) {
		
         var contactId = id;

         $.ajax( {
                 type: "POST",
                 url: textingly_base + "contacthistory/lists/",
                 data: ({ contactId : contactId }),
                 success: function( data ) {
                      $('#maincontent').html( data );
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}

function load_contacthistory_pg( id , p ) {

         var contactId = id;
         var page = p;

         $.ajax( {
                 type: "POST",
                 url: textingly_base + "contacthistory/lists_pg/",
                 data: ({ contactId : contactId , page : page }),
                 success: function( data ) {
	
					if(checkAjaxData(data)){
                    	$('#contact_page').html( data );
                    	$('#contact_page').find('input[type=checkbox]').uniform();
					}
					
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}



function addconversation() { // Sidebar

    var conversationstotal = $('#sb_conversationstotal').val();
    var customerplan       = $('#sb_customerplan').val();

    if ( customerplan == 'unpaidCustomer' && conversationstotal >= 1 ) {
    	
    	if($.browser.msie && $.browser.version=="7.0"){
    		alert("You must upgrade to a premium plan to create more than one conversation.");
    	}
    	else {
    		alertModal("You must <a href='"+textingly_base+pricing_upgrade_url+"'>upgrade</a> to a premium plan to create more than one conversation.");
    	}
    	
    } else { 
         window.location = textingly_base  + "wizard/one"; 
    }

}

function sendmessage_dash() {
  window.location = textingly_base  + "sendmessage/";
}

function sendmessage( Id , Type ) {

         $.ajax( {
                 type: "POST",
                 url: textingly_base + "sendmessage/check_sendmessage_status/",
                 data: ({ Id : Id , Type : Type }),
                 success: function( data ) {
                          if ( data == 0 ) {
                          //either no link, no convo, or no contact
                          alertModal("You are missing items needed to send a Message.  <a href='/wizard/one'>Click Here.</a>");
                          } else if ( data == 1 ) {
                               window.location = textingly_base  + "sendmessage/listing/"; 
                          } else if ( data == 'A' ) {
                               window.location = textingly_base  + "sendmessage/listing/"; 
                          } else if ( data == 'B' ) {//no contact but linked
                          alertModal("You will need to add a Contact to send the Message to.");
                          } else if ( data == 'C' ) {//contact but not linked
                          alertModal("<a href='/keywords/lists'>Link your Keyword</a> to this Conversation before sending Message");
                          } else if ( data == 'D' ) {//no contact or link
                          alertModal("Add a Contact then <a href='/keywords/lists'>link your Keyword</a> to this Conversation before sending a Message");
                          } else {
                               alert('Do not allow to send mesage (2)');//debug parameter should never come up
                          }
                 },
                 error: function(){
                      alert( 'failure' );
                 }
         } );

}


///// For old widget //////

function saveContact( id , listId ) {
      var p1 = $("#contact_phone1").val();
      var p2 = $("#contact_phone2").val();
      var p3 = $("#contact_phone3").val();
      var p = '1'+p1+p2+p3;
   
      $.post ( textingly_base + "widgets/save_contact/",
              { id: id , phone: p , listId : listId },
               function ( data ) {
                   location.reload();
               }
      );

      //var url = textingly_base + "widgets/contact/" + listId; 
      var url = textingly_base + "widgets"; 
      $("#main").load(url); 
}


function createConversation( ) {
       var keyword_select   = $('#keyword_select').val();
       var convo_name       = $('#convo_name').val();  
       var customerId       = $('#customerId').val(); 
       var newKeyword       = $('#newKeyword').val();

        if( newKeyword==1 ) {
                var keyword_purchase = $("#keyword_purchase").val();
        }      

      $.post ( textingly_base + "widgets/create_conversation/",
              { keyword_select: keyword_select, convo_name: convo_name , customerId : customerId , newKeyword : newKeyword , keyword_purchase : keyword_purchase },
               function ( data ) {
                   location.reload();
               }
      );

      var url = textingly_base + "widgets"; 
      $("#main").load(url); 

}

function removeConversation( id ) {
        $.post ( textingly_base + "widgets/remove_conversation/",
                 { id: id },
                 function ( data ) {
                     location.reload();
                 }
        );
}
function editConversation( id ) {
      window.location = textingly_base+"widgets/edit_conversation/"+id;
}
function updateConversation() {
   var id    = $('#Id').val();
   var title = $('#title').val();
   var conversation_greeting = $('#conversation_greeting').val();
   var default_response = $('#default_response').val();

    $.post ( textingly_base + "widgets/update_conversation/",
             { id: id , title: title , conversation_greeting: conversation_greeting, default_response: default_response },
               function ( data ) {
                   location.reload();
               }
    );

    var url = textingly_base + "widgets"; 
    $("#main").load(url); 

}

function toSendMessage( id , type ) {
    var urlinfo = id + "-" + type;
    window.location = textingly_base+"widgets/message/"+urlinfo;
}



_xContacts = {

        _nContactId:0,

        /*************
        *
        *       Init calls
        *
        *************/
        setReports:function  (type, contactId) {
                xContacts._sType = type
                xContacts.setBinds()
                xContacts._nContactId = contactId
        },


        changePagination:function(p_nNewPage, p_xThis){
                _xContacts.ContactsAjaxCall('page',p_nNewPage)
        },


        ContactsAjaxCall:function(ajaxType, page){

                var data = {
                        contactId: xContacts._nContactId,
                        page : (page?page:1)
                }

                $.ajax({
                        type: "POST",
                        url: textingly_base + "contacts/lists/",
                        data: data,
                        success: function( data ) {
                           xContacts.handleAjaxCall(data)
                        },
                        error: function(){
                           alert( 'failure' );
                        }
               })

        },

        handleAjaxCall:function(jsonString){

                var htmlObject = $.parseJSON(jsonString)
                $('#maincontent').html( htmlObject.page );

        }

}

function updatePreferences() {
	($('#reminder').is(':checked')==true) ? reminder=1 : reminder=0;
	($('#newsletter').is(':checked')==true) ? newsletter=1 : newsletter=0;
	($('#summary').is(':checked')==true) ? summary=1 : summary=0;
	($('#contactAdded').is(':checked')==true) ? contactAdded=1 : contactAdded=0;
    
	$.post ( textingly_base + "customer/update_preferences",
            {reminder:reminder, newsletter:newsletter, summary:summary,contactAdded:contactAdded }, 
            function ( data ) {
            	$("#success").html('You have sucessfully update your preferences');
            }
   );
}


function ajaxOverlay(targetString){
	
	var height = $(targetString).height();
	
	var style = "opacity:.2;position:absolute; top:0; left:0; background-color:#ffffff; /* for IE */ filter:alpha(opacity=40); /* CSS3 standard */ opacity:0.4; width:100%; overflow-x: hidden; height:"+height+"px;";
            
	// $(targetString).append('<div id="ajaxOverlay" style="'+style+'" class="ajaxOverlay"><img src="'+textingly_base+'images/ajax-spin.gif"></div>');
	$(targetString).append('<div id="ajaxOverlay" style="'+style+'" class="ajaxOverlay"><div id="reportsLoader"><div>Loading...</div><img src="'+textingly_base+'images/ajax-loader-reports.gif"></div></div>');
	
}


function ajaxOverlayClose(){
	
	$('#ajaxOverlay').remove()
	
}

function checkAjaxData(data){
	if(data == '-1'){
		window.location = textingly_base+'auth/login'
		return false;
	}else{
		return true;
	}
		
}

function load_notify ( n ) {
 var num = 19;

 		if(n==15) {
 			for ( i = 1 ; i <= num ; i++ ) {
	           if(i!=16) {
 				remove_notify( i );
	           }
 			} 
 		}
 		else if(n==16) {
 			for ( i = 1 ; i <= num ; i++ ) {
	           if(i!=15) {
 				remove_notify( i );
	           }
 			} 
 		}
 		else {
 			for ( i = 1 ; i <= num ; i++ ) {
	            remove_notify( i );
	      } 
 		}

      if ( $('#alert_notify'+n).css('display') == 'none' ) {
           $('#alert_notify'+n).removeClass('hide_notify');
           $('#alert_notify'+n).addClass('show_notify');
           $.scrollTo('#alert_notify'+n);
      }
}
function remove_notify ( n ) {
      if ( $('#alert_notify'+n).css('display') == 'block' ) {
           $('#alert_notify'+n).removeClass('show_notify');
           $('#alert_notify'+n).addClass('hide_notify');
      }
}

function load_notify_addon( n ) {
      if ( $('#alert_notify'+n).css('display') == 'none' ) {
           $('#alert_notify'+n).removeClass('hide_notify');
           $('#alert_notify'+n).addClass('show_notify');
           $.scrollTo('#alert_notify'+n);
      }
}
function remove_notify_addon ( n ) {
      if ( $('#alert_notify'+n).css('display') == 'block' ) {
           $('#alert_notify'+n).removeClass('show_notify');
           $('#alert_notify'+n).addClass('hide_notify');
      }    
}     





function validateInput(field, human, type) {
	var errorMsgCount = 0;
	$("div#modal_error").empty();
		if(type=="text") {
			for(var i=0;i<field.length;i++) {
				var value1 = $("#"+field[i]).val();
				var value = $.trim(value1);
				
				if((value=="")||(value==" ")) {
					var errorMsg = "The "+human[i]+" field is required. ";
					errorMsgCount = errorMsgCount + 1;
					$('div#modal_error').text(errorMsg);
				}
			}
		}
		else {//for phone numbers
		var errorMsg = "";
		for(var i=0;i<field.length;i++) {
			value1 = $("#"+field[i]).val();
			var value = $.trim(value1);
				var errorMsg="";
				if(i==2) {//last section of phone number
						if(value.length<4 || value==0) {
							errorMsg = errorMsg + "Please check the " + human[i] + " for accuracy. ";
							$('div#modal_error').text(errorMsg);
							errorMsgCount = errorMsgCount + 1;
						}
				}
				else {
						if(value.length<3  || value==0) {
							errorMsg = errorMsg + "Please check the " + human[i] + " for accuracy. ";
							$('div#modal_error').text(errorMsg);
							errorMsgCount = errorMsgCount + 1;
						}
				}
			}
		}
		if(errorMsgCount==0) {
			return true;
		}
		else {
			return false;
		}
	}



$(function(){
	$('#main_register').find('input[name=main_register_type]').change(function(){
		var value = $(this).val()
		if(value=='business'){
			$('#business_form_item').show()
		}else{
			$('#business_form_item').hide()
		}
		
	})

//*******************for admin pages
	var adminStart = function() {
	var start = $(".start").val();
	var end = $(".end").val();

	$.post (textingly_base+"admin/access_session",//url
			{'type': 'send', 'name': 'dateStart', 'value': start},//params
			function(data){
		});
}
var adminEnd = function() {
	var start = $(".start").val();
	var end = $(".end").val();
	
	$.post (textingly_base+"admin/access_session",//url
			{'type': 'send', 'name': 'dateEnd', 'value': end},//params
			function(data){
		});
}

var resetAdminTrack = function(e) {
	e.preventDefault();
	
	$.post (textingly_base+"admin/access_session",//url
			{'type': 'send', 'name': 'tracking3', 'value': ''},//params
			function(data){
				$.post (textingly_base+"index.php/ajax/access_session",//url
						{'type': 'send', 'name': 'tracking2', 'value': ''},//params
						function(data){
							$.post (textingly_base+"index.php/ajax/access_session",//url
									{'type': 'send', 'name': 'tracking1', 'value': ''},//params
									function(data){
										location.reload();
								});
					});
		});
	
}

var adminTrack1 = function() {
	var tracking1 = $('#tracking1>option:selected').html();
	$.post (textingly_base+"admin/access_session",//url
			{'type': 'send', 'name': 'tracking1', 'value': tracking1},//params
			function(data){
		});
}

var adminTrack2 = function() {
	var tracking2 = $('#tracking2>option:selected').html();
	$.post (textingly_base+"admin/access_session",//url
			{'type': 'send', 'name': 'tracking2', 'value': tracking2},//params
			function(data){
		});
}

var adminTrack3 = function() {
	var tracking3 = $('#tracking3>option:selected').html();
	$.post (textingly_base+"admin/access_session",//url
			{'type': 'send', 'name': 'tracking3', 'value': tracking3},//params
			function(data){
		});
}

var sendDateAdmin = function() {
	location.reload();
}
//*********************end admin pages
	
	
	
	
})
