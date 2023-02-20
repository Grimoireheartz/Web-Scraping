<?php
include("server.php");

$fillerdate = "STR_TO_DATE(startTS,'%Y/%m/%d %H:%i:%s') ASC";

$sql = "SELECT *
        FROM myguests
        ORDER BY $fillerdate ";
$result = $conn->query($sql);



$data_chart = "";


if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        // echo "Machine: " . $row["machine"]. " - Model: " . $row["model"]. " " . $row["site"]. " ".$row["utiliation"]. " " .$row["operating_time"]. " ". $row["expected_hours"]. " ". $row["lastupadate"].  "<br>";


        $data_chart .= $row['startTS'] . ' GMT&data=' . $row['bdiSTART'] . ',';
        $data_chart .= $row['endTS'] . ' GMT&data=' . $row['bdiEND'] . ',';
        // echo $data_chart.'<br>';
    }
} else {
    echo "0 results";
}
?>
<!DOCTYPE html>
<html>

<head>


</head>

<body>
    <div id="chart"></div>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script>
        // const dates = [{
        //     x: '05/06/2014',
        //     y: 54
        // }, {
        //     x: '05/08/2014',
        //     y: 17
        // }, {
        //     x: '05/28/2014',
        //     y: 26
        // }]
        var dates_data = <?php echo json_encode($data_chart); ?>;
        // console.log(dates_data)
        const dates_arr = dates_data.split(',')
        const dates = []
        for (var x = 0; x < dates_arr.length; x++) {
            // console.log(dates_arr[x])
            var datax = dates_arr[x].split('&data=')[0];
            var datay = dates_arr[x].split('&data=')[1];
            dates.push({
                x: datax,
                y: datay
            })



        }
        console.log(JSON.stringify(dates))
        var options = {
            series: [{
                name: 'BDI',
                data: dates
            }],
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Battery Detail',
                align: 'left'
            },
            stroke: {
                width: 1,
                curve: 'straight',
               
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                // labels: {
                //     formatter: function(val) {
                //         return (val / 1000000).toFixed(0);
                //     },
                // },
                min: 0,
                max: 100,
                title: {
                    text: 'BDI Status(%)'
                },
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
                x: {
                    show: true,
                    format: ('MM/dd/yyyy HH:mm:ss '),
                },
                y: {
                    formatter: function(val) {
                        return (val).toFixed(0)
                    }
                }

            }
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    </script>


</body>




</html>