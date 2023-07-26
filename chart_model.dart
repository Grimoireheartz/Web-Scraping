// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class OPChartModel {
  final String day;
  final int optime;
  OPChartModel({
    required this.day,
    required this.optime,
  });

  OPChartModel copyWith({
    String? day,
    int? optime,
  }) {
    return OPChartModel(
      day: day ?? this.day,
      optime: optime ?? this.optime,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'day': day,
      'optime': optime,
    };
  }

  factory OPChartModel.fromMap(Map<String, dynamic> map) {
    return OPChartModel(
      day: map['day'] as String,
      optime: map['optime'] as int,
    );
  }

  String toJson() => json.encode(toMap());

  factory OPChartModel.fromJson(String source) =>
      OPChartModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'OPChartModel(day: $day, optime: $optime)';

  @override
  bool operator ==(covariant OPChartModel other) {
    if (identical(this, other)) return true;

    return other.day == day && other.optime == optime;
  }

  @override
  int get hashCode => day.hashCode ^ optime.hashCode;
}
