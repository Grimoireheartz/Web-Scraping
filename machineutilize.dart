// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class MachineUtiliza {
  final String text_cussite;
  final String serialmachine;
  final String operatingtime;
  final String utilization;
  final String city;
  final String last_update;
  final String owner;
  final String machinefamily;
  final String model;
  final String insert_date;
  MachineUtiliza({
    required this.text_cussite,
    required this.serialmachine,
    required this.operatingtime,
    required this.utilization,
    required this.city,
    required this.last_update,
    required this.owner,
    required this.machinefamily,
    required this.model,
    required this.insert_date,
  });

  MachineUtiliza copyWith({
    String? text_cussite,
    String? serialmachine,
    String? operatingtime,
    String? utilization,
    String? city,
    String? last_update,
    String? owner,
    String? machinefamily,
    String? model,
    String? insert_date,
  }) {
    return MachineUtiliza(
      text_cussite: text_cussite ?? this.text_cussite,
      serialmachine: serialmachine ?? this.serialmachine,
      operatingtime: operatingtime ?? this.operatingtime,
      utilization: utilization ?? this.utilization,
      city: city ?? this.city,
      last_update: last_update ?? this.last_update,
      owner: owner ?? this.owner,
      machinefamily: machinefamily ?? this.machinefamily,
      model: model ?? this.model,
      insert_date: insert_date ?? this.insert_date,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'text_cussite': text_cussite,
      'serialmachine': serialmachine,
      'operatingtime': operatingtime,
      'utilization': utilization,
      'city': city,
      'last_update': last_update,
      'owner': owner,
      'machinefamily': machinefamily,
      'model': model,
      'insert_date': insert_date,
    };
  }

  factory MachineUtiliza.fromMap(Map<String, dynamic> map) {
    return MachineUtiliza(
      text_cussite: map['text_cussite'] as String,
      serialmachine: map['serialmachine'] as String,
      operatingtime: map['operatingtime'] as String,
      utilization: map['utilization'] as String,
      city: map['city'] as String,
      last_update: map['last_update'] as String,
      owner: map['owner'] as String,
      machinefamily: map['machinefamily'] as String,
      model: map['model'] as String,
      insert_date: map['insert_date'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory MachineUtiliza.fromJson(String source) =>
      MachineUtiliza.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'MachineUtiliza(text_cussite: $text_cussite, serialmachine: $serialmachine, operatingtime: $operatingtime, utilization: $utilization, city: $city, last_update: $last_update, owner: $owner, machinefamily: $machinefamily, model: $model, insert_date: $insert_date)';
  }

  @override
  bool operator ==(covariant MachineUtiliza other) {
    if (identical(this, other)) return true;

    return other.text_cussite == text_cussite &&
        other.serialmachine == serialmachine &&
        other.operatingtime == operatingtime &&
        other.utilization == utilization &&
        other.city == city &&
        other.last_update == last_update &&
        other.owner == owner &&
        other.machinefamily == machinefamily &&
        other.model == model &&
        other.insert_date == insert_date;
  }

  @override
  int get hashCode {
    return text_cussite.hashCode ^
        serialmachine.hashCode ^
        operatingtime.hashCode ^
        utilization.hashCode ^
        city.hashCode ^
        last_update.hashCode ^
        owner.hashCode ^
        machinefamily.hashCode ^
        model.hashCode ^
        insert_date.hashCode;
  }
}
