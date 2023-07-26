import 'dart:convert';

import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:flutter_chart/model/chart_model.dart';
import 'package:flutter_chart/model/machineactivity.dart';
import 'package:flutter_chart/model/machineutilize.dart';
import 'package:flutter_chart/utility/myconstant.dart';
import 'package:dio/dio.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class Isiteactivity extends StatefulWidget {
  const Isiteactivity({Key? key}) : super(key: key);

  @override
  State<Isiteactivity> createState() => _IsiteactivityState();
}

class _IsiteactivityState extends State<Isiteactivity> {
  List<MachineActivity> machineactivity = [];
  List<MachineActivity> machineactprocessdata = [];
  List<MachineActivity> machinefilterdata = [];
  List<MachineUtiliza> machineutilizedata = [];
  List<MachineUtiliza> machineutilize = [];
  List<List<List<String>>> customersitefilter = [];
  bool load = false;
  List<List<List<String>>> selectCusList = [];
  List<String> machinedata = [];
  List<String> months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  List<String> days0fmonth = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31'
  ];
  List<List<String>> dayone = [
    for (var x = 1; x <= 31; x++) ['${x}', '0']
  ];
  List<OPChartModel> opchartData = [];

  String selectedMonth = "January";

  @override
  void initState() {
    super.initState();
    ActivityMachine();
    UtilizeMachine();
    if (selectedMonth == null) {
      selectedMonth = months[0];
    }
  }

  void filterprocess() {
    machinefilterdata.clear();

    print('Serial is  => ${machinedata.toString()}');

    for (var data in machineactprocessdata) {
      List<String> dateParts = data.insert_date.split('/');
      // print('Get data => ${data.serialmachine}');
      if (machinedata.contains(data.serialmachine.toString())) {
        print('Match serial => ${data.serialmachine}');
        setState(() {
          machinefilterdata.add(data);
        });
      }
    }
  }

  void filterchart() {
    dayone.clear();
    for (var x = 1; x <= 31; x++) {
      dayone.add(['$x', '0']);
    }

    for (var data in machineactprocessdata) {
      List<String> chartdata = data.insert_date.split('/');
      int chartMonth = int.parse(chartdata[0]);
      // Check if the data belongs to the selected month
      if (months.indexOf(selectedMonth) + 1 == chartMonth) {
        int chartDay = int.parse(chartdata[1]);
        int opTimeAdded = double.parse(data.optime).toInt();
        dayone[chartDay - 1][1] =
            (opTimeAdded + int.parse(dayone[chartDay - 1][1])).toString();
      }
    }

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    double screensize = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        title: const Text('I-Site DashBoard'),
        foregroundColor: Colors.black,
      ),
      body: load
          ? Center(
              child: CircularProgressIndicator(),
            )
          : SingleChildScrollView(
              child: Container(
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Column(
                    children: [
                      Container(
                        width: screensize * 0.9,
                        child:
                            DropdownSearch<List<List<String>>>.multiSelection(
                          dropdownBuilder: (context, selectedItems) {
                            return Container(
                              child: selectedItems.length > 1
                                  ? Text(
                                      'Select ${selectedItems.length.toString()} items')
                                  : Text(
                                      'Select ${selectedItems.length.toString()} item'),
                            );
                          },
                          items: customersitefilter,
                          compareFn: (item1, item2) => item1[0] == item2[0],
                          clearButtonProps: ClearButtonProps(
                            isVisible: true,
                          ),
                          popupProps: PopupPropsMultiSelection.menu(
                            showSelectedItems: true,
                            showSearchBox: true,
                            itemBuilder: (context, item, isSelected) {
                              return Container(
                                margin: EdgeInsets.symmetric(horizontal: 8),
                                decoration: null,
                                child: ListTile(
                                  selected: isSelected,
                                  title: Text(
                                    item[0][0],
                                    style: TextStyle(fontSize: 14),
                                  ),
                                ),
                              );
                            },
                          ),
                          onChanged: (value) {
                            setState(() {
                              machinedata.clear();
                            });
                            // print(value);
                            // String cusselect = '';

                            for (var data in value) {
                              for (var serialmachine in data[1]) {
                                print(serialmachine);

                                setState(() {
                                  machinedata.add(serialmachine);
                                });
                              }
                            }
                            filterprocess();
                          },
                          dropdownButtonProps:
                              DropdownButtonProps(isVisible: false),
                        ),
                      ),
                      Container(
                          width: screensize * 0.9,
                          child: DropdownButton<String>(
                            value: selectedMonth,
                            onChanged: (String? newValue) {
                              setState(() {
                                selectedMonth = newValue!;
                                filterchart();
                              });
                            },
                            items: months
                                .map<DropdownMenuItem<String>>((String value) {
                              return DropdownMenuItem<String>(
                                value: value,
                                child: Text(value),
                              );
                            }).toList(),
                          )),
                      Text(machinedata.toString()),
                      Text(machinedata.length.toString()),
                      Container(width: screensize * 3, child: showchartdata()),
                      ...showdatamachine(),
                    ],
                  ),
                ),
              ),
            ),
    );
  }

  Widget showchartdata() {
    opchartData.clear();
    for (var data in machineactprocessdata) {
      List<String> dateParts = data.insert_date.split('/');
      int dataDay = int.parse(dateParts[1]);
      // print('Number of optime =>' + data.optime + '|');
      // print('Old ${int.parse(dayone[dataDay - 1][1])}');
      int opTimeAdded = double.parse(data.optime).toInt();
      // print('New Value => ${double.parse(data.optime)}');
      dayone[dataDay - 1][1] =
          (opTimeAdded + int.parse(dayone[dataDay - 1][1])).toString();
    }
    // print(dayone);
    for (var data in dayone) {
      opchartData.add(OPChartModel(day: data[0], optime: int.parse(data[1])));
    }
    // print(opchartData);
    return SfCartesianChart(
      primaryXAxis: CategoryAxis(),
      series: <ChartSeries>[
        ColumnSeries<OPChartModel, String>(
            dataSource: opchartData,
            xValueMapper: (OPChartModel data, _) => data.day,
            yValueMapper: (OPChartModel data, _) => (data.optime) / 3600),
      ],
    );
  }

  List<Widget> showdatamachine() {
    List<Widget> iteamshow = [];
    print('To Get data point and Show !');
    for (var dataitems in machinefilterdata) {
      print('test ${dataitems.serialmachine} : ${dataitems.keytime}');
      print('clear');
      iteamshow.add(Container(
        child: Row(
          children: [
            Text('Data'),
            Text(dataitems.serialmachine),
            Text(' : ' + dataitems.insert_date),
            Text(' : ' + dataitems.keytime),
            Text(' : ' + dataitems.drivetime),
            Text(' : ' + dataitems.lifttime),
            Text(' : ' + dataitems.optime),
            Text(' : ' + dataitems.machinefamily),
            Text(' : ' + dataitems.model),
          ],
        ),
      ));
    }

    return iteamshow;
  }

  Future<Null> UtilizeMachine() async {
    setState(() {
      load = true;
    });
    print('start with get data in database MYSQL');
    String apiPath = '${MyConstant.domain_btcondbapi}select_machineutilize.php';

    print(apiPath);

    String sitebefore = '';
    String serialbefore = '';

    int countsite = -1;

    bool firstdata = true;
    await Dio().get(apiPath).then((value) {
      for (var activity in jsonDecode(value.data)) {
        MachineUtiliza machineobject = MachineUtiliza.fromMap(activity);

        if (sitebefore != machineobject.text_cussite) {
          countsite++;
          customersitefilter.add([
            [machineobject.text_cussite],
            [machineobject.serialmachine],
          ]);
        } else {
          if (serialbefore != machineobject.serialmachine) {
            customersitefilter[countsite][1].add(machineobject.serialmachine);
          }
        }
        sitebefore = machineobject.text_cussite;
        serialbefore = machineobject.serialmachine;
        machineutilize.add(machineobject);
        // print('Site:' + cussite + ' Serial Number' + serialsite);

        // print(serialbefore);
        // print('operatingtimedata is =>' + operatingtimedata.toString());
      }

      // print(serialsite);
    }).then((value) {
      // print(customersitefilter);

      setState(() {
        load = false;
      });
    });
  }

  Future<Null> ActivityMachine() async {
    setState(() {
      load = true;
    });
    print('start with get data in database MYSQL');
    String apiPath =
        '${MyConstant.domain_btcondbapi}select_machineactivity.php';

    print(apiPath);

    String serialbefore = '';
    String machinefamilydata = '';
    String modeldata = '';
    String insertdate = '';
    double sumkeytime = 0;
    double sumdrivetime = 0;
    double sumlifttime = 0;
    double sumoptime = 0;

    bool firstdata = true;
    await Dio().get(apiPath).then((value) {
      for (var activity in jsonDecode(value.data)) {
        MachineActivity activityObj = MachineActivity.fromMap(activity);

        if (activityObj.keytime != 'undefined' &&
            activityObj.keytime.length > 1) {
          if (serialbefore == activityObj.serialmachine &&
              insertdate == activityObj.insert_date) {
            sumkeytime +=
                double.parse(activityObj.keytime.split(':')[0]) * 3600;
            sumkeytime += double.parse(activityObj.keytime.split(':')[1]) * 60;
            sumkeytime += double.parse(activityObj.keytime.split(':')[2]);
            sumdrivetime +=
                double.parse(activityObj.drivetime.split(':')[0]) * 3600;
            sumdrivetime +=
                double.parse(activityObj.drivetime.split(':')[1]) * 60;
            sumdrivetime += double.parse(activityObj.drivetime.split(':')[2]);

            sumlifttime +=
                double.parse(activityObj.lifttime.split(':')[0]) * 3600;
            sumlifttime +=
                double.parse(activityObj.lifttime.split(':')[1]) * 60;
            sumlifttime += double.parse(activityObj.lifttime.split(':')[2]);

            sumoptime += double.parse(activityObj.optime.split(':')[0]) * 3600;
            sumoptime += double.parse(activityObj.optime.split(':')[1]) * 60;
            sumoptime += double.parse(activityObj.optime.split(':')[2]);
          } else {
            if (firstdata == false) {
              machineactprocessdata.add(
                MachineActivity(
                  serialmachine: serialbefore,
                  fromtime: '',
                  totime: '',
                  keytime: sumkeytime.toString(),
                  drivetime: sumdrivetime.toString(),
                  lifttime: sumlifttime.toString(),
                  optime: sumoptime.toString(),
                  opratio: '',
                  driver: '',
                  logoffMethod: '',
                  machinefamily: activityObj.machinefamily,
                  model: activityObj.model,
                  insert_date: insertdate,
                ),
              );
            }
            sumkeytime = 0;
            sumkeytime +=
                double.parse(activityObj.keytime.split(':')[0]) * 3600;
            sumkeytime += double.parse(activityObj.keytime.split(':')[1]) * 60;
            sumkeytime += double.parse(activityObj.keytime.split(':')[2]);

            sumdrivetime = 0;
            sumdrivetime +=
                double.parse(activityObj.drivetime.split(':')[0]) * 3600;
            sumdrivetime +=
                double.parse(activityObj.drivetime.split(':')[1]) * 60;
            sumdrivetime += double.parse(activityObj.drivetime.split(':')[2]);

            sumlifttime = 0;
            sumlifttime +=
                double.parse(activityObj.lifttime.split(':')[0]) * 3600;
            sumlifttime +=
                double.parse(activityObj.lifttime.split(':')[1]) * 60;
            sumlifttime += double.parse(activityObj.lifttime.split(':')[2]);

            sumoptime = 0;
            sumoptime += double.parse(activityObj.optime.split(':')[0]) * 3600;
            sumoptime += double.parse(activityObj.optime.split(':')[1]) * 60;
            sumoptime += double.parse(activityObj.optime.split(':')[2]);

            firstdata = false;
          }
          serialbefore = activityObj.serialmachine;
          machinefamilydata = activityObj.machinefamily;
          modeldata = activityObj.model;
          insertdate = activityObj.insert_date;
          setState(() {
            machineactivity.add(activityObj);
          });
        }
      }

      machineactprocessdata.add(
        MachineActivity(
          serialmachine: serialbefore,
          fromtime: '',
          totime: '',
          keytime: sumkeytime.toString(),
          drivetime: sumdrivetime.toString(),
          lifttime: sumlifttime.toString(),
          optime: sumoptime.toString(),
          opratio: '',
          driver: '',
          logoffMethod: '',
          machinefamily: machinefamilydata,
          model: modeldata,
          insert_date: insertdate,
        ),
      );
    }).then((value) {
      print(machineactprocessdata);
      filterprocess();
      setState(() {
        load = false;
      });
    });
  }
}
