<?php		
        $name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$city = $_POST['city'];
	$country = $_POST['country'];

	$email_to = "info@lifeandwellnessco.com, connie.sayal@gmail.com";
    $email_subject = "Personal Info";
     
    // Error fuction 
    $email_message = "Form Details below.\n\n";
    function clean_string($string) {
    	$bad = array("content-type","bcc:","to:","cc:","href");
      	return str_replace($bad,"",$string);
    }

    $email_message .= "Full Name: ".$name."\n";
	$email_message .= "Email: ".$email."\n";
	$email_message .= "Phone/Mobile no : ".$phone."\n";
	$email_message .= "Country : ".$country."\n";
	$email_message .= "City : ".$city."\n";

	$headers = 'From: '.$email."\r\n".
	'Reply-To: '.$email."\r\n" .
	'X-Mailer: PHP/' . phpversion();
	@mail($email_to, $email_subject, $email_message, $headers);
	$response = array();
	$response['success'] = 1;
	echo json_encode($response);
?>