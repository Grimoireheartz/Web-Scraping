<?php
include('server.php');

echo "User Insert Database";

$DBISTART = $_POST['DBISTART'];
$DBIEND = $_POST['DBIEND'];
$Date = $_POST['Date'];

echo "DBISTART:".$DBISTART;
echo "DBIEND:".$DBIEND;
echo "Date:".$Date;

$sql = "INSERT INTO chartdata (DBISTART, DBIEND, Date)
VALUES ('$DBISTART', '$DBIEND', '$Date')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}



?>