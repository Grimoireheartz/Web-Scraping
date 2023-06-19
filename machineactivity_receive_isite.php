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


$serialmachine = $data["serialmachine"];
$fromtime = $data["fromtime"];
$totime = $data["totime"];
$keytime = $data["keytime"];
$drivetime = $data["drivetime"];
$lifttime = $data["lifttime"];
$optime = $data["optime"];
$opratio = $data["opratio"];
$driver = $data["driver"];
$logoffMethod = $data["logoffMethod"];
$Machinefamily = $data["Machinefamily"];
$Model = $data["Model"];
$insertdata = $data["insertdata"];
$itemslength = $data["itemslength"];

$serialmachine_arr = explode(',', $serialmachine);
$fromtime_arr = explode(',', $fromtime);
$totime_arr = explode(',', $totime);
$keytime_arr = explode(',', $keytime);
$drivetime_arr = explode(',', $drivetime);
$lifttime_arr = explode(',', $lifttime);
$optime_arr = explode(',', $optime);
$opratio_arr = explode(',', $opratio);
$driver_arr = explode(',', $driver);
$logoffMethod_arr = explode(',', $logoffMethod);
$Machinefamily_arr = explode(',', $Machinefamily);
$Model_arr = explode(',', $Model);
$insertdata_arr = explode(',', $insertdata);
$itemslength_arr = explode(',', $itemslength);


$referencedate = $insertdata_arr[0];
$Filterdata = 0;
$FilterSerialMachince = '';

while ($Filterdata < (count($serialmachine_arr) - 1)) {
    $FilterSerialMachince .="(serialmachine = '".$serialmachine_arr[$Filterdata]."' and fromtime = '".$fromtime_arr[$Filterdata]."' and opratio = '".$opratio_arr[$Filterdata]."' ) or ";
    $Filterdata++;
}
$FilterSerialMachince = substr($FilterSerialMachince, 0, -4);

if (strlen($FilterSerialMachince) > 0) {
    $sql_insert_quotreq = "DELETE FROM bsc_isite_machineactivity 
                                 WHERE($FilterSerialMachince) and insert_date like '%$referencedate%' ";
        $result = mysqli_query($link, $sql_insert_quotreq);
}

for ($x = 0; $x < (count($serialmachine_arr) - 1); $x++) {

    $sql_insert_quotreq = "INSERT INTO bsc_isite_machineactivity (serialmachine,fromtime,totime,keytime,drivetime,lifttime,optime,opratio,driver,logoffMethod,machinefamily,model,insert_date) 
                            VALUES ('$serialmachine_arr[$x]','$fromtime_arr[$x]','$totime_arr[$x]','$keytime_arr[$x]','$drivetime_arr[$x]','$lifttime_arr[$x]','$optime_arr[$x]','$opratio_arr[$x]','$driver_arr[$x]','$logoffMethod_arr[$x]','$Machinefamily_arr[$x]','$Model_arr[$x]','$insertdata_arr[$x]')";
    $result = mysqli_query($link, $sql_insert_quotreq);
}


$status = 'success';
$response =strval($FilterSerialMachince);


echo json_encode(array("status" => $status, "response" => $response));



?>