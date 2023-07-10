import 'dart:convert';

import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:flutter_chart/model/machineactivity.dart';
import 'package:flutter_chart/model/machineutilize.dart';
import 'package:flutter_chart/utility/myconstant.dart';
import 'package:dio/dio.dart';

class Isiteactivity extends StatefulWidget {
  const Isiteactivity({Key? key}) : super(key: key);

  @override
  State<Isiteactivity> createState() => _IsiteactivityState();
}

class _IsiteactivityState extends State<Isiteactivity> {
  List<MachineActivity> machineactivity = [];
  List<MachineActivity> machineactprocessdata = [];
  List<MachineUtiliza> machineutilizedata = [];
  List<MachineUtiliza> machineutilize = [];
  List<List<List<String>>> customersitefilter = [];
  bool load = false;
  List<List<List<String>>> selectCusList = [];
  List<MachineActivity> machinedata = [];

  @override
  void initState() {
    super.initState();
    ActivityMachine(); // เรียกใช้งานฟังก์ชัน ActivityMachine()
    UtilizeMachine();
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
                child: Column(
                  children: [
                    Container(
                      width: screensize * 0.9,
                      child: DropdownSearch<List<List<String>>>.multiSelection(
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

                          // disabledItemFn: (String s) => s.startsWith('I'),
                          itemBuilder: (context, item, isSelected) {
                            return Container(
                              // height: 40,
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
                          // print(value);
                          // String cusselect = '';

                          for (var data in value) {
                            // String cusname = data.split(',')[1];
                            for (var serialmachine in data[1]) {
                              print(serialmachine);
                            }
                            // print(data);
                          }
                          // if (cusselect.length > 1) {
                          //   cusselect = cusselect.substring(0, (cusselect.length - 1));
                          //   print(cusselect);
                          //   setState(() {
                          //     customerFilterSearchPM = cusselect;
                          //   });
                          //   getCusPMPlan();
                          // }
                        },
                        selectedItems: selectCusList,
                        dropdownButtonProps:
                            DropdownButtonProps(isVisible: false),
                      ),
                    ),
                    ...showdatamachine()
                  ],
                ),
              ),
            ),
    );
  }

  List<Widget> showdatamachine() {
    List<Widget> iteamshow = [];

    for (var dataitems in machineactprocessdata) {
      iteamshow.add(Container(
        child: Text(dataitems.serialmachine),
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

    String cussite = '';
    String serialsite = '';
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
            [machineobject.serialmachine]
          ]);
        } else {
          if (serialbefore != machineobject.serialmachine) {
            customersitefilter[countsite][1].add(machineobject.serialmachine);
          }
        }
        sitebefore = machineobject.text_cussite;
        serialbefore = machineobject.serialmachine;
        // print('Site:' + cussite + ' Serial Number' + serialsite);
        // print(serialsite);
      }
      // machineutilizedata.add(MachineUtiliza(
      //   text_cussite: cussite,
      //   serialmachine: serialsite,
      //   operatingtime: '',
      //   utilization: '',
      //   city: '',
      //   last_update: '',
      //   owner: '',
      //   machinefamily: '',
      //   model: '',
      //   insert_date: '',
      // ));
      // print(cussite);
      // print(serialsite);
    }).then((value) {
      print(customersitefilter);

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
    String insertdate = '';
    double sumkeytime = 0;
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
          } else {
            if (firstdata == false) {
              machineactprocessdata.add(
                MachineActivity(
                  serialmachine: serialbefore,
                  fromtime: '',
                  totime: '',
                  keytime: sumkeytime.toString(),
                  drivetime: '',
                  lifttime: '',
                  optime: '',
                  opratio: '',
                  driver: '',
                  logoffMethod: '',
                  machinefamily: '',
                  model: '',
                  insert_date: insertdate,
                ),
              );
            }
            sumkeytime = 0;
            sumkeytime +=
                double.parse(activityObj.keytime.split(':')[0]) * 3600;
            sumkeytime += double.parse(activityObj.keytime.split(':')[1]) * 60;
            sumkeytime += double.parse(activityObj.keytime.split(':')[2]);
            firstdata = false;
          }
          serialbefore = activityObj.serialmachine;
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
          drivetime: '',
          lifttime: '',
          optime: '',
          opratio: '',
          driver: '',
          logoffMethod: '',
          machinefamily: '',
          model: '',
          insert_date: insertdate,
        ),
      );
    }).then((value) {
      print(machineactprocessdata);

      setState(() {
        load = false;
      });
    });
  }
}
