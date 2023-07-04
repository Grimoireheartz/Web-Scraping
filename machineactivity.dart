// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class MachineActivity {
  final String serialmachine;
  final String fromtime;
  final String totime;
  final String keytime;
  final String drivetime;
  final String lifttime;
  final String optime;
  final String opratio;
  final String driver;
  final String logoffMethod;
  final String machinefamily;
  final String model;
  final String insert_date;
  MachineActivity({
    required this.serialmachine,
    required this.fromtime,
    required this.totime,
    required this.keytime,
    required this.drivetime,
    required this.lifttime,
    required this.optime,
    required this.opratio,
    required this.driver,
    required this.logoffMethod,
    required this.machinefamily,
    required this.model,
    required this.insert_date,
  });

  MachineActivity copyWith({
    String? serialmachine,
    String? fromtime,
    String? totime,
    String? keytime,
    String? drivetime,
    String? lifttime,
    String? optime,
    String? opratio,
    String? driver,
    String? logoffMethod,
    String? machinefamily,
    String? model,
    String? insert_date,
  }) {
    return MachineActivity(
      serialmachine: serialmachine ?? this.serialmachine,
      fromtime: fromtime ?? this.fromtime,
      totime: totime ?? this.totime,
      keytime: keytime ?? this.keytime,
      drivetime: drivetime ?? this.drivetime,
      lifttime: lifttime ?? this.lifttime,
      optime: optime ?? this.optime,
      opratio: opratio ?? this.opratio,
      driver: driver ?? this.driver,
      logoffMethod: logoffMethod ?? this.logoffMethod,
      machinefamily: machinefamily ?? this.machinefamily,
      model: model ?? this.model,
      insert_date: insert_date ?? this.insert_date,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'serialmachine': serialmachine,
      'fromtime': fromtime,
      'totime': totime,
      'keytime': keytime,
      'drivetime': drivetime,
      'lifttime': lifttime,
      'optime': optime,
      'opratio': opratio,
      'driver': driver,
      'logoffMethod': logoffMethod,
      'machinefamily': machinefamily,
      'model': model,
      'insert_date': insert_date,
    };
  }

  factory MachineActivity.fromMap(Map<String, dynamic> map) {
    return MachineActivity(
      serialmachine: map['serialmachine'] as String,
      fromtime: map['fromtime'] as String,
      totime: map['totime'] as String,
      keytime: map['keytime'] as String,
      drivetime: map['drivetime'] as String,
      lifttime: map['lifttime'] as String,
      optime: map['optime'] as String,
      opratio: map['opratio'] as String,
      driver: map['driver'] as String,
      logoffMethod: map['logoffMethod'] as String,
      machinefamily: map['machinefamily'] as String,
      model: map['model'] as String,
      insert_date: map['insert_date'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory MachineActivity.fromJson(String source) =>
      MachineActivity.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'MachineActivity(serialmachine: $serialmachine, fromtime: $fromtime, totime: $totime, keytime: $keytime, drivetime: $drivetime, lifttime: $lifttime, optime: $optime, opratio: $opratio, driver: $driver, logoffMethod: $logoffMethod, machinefamily: $machinefamily, model: $model, insert_date: $insert_date)';
  }

  @override
  bool operator ==(covariant MachineActivity other) {
    if (identical(this, other)) return true;

    return other.serialmachine == serialmachine &&
        other.fromtime == fromtime &&
        other.totime == totime &&
        other.keytime == keytime &&
        other.drivetime == drivetime &&
        other.lifttime == lifttime &&
        other.optime == optime &&
        other.opratio == opratio &&
        other.driver == driver &&
        other.logoffMethod == logoffMethod &&
        other.machinefamily == machinefamily &&
        other.model == model &&
        other.insert_date == insert_date;
  }

  @override
  int get hashCode {
    return serialmachine.hashCode ^
        fromtime.hashCode ^
        totime.hashCode ^
        keytime.hashCode ^
        drivetime.hashCode ^
        lifttime.hashCode ^
        optime.hashCode ^
        opratio.hashCode ^
        driver.hashCode ^
        logoffMethod.hashCode ^
        machinefamily.hashCode ^
        model.hashCode ^
        insert_date.hashCode;
  }
}
