

$(function() {
		$("a#btn_delete").click(deleteButton);
		//generic add/edit are for commands, campaigns, lists
		$("a#btn_add_edit").click(addEditButton);
		//contact add function still on list_detail page
		//$("a#btn_add").click(function);
		$("a#btn_edit_contact").click(editContact);
		//only one save button should exist on the page
		$("#btn_save_add_edit").click(saveAddEditButton);
		$("input#btn_cancel").click(cancelButton);
		$("img#btn_close").click(cancelButton);
		$("a#btn_message_show").click(showMessageBox);
		//need to create function editMessageBox
		//$("a#btn_message_edit").click(editMessageBox);
		$("input#btn_message_send").click(sendMessageButton);
		$("input#btn_message_send_confirm").click(sendMessageButtonConfirmed);
		$(".cancelMessage").click(resetMessageBox);
		$("a#btn_link_keyword").click(linkKeyword);
		//$("a#btn_link_list").click(linkList);
		$("input#link").click(linkButton);
		//keyword count variable that determines whether to show "purchase" button on keyword controller
		$("#keyword_purchase_show_here").click(showKeywordPurchase);
		$("#keyword_purchase_show").click(showKeywordPurchase);
		//$("#keyword_show_wizard").click(showKeywordWizard);
		//this attaches the counter to the textarea within the same parent div
		//$("textarea.attach_counter").focus(wizardAttachCounter);
		$("#populate_billing").click(populateBilling);
		//need to add validate class to all submit buttons
		$(".validate").click(validateFormElement);
		$('input#keyword_purchase').keyup(purchaseKeyword);
		$("#btn_keyword_purchase").click(purchaseKeywordButton);			
		$("input#keywords").change(selectedKeyword);
		$("#conversation_list").change(changeMessagesConvoList);
		$("#command_list").change(changeFilterRefresh);
		//These next two are set up to deal with scope issues with paginateUtility.refresh and mysqlTimeStampToDate
		$("#testRefresh").click(utilityRefresh);
		//$("#update").click(savePreviousUrl);
		initiatePagination('false', 0);
		//changeResponseFilter();
		//$(".ui-widget-content").trigger('click');	
		//$("#commandFilter").hide();
		initiateTooltips();
		$(".tooltip_keyword").addClass('tooltip-keyword-wizard');
		$(".submitWait").click(creditWaitImage);
		$("#submitForm").click(creditWaitImage);
		$("#upgradeSubmit").click(creditWaitImage);
		initiatePricing();
		//move cursor as customer fills in phone number
		$("input.cell-field").keyup(phoneAssist);
		$("#createConvo").click(checkCampaignCount);
		$("input.short19").keyup(checkInputCount);
		
		//for deleting en masse
		$("#checkAll").click(checkAll);
		$("#deleteAll").click(deleteAll);
		//for the datepicker on the admin page
		if(textingly_url1=="admin") {
			$("#dateStart").datepicker();
			$("#dateEnd").datepicker();
			$("#dateStart").change(adminStart);
			$("#dateEnd").change(adminEnd);
			$("#tracking1").change(adminTrack1);
			$("#tracking2").change(adminTrack2);
			$("#tracking3").change(adminTrack3);
			$("#send").click(sendDate);
			$("#resetAdminTrack").click(resetAdminTrack);
			
		}
		if (textingly_url1 == 'message') {
			initiateMessageBlock();
		}
		
		
		
		//for attaching event listeners to fields of wizard
		if(textingly_url1=="wizard") {
			
			$("#keyword_purchase").keyup(wizardTransfer);
			$("#response").keyup(wizardTransfer);
			$("#command").keyup(wizardTransfer);
			$("#command").keyup(preventSpaces);
			$("#command_response").keyup(wizardTransfer);
			//This shows further explanations only on the first command and command response
			$("span#explanation").removeClass('hide');
			//$("#duplicate_command").click(wizardDuplicate);
			//$("#counting").click(counting)
			$("#btn_save_keyword_command").click(wizardSaveKeywordCommand);
			$("#edit_keyword").click(editKeyword);
			$('#keyword_select').change(changeKeyword);
			//*********for spacing of modal boxes on wizard/two
			$(".tooltip_conversation").addClass('tooltip-convo-wizard');
			$("#wizard_response").addClass('no-padding');
			$("#response_text").addClass('no-padding');
			$("#response_count").addClass('padding-left');
			$(".tooltip_auto").addClass('margin-bottom');
			$(".tooltip_auto_responder").addClass('tooltip-auto-wizard');
			$("#closeModal").click(closeModal);
		}
			
		var copyModalError = function() {
			var value = $(this).val();
			$("#modal_error_copy").val(value);
		}
		
		//for attaching event listeners to fields of landing pages
		initiate_landing_focus();
		if((textingly_url1=="auth")&&textingly_url2=="three") {
			$("#submitForm").click(function() {
				$("#submitFormHidden").trigger("click");
			});
			$(".form_error").children().addClass("errorAuthThree");
		}
		
		if((textingly_url1=="page")||(textingly_url2=="create_convo_register")
				||(textingly_url2=="create_account_main")
				||(textingly_url1=="auth")||(textingly_url2=="create_account_pricing")) {
			//attempt to use fancybox html function to make phone modal ping chartbeat
//			if((textingly_url1=="page")&&(textingly_url2=="one")){
//				$("a#pageTwo").fancybox();
//			}
			$("#btn_save_landing").click(saveLandingPrelim);
			$("#btn_save_contact_landing").click(setLanding);
			$("#response").one('focus', function() {
				$("#response").val('');
			});
			$("#keyword_purchase").one('focus', function() {
				$("#keyword_purchase").val('');
			});
			
			
			//round two
			$("#btn_save_create_convo").click(saveCreateConvoPrelim);
//			if(textingly_url2=="create_convo_main") {
//					$("#keyword_purchase").focus();
//			}
			$(".contactModal").click(function(e) {
				e.preventDefault;
				//persist keeps tooltips from sticking around after modal close
				$("#contactModal").modal({persist:true});
			});
			if((textingly_url2=="create_convo_main")||(textingly_url2=="create_account_main")
					||(textingly_url1=="auth")||(textingly_url2=="create_account_pricing")) {
				rotateSMS();
			}
			//these keep the inputs on landing pages from exceeding a certain length (denoted by number below)
			//short 19 is also used in main site so it's up above
			$("input.short28").keyup(checkInputCount);
			$("input.short10").keyup(checkInputCount);
			$("input.short16").keyup(checkInputCount);
			$("input.short04").keyup(checkInputCount);
			$("input.short18").keyup(checkInputCount);
			$("input.short17").keyup(checkInputCount);
			$("input.short20").keyup(checkInputCount);
			
			if(textingly_url2=="create_convo_register") {
				showCreate();
			}
		}
		
		if((textingly_url1=="wizard")&&(textingly_url2=="one")) {
			$("#response").one('focus', function() {
				$("#response").val('');
				$("#response_copy").html('');
			});
			$("#command_response").one('focus', function() {
				$("#command_response").val('');
				$("#command_response_copy").html('');
			});
			$("#command").one('focus', function() {
				$("#command").val('');
				$("#command_copy").html('');
			});
			$("#keyword_purchase").one('focus', function() {
				$("#keyword_purchase").html('');
			});
		}	
		
});




var checkCampaignCount = function(e) {
	e.preventDefault();
	var count = $(this).attr("_campaignCount");
	if(count>0) {
		if(plan==1) {
			alertModal("You must upgrade your plan to add more Conversations.");
		}
		else {
			window.location = textingly_base+"index.php/wizard/one";
		}
	}
	else {
		window.location = textingly_base+"index.php/wizard/one";
	}
}

var closeModal = function(e) {
	e.preventDefault();
	$.modal.close();	
}
var initiateMessageBlock = function() {
	var convoBlock = $("#messageConvoBlock").val();
	var contactBlock = $("#messageContactBlock").val();
	if(convoBlock == 0) {
		var msg = "You need to create a Conversation to send a Message"
		var button = "<a href='"+textingly_base+"index.php/wizard/one' class='modalLinks'>Create Conversation</a>";
		$(".modal-text").html(msg);
		$(".modal-button").html(button);
		$("#messageModal").modal();
	}
	else {
		var contact = contactBlock.split("|");
		var contactCount = contact[0];
		var listId = contact[1];
		if(contactCount < 1) {
			var msg = "You need to add a Contact to send a Message";
			var button = "<a href='"+textingly_base+"index.php/lists/detail/"+listId+"' class='modalLinks'>Add a Contact</a>";
			$(".modal-text").html(msg);
			$(".modal-button").html(button);
			$("#messageModal").modal();
		}
	}
	
}
var showCreate = function() {
	if(textingly_url3=="created") {
		$("#convo").show();
		$("#phone").show();
	}
}
var sendDate = function() {
	location.reload();
}
var adminStart = function() {
	var start = $(".start").val();
	var end = $(".end").val();

	$.post (textingly_base+"index.php/ajax/access_session",//url
			{'type': 'send', 'name': 'dateStart', 'value': start},//params
			function(data){
		});
}
var adminEnd = function() {
	var start = $(".start").val();
	var end = $(".end").val();
	
	$.post (textingly_base+"index.php/ajax/access_session",//url
			{'type': 'send', 'name': 'dateEnd', 'value': end},//params
			function(data){
		});
}

var resetAdminTrack = function(e) {
	e.preventDefault();
	
	$.post (textingly_base+"index.php/ajax/access_session",//url
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
	$.post (textingly_base+"index.php/ajax/access_session",//url
			{'type': 'send', 'name': 'tracking1', 'value': tracking1},//params
			function(data){
		});
}

var adminTrack2 = function() {
	var tracking2 = $('#tracking2>option:selected').html();
	$.post (textingly_base+"index.php/ajax/access_session",//url
			{'type': 'send', 'name': 'tracking2', 'value': tracking2},//params
			function(data){
		});
}

var adminTrack3 = function() {
	var tracking3 = $('#tracking3>option:selected').html();
	$.post (textingly_base+"index.php/ajax/access_session",//url
			{'type': 'send', 'name': 'tracking3', 'value': tracking3},//params
			function(data){
		});
}

function clearSMS() {
	//just at beginning, keeps looping over the one set of content
	//if(num!=4){
		for(var i=0; i<4; i++) {
			if(i==3) {
				$(".animate"+i).children().fadeOut(function() {
					for(var i=0; i<4; i++) {
							$(".animate"+i).empty();
					}
					rotateSMS();
				});
			}
			else {
				$(".animate"+i).children().fadeOut();
			}
		}
}

function rotateSMS (){
	//console.log("rotateSMS was just called with number: "+num);
	//var myConvos=new Array("test1","test2","test3","test4");
	

		var myConvos=new Array("what are your hours today?",
				"We are open from 10am to 7pm M-F. Text SALE for special offers and great savings!",
				"SALE",
				"Today only, get 25% off any purchase of $50 or more. Mention \"Textingly\" and save an additional 10%!");
	
	//starting timing
	var timing = 1000;
		for(var i=0; i<myConvos.length; i++) {
			//console.log("the time for inside the rotateSMS is" + timing);
			$(".animate"+i).append("<div></div");
			$(".animate"+i).children().html(myConvos[i]);
			$(".animate"+i).children().addClass('hide');
			setTimeout( "writeSMS('"+myConvos[i]+"',"+i+")", timing);
			//this is the timing between secions
			timing= timing+2000;
		}
}


function writeSMS (text, section) {
	//console.log("writeSMS was just called with text: "+text);
	var section = section;
	var text = text;
	$(".animate"+section).children().fadeIn(2000, function() {
		if(section==3) {
			clearSMS();
		}
	});
	//$(".animate"+section).html(text);
}



var initiate_landing_focus = function () {
	if(textingly_url1=="auth"){
		var page = textingly_url1;
	}
	else {
		var page = textingly_url2;
	}
	switch (page){
	case "auth":
		$("#email").focus();
	break;
	case "create_account_main":
		$("#email").focus();
	break;
	case "create_account_payment":
		$("#first").focus();
	break;
	case "create_convo_register":
		$("#email").focus();
	break;
	case "create_convo_payment":
		$("#first").focus();
	break;
	}
}
var setEnter = function () {
	var toggle= 1;
	if (toggle) {
		
		toggle=0;
	}
	else {
		
		toggle=1;
	}
}

var deleteAll = function(e) {
	e.preventDefault();
	var type = $(".checkbox").attr("_type");
	var checkArray = [];
	var count=0;
	$(".checkbox").each(function() {
		if($(this).is(':checked')==true) {
			var check = $(this).attr("_id")
			checkArray.push(check);
			count++
		}
	});
	if(count==0) {
		alertModal("You haven't selected any items to delete.")
	}
	else {
		var uType = type.substr(0, 1).toUpperCase() + type.substr(1);
		var confirmMsg = "Are you sure you want to delete the selected "+uType+"s?";
		var vars=[type, checkArray];
		confirmModal(confirmDeleteAll, vars, confirmMsg);
	}
}

var checkAll = function() {
		if($(this).is(':checked')==true) {
			$('input').attr('checked', true);
		}
		else {
			$('input').attr('checked', false);
		}
}
var initiatePricing = function() {
	switch(plan)
    {
	    case "1": planWritten = "one";
	    break;
    	case "2": planWritten = "two";
        break;
		case "3": planWritten = "three";
        break;
		case "4": planWritten = "four";
        break;
		case "5": planWritten = "five";
        break;
		case "6": planWritten = "six";
        break;
        default: planWritten ="new";
    }	
	if(planWritten!="new"){
		$("."+planWritten).hide();
	}
	
}

var creditWaitImage = function() {
	$("#imageWait").show();
	$("#imageWaitLanding").show();
	$("#imageWaitUpgrade").show();
}

var closeTooltips = function() {
		
}

var initiateTooltips = function() {
	//for tooltip
	$('div#qtype, img#qtype').each(function() {
		$(this).css("cursor","pointer"); 
		var type = $(this).attr('_type');
		//if (()&&())
		switch(type)
        {
			//********IMPORTANT: html entities must be entered for non-letter characters.  see http://www.w3schools.com/tags/ref_entities.asp
           

			case "contact": content = "A Contact is a phone number that receives your text messages.";
            break;
            case "keyword": content= 'A Keyword will show who your messages are from. Your customers can also text in to that Keyword to reach you.';
            break;
            case "conversation": content = "A Conversation groups the text messages you send to your Contacts.";
            break;
            case "auto-responder": content = "Auto-Responders are words you create that your customers can text that return different responses.";
            break;
            case "convo_greeting": content = "A Conversation Greeting is the first text message your Contact receives when they text your Keyword.";
            break;
            case "default_response": content = "A Default Response is the text message your Contact receives when they send a text message to your Conversation that is not recognized by any of your Auto-Responders.";
            break;
            case "response": content = "A Response is a message your Contact receives when they text your Conversation.";
            break;
            case "message": content = "A Message is a text message that you send to your Contacts.";
            break;
            case "auto_responder_response": content = "An Auto-Responder Response will be sent to your customers when they text one of your Auto-Responders.";
            break;
            default: content ="Stay tuned for more information!";
        }	
			      $(this).qtip({
			         content: content,
			         style: {
			    	  name: 'cream', 
			    	  tip: 'bottomLeft'},
			     position: {
			    	  	corner: {
			         target: 'topRight',
			         tooltip: 'bottomLeft'
			      	}
			      }
			      });
			   });
	
}

var changeKeyword = function() {
	var keywordLink = "";
	if(plan>1) {
		keywordLink = "<br /><a href=\""+textingly_base+"index.php/keyword\" class='link'>Purchase another Keyword.</a>";
	}
	else {
		keywordLink = "<br /><a href=\""+textingly_base+"index.php/pricing\" class='link'>Upgrade Plan for Multiple Keywords.</a>";
	}
	var valueLinkAndKeyword = $(this).val();
	var linkedAndKeyword = valueLinkAndKeyword.split("|");
	var linked = linkedAndKeyword[0];
	var keyword = $('option:selected').html();
	if(keyword!="Select Your Keyword"){
		if(linked==1){
			$("#note").html("Note: This will unlink your Keyword from it's current Conversation."+keywordLink);
		}
		$("#keyword_purchase_copy").html(keyword);
	}
}

var contactModalWizard = function(e) {
	e.preventDefault;
	//persist keeps tooltips from sticking around after modal close
	$("#add_contact_box").modal({persist:true});
	
}
var preventSpaces = function(event) {
	  if (event.keyCode == 32) {
		  $("#sorryWizard").html("Sorry, spaces are not allowed");
		  var trim1 = $("#command").val();
		  var trim = $.trim(trim1);
		$("#command").val(trim);
		return false;
	  }
    }  
	  
var wizardSaveKeywordCommand = function() {
	//for blocking wizard add for 1> convo for free plan.  need to talk to dave
//	if(plan==1) {//plan is determined by plan that is entered in session byt setPlan()
//		$.post (textingly_base+"index.php/ajax/count_conversation",//url
//				{custId: textingly_custId},//params
//				function(data){
//					if(data>0) {
//						//alert(data);
//						alertModal("You must upgrade your plan to add more Conversations.");
//					}
//			});
//	}
	var newKeyword = $("#hdn_new_keyword").val();
	if(newKeyword==1) {
		var keyword = $("#keyword_purchase").val();
		var keywordCode = 'none';
	}
	else {
		var keyword = $('option:selected').html();
		var keywordCode = $("#keyword_select").val();
	}	

	var auto = $("#command").val();
	var auto_response = $("#command_response").val();
	var convo_response = $("#response").val();
	var namespace = ($("#keyword_namespace").val() == null) ? -1 : $("#keyword_namespace").val();
	 $("#sorry").empty();
	//validate for empty fields
	if(newKeyword==1) {
		var modalField = new Array("keyword_purchase","response", "command", "command_response");
	}
	else {
		var modalField = new Array("keyword_select","response", "command", "command_response");
	}
		var modalHuman = new Array("Keyword","Conversation Greeting","Auto-Responder", "Response to Auto-Responder");
	

		var modalType = "text";

		var validate = validateModal(modalField, modalHuman, modalType); 
		
  if(validate) {
	  if(newKeyword==1) {
		  $.post(textingly_base+"index.php/ajax/check_keyword",//url
			        {'keyword': keyword, 'namespace': namespace},//params, //params
			        function(data){
			        	$("#sorry").empty();
				        //if($("#keyword_purchase").val() != '') {
					        if(data.count > 0) {
					        	$("span#sorry").html('Sorry, keyword unavailable.');
					        	$("span#sorry").addClass('red');
					        return;
					        }
					        else {
					        	$("div#modal_error").empty();
					      	  $("#contact_wizard_modal").modal({persist: true});
					      	$.post (textingly_base+"index.php/ajax/addWizardInfo",//url
									{keywordCode: keywordCode, keyword: keyword, auto: auto, auto_response: auto_response, convo_response: convo_response, newKeyword: newKeyword},//params
									function(data){
											var Data = data.split("|");
											var listId = Data[0];
											var conversationId = Data[1];
											//stores data in hidden inputs for sending the message
											$("#hdn_keyword").val(keyword.toUpperCase());
											$("#hdn_list_id").val(listId);
											$("#hdn_conversation_id").val(conversationId);	
							});
					        }
					     
			        }, 
			     "json");
	  }
	  else {
	  $("div#modal_error").empty();
	  $("#contact_wizard_modal").modal({persist: true});
		 $.post (textingly_base+"index.php/ajax/addWizardInfo",//url
					{keywordCode: keywordCode, keyword: keyword, auto: auto, auto_response: auto_response, convo_response: convo_response, newKeyword: newKeyword},//params
					function(data){
							var Data = data.split("|");
							var listId = Data[0];
							var conversationId = Data[1];
							//stores data in hidden inputs for sending the message
							$("#hdn_keyword").val(keyword.toUpperCase());
							$("#hdn_list_id").val(listId);
							$("#hdn_conversation_id").val(conversationId);	
			});
	  }//end if for new keyword
	}// end validation
}

var wizardTransfer = function() {
	 $("#sorryWizard").empty();
	 $("span#sorry").removeClass('red');
	var value = $(this).val();
//	var type=$(this).attr("id");
//	if (type=="keyword_purchase") {
//		$("#keyword_purchase").val(value);
//	}
	var senderId = $(this).attr("id");
	var destination = senderId + "_copy";	
	if(destination=="keyword_purchase_copy") {
		value = value.toUpperCase();
	}
	$("#"+destination).html(value);
}

var wizardDuplicate = function () {
	var counter = $("div.counter");
	var count = counter.length;
	var next = count+1;
	var elements = $("#command_repeat1").html();
	$("#command_repeat").append("<div id='#command_repeat"+next+"' class='counter'>"+elements+"</div>");
	var elementsCopy = $("#command_repeat_copy1").html();
	$("#command_repeat_copy").append("<div id='#command_repeat"+next+"'>"+elementsCopy+"</div>");
	$("#command_repeat"+next).children().each(function() {
		//if($(this).attr("id")) {
			//var oldId = $(this).attr("id");
			//var newId = oldId + ;
		//}
	});
	
	
}

var counting = function () {
	var counter = $("div.counter");
	var count = counter.length;
}

var initiatePagination = function(subset, num_total) {
//CSS notation: be sure to add .clearLeft to li where page buttons live.  otherwise longer messages overlap.
var perPage = 10;
var typePage = ""
var subset = subset;
var num_total = num_total;
	if ((textingly_url1=="campaign")&&(textingly_url2=="response")) {//conversation/response
		var pageTotal = num_total;
		$.post (""+textingly_base+"index.php/ajax/get_conversation_responses",
             {campaignId: textingly_url3},
			 function(data){
				initiatePaginationVariablesCampaign(data);
				}, "json");
	
		 function initiatePaginationVariablesCampaign(pageTotal){
			paginateUtility = new PaginationUtility();
			paginateUtility.items_per_page = perPage;
			paginateUtility.total = pageTotal;
			paginateUtility.sort = 'date_Timestamp';
			paginateUtility.sortOrder = 'desc';
			paginateUtility.pageSelectCallback = pageselectCallback;
			paginateUtility.refresh();
		}
	}
	else if (textingly_url1=="message") {//message main
		$.post (""+textingly_base+"index.php/ajax/get_conversation_messages_sent",
             function(data){
			if(subset=='false') {
				var pageTotal = data;
			}
			else {
				var pageTotal = num_total;
			}
			
				initiatePaginationVariablesMessage(pageTotal);
				}, "json");
		 function initiatePaginationVariablesMessage(pageTotal){
			paginateUtility = new PaginationUtility();
			paginateUtility.items_per_page = perPage;
			paginateUtility.total = pageTotal;
			paginateUtility.sort = 'date_Added';
			paginateUtility.sortOrder = 'desc';
			paginateUtility.pageSelectCallback = pageselectCallback;
			//poplate the table
			paginateUtility.refresh();
		}
	}
	
	else if ((textingly_url1=="lists")&&(textingly_url2=="detail")){//list contacts
		$.post (""+textingly_base+"index.php/ajax/get_contact_list",
             {listId: textingly_url3},
			 function(data){
				var pageTotal = data;
				//console.log(pageTotal);
				initiatePaginationVariablesList(pageTotal);
				}, "json");
		 function initiatePaginationVariablesList(pageTotal){
			
			paginateUtility = new PaginationUtility();
			paginateUtility.items_per_page = perPage;
			paginateUtility.total = pageTotal;
			paginateUtility.sort = 'date_Added';
			paginateUtility.sortOrder = 'desc';
			paginateUtility.pageSelectCallback = pageselectCallback;

			//poplate the table
			paginateUtility.refresh();
		}
		
	}
	else if ((textingly_url1=="lists")&&(textingly_url2=="contactDetail")){//list contact details
		$.post (""+textingly_base+"index.php/ajax/get_contact_message_history",
             {contactId: textingly_url4},
			 function(data){
				var pageTotal = data;
				initiatePaginationVariablesContactDetail(pageTotal);
				}, "json");
		 function initiatePaginationVariablesContactDetail(pageTotal){
		 
			paginateUtility = new PaginationUtility();
			paginateUtility.items_per_page = perPage;
			paginateUtility.total = pageTotal;
			paginateUtility.sort = 'date';
			paginateUtility.sortOrder = 'desc';
			paginateUtility.pageSelectCallback = pageselectCallback;

			//poplate the table
			paginateUtility.refresh();
		}
		
	}
	
/*
**************From plugin documentation*************
 * Callback function that displays the content.
 * Gets called every time the user clicks on a pagination link.
 * @param {int}page_index New Page index
 * @param {jQuery} jq the container with the pagination links as a jQuery object
*********************************************************
 */ 
}
 
function pageselectCallback(page_index, jq) {
	var wait = "<img src=\""+textingly_base+"images/ajaxspinner.gif\"/>";
    $('#Searchresult').html(wait);
	if ((textingly_url1=="campaign")&&(textingly_url2=="response")) {//conversation/response
		var campaignId = textingly_url3;
			$.post (""+textingly_base+"index.php/ajax/responsePage", 
    		{'pageIndex': page_index, 'itemsPerPage': paginateUtility.items_per_page, 'sort':paginateUtility.sort, 'sortOrder':paginateUtility.sortOrder, 'campaignId': campaignId, 'type': $("#conversation_list").val()}, //params
				
    		function(data) {
					var newcontent = '';
					var result = eval(data);
					var keywordCount = 0;
					var commandCount = 0;
					var freeCount = 0;
					var generalCount = 0;
					var allCount = 0;
					for(row in result) {
						//if((result[row].int_ResponseType!=15)&&(result[row].int_ResponseType!=16)) {
							newcontent += "<li><div class = \"list_item_cont\">";
							if(plan==1){
								newcontent += "<div class = \"list_item_text\"><a href='"+textingly_base+"index.php/lists/contactDetail/"+result[row].fk_CampaignId+"/"+result[row].fk_ContactId+"' class='list_item_title'>(XXX) XXXX-"+result[row].str_PhoneNumber.substring(7,11)+"</a></div>";
							}
							else {
							newcontent += "<div class = \"list_item_text\"><a href='"+textingly_base+"index.php/lists/contactDetail/"+result[row].fk_CampaignId+"/"+result[row].fk_ContactId+"' class='list_item_title'>("+result[row].str_PhoneNumber.substring(1, 4)+") "+result[row].str_PhoneNumber.substring(4, 7)+"-"+result[row].str_PhoneNumber.substring(7,11)+"</a></div>";
							}
							newcontent += "<div class = \"list_item_text\">"+result[row].str_MO+"</div>";
							newcontent += "<div class = \"list_item_text\">"+mysqlTimeStampToDate(result[row].date_Timestamp).format("m/dd/yy h:MM TT")+"</div>";
//							if(result[row].int_ResponseType==12) {
//								keywordCount++;
//								newcontent += "<div class = \"list_item_stat\">Keyword</div>";
//							}
//							else if(result[row].int_ResponseType==13) {
//								freeCount++;
//								newcontent += "<div class = \"list_item_stat\">Free Form</div>";
//							}
//							else if((result[row].int_ResponseType==14)||(result[row].type=='Command')) {
//								commandCount++;
//								newcontent += "<div class = \"list_item_stat\">Command</div>";
//							}
//							else {
//								generalCount++;
//								newcontent += "<div class = \"list_item_stat\">General</div>";
//							}
							
							//newcontent += "<div class = \"list_item_action\"><a href=\"\" _message=\""+result[row].Id+"\" value=\"delete\" id=\"btn_delete\" class=\"delete_text\" /> </a></div>";
							
							if((result[row].bol_Trash != null) && (result[row].bol_Trash != 1)){
								newcontent += "<div class = \"list_item_action\"><a href=\"#\" class=\"message_text mr_25\" _type=\"individual\" _id=\""+result[row].fk_ContactId+"\" value=\"message\" id=\"btn_message_show\" _campaignId="+textingly_url3+" ></a></div>";
							}    
							newcontent += "</div></li>";  
						//}
						allCount = keywordCount + commandCount+ freeCount + generalCount;
						$("#keywordCount").attr("_message", keywordCount);
						$("#commandCount").attr("_message", commandCount);
						$("#freeCount").attr("_message", freeCount);
						$("#generalCount").attr("_message", generalCount);
						$("#allCount").attr("_message", allCount);
					}   
					// Replace old content with new content
					$('#Searchresult').html(newcontent);
					//register message listeners
					$("a#btn_message_show").click(showMessageBox);
				 }, "json");
	}
	else if (textingly_url1=="message") {//message main
			$.post (""+textingly_base+"index.php/ajax/conversation_messages",
				{'pageIndex': page_index, 'itemsPerPage': paginateUtility.items_per_page, 'sort':paginateUtility.sort, 'sortOrder':paginateUtility.sortOrder, 'campaignId': $("#conversation_list").val()}, //params
				function(data){
					
					var newcontent = '';
					var result = eval(data);
					var scheduledCount = 0;
					
					for(row in result) {
						newcontent += "<li><div class = \"list_item_cont\">";
						newcontent += "<div class = \"list_item_text\">"+result[row].str_Message+"</div>";
						newcontent += "<div class = \"list_item_text\">"+result[row].str_Title+"</div>";
						if(result[row].bol_Sent != 1) {

							var send_time = mysqlTimeStampToDate(result[row].date_DeliveryDate);
							
							var fifteenMinutesFromNow = new Date();
							fifteenMinutesFromNow.setMinutes(fifteenMinutesFromNow.getMinutes()+15);
							
							if((send_time.getTime() > (new Date()).getTime()) && (send_time.getTime() < fifteenMinutesFromNow)) {
								newcontent += "<div class = \"list_item_stat\">Pending</div>";
								var sent = "Pending";
								continue;
							} else {
								newcontent += "<div class = \"list_item_stat\">Scheduled</div>";
								var sent = "Scheduled";
							}

						} else {
							newcontent += "<div class = \"list_item_stat\">Sent</div>";
							var sent = "Sent";
						}
						newcontent += "<div class = \"list_item_text\">"+mysqlTimeStampToDate(result[row].date_DeliveryDate).format("m/dd/yy h:MM TT")+"</div>";
						newcontent += "<div class = \"list_item_text\">"+mysqlTimeStampToDate(result[row].date_Added).format("m/dd/yy h:MM TT")+"</div>";
						if(sent!="Sent") {
						newcontent += "<div class = \"list_item_action\"><a href=\"#\" _type='message' _id=\""+result[row].msgId+"\" value=\"\" id=\"btn_delete\" class=\"delete_text\" /> </a></div>";
						//newcontent += "<div class = \"list_item_action\"><a href=\"#\" _type='message' _id=\""+result[row].Id+"\" _active=\""+sent+"\" value=\"edit\" id=\"btn_message_edit\" _edit=\"edit\" class=\"edit_text\" /> </a></div>";
						scheduledCount = scheduledCount + 1;
						}
						newcontent += "</div></li>";        
					}

					//hide actions header if no messages have them
					if(scheduledCount==0) {
					$(".actions").empty();
					}
					
					// Replace old content with new content
					$('#Searchresult').html(newcontent);
					
					//register delete and edit listeners
					$("a#btn_delete").click(deleteButton);
					//$("a#btn_message_edit").click(editMessageBox);

			}, "json");

		 
	}
	else if ((textingly_url1=="lists")&&(textingly_url2=="contactDetail")){//list contacts
			$.post (""+textingly_base+"index.php/ajax/contact_message_history",
            {'pageIndex': page_index, 'itemsPerPage': paginateUtility.items_per_page, 'sort': paginateUtility.sort, 'sortOrder':paginateUtility.sortOrder, 'contactId': textingly_url4}, //params
            function(data){
                var newcontent = '';
                var result = eval(data);

                for(row in result) {
                	newcontent += "<li><div class = \"list_item_cont\">";
                	newcontent += "<div class = \"list_item_text\">"+result[row].message+"</div>";
                	newcontent += "<div class = \"list_item_text\">"+result[row].type;
                	var direction = ((result[row].type == "Command") || (result[row].type == "General")) ? "left" : "right";
                	newcontent += "<img src=\""+textingly_base+"images/arrow-"+ direction +".jpg\" class=\"ml_10\"/>";
                	newcontent += "</div>";
                	newcontent += "<div class = \"list_item_text\">"+mysqlTimeStampToDate(result[row].date).format("m/dd/yy h:MM TT")+"</div>";
                	newcontent += "<div class = \"list_item_text\">"+result[row].campaign+"</div>";
                	newcontent += "</div></li>";  
                }
                
               
                // Replace old content with new content
                $('#Searchresult').html(newcontent);

            	}, "json");
		
	}
	
	else if ((textingly_url1=="lists")&&(textingly_url2=="detail")){//list detail
		$.post (""+textingly_base+"index.php/ajax/contact_list",
        {'pageIndex': page_index, 'itemsPerPage': paginateUtility.items_per_page, 'sort':paginateUtility.sort, 'sortOrder':paginateUtility.sortOrder, 'listId': textingly_url3}, //params
        function(data){
            
            var newcontent = '';
            var result = eval(data);
            

            for(row in result) {
            	
            	var phone = result[row].str_PhoneNumber;
            	if (plan==1) {
            		var phoneFormatted = formatPhoneXs(phone);
            	}
            	else {
            		var phoneFormatted = formatPhone(phone);
            	}
            	var optinStatus = result[row].bol_OptinStatus;
            	if (optinStatus==1) {
            		var active = "Active";
            	}
            	else {
            		var active = "Inactive";
            	}
            	
            	newcontent += "<li><div class = \"list_item_cont\">";
            	newcontent += "<div class = 'list_item_stat'><input class='checkbox' type = 'checkbox' _type='contact' _id='"+result[row].Id+"' /></div>";
            	newcontent += "<div class='list_item_title'><a href='"+textingly_base+"index.php/lists/contactDetail/"+convoForPaginate+"/"+result[row].Id+"' class='list_item_title'>"+phoneFormatted+"</a></div>";
            	newcontent += "<div class = \"list_item_text\">"+mysqlTimeStampToDate(result[row].date_Added).format("m/dd/yy h:MM TT")+"</div>";
            	newcontent += "<div class = 'list_item_stat'>"+active+"</div>";
            	newcontent += "<div class = 'list_item_stat'>"+result[row].number_messages_received+"</div>";
            	newcontent += "<div class = 'list_item_stat'>"+result[row].responses+"</div>";
            	if(plan!=1) {
            		newcontent += "<div class = 'list_item_action'><a href='#' class='edit_text mr_25' _contact='"+result[row].Id+"' value='edit' id='btn_edit_contact'></a> </div>";
            	}
            	newcontent += "<div class = 'list_item_action'><a href='#' class='delete_text' _type='contact' _id='"+result[row].Id+"' value='delete' id='btn_delete'></a></div>";
            	newcontent += "<div class = 'list_item_action'><a href='#' class='message_text mr_25' _type='individual' _id='"+result[row].Id+"' value='message' id='btn_message_show' _campaignId="+convoForPaginate+" ></a></div>";
            	newcontent += "</div></li>"; 
     
            }


            // Replace old content with new content
            $('#Searchresult').html(newcontent);
            $("a#btn_delete").click(deleteButton);
    		$("a#btn_edit_contact").click(editContact);
    		$("a#btn_message_show").click(showMessageBox);
        	}, "json");
		 //attach event listeners
    	
	
}
	
	// Prevent click eventpropagation
	return false;
}

var utilityRefresh = function () {
	paginateUtility.refresh();
}

var changeFilterRefresh= function () {
    	utilityRefresh();
}

var changeResponseFilter = function () {
	$("#selectable").selectable({
			stop: function() {
				responseTypes = "";
				$("#command_list").val(-1);
				$(".ui-selected", this).each(function() {
					responseTypes += this.firstChild.nodeValue;
				});
				(responseTypes.indexOf('Command') != -1) ? $("#commandFilter").show() : $("#commandFilter").hide();
				utilityRefresh();
			}
	});
}



var changeMessagesConvoList = function() {
		var num_messages_sent = $("#conversation_list option:selected").attr("messages_sent");
        $("#messages_sent_headline").html(num_messages_sent+'<span>MESSAGES SENT</span>');
        $("#messages_scheduled_headline").html($("#conversation_list option:selected").attr("messages_scheduled")+'<span>MESSAGES SCHEDULED</span>');
        $("#total_messages_sent_headline").html($("#conversation_list option:selected").attr("total_messages")+'<span>TOTAL MESSAGES SENT</span>');

      //  paginateUtility.refresh();    num_messages_sent
      initiatePagination('true', num_messages_sent);
      sortToggle(num_messages_sent);
}

var changeMessagesResponseList = function() {
	var num_messages_sent = $("#response_list option:selected").attr("messages_sent");

  //  paginateUtility.refresh();    num_messages_sent
  initiatePagination('true', num_messages_sent);
  sortToggle(num_messages_sent);
}

var sortToggle = function(num) {
	if (num > 10) {
		$(".sortToggle").show();
	}
	else {
		$(".sortToggle").hide();
	}
}
	
var initializeCreditFinalize = function() {
	//X's out all but last four digits
	var credit = $('#credit_number').val();
	var creditLength = credit.length;
	var creditXsLength = creditLength-4;
	var creditXs="";
	for (var i=0; i<creditXsLength; i++) {
		var creditXs = creditXs + 'X';
	}
	var creditShow = credit.substring(creditXsLength);
	var creditMasked = creditXs + creditShow;
	$('#credit_number_masked').html(creditMasked);
	
	var expirationMonth = $('#credit_expiration_month').val();
	var expirationYear = $('#credit_expiration_year').val();
	var expirationCombined = expirationMonth + "/" + expirationYear;
	$('#show_credit_expiration').text(expirationCombined);
}

var initializeCreditInfo= function() {
	$('input#hidden').each(function() {
		var populate = $(this).attr('value');
		$(this).siblings().val(populate);
	});
	/* $('#credit_type').val('".$credit_type."');
	$('#credit_expiration_month').val('".$credit_expiration_month."');
	$('#credit_expiration_year').val('".$credit_expiration_year."'); */
}

function initializeAccountInfo() {
	$('input#hidden').each(function() {
		var populate = $(this).attr('value');
		$(this).siblings().val(populate);
	}); 
}

var savePreviousUrl = function(e) {
e.preventDefault();
//needs to have vars equal to "" if they don't exist in the url 
	var url1 = textingly_url1;
	var url3 = textingly_url3;
	var url4 = textingly_url4;
	var url = textingly_url1+"/"+textingly_url2+"/"+textingly_url3+"/"+textinglyurl4;
	//alert(url);
}

var initializeCreditVerified= function() {
	var credit = $('#credit_number').val();
	var creditLength = credit.length;
	var creditXsLength = creditLength-4;
	var creditXs="";
	for (var i=0; i<creditXsLength; i++) {
		var creditXs = creditXs + 'X';
	}
	var creditShow = credit.substring(creditXsLength);
	var creditMasked = creditXs + creditShow;
	$('#credit_number_masked').html(creditMasked);
	var creditType = $('#credit_type :selected').text();
	$('#show_credit_type').html(creditType);
}

function confirmModal(yesFunction, vars, msg) {
	$("#confirm_message_text").html(msg);
	$("#confirm_box").modal();
	$("#btn_ok").one("click", function() {
		var type = vars[0];
		var sub = vars[2];
		if((sub!=0)&&(type=="keyword")) {
			yesFunction(vars);
		}
		else {
			$.modal.close();
			yesFunction(vars);
		}
	});
}

function alertModal(msg) {
	var msg = msg;
	$("#alert_message_text").html(msg);
	$("#alert_box").modal();
}

//****************these are the functions that happen when "ok" is clicked on the confirm modal (yesFunction)**************
function confirmDeleteAll(vars) {
	var type = vars[0];
	var checkArray = vars[1];
	
	$.post (textingly_base+"index.php/ajax/delete_multiple",//url
			{'type': type, 'array': checkArray},//params
			function(data){
					//(data);
					location.reload();
		});
}

function confirmDelete(vars) {
var type = vars[0];
var id = vars[1];
var sub = vars[2];
	if((sub!=0)&&(type=="keyword")) {
		$("#imageWaitKeyword").show();
		$.post (textingly_base+"index.php/ajax/cancel_subscription",//url
				{'sub': sub},//params
				function(data){
					if(data=="cancelled"){
						$.post (textingly_base+"index.php/ajax/delete_"+type+"",//url
							{id: id},//params
							function(data){
									location.reload();
						});
					}
			});
	}
	else {
		$.post (textingly_base+"index.php/ajax/delete_"+type+"",//url
				{id: id},//params
				function(data){
					if (type=="conversation") {
						window.location = textingly_base+"index.php/campaign/all";
					}
					else if((textingly_url1=="lists"&&textingly_url2=="detail")||(textingly_url1=="message")) {
						initiatePagination();
					}
					else {
						location.reload();
					}
			});
	}
}

function confirmUnlinkKeyword(vars) {
var keywordId = vars;
unlink(keywordId);
}
//****************************************



function formatPhone(number) {
	var first = number.substring(1,4);
	var second = number.substring(4,7);
	var third = number.substring(7,11);
	number = "1-("+first+") "+second+"-"+third;
	return number;
}

function formatPhoneXs(number) {
	var first = "XXX";
	var second = "XXX";
	var third = number.substring(7,11);
	number = "1-("+first+") "+second+"-"+third;
	return number;
}
//************just a basic test to check if _type on submit buttons are functioning
var validateFormElement = function() {
	var type = $(this).attr("_type");
	if(type=="input"||type=="message") {
	}
} 
//********************************

	var deleteButton = function(e) { 
		e.preventDefault();
		var id = $(this).attr("_id");
		var type = $(this).attr("_type");
		
			if (type == "keyword") {
			var sub = $(this).attr("_subId");
				if(sub!=0) {
					var uType = type.substr(0, 1).toUpperCase() + type.substr(1);
					var confirmMsg = "Are you sure you want to delete this "+uType+"?  You will have to purchase a new Keyword";
					var vars=[type,id,sub];
					confirmModal(confirmDelete, vars, confirmMsg);
				}
				else {
					var uType = type.substr(0, 1).toUpperCase() + type.substr(1);
					var confirmMsg = "Are you sure you want to delete this "+uType+"?";
					var vars=[type,id,sub];
					confirmModal(confirmDelete, vars, confirmMsg);
				}
			}
			else {
				if (type == "message") {
					var uType = type.substr(0, 1).toUpperCase() + type.substr(1);
				var confirmMsg = "Are you sure you want to delete this "+uType+" before it's sent?";
				}
				else {
					if(type== "campaign") {
						type="conversation";
					}
					var uType = type.substr(0, 1).toUpperCase() + type.substr(1);
					var confirmMsg = "Are you sure you want to delete this "+uType+"?";
				}
			var vars=[type,id];
			confirmModal(confirmDelete, vars, confirmMsg);
			}
	}
		

	var addEditButton = function(event) {
		event.preventDefault();
		$('div#modal_error').empty();
		var type = $(this).attr("_type");
		var id = $(this).attr("_id");
		$("#btn_save_add_edit").attr("_id",id);
		$.data(document.body, 'type', type);
		$("#sorry").hide();
		$("#command").hide();
			if (type=="command") {
					
					$("div.tooltip_conversation").children().hide();
					$("div.tooltip_auto_responder").children().show();
					$("div.tooltip_auto").children().show();
					$("#response_text").addClass("spacer");
					$("#name").hide();
					$("#wizard_hide").show();
					$("#response_text").text("Response");
					$("#sorry").show();	
					$("#command").show();
					$("#command").val("");
			}
			else {
				if(textingly_url1=="wizard") {
					$("#default_response").hide();
					$("#default_response").val('Sent from Texting.ly. Log in to edit this response!');
					$("#name").hide();
					$("#response_text").text("Response");
				}
					$("#name").show();
					$("#response_text").text("Conversation Greeting");
					$("div.tooltip_conversation").children().show();
					$("div.tooltip_auto_responder").children().hide();
					$("div.tooltip_auto").children().hide();
					$("#response_text").removeClass("spacer");
			}
	
			if(id) {
				var addEdit = "Edit";
			}
			else {
				var addEdit = "Add";
			}
			if (type=="campaign") {
				$("#add_edit_text").html(addEdit + " Conversation");
				$(".default_response").show();
			}
			/* else {
				var subType1 = type.substring(0, 1);
				var subType2 = type.substring(1);
				var uCap = subType1.toUpperCase();
				var uType = uCap + subType2;
				$("#add_edit_text").html(addEdit + " " + uType);
			} */
			else {
				$("#add_edit_text").html(addEdit + " Auto-Responder");
				$(".default_response").hide();
	
			}
			if(addEdit=="Edit") {
				$.post (textingly_base+"index.php/ajax/"+type+"_popup",//url
					{id: id},//params
					function(data){	
						var Data = data.split("|");
						var title = Data[0];
						var default_response = Data[1];
						//if (description=="empty") {
						//	description = "";
						//}
						var response = Data[2];
						/* if (response=="empty") {
							response = "";
						} */
						if(type=="command") {
							if(textingly_url1=="wizard") {
								$("#hdn_campaignId").val(Data[3]);
								$(".tooltip_auto_responder").show();
							}
							$("#command").val(title);
							$('#command').keyup(purchaseCommand);
						}
						else {
							if(textingly_url1=="wizard") {
							$("div#wizard_hide").hide();
							}
							$(".tooltip_auto_responder").hide();
							$("#name").val(title);
						}
						if(textingly_url1=="wizard"){
							$("#default_response").html('Sent from Texting.ly. Log in to edit this response!');
						}
						else {
							$("#default_response").html(default_response);
						}
						$("#response").html(response);
						$("#hdn_selected").val(id);
							if(type=="command") {
								$(".response").show();
							}
							if(type=="campaign") {
								$(".default_response").show();
							}
						$("#add_edit").modal({
							persist: true,
							onOpen: function (dialog) {
							dialog.overlay.fadeIn('fast', function () {
							dialog.container.slideDown('fast', function () {
							dialog.data.fadeIn('fast');
						});
				  });
				}});
				});
			}
			else {
			
				$("#hdn_selected").val(-1);
				if(type=="command") {
					$("#command").empty();
					$('#command').keyup(purchaseCommand);
				}
				else {
					$("#name").empty();
				}
				$("#default_response").html("");
				$("#response").html("");
				if(type=="campaign") {
					if(plan==1) {//plan is determined by plan that is entered in session byt setPlan()
					$.post (textingly_base+"index.php/ajax/count_conversation",//url
								{custId: textingly_custId},//params
								function(data){
									if(data>0) {
										//alert(data);
										alertModal("You must upgrade your plan to add more Conversations.");
									}
									else {
										
										$("#add_edit").modal({
											persist: true, 
											onOpen: function (dialog) {
											dialog.overlay.fadeIn('fast', function () {
												dialog.container.slideDown('fast', function () {
												dialog.data.fadeIn('fast');
												});
											});
										}});
									}
							});
							
					}
					else {
						$("#add_edit").modal({
							persist: true, 
							onOpen: function (dialog) {
							dialog.overlay.fadeIn('fast', function () {
							dialog.container.slideDown('fast', function () {
							dialog.data.fadeIn('fast');
							});
						  });
						}});
					}
				}
				else {
					$("#add_edit").modal({onOpen: function (dialog) {
						persist:true,
						dialog.overlay.fadeIn('fast', function () {
						dialog.container.slideDown('fast', function () {
						dialog.data.fadeIn('fast');
						});
					  });
					}});
				}
		}
		
	}


var sendMessage = function() {
	    var message_type_id = $("#hdn_conversationId").val();
	    $.post (textingly_base+"index.php/ajax/access_session",//url
	            {'type': 'receive', 'name': 'landing_convo_greeting'},//params
	                function(data){
	                     var message = data;
	                     $.post (textingly_base+"index.php/ajax/schedule_message",//url
	             	            {'message_type_id': message_type_id, 'custId': 392, 'schedule_type': 'now', 'message_type':'landing',
	             	                    'message': message},//params
	             	                function(data){
	             	                        window.location = textingly_base+"index.php/auth/three";
	             	    });
	    });
		
	    
}

var saveContact = function() {
	var contactId = $("#hdn_contact_selected").val();
    var listId = $("#hdn_listId").val();
    //validate for blanks
    var modalField = new Array("contact_phone1","contact_phone2","contact_phone3");
    var modalHuman = new Array("area code","prefix","last 4 digits");
    var modalType = "phone";
    var $validate = validateModal(modalField, modalHuman, modalType);  
 
    if($validate) {
        var subPhone1 = $("#contact_phone1").val();
        var subPhone2 = $("#contact_phone2").val();
        var subPhone3 = $("#contact_phone3").val();
        var contactPhone = "1"+subPhone1+subPhone2+subPhone3;
        var contactFirst = $("#contact_first").val();
        var contactLast = $("#contact_last").val();
            $.post (textingly_base+"index.php/ajax/add_contact/", //url
                {'list': listId, 'customer': 392, 'phone': contactPhone, 'first_name': '', 'last_name': '', 'contactId': ''},//params
                function(data){
                //$("#contactErrorMsg").empty();
                    if (data=="FAILURE") {
                        $("#contactErrorMsg").html("Must be a valid cellular phone number");
                        $("#wait").hide();
                    }
                    else {
                    	sendMessage2();
                    }
            });
    }
}

var saveContact2 = function() {
	//have to make call to get list id?
    var listId = $("#hdn_listId").val();
    //validate for blanks
    var modalField = new Array("contact_phone1","contact_phone2","contact_phone3");
    var modalHuman = new Array("area code","prefix","last 4 digits");
    var modalType = "phone";
    var $validate = validateModal(modalField, modalHuman, modalType);  
 
    if($validate) {
        var subPhone1 = $("#contact_phone1").val();
        var subPhone2 = $("#contact_phone2").val();
        var subPhone3 = $("#contact_phone3").val();
        var contactPhone = "1"+subPhone1+subPhone2+subPhone3;
        var contactFirst = $("#contact_first").val();
        var contactLast = $("#contact_last").val();
            $.post (textingly_base+"index.php/ajax/add_contact/", //url
                {'list': listId, 'customer': 392, 'phone': contactPhone, 'first_name': '', 'last_name': '', 'contactId': ''},//params
                function(data){
                //$("#contactErrorMsg").empty();
                    if (data=="FAILURE") {
                        $("#contactErrorMsg").html("Must be a valid cellular phone number");
                        $("#wait").hide();
                    }
                    else {
                        sendMessage2();
                    }
            });
    }
}
var sendMessage2 = function() {
    var message_type_id = $("#hdn_conversationId").val();
    $.post (textingly_base+"index.php/ajax/access_session",//url
            {'type': 'receive', 'name': 'landing_convo_greeting'},//params
                function(data){
                     var message = data;
                     $.post (textingly_base+"index.php/ajax/schedule_message",//url
             	            {'message_type_id': message_type_id, 'custId': 392, 'schedule_type': 'now', 'message_type':'landing',
             	                    'message': message},//params
             	                function(data){
             	                    	if (textingly_url3=="chrome") {
             	                    		window.location = textingly_base+"index.php/auth/three/chrome";
             	                    	}
             	                    	else {
             	                    		  window.location = textingly_base+"index.php/auth/three";
             	                    	}
             	                      
             	    });
    });
	
    
}

var saveLandingPrelim = function() {
	checkKeywordFinal('landing');
}

var saveCreateConvoPrelim = function() {
	checkKeywordFinal('create_convo');
}
	
var openContactModal = function() {
	
	//var response = $("#response").val();
		var modalField = new Array("response","keyword_purchase","handle");
		var modalHuman = new Array("Conversation Response","Keyword","Business Name");
		var modalType = "text";
		var validate = validateModal(modalField, modalHuman, modalType);
		if (validate) {
			$("div#modal_error").empty();
			$("#btn_start").trigger('click');
			var value = $("#response").val();
			var handle = $("#handle").val();
			//console.log("i'm here");
			$.post (textingly_base+"index.php/ajax/access_session",//url
					{'name': 'landing_convo_greeting', 'value': value, 'type': 'send'},
					function(data){			
			});
//			$.post (textingly_base+"index.php/ajax/access_session",//url
//					{'name': 'landing_handle', 'value': handle, 'type': 'send'},
//					function(data){
//						
//			});
			
		}
}

var phoneAssist = function() {
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
//called from oncomplet in fancybox from consumer.js in scripts folder
function focusPhone() {
	$("#contact_phone1").focus();
}

var setLanding = function() {
	$("#wait").show();
	var keyword = $("#keyword_purchase").val();
	var response = $("#response").val();
	var handle = $("#handle").val();
	var tracking = $("#tracking").val();
	var sub = $("#sub").val();
	$.post (textingly_base+"index.php/ajax/setLanding",//url
			{keyword: keyword, response: response, handle: handle, tracking: tracking, sub: sub},//params
			function(data){
				//gets data from session and fills in the hidden fields for the contact popup
				$.post (textingly_base+"index.php/ajax/get_list_by_conversation",//url
						function(data){
							var Data = data.split("|");
							$("#hdn_listId").val(Data[0]);
							$("#hdn_conversationId").val(Data[1]);
							saveContact();
				});
	});
}


var saveCreateConversation = function() {
	//var response = $("#response").val();
		var modalField = new Array("response","keyword_purchase","handle");
		var modalHuman = new Array("Conversation Response","Keyword","Business Name");
		var modalType = "text";
		var validate = validateModal(modalField, modalHuman, modalType);
		if (validate) {
			$("div#modal_error").empty();
			var keyword = $("#keyword_purchase").val();
			var response = $("#response").val();
			var handle = $("#handle").val();
			var tracking = $("#tracking").val();
			var sub = $("#sub").val();
			$.post (textingly_base+"index.php/ajax/setLanding",//url
					{keyword: keyword, response: response, handle: handle, tracking: tracking, sub: sub},//params
					function(data){
						//window.location = textingly_base+"index.php/page/two";
			});
		}
} 

function validateModal(field, human, type) {
	var errorMsgCount = 0;
	$("div.errorClear").empty();
	$("span.errorClear").html("");
		if(type=="text") {
			for(var i=0;i<field.length;i++) {
				var value1 = $("#"+field[i]).val();
				var value = $.trim(value1);
				 if(field[i]=="keyword_purchase") {
				
					 if(value=="enter a keyword"){
						 var errorMsg = "The " + human[i] + " field is required.";
						 $('div#modal_error_'+field[i]).text(errorMsg);
						 errorMsgCount = errorMsgCount + 1;
					 }
				 }
				 if(field[i]=="keyword_select") {
					 if(value=="Select a Keyword"){
						 var errorMsg = "The " + human[i] + " field is required.";
						 $('div#modal_error_'+field[i]).text(errorMsg);
						 errorMsgCount = errorMsgCount + 1;
					 }
				 }
				
				if((value=="")||(value==" ")) {
					//specifies the error message closest to the box for landing pages only instead of generalized error box
					var errorMsg = "The "+human[i]+" field is required. ";
					if((textingly_url2=="one")||(textingly_url2=="create_convo_main")){
						$('div#modal_error_'+field[i]).text(errorMsg);
					}
					else {
						$('div#modal_error').text(errorMsg);
					}
					errorMsgCount = errorMsgCount + 1;
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
			$("#wait").hide();
			return false;
		}
	}
	
	var saveAddEditButton = function() {
		var type = $.data(document.body, 'type');
		var id = $("#hdn_selected").val();
		if(id == -1) {
			var url = "add"
			var addEdit = "added";
			if(type=="command") {
			var id = textingly_url3;
			}
		} else {
			url = "edit";
			var addEdit = "edited";
		}
		
		//HACK: id of -1 usually means add 
		//the exception: for adding command we are using the id represent the campaign ID.
		//var id = ((type=="command") && (url=="add")) ? textingly_url3 :  $("#hdn_selected").val();
		
		var msg = "Your " +type+ " was successfully "+addEdit;
		if(type=="command") {
			var title = $("#command").val();
		}
		else {
			var title = $("#name").val();
		}
		var default_response = $("#default_response").val();
		var response = $("#response").val();
		if(type=="command") {
			var commandId = $(this).attr("_id");
			purchaseCommandButton(url, commandId);
		}
		else {
			//For validate customized modal boxes
			var validate = false;
			if(type=="campaign") {
			var modalField = new Array("name","response","default_response");
			var modalHuman = new Array("Name","Conversation Greeting","Default Response");
			var modalType = "text";
			
			var validate = validateModal(modalField, modalHuman, modalType);
			}
			if (validate) {
				$.post (textingly_base+"index.php/ajax/"+url+"_"+type,//url
				{id: id, title: title, default_response: default_response, response: response},//params
				function(data){
					if(textingly_url1=="wizard") {
						var convo_response = $("#response").val();
						$.post (textingly_base+"index.php/ajax/setWizard",//url
								{'convo_response': convo_response, 'type': 'conversation'}, //params
								function(data){
									location.reload();
						});
					}
					else {
						location.reload();
					}
				});
			}
		}
	}
	
	//for when button are images
	/* $("a#btn_cancel").click(function(e) {
		e.preventDefault();
		$.modal.close();
	}); */
	var cancelButton = function(e) {
		e.preventDefault();
		$.modal.close();
		initiateTooltips();
	}
	
	var checkInputCount = function() {
			var code = $(this).attr('_limit');
			var codeLength = code.length;
			var newLength = codeLength -2;
			var number = code.substr(newLength);
			var limit = number;
			
			var count = $(this).val().length;
			
			var remaining = limit-count;
			if(remaining<1) {
				
				var message = $("."+code).val();
				var replace = message.substring(0, limit);
				$("."+code).val(replace); 
			}
	}
			
	
	
	
	var showMessageBox = function(e) {
		e.preventDefault();
		$('div#modal_error').empty();
		$("textarea#message").html("");
		var totalContacts = $(this).attr("_totalContacts");
		var active = $(this).attr("_active");
		var type = $(this).attr("_type");
		var id = $(this).attr("_id");
		$("#message_type").val(type);
		$("#message_type_id").val(id);
		//checks if campaign is active
		if(active=="Inactive") {//for campaign pages.  contact and response pages are handle in ajax.php
			//console.log("here i am");
			alertModal("Messages cannot be sent to an inactive Conversation");
		}
		//checks if 
		else if(active=="Sent"||active=="Pending") {
			alertModal("This message cannot be edited.");
		} else {
			$("#schedule_type_now").click(function() {
				$("#full_date").hide();
			});
			$("#schedule_type_later").click(function() {
				$("#full_date").show();
			});
		//makes sure there are contacts in the conversation
			if(totalContacts==0) {
				$.post (textingly_base+"index.php/ajax/get_list_by_conversation",//url
						{'conversationId': id},//params
						function(data){
							var dataSplit = data.split("|");
							var list = dataSplit[0];
							//console.log(list);
							var link = "<a style='color: #0895be' href='"+textingly_base+"index.php/lists/detail/"+list+"'>Contact</a>";
							//console.log(link);
							var msg = "Add a "+link+" to this Conversation to send a Message.";
							//console.log(msg);
							alertModal(msg);
				});
				return false;
			}
		//differentiates between campaigns, message or individual messages
			var titleText = "";
			if(type=="message") {//campaign and message
				$("#message_type").val("campaign");
				$("#message_destination_select").show();
				//this assigns id value to dropdown if not changed
				$("#message_type_id").val($("#campaign").find(':selected').attr("_campaignId"));
				//this assisng id value when changed
				$("#campaign").change(function() {
					$("#message_type_id").val($(this).val());
				});
				showSendMessageDialogue(type, id, titleText);
			}
			
			if(type=="campaign") {
			$.post (textingly_base+"index.php/ajax/"+type+"_popup",//url
					{id: id},//params
					function(data){	
						var Data = data.split("|");
						var title = Data[0];
						titleText = title;
						showSendMessageDialogue(type, id, titleText);
				});
				
			}
			
			if (type=="individual") {
				var campaignId = $(this).attr("_campaignid");
				$.post (textingly_base+"index.php/ajax/"+type+"_popup",//url
					{id: id, 'campaignId': campaignId},//params
					function(data){
						if(data=="inactive"){
							alertModal("Messages cannot be sent to an inactive Conversation");
						}
						else {
							var title = data;
							if(plan==1) {
							var phoneNumberLast4 = title.substr(7);
							var phoneNumberFirst = "1-(XXX)-XXX ";
								titleText = phoneNumberFirst + phoneNumberLast4;
							}
							else {
								titleText = title;
							}
							showSendMessageDialogue(type, id, titleText);
						}
				});
			}
			
				
				
				
		
		}
	}
	
	
	
		function showSendMessageDialogue(type, id, titleText) {
		
		var title = '';
		type = type.toLowerCase();
		
		switch(type) {
			case 'individual':
				if (plan==1) {
					title = "to " + titleText;
				}
				else {
					title = "to " + formatPhone(titleText);
				}
			  	break;
			case 'campaign':
				title = "to " + titleText;
				break;
			default:
				$("#message_destination_select").show();
		}
		
		$("#full_date").hide(); //sending NOW is the default
		$("#message_list").html(title);
		$("#message_send_box").modal({
					persist: true, 
					onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
					dialog.data.fadeIn('fast', function () {
					$("#date").datepicker({ minDate: '0d' });
					});
					});
				  });
				}});
		
	}
	
	//for when we are using images as buttons
	// $("a#btn_message_save").click(function() {
		
var sendMessageButton = function() {
	$("#imageNotProcessing").hide();
	$("#confirmButton").show();
}
//to reset box to default 
var resetMessageBox = function() {
	$("#imageNotProcessing").show();
	$("#confirmButton").hide();
}
var sendMessageButtonConfirmed = function() {
	//make sure that time is not in the past
	if($('#schedule_type_later').is(':checked')==true) {//later button checked
		//validate for blanks
		var modalField = new Array("message","date");
		var modalHuman = new Array("Message","Date");
		var modalType = "text";
		var validate = validateModal(modalField, modalHuman, modalType);	
		if(validate) {
				$.post (textingly_base+"index.php/ajax/check_time",//url
				$("#message_info").serializeArray(),//params
				function(data){
					if(data=='false') {
						var errorMsg = "You cannot send a message in the past.";
						$('div#modal_error').text(errorMsg);
					}
					else {
						$.post (textingly_base+"index.php/ajax/schedule_message",//url
							$("#message_info").serializeArray(),//params
								function(data){
								if ((textingly_url1=="lists")&&(textingly_url2=="detail")||(textingly_url1=="message")){
									$.modal.close();
									initiatePagination();
								}
								else {
									//$.modal.close();
									location.reload();
								}
							});
					}
				});
		}
	}
	else {//now button checked
		//validate for empty fields
			var modalField = new Array("message");
			var modalHuman = new Array("Message");
			var modalType = "text";
			var validate = validateModal(modalField, modalHuman, modalType);
		
		if(validate) {
			$("#imageNotProcessing").hide();
			$("#confirmButton").hide();
			$("#imageProcessing").show();
					$.post (textingly_base+"index.php/ajax/schedule_message",//url
					$("#message_info").serializeArray(),//params
						function(data){
						if ((textingly_url1=="lists")&&(textingly_url2=="detail")||(textingly_url1=="message")){
							$.modal.close();
							initiatePagination();							
							$("#imageNotProcessing").hide();
							$("#imageProcessing").show();
						}
						else {
							location.reload();
							$("#imageNotProcessing").show();
							$("#imageProcessing").hide();
						}
					});
		}
	}
}
	
	//to determine which keyword radio button is selected
	var selectedKeyword = function() {
		var keywordSelected = $(this).attr("_keyword");
		$("#hdn_keyword_selected").val(keywordSelected);
	}

	var linkKeyword = function(e) {
		e.preventDefault();
		var type = textingly_url1
		var value = $(this).text();
		var keywordId = $(this).attr("_keywordId");
		if(type=="keyword") {
			if(value=="Unlink") {//unlink
				var msg = "Are you sure you want to Unlink?";
				confirmModal(confirmUnlinkKeyword, keywordId, msg);
			}
			else {//link
				$("#hdn_keyword_selected").val(keywordId);
				$("#link_keyword_campaign").modal({
					persist: true, 
					onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
					dialog.data.fadeIn('fast');
					});
				  });
				}});
			}
		}
		else {//campaign
			if(value=="Unlink") {//unlink
				var msg = "Are you sure you want to Unlink?";
				confirmModal(confirmUnlinkKeyword, keywordId, msg);
			}
			else {//link
				$("#hdn_campaign_selected").val(textingly_url3);
				$("#link_campaign_keyword").modal({
					persist: true, 
					onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
					dialog.data.fadeIn('fast');
					});
				  });
				}});
				$('input[name=keywords]:eq(0)').click();
				var keywordSelected = $('input[name=keywords]:eq(0)').attr("_keyword");
				$("#hdn_keyword_selected").val(keywordSelected);
			}
		}
	}
	
	function unlink(id) {
			$.post (textingly_base+"index.php/ajax/unlink_keyword",//url
				{id: id},//params
				function(data){
				//change_info(data, keyword, type);
				//post_message("Unlink Successful.");
				location.reload();
			});
	}
	
	var linkButton = function() {
		var type = textingly_url1;
		if(type=="keyword") {
			var campaignId = $("#campaign_dropdown").find(':selected').attr("_campaignId");
			var keywordId = $("#hdn_keyword_selected").val();
			link(campaignId, keywordId);
		}
		else {//campaign
			var campaignId = $("#hdn_campaign_selected").val();
			var keywordId = $("#hdn_keyword_selected").val();
			link(campaignId, keywordId);
		}
	}
	
	function link(campaignId, keywordId) {
			$.post (textingly_base+"index.php/ajax/link_keyword",//url
				{id: keywordId, campaignId: campaignId},//params
				function(data){
				//change_info(data, keyword);
				//post_message("Link Successful.");
				location.reload();
			});
	}	
	/* var linkList = function(e) {
		e.preventDefault();
		var campaignId = textingly_url3;
		var id = $(this).attr("_id");
		var type = $(this).attr("_type");
		var value = $(this).text();
		if(value=="Unlink") {//unlink
			if( confirm("Are you sure you want to Unlink?")){
			unlink(id, type, campaignId);
			}
		}
		else {//link
			$("#link_list").modal();
		}
	} */
	
	var editKeyword = function(e) {
		e.preventDefault();
		$("#keyword_purchase").show();
		$("#freeKeyword").hide();
	}
	
	 var showKeywordPurchase = function() {
		$("input#keyword_purchase").val('');
		$("#keyword_search").modal({
					persist: true, 
					onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
					dialog.data.fadeIn('fast');
					});
				  });
				}});
	} 

	//purchase keyword calls this function to reset the timer when multiple letters are entered in rapid succession
	var delay = (function(){
 		 var timer = 0;
 		 return function(callback, ms){
  			  clearTimeout (timer);
   		 timer = setTimeout(callback, ms);
 		 };
	})();
	
	//makes sure spaces are not entered
	var purchaseKeyword = function(event) {
        $("#keyword_purchase").keyup(function() {
			$('#keyword_purchase').keyup(function() {
    			delay(function(){
     				checkKeywordPrelim();
    			}, 500 );
			});			
		});
	  }
	
	function removeSpace(keyword) {
	finalKeywordCharacters = keyword.replace(/[^_a-zA-Z 0-9]+/g,'');
	finalKeywordSpaces = finalKeywordCharacters.split(' ');
	var finalKeyword = "";
		for(var i=0; i<finalKeywordSpaces.length; i++) {
			finalKeyword = finalKeyword + finalKeywordSpaces[i];
		}
	$("#keyword_purchase").val(finalKeyword);
	}
	
	function checkKeywordPrelim() {
		$("div.errorClear").empty();
		$("span.errorClear").html("");
		 var namespace = ($("#keyword_namespace").val() == null) ? -1 : $("#keyword_namespace").val();
		 var keyword = $("#keyword_purchase").val();
		 removeSpace(keyword);
		 $.post(
	        textingly_base+"index.php/ajax/check_keyword",//url
	        {'keyword': keyword, 'namespace': namespace},//params, //params
	        function(data){
	        	$("#sorry").empty();
	        	if(data.space==1) {
	        		$("span#sorry").addClass("red");
        			$("span#sorry").html("Sorry, spaces or special characters are not allowed.");
        		}
	        	else if(data.three==1) {
	        		$("span#sorry").addClass("red");
        			$("span#sorry").html("Keyword must be at least three characters.");
        		}
        	   else{
		        //if($("#keyword_purchase").val() != '') {
			        if(data.count > 0) {
			        	$("span#sorry").addClass("red");
			        	if(textingly_url2=="lite_message") {
			        		$("span#sorry").html('Sorry, Username unavailable.');
			        	}
			        	else {
			        		$("span#sorry").html('Sorry, keyword unavailable.');
			        	}
			        } else {
			        	$("span#sorry").removeClass("red");
			        	$("span#sorry").html('Keyword is available.')
			        }
		        }
	        }, 
	     "json");
		 
	}
	
	function checkKeywordFinal(action) {
		var namespace = ($("#keyword_namespace").val() == null) ? -1 : $("#keyword_namespace").val();
		$keyword = $("#keyword_purchase").val();
		$.post(
	        textingly_base+"index.php/ajax/check_keyword",//url
	        {'keyword': $keyword, 'namespace': namespace},//params, //params
	    function(data){
	        if(data.three==0) {
	        	$("#sorry").empty();
	        	$(".error").empty();
			        if(data.count > 0) {
			        	//allows wizard to allow a keyword to be used from dropdown, even though it
			        	//exists in the db (belongs to this customer)
			        	if(action=="wizard"){
			        		var current = data.current;
			        		var key = $("#keyword_purchase").val();
				        		if(current.toUpperCase==key.toUpperCase) {
				        			addKeyword();
				        		}
				        		else {
				        			$("span#sorry").html("<span class=\'red\'>Sorry, keyword unavailable.</span>");
				        		}
			        	}
			        	else {
			        		$("span#sorry").html("<span class=\'red\'>Sorry, keyword unavailable.</span>");
			        	}
					}
					else {
						if(action=='landing') {
									openContactModal();
						}
						else if(action=='create_convo') {
							var modalField = new Array("response","keyword_purchase","handle");
							var modalHuman = new Array("Conversation Response","Keyword","Business Name");
							var modalType = "text";
							var validate = validateModal(modalField, modalHuman, modalType);
							if (validate) {
								$("div#modal_error").empty();
								var keyword = $("#keyword_purchase").val();
								var response = $("#response").val();
								var handle = $("#handle").val();
								var tracking = $("#tracking").val();
								var sub = $("#sub").val();
								$.post (textingly_base+"index.php/ajax/setLanding",//url
										{keyword: keyword, response: response, handle: handle, tracking: tracking, sub: sub},//params
										function(data){
											var value = $("#response").val();
											$.post (textingly_base+"index.php/ajax/access_session",//url
													{'name': 'landing_convo_greeting', 'value': value, 'type': 'send'},
													function(data){		
														window.location = textingly_base+"index.php/auth/create_convo_register/created";
											});
											
											
								});
								
							}
							
						}
						else if(action=='register') {
							addKeyword();
						}
						else if(action!="wizard"){
							$.post(textingly_base+"index.php/account/setKeyword", { keyword: $("#keyword_purchase").val() },
								function(){
								window.location = textingly_base+"index.php/account/credit";
							});
						}
					}
	        }
	        else {
        			$("span#sorry").html("<span class=\'red\'>Keyword must be at least three characters.</span>");
        		}
	        
	        }, 
	     "json");
	    
	}
	
	var purchaseKeywordButton = function() {
		$("div.errorClear").empty();
		$("span.errorClear").html("");
		var action = $(this).attr('_action');
		var check = checkKeywordFinal(action);
		
	}
		

		
	var addKeyword = function() {
	
		var purchase = $("#keyword_purchase").val();
		$("#sorry").empty();
		
		var namespace = ($("#keyword_namespace").val() == null) ? -1 : $("#keyword_namespace").val();
		
		//validate for empty fields
			var modalField = new Array("keyword_purchase");
			var modalHuman = new Array("Keyword");
			var modalType = "text";
			
			var validate = validateModal(modalField, modalHuman, modalType);
		if(validate) {
			$.post (textingly_base+"index.php/ajax/add_keyword",//url
				{'keyword': purchase, 'namespace': namespace}, //params
				function(data) {
					if(data==0) {
						if(textingly_url1=="wizard"){
						
							var campaignId = $("#hdn_convoId").val();
							var keyId = $("#wizard_key_id").val();
							$.post (textingly_base+"index.php/ajax/delete_keyword_wizard",//url
									{'id': keyId, 'campaignId': campaignId}, //params
									function() {
										$.post (textingly_base+"index.php/ajax/setWizard",//url
												{'type': 'keyId', 'keyId': $("#wizard_key_id").val(), 'keyword': purchase}, //params
												function() {
													location.reload();
											}, "json");
								}, "json");
						}
						else {
							location.reload();
						}
					} 
					else {
						$("#sorry").html("<span class=\'red\'>Sorry, keyword unavailable.</span>");
					}
			}, "json");
		}
	}
	
	/* var purchaseKeywordButton = function() {	
		var purchase = $("#keyword_purchase").val();
		$("#sorry").empty();
		var namespace = ($("#keyword_namespace").val() == null) ? -1 : $("#keyword_namespace").val();
		$.post (textingly_base+"index.php/ajax/add_keyword",//url
			{'keyword': purchase, 'namespace': namespace}, //params
			function(data) {
				if(data.returnCode) {
					$("#sorry").html('<span class="red">Sorry, keyword unavailable.</span>');
				} else {
					location.reload();
				}
		}, "json");
	} */
	
	
	var purchaseCommand = function(event) {
		$("div.errorClear").empty();
		$("span.errorClear").html("");
        $("#command").keyup(function() {
			$('#command').keyup(function() {
    			delay(function(){
     				ajaxCommand();
    			}, 500 );
			});			
		});
	 
   	}
	
	function ajaxCommand() {
		if(textingly_url1=="wizard") {
			var campaignId = $("#hdn_campaignId").val();
		}
		else {
			var campaignId = textingly_url3;
		}
		$.post(
	        textingly_base+"index.php/ajax/check_command",//url
	        {'command': $("#command").val(), 'campaignId': campaignId},//params, //params
	        function(data){
	        	$("#sorry").empty();
	        	if(data.space==1) {
        			$("span#sorry").html("<span class=\'red\'>Sorry, spaces are not allowed.</span>");
        		}
        	   else{
			        if(data.count > 0) {
			        	$("#sorry").html('<span class="red">Sorry, auto-responder already exists for Conversation.</span>');
			        }
        	   }
	        }, 
	     "json");
	}
	
	function purchaseCommandButton(url, commandId) {
	//type in response to ajax function
		var title = $("#command").val();
		var response = $("#response").val();
		if(textingly_url1=="wizard") {
			var campaignId = $("#hdn_campaignId").val();
		}
		else {
			var campaignId = textingly_url3;
		}
		var purchase = $("#command").val();
		$("#sorry").empty();
		//validate for empty fields
			var modalField = new Array("command","response");
			var modalHuman = new Array("Name","Response");
			var modalType = "text";
			var validate = validateModal(modalField, modalHuman, modalType);
			
		if(validate) {
			$.post (textingly_base+"index.php/ajax/"+url+"_command",//url
				{'title': purchase, 'campaignId': campaignId, 'response': response, 'id': commandId}, //params
				function(data) {
					if(data.returnCode) {
						$("#sorry").html('<span class="red">Sorry, auto-responder already exists for Conversation.</span>');
					} else {
						if(textingly_url1=="wizard"){
							var auto = $("#command").val();
							var auto_response = $("#response").val();
							$.post (textingly_base+"index.php/ajax/setWizard",//url
									{'type': 'command', 'auto': auto, 'auto_response': auto_response}, //params
									function(data){
										location.reload();
							});
						}
						else {
							location.reload();
						}
					}
			}, "json");
		}
	}
	
	function mysqlTimeStampToDate(timestamp) {
    //function parses mysql datetime string and returns javascript Date object
    //input has to be in this format: 2007-06-05 15:26:02
    var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
    var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
    return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
	}
	
	var toggleLandingPage = function() {
        var wait = "<img src=\"<?php echo base_url(); ?>images/ajax-loader.gif\"/>";
        $("#landingPageMenuItem").html(wait);

        $.post('<?php echo site_url(); ?>/ajax/toggleLandingPage', { "listId" : $("#listId").val() },
           function(data) {

            var htmlContent = '';
            
            if(data.enabled) {
                htmlContent += "<ul><li><h4>Landing Page Info</h4></li><li>Landing Page URL:</li>";
                htmlContent += "<li><a href=\""+ data.url + "\" target=\"_blank\" class=\"b blue\">Click Here for the Link</a></li>";
                htmlContent += "<li>Landing page QR code:</li>";
                htmlContent += "<li><a href=\"#\" id=\"qrlink\" class=\"b blue\">Click Here for the QR Code</a></li></ul>";
            } else {
                htmlContent += "<ul><li>Landing page URL disabled.<li></ul>";
            }
            
            //set the info area to show the URL
            $("#landingPageURL").html(htmlContent);

            //set the menu item to enabled or disabled text
            var language = data.enabled ? 'Disable' : 'Enable';
            $("#landingPageToggle").html(language+ ' Landing Page');
            //hide the spinner
            $("#landingPageMenuItem").html('');

           }, "json");  
    }

	var populateBilling = function() {
			$("input#hidden").each(function() {
				var populate = $(this).attr("value");
				$(this).siblings().val(populate);
			});
	}
	
	
	
	
	
var editContact = function(e) {
        e.preventDefault();
		$("#contactType").text("EDIT");
		var contactId = $(this).attr("_contact");
		$("#hdn_contact_selected").val(contactId);   
        $.post (textingly_base+"index.php/ajax/contact_popup",//url
            {'contactId': contactId},
            function(data){
                var Data = data.split("|");
                var contactPhone = Data[0];
                var contactFirst = Data[1];
                var contactLast = Data[2];
                var subPhone1 = contactPhone.substring(1,4);
                var subPhone2 = contactPhone.substring(4,7);
                var subPhone3 = contactPhone.substring(7);
                $("#contact_phone1").val(subPhone1);
                $("#contact_phone2").val(subPhone2);
                $("#contact_phone3").val(subPhone3);
                $("#contact_first").val(contactFirst);
                $("#contact_last").val(contactLast);
                $("#hdn_contact_selected").val(contactId);
                $("#upload_multiple").hide();
				$("#singleMultiple").hide();
				var currentPhone = 1+subPhone1+subPhone2+subPhone3;
				$("#hdn_contact_current_phone").val(currentPhone);
                $("#new_edit_contact").modal({persist: true});
        });
}
