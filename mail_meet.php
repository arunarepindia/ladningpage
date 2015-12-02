<?php

var_dump($_GET);

 //############### contact submit ##########################  
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$country = $_POST['country'];
$city = $_POST['city'];


$email_to = "kanav@repindia.com";
$email_subject = "Registration confirmation form";

     // Error fuction 


$email_message .= "Full Name: ".$name."\n";
$email_message .= "Email: ".$email."\n";
$email_message .= "Phone/Mobile no : ".$phone."\n";
$email_message .= "Country : ".$country."\n";
$email_message .= "City : ".$city."\n";
  // $email_message .= "Comments: ".clean_string($comments)."\n";

$file1 = $_FILES['file']['tmp_name'];


// File names of selected files
$filename1 = $_FILES['file']['name'];


// array of filenames to be as attachments
$files = array($file1);
$filenames = array($filename1);

// include the from email in the headers
$headers = "From: $email";

// boundary
$time = md5(time());
$boundary = "==Multipart_Boundary_x{$time}x";

// headers used for send attachment with email
$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$boundary}\"";

// multipart boundary
$email_message = "--{$boundary}\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . "Content-Transfer-Encoding: 7bit\n\n" . $email_message . "\n\n";
$email_message .= "--{$boundary}\n";

// attach the attachments to the message
for($x = 0; $x < count($files); $x++) 
{
  $file = fopen($files[$x], "r");
  $content = fread($file,filesize($files[$x]));
  fclose($file);
  $content = chunk_split(base64_encode($content));
  $email_message .= "Content-Type: {\"application/octet-stream\"};\n" . " name=\"$files[$x]\"\n" . "Content-Disposition: attachment;\n" . " filename=\"$filenames[$x]\"\n" . "Content-Transfer-Encoding: base64\n\n" . $content . "\n\n";
  $email_message .= "--{$boundary}\n";
}
// create email headers

$sendmail = mail($email_to, $email_subject, $email_message, $headers);
mail($email, $email_subject, $email_message, $headers);

?>