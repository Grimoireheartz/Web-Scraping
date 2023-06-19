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


// $sql_delete = "DELETE FROM bsc_isite_machineutilize";
// $result_delete = mysqli_query($link, $sql_delete);



$data = json_decode(file_get_contents('php://input'), true);

$serial = $data["serial"];
$cussite = $data['cussite'];
$operategtime = $data['operatingTime'];
$utiliz = $data['utiliz'];
$city = $data['city'];
$lastupdate = $data['lastup'];
$owner = $data['owner'];
$family = $data['family'];
$model = $data['model'];
$insertdate = $data['insertdate'];
$itemslengths = $data['itemslength'];

$serial_arr  = explode(',', $serial);
$cussite_arr  = explode(',', $cussite);
$operategtime_arr = explode(',', $operategtime);
$utiliz_arr = explode(',', $utiliz);
$city_arr = explode(',', $city);
$lastupdate_arr = explode(',', $lastupdate);
$owner_arr = explode(',', $owner);
$family_arr = explode(',', $family);
$model_arr = explode(',', $model);
$insertdate_arr = explode(',', $insertdate);
$itemslengths_arr = explode(',', $itemslengths);

$newdate = date("d/m/Y H:i:s");
// $insertdate = $referencedate;

$referencedate = $insertdate_arr[0];

$Filterdata = 0;
$FilterSerailMachine = '';
// echo("First");
while ($Filterdata < (count($serial_arr) - 1)) {
    $FilterSerailMachine .= "serialmachine = '".$serial_arr[$Filterdata]."' or ";
    $Filterdata++;

    // echo($FilterSerailMachine);
}
$FilterSerailMachine = substr($FilterSerailMachine, 0, -4);


if (strlen($FilterSerailMachine) > 0) {
    $sql_insert_quotreq = "DELETE FROM bsc_isite_machineutilize 
                            WHERE($FilterSerailMachine) and insert_date like '%$referencedate%' ";
    $result = mysqli_query($link, $sql_insert_quotreq);
}



for ($x = 0; $x < (count($serial_arr) - 1); $x++) {

    $sql_insert_quotreq = "INSERT INTO bsc_isite_machineutilize (serialmachine,text_cussite,operatingtime,utilization,city,last_update,owner,machinefamily,model,insert_date) 
                            VALUES ('$serial_arr[$x]','$cussite_arr[$x]','$operategtime_arr[$x]','$utiliz_arr[$x]','$city_arr[$x]','$lastupdate_arr[$x]','$owner_arr[$x]','$family_arr[$x]','$model_arr[$x]','$insertdate_arr[$x]')";
    $result = mysqli_query($link, $sql_insert_quotreq);
}


$status = 'success';
$response =strval($FilterSerailMachine);


echo json_encode(array("status" => $status, "response" => $response));

// if (isset($_GET)) {
//     if ($_GET['apikey'] == $bsc_db_apikey) {


//     } else echo "btserviceconnect_requestregis";
// }


mysqli_close($link);
