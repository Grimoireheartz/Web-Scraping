import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_chart/body/machineactivity.dart';
import 'package:flutter_chart/utility/myconstant.dart';
import 'package:dio/dio.dart';

class Isiteactivity extends StatefulWidget {
  const Isiteactivity({super.key});

  @override
  State<Isiteactivity> createState() => _IsiteactivityState();
}

class _IsiteactivityState extends State<Isiteactivity> {
  List<MachineActivity> machineactivity = [];

  @override
  Widget build(BuildContext context) {
    // double screensize = MediaQuery.of(context).size.width;
    // double screensizeHight = MediaQuery.of(context).size.height;
    ActivityMachine();

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        title: const Text('I-Site DashBoard'),
        foregroundColor: Colors.black,
      ),
    );
  }

  Future<Null> ActivityMachine() async {
    print('start with get data in database MYSQL');
    String apiPath =
        '${MyConstant.domain_btcondbapi}select_machineactivity.php';

    print(apiPath);
    await Dio().get(apiPath).then((value) {
      print('return data form database===> $value');
      for (var activity in jsonDecode(value.data)) {
        MachineActivity Activitymachine = MachineActivity.fromMap(activity);

        print(Activitymachine.serialmachine);
        // print(Activitymachine.fromtime);
        // print(Activitymachine.totime);
        print(Activitymachine.keytime);
        print(Activitymachine.drivetime);
        print(Activitymachine.lifttime);
        print(Activitymachine.optime);
        print(Activitymachine.opratio);
        // print(Activitymachine.driver);
        // print(Activitymachine.logoffMethod);
        print(Activitymachine.machinefamily);
        // print(Activitymachine.model);
        print(Activitymachine.insert_date);
      }
    });
  }
}
