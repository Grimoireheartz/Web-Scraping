<?php

header("Access-Control-Allow-Origin: *");
include('../server.php');


if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;

    exit;
}


if (!$link->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $link->error);
    exit();
}

$filterdate = "STR_TO_DATE(insert_date,'%m/%d/%Y') DESC";

$serial_get = json_decode($_POST['serial_ref']);

$serialmachine = '';
foreach ($serial_get as $val) {
    $serialmachine .= "serialmachine = '" . $val . "' or ";
}





$serialmachine = substr($serialmachine, 0, -4);

// echo 'Reply activity' . $serialmachine;


$sql = "SELECT serialmachine,fromtime,totime,keytime,drivetime,lifttime,optime,opratio,driver,logoffMethod,machinefamily,model,insert_date
                FROM bsc_isite_machineactivity 
                WHERE $serialmachine
               ORDER BY serialmachine ASC,$filterdate
            ";





// // $sql = "SELECT serialmachine,machinefamily, SUM(keytime) AS keytime , SUM(drivetime) AS drivetime , SUM(lifttime) AS lifttime,SUM(optime) AS optime,SUM(opratio) AS opratio,insert_date
// //         FROM bsc_isite_machineactivity
// //         GROUP BY serialmachine
// //         ";

$result = mysqli_query($link, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }
    echo json_encode($output);
} else {
    echo 'error';
}




mysqli_close($link);
