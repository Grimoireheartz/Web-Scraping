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

date_default_timezone_set("Asia/Bangkok");
$monthnow  = date("m");
$monthbefore = $monthnow ; 
$yearnow = date("Y");
$monthbefore = intval($monthbefore) - 1;
if ($monthbefore == 0) {
    $monthbefore = 1;
}

$sql = "SELECT  serialmachine,text_cussite,operatingtime,utilization,city,last_update,owner,machinefamily,model,insert_date
                FROM bsc_isite_machineutilize 
                WHERE (insert_date LIKE '$monthbefore%' and insert_date LIKE '%$yearnow') or (insert_date LIKE '$monthnow%' and insert_date LIKE '%$yearnow')
               ORDER BY text_cussite ASC,serialmachine ASC
              
            ";


// $sql = "SELECT serialmachine,machinefamily, SUM(keytime) AS keytime , SUM(drivetime) AS drivetime , SUM(lifttime) AS lifttime,SUM(optime) AS optime,SUM(opratio) AS opratio,insert_date
//         FROM bsc_isite_machineactivity
//         GROUP BY serialmachine
//         ";

$result = mysqli_query($link, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }
    echo json_encode($output);
} else {
    echo 'error';
}
// } else {
//     echo 'error';
// }



mysqli_close($link);
