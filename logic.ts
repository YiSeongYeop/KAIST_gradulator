type Department = "(공통)" | "전산학부" | "전기및전자공학부";

class Major {
  department: Department;
}

class AdvancedMajor {
}

class IndividuallyDesignedMajor{
}

class Minor {
  department: Department;
}

class DoubleMajor {
  department: Department;
}

type CourseClassification = "교양필수" | "교양필수 AU" | "인문사회선택" | "기초필수" | "기초선택" | "전공필수 (전공선택)" | "전공선택" | "연구";

class Course {
  department: Department;
  classification: CourseClassification;
  number: string;
  code: string;
  name: string;
  credit: number;
}

class Student {
  major: Major;
  extra: AdvancedMajor | IndividuallyDesignedMajor | Minor | DoubleMajor;
  courses: Course[];
}

abstract class RequiredCourse {
  credit: number;
}

class SpecificCourse extends RequiredCourse {
  course: Course;
}

class ChooseNum extends RequiredCourse {
  num: number;
  courses: Course[];
}

class AnyCourses extends RequiredCourse {
}

class Requirement {
  department: Department;
  classification: CourseClassification;
  requiredCourses: RequiredCourse[];
}
