
//GOOGLE Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SLZFRR7D68');
//DONE GOOGLE Analytics


function changeLanguage(selectedLang){	
	if( selectedLang.value == "vn" ) {
		document.location = "/vn";
	}else{
		document.location = "/";
	}
	
}

function postData(page){	
	//alert("postData "+page);
	button = document.getElementById('postButton');

	//disable button to avoid clicking multiple times.  don't need to enable again as don't see the need.  Customer will need to reload the page if so.
	button.disabled = true; 

	in_name = document.getElementById('name').value;
	in_email = document.getElementById('email').value;
	in_phone = document.getElementById('phone').value;
	in_subject = document.getElementById('subject').value;
	in_reason = document.getElementById('description').value;
	
	event.preventDefault();
	
	if( !validateInput(in_phone, in_email, in_reason) ){
		button.disabled = false;
		return ;
	}
	

	// Data to send in the POST request (as a JSON object)
	const dataToSend = {
		type: page,
		name: in_name,
		email: in_email,
		phone: in_phone,
		grade: in_subject,
		reason: in_reason
	};

	// Convert data to JSON format
	const jsonData = JSON.stringify(dataToSend);
	//alert(jsonData);
	
	fetch(surl, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'x-api-key': ak 
	  },
	  body: jsonData
	})
	  .then(response => {
		if (!response.ok) {
			alert('We have experienced network issues.  Please try to submit again later [901].');
		    console.log('Network response was not ok');
			return ;
		}
		//alert("Thank you for your providing your information.  Someone will be in touch with you soon.");
		return response.json();
	  })
	  .then(data => {
		// Handle the JSON response data
		//console.log(data);
		//alert("Thank you for your providing your information.  Someone will be in touch with you soon.");
		//alert("data: " + data);
	  })
	  .catch(error => {
		// Handle errors
		console.error('Fetch error:', error);
		alert('We have experienced network issues.  Please try to submit again later [902].');
		return ;
	  });
	
	  alert("Thank you for providing your information.  Someone will be in touch with you soon.");
	
	  //enable button for new data submission again
	  button.disabled = false;
	  clearForm();
}


function logon(){
	button = document.getElementById('logonButton');
	//disable button to avoid clicking multiple times.  don't need to enable again as don't see the need.  Customer will need to reload the page if so.
	button.disabled = true; 

	in_email = document.getElementById('email').value;
	in_pwd = document.getElementById('password').value;
	
	setTimeout(3000);
	
	alert("This account information is not valid. Please try again.");
	
	button.disabled = false; 
	
}


function validateInput(in_phone, in_email, in_reason){
	var noEmail = (in_email.trim().length == 0);
	var noPhone = (in_phone.trim().length == 0);

	if( noEmail && noPhone ){
		alert ("Please give us either email or phone to contact you.");
		return false;       
	}

	if( !noEmail ){
		if( !validateEmail(in_email) ){
			alert("Please enter a valid email address.");
			return false;
		}
	}

	if( !noPhone ){
		if( !validatePhoneNumber(in_phone) ){
			alert("Please enter a valid 10-digit phone number.")
			return false;
		}
	}

	if( in_reason.trim().length == 0 ){
		alert( "Please give us some information about you.")
		return false;
	}

	return true;
}


//Validation routines
function validatePhoneNumber(phoneNumber) {
	var phoneNumberPattern1 = /^\d{10}$/; // Format: 1234567890
	var phoneNumberPattern2 = /^\(\d{3}\) \d{3}-\d{4}$/; // Format: (123) 456-7890
	var phoneNumberPattern3 = /^\d{3}\.\d{3}.\d{4}$/; // Format: 123.456.7890
	var phoneNumberPattern4 = /^\d{3}\-\d{3}-\d{4}$/; // Format: 123-456-7890

	if (phoneNumberPattern1.test(phoneNumber)) {
		return true;
	} else if (phoneNumberPattern2.test(phoneNumber)) {
		return true;
	} else if (phoneNumberPattern3.test(phoneNumber)) {
		return true;
	} else if (phoneNumberPattern4.test(phoneNumber)) {
		return true;
	}else {
		//alert("Please enter a valid 10-digit phone number.");
		return false;
	}
	
	return false;
}

function validateEmail(email) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	if (emailPattern.test(email)) {
		return true;
	} else {
		//alert("Please enter a valid email address.");
		return false;
	}
	return false;
}

function clearForm(){
	document.getElementById('name').value = "";
	document.getElementById('email').value = "";
	document.getElementById('phone').value = "";
	document.getElementById('subject').value = ""
	document.getElementById('description').value = "";
}
