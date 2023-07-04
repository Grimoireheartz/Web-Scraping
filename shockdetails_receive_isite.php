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

$date = $data["date"];
$driver = $data["driver"];
$serialmachine = $data["serialmachine"];
$xthreshold = $data["xthreshold"];
$ythreshold = $data["ythreshold"];
$site = $data["site"];
$city = $data["city"];
$speed = $data["speed"];
$bdi = $data["bdi"];
$fleetnumber = $data["fleetnumber"];
$tmhfleetnumber = $data["tmhfleetnumber"];
$machinefamily = $data["machinefamily"];
$model = $data["model"];
$insertdata = $data["insertdata"];
$itemslength = $data["itemslength"];


$date_arr = explode(',', $date);
$driver_arr = explode(',', $driver);
$serialmachine_arr = explode(',', $serialmachine);
$xthreshold_arr = explode(',', $xthreshold);
$ythreshold_arr = explode(',', $ythreshold);
$site_arr = explode(',', $site);
$city_arr = explode(',', $city);
$speed_arr = explode(',', $speed);
$bdi_arr = explode(',', $bdi);
$fleetnumber_arr = explode(',', $fleetnumber);
$tmhfleetnumber_arr = explode(',', $tmhfleetnumber);
$machinefamily_arr = explode(',', $machinefamily);
$model_arr = explode(',', $model);
$insertdata_arr = explode(',', $insertdata);
$itemslength_arr = explode(',', $itemslength);


$referencedate = $insertdata_arr[0];
$Filterdata = 0;
$FilterDriver = '';

while ($Filterdata < (count($serialmachine_arr) - 1)){
    $FilterDriver .= "( date = '".$date_arr[$Filterdata]."'and driver = '".$driver_arr[$Filterdata]."'and serialmachine = '".$serialmachine_arr[$Filterdata]."')  or ";
    $Filterdata++;
}
$FilterDriver = substr($FilterDriver, 0, -4);

// if (strlen($FilterDriver) > 0) {
//     echo("success delete data !");
//     $sql_insert_quotreq = "DELETE FROM bsc_isite_shockdetails 
//                             WHERE($FilterDriver) and insertdate like '%$referencedate%' ";
//     $result = mysqli_query($link, $sql_insert_quotreq);
// }


for ($x = 0; $x < (count($serialmachine_arr) - 1); $x++) {
    echo("Success get data in database ");

    $sql_insert_quotreq = "INSERT INTO bsc_isite_shockdetails (date,driver,serialmachine,xthreshold,ythreshold,site,city,speed,bdi,fleetnumber,tmhfleetnumber,machinefamily,model,insertdate) 
                            VALUES ('$date_arr[$x]','$driver_arr[$x]','$serialmachine_arr[$x]','$xthreshold_arr[$x]','$ythreshold_arr[$x]','$site_arr[$x]','$city_arr[$x]','$speed_arr[$x]','$bdi_arr[$x]','$fleetnumber_arr[$x]','$tmhfleetnumber_arr[$x]','$machinefamily_arr[$x]','$model_arr[$x]','$insertdata_arr[$x]')";
    $result = mysqli_query($link, $sql_insert_quotreq);
}


$status = 'success';
$response =strval($FilterDriver);


echo json_encode(array("status" => $status, "response" => $response));


mysqli_close($link);







?>