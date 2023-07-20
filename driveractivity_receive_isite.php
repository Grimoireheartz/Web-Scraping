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


$driver = $data["driver"];
$fromtime = $data["fromtime"];
$totime = $data["totime"];
$keytime = $data["keytime"];
$drivetime = $data["drivetime"];
$lifttime = $data["lifttime"];
$optime = $data["optime"];
$opratio = $data["opratio"];
$logoffMethod = $data["logoffMethod"];
$serialmachine = $data["serialmachine"];
$machinefamily = $data["machinefamily"];
$model = $data["model"];
$insertdata = $data["insertdata"];
$itemslength = $data["itemslength"];

$driver_arr = explode(',', $driver);
$fromtime_arr = explode(',', $fromtime);
$totime_arr = explode(',', $totime);
$keytime_arr = explode(',', $keytime);
$drivetime_arr = explode(',', $drivetime);
$lifttime_arr = explode(',', $lifttime);
$optime_arr = explode(',', $optime);
$opratio_arr = explode(',', $opratio);
$logoffMethod_arr = explode(',', $logoffMethod);
$serialmachine_arr = explode(',', $serialmachine);
$machinefamily_arr = explode(',', $machinefamily);
$model_arr = explode(',', $model);
$insertdata_arr = explode(',', $insertdata);
$itemslength_arr = explode(',', $itemslength);

$referencedate = $insertdata_arr[0];
$Filterdata = 0;
$FilterDriver = '';

while($Filterdata < (count($driver_arr) - 1)) {
    $FilterDriver .="(driver = '".$driver_arr[$Filterdata]."' and fromtime = '".$fromtime_arr[$Filterdata]."' and serialmachine = '".$serialmachine_arr[$Filterdata]."' ) or ";
    $Filterdata++;
}
$FilterDriver = substr($FilterDriver, 0, -4);

if(strlen($FilterDriver) > 0){
    $sql_insert_quotreq = "DELETE FROM bsc_isite_driveractivity 
                                 WHERE($FilterDriver) and insertdata like '%$referencedate%' ";
        $result = mysqli_query($link, $sql_insert_quotreq);
}

for ($x = 0; $x < (count($driver_arr) - 1); $x++) {


    $sql_insert_quotreq = "INSERT INTO bsc_isite_driveractivity (driver,fromtime,totime,keytime,drivetime,lifttime,optime,opratio,logoffMethod,serialmachine,machinefamily,model,insertdata) 
                            VALUES ('$driver_arr[$x]','$fromtime_arr[$x]','$totime_arr[$x]','$keytime_arr[$x]','$drivetime_arr[$x]','$lifttime_arr[$x]','$optime_arr[$x]','$opratio_arr[$x]','$logoffMethod_arr[$x]','$serialmachine_arr[$x]','$machinefamily_arr[$x]','$model_arr[$x]','$insertdata_arr[$x]')";
    $result = mysqli_query($link, $sql_insert_quotreq);
}

$status = 'success';
$response = strval($FilterDriver);


echo json_encode(array("status" => $status, "response" => $response));
