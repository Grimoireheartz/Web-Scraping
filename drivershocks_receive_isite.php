<?php
include '../server.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: *");

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

echo 'Receive_data_for_isite';

$data = json_decode(file_get_contents('php://input'), true);

$Driver = $data["Driver"];
$TotalShocks = $data["TotalShocks"];
$HighShocks = $data["HighShocks"];
$MediumShocks = $data["MediumShocks"];
$LowShocks = $data["LowShocks"];
$Lockouts = $data["Lockouts"];
$optimeandhighshocks = $data["optimeandhighshocks"];
$site = $data["site"];
$city = $data["city"];
$insertdata = $data["insertdata"];
$itemslength = $data["itemslength"];

$Driver_arr = explode(',', $Driver);
$TotalShocks_arr = explode(',', $TotalShocks);
$HighShocks_arr = explode(',', $HighShocks);
$MediumShocks_arr = explode(',', $MediumShocks);
$LowShocks_arr = explode(',', $LowShocks);
$Lockouts_arr = explode(',', $Lockouts);
$optimeandhighshocks_arr = explode(',', $optimeandhighshocks);
$site_arr = explode(',', $site);
$city_arr = explode(',', $city);
$insertdata_arr = explode(',', $insertdata);
$itemslength_arr = explode(',', $itemslength);

$referencedate = $insertdata_arr[0];
$Filterdata = 0;
$FilerSerialMachine = '';

// while ($Filterdata < (count($driver_arr) - 1)){
//     $FilterDriver .= "(driver = '".$driver_arr[$Filterdata]."' and site = '".$site_arr[$Filterdata]."' and opTime = '".$optime_arr[$Filterdata]."' utilization = '".$utilize_arr[$Filterdata]."' )  or ";
//     $Filterdata++;
// }
// $FilterDriver = substr($FilterDriver, 0, -4);

// if (strlen($FilterDriver) > 0) {
//     $sql_insert_quotreq = "DELETE FROM bsc_isite_driverutilize 
//                             WHERE($FilterDriver) and insert_date like '%$referencedate%' ";
//     $result = mysqli_query($link, $sql_insert_quotreq);
// }


for ($x = 0; $x < (count($Driver_arr) - 1); $x++) {

    $sql_insert_quotreq = "INSERT INTO bsc_isite_driveshocks (driver,totalshocks,highshocks,mediumshocks,lowshocks,lockouts,optimeandhighshocks,site,city,insertdata) 
                            VALUES ('$Driver_arr[$x]','$TotalShocks_arr[$x]','$HighShocks_arr[$x]','$MediumShocks_arr[$x]','$LowShocks_arr[$x]','$Lockouts_arr[$x]','$optimeandhighshocks_arr[$x]','$site_arr[$x]','$city_arr[$x]','$insertdata_arr[$x]')";
    $result = mysqli_query($link, $sql_insert_quotreq);
}


$status = 'success';
$response =strval($FilerSerialMachine);


echo json_encode(array("status" => $status, "response" => $response));


mysqli_close($link);