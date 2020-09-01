type Department = "전산학부" | "전기및전자공학부" | null;

type CourseClassification = "교양필수" | "교양필수 AU" | "인문사회선택" | "기초필수" | "기초선택" | "전공필수" | "전공선택" | "연구";

type CourseNumber = string;

class Course {
  department: Department;
  classification: CourseClassification;
  number: CourseNumber;
  code: string;
  name: string;
  credit: number;
}

type ExtraType = "심화전공" | "자유융합전공" | "부전공" | "복수전공";

class Student {
  majorDepartment: Department;
  extraType: ExtraType;
  extraDepartment: Department;
  courses: Array<CourseNumber>;
}

abstract class RequiredCourse {
}

class SpecificCourse extends RequiredCourse {
  course: CourseNumber;

  constructor(course: CourseNumber) {
    super();
    this.course = course;
  }
}

class ChooseNum extends RequiredCourse {
  num: number;
  courses: Array<CourseNumber>;

  constructor(num: number, courses: Array<CourseNumber>) {
    super();
    this.num = num;
    this.courses = courses;
  }
}

class AnyCourseIn extends RequiredCourse {
  department: Department;
  classifications: Array<CourseClassification>;

  constructor(department: Department, classifications: Array<CourseClassification>) {
    super();
    this.department = department;
    this.classifications = classifications;
  }
}

class Requirement {
  credit: number;
  requiredCourses: Array<RequiredCourse>;

  constructor(credit: number, requiredCourses: Array<RequiredCourse>) {
    this.credit = credit;
    this.requiredCourses = requiredCourses;
  }
}

let exampleRequirementsForStudent = [
  new Requirement(7, [
    new SpecificCourse("HSS022"),
    new SpecificCourse("HSS023"),
    new SpecificCourse("HSS024"),
    new SpecificCourse("HSS025"),
    new ChooseNum(1, ["HSS001", "HSS002", "HSS003", "HSS004"]),
  ]),
  new Requirement(8, [
    new ChooseNum(2, ["HSS040", "HSS041", "HSS042", "HSS043", "HSS044", "HSS045", "HSS046", "HSS047", "HSS048", "HSS049", "HSS050", "HSS051", "HSS052", "HSS053", "HSS054"]),
    new ChooseNum(2, ["HSS060", "HSS061", "HSS062"]),
    new SpecificCourse("HSS090"),
    new SpecificCourse("HSS091"),
  ]),
  new Requirement(12, [
    new AnyCourseIn(null, ["인문사회선택"]),
  ]),
  new Requirement(23, [
    new ChooseNum(1, ["PH121", "PH141", "PH161"]),
    new ChooseNum(1, ["PH122", "PH142", "PH162"]),
    new SpecificCourse("PH151"),
    new ChooseNum(1, ["BS110", "BS120"]),
    new ChooseNum(1, ["MAS101", "MAS103"]),
    new ChooseNum(1, ["MAS102", "MAS104"]),
    new ChooseNum(1, ["CH100", "CH101", "CH105"]),
    new ChooseNum(1, ["CH102", "CH106"]),
    new ChooseNum(1, ["CS101", "CH102"]),
  ]), // Missing PH171, PH172
  new Requirement(3, [
    new SpecificCourse("MAS109"),
  ]),
  new Requirement(19, [
    new ChooseNum(1, ["CS204", "MAS275", "MA260"]),
    new SpecificCourse("CS206"),
    new SpecificCourse("CS300"),
    new ChooseNum(1, ["CS311", "EE312"]),
    new SpecificCourse("CS320"),
    new SpecificCourse("CS330"),
  ]),
  new Requirement(30, [
    new AnyCourseIn("전산학부", ["전공선택"]),
  ]), // Missing Individual Studies
  new Requirement(15, [
    new ChooseNum(3, ["EE201", "EE202", "EE204", "EE209", "EE210", "EE211"]),
    new SpecificCourse("EE305"),
    new SpecificCourse("EE405"),
  ]),
  new Requirement(25, [
    new AnyCourseIn("전기및전자공학부", ["전공선택", "전공필수"]),
  ]), // Missing Individual Studies
];
