<?php
if(isset($_POST['ensubmit']))
{
	
//############### Enquiry submit ##########################	
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];
		$country = $_POST['country'];
		$city = $_POST['city'];
		$message = $_POST['message'];
        $connection = mysqli_connect('indiareputation.com','indiarep_aruna','305!10N*!','indiarep_landingpage');
			  $query = "INSERT INTO `indiarep_landingpage`.`enquiry table` (`name`, `email`, `phone`, `country`, `city`, `message`) VALUES ('$name', '$email', '$phone', '$country', '$city', '$message')";
			  
			    if (mysqli_connect_errno()){
			         echo "Failed to connect to MySQL: " . mysqli_connect_error();
			    } else {
			        mysqli_query($connection,$query);
			    }
			    mysqli_close($connection );
				
				
    //echo "hi";
	$email_to = "info@lifeandwellnessco.com, connie.sayal@gmail.com";
    //$email_to = "info@reputationindia.com";
	//$email_to = "aruna.singh@repindia.com";
	$email_bcc = "akshay.kalra@repindia.com, pritika.kaur@repindia.com, aruna.singh@repindia.com";
    $email_subject = "Enquiry form ";
     
     // Error fuction     

    $email_message .= "Name				: "  .$name."\n";
	$email_message .= "Email			: "  .$email."\n";
	$email_message .= "Phone/Mobile no 	: "  .$phone."\n";
	$email_message .= "Country 			: "  .$country."\n";
	$email_message .= "City 			: "  .$city."\n";
	$email_message .= "Message			: "  .$message."\n";
   // $email_message .= "Comments: ".clean_string($comments)."\n";
    

// include the from email in the headers

//$headers  .= "From:". $email;
//$headers .= "Bcc:". $email_bcc;
$headers ="From:".$email . "\r\n" .
"Bcc:".$email_bcc;

// boundary
$time = md5(time());
$boundary = "==Multipart_Boundary_x{$time}x";

// headers used for send attachment with email
$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$boundary}\"";

// multipart boundary
$email_message = "--{$boundary}\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . "Content-Transfer-Encoding: 7bit\n\n" . $email_message . "\n\n";
$email_message .= "--{$boundary}\n";

// create email headers
		
//$sendmail = mail($email_to, $email_subject, $email_message, $headers);
$result =mail($email_to, $email_subject, $email_message, $headers);

if($result){
		echo "<script type=\"text/javascript\">alert('Thank you form is submitted');</script>";
		echo '<script language="JavaScript"> window.location.href ="http://lifeandwellnessco.com/thankyou.html" </script>';
	}	
	
		
}

elseif (isset($_POST['callback'])) {
	   	//############### contact submit ##########################	
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];
		$country = $_POST['country'];
		$city = $_POST['city'];
		$message = $_POST['message'];
    
	
    
	$email_to = "info@lifeandwellnessco.com, connie.sayal@gmail.com";
    //$email_to = "info@reputationindia.com";
	
	//$email_to = "aruna.singh@repindia.com";//test mail id
	$email_bcc = "akshay.kalra@repindia.com, pritika.kaur@repindia.com ,aruna.singh@repindia.com";
    $email_subject = "Call Back confirmation form";
     
     // Error fuction 
    $email_message = "Form details below.\n\n";
       function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Full Name: ".$name."\n";
	$email_message .= "Email: ".$email."\n";
	$email_message .= "Phone/Mobile no : ".$phone."\n";
	$email_message .= "Country : ".$country."\n";
	$email_message .= "City : ".$city."\n";
	$email_message .= "Message: ".$message."\n";
   // $email_message .= "Comments: ".clean_string($comments)."\n";
     
        
// create email headers
		$headers = 'From: '.$email."\r\n".
		'Reply-To: '.$email."\r\n" .
		'Bcc:'   .$email_bcc."\r\n".
		'X-Mailer: PHP/' . phpversion();
		@mail($email_to, $email_subject, $email_message, $headers); 

		echo "<script type=\"text/javascript\">alert('Thank you form is submitted');</script>";
		echo '<script language="JavaScript"> window.location.href ="http://lifeandwellnessco.com/thankyou.html" </script>';
		
}

?>