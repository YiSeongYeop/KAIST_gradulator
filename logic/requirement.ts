type ExtraType = "심화전공" | "자유융합전공" | "부전공" | "복수전공";


class RequirementType {
  classification: CourseClassification | null;
  department: Department | null;
  forMajorOrExtra: "주전공" | ExtraType | null;
  isForDoubleMajor: boolean | null;

  constructor(
    classification: CourseClassification | null,
    department: Department | null,
    forMajorOrExtra: "주전공" | ExtraType | null,
    isForDoubleMajor: boolean | null,
  ) {
    this.classification = classification;
    this.department = department;
    this.forMajorOrExtra = forMajorOrExtra;
    this.isForDoubleMajor = isForDoubleMajor;
  }
}

type RequirementTypeString = string;

abstract class RequiredCourse {
  abstract normalized(): ChooseCreditFrom;
}

class SpecificCourse extends RequiredCourse {
  course: CourseNumber;

  constructor(course: CourseNumber) {
    super();
    this.course = course;
  }

  normalized(): ChooseCreditFrom {
    return new ChooseCreditFrom((COURSE_LIST.get(this.course) as Course).credit, [this.course]);
  }
}

class ChooseNumFrom extends RequiredCourse {
  num: number;
  courses: Array<CourseNumber>;

  constructor(num: number, courses: Array<CourseNumber>) {
    super();
    this.num = num;
    this.courses = courses;
  }

  normalized(): ChooseCreditFrom {
    return new ChooseCreditFrom((COURSE_LIST.get(this.courses[0]) as Course).credit * this.num, this.courses);
  }
}

class ChooseCreditFrom extends RequiredCourse {
  credit: number;
  courses: Array<CourseNumber>;

  constructor(credit: number, courses: Array<CourseNumber>) {
    super();
    this.credit = credit;
    this.courses = courses;
  }

  normalized(): ChooseCreditFrom {
    return new ChooseCreditFrom(this.credit, this.courses);
  }
}

function getAllCoursesIn(
  department: Department | null,
  classification: [CourseClassification, DetailedCourseClassification],
): Array<CourseNumber> {
  let courses: Array<CourseNumber> = [];
  for (let [courseNumber, course] of COURSE_LIST.entries()) {
    if (course.classification === classification[0] && course.detailedClassification === classification[1]) {
      if (department === null) {
        courses.push(courseNumber);
      } else if (course.department === department) {
        courses.push(courseNumber);
      }
    }
  }
  return courses;
}

class ChooseNumIn extends RequiredCourse {
  num: number;
  department: Department | null;
  classifications: Array<[CourseClassification, DetailedCourseClassification]>;
  
  constructor(
    num: number,
    department: Department | null,
    classifications: Array<[CourseClassification, DetailedCourseClassification]>,
  ) {
    super();
    this.num = num;
    this.department = department;
    this.classifications = classifications;
  }

  normalized(): ChooseCreditFrom {
    let courses: Array<CourseNumber> = [];
    for (let classification of this.classifications) {
      courses.push(...getAllCoursesIn(this.department, classification));
    }
    return new ChooseCreditFrom((COURSE_LIST.get(courses[0]) as Course).credit * this.num, courses);
  }
}

class ChooseCreditIn extends RequiredCourse {
  credit: number;
  department: Department | null;
  classifications: Array<[CourseClassification, DetailedCourseClassification]>;
  
  constructor(
    credit: number,
    department: Department | null,
    classifications: Array<[CourseClassification, DetailedCourseClassification]>,
  ) {
    super();
    this.credit = credit;
    this.department = department;
    this.classifications = classifications;
  }

  normalized(): ChooseCreditFrom {
    let courses: Array<CourseNumber> = [];
    for (let classification of this.classifications) {
      courses.push(...getAllCoursesIn(this.department, classification));
    }
    return new ChooseCreditFrom(this.credit, courses);
  }
}

class AllIn extends RequiredCourse {
  department: Department | null;
  classifications: Array<[CourseClassification, DetailedCourseClassification]>;
  
  constructor(
    department: Department | null,
    classifications: Array<[CourseClassification, DetailedCourseClassification]>,
  ) {
    super();
    this.department = department;
    this.classifications = classifications;
  }

  normalized(): ChooseCreditFrom {
    let courses: Array<CourseNumber> = [];
    for (let classification of this.classifications) {
      courses.push(...getAllCoursesIn(this.department, classification));
    }
    return new ChooseCreditFrom(courses.reduce((sum, c) => sum + (COURSE_LIST.get(c) as Course).credit, 0), courses);
  }
}

class Requirement {
  credit: number;
  requiredCourses: Array<RequiredCourse>;

  constructor(credit: number, requiredCourses: Array<RequiredCourse>) {
    this.credit = credit;
    this.requiredCourses = requiredCourses;
  }

  normalized(): NormalizedRequirement {
    let normalizedRequiredCourses = this.requiredCourses.map(rc => rc.normalized());
    return new NormalizedRequirement(this.credit, normalizedRequiredCourses);
  }
}

class NormalizedRequirement {
  credit: number;
  requiredCourses: Array<ChooseCreditFrom>;

  constructor(credit: number, requiredCourses: Array<ChooseCreditFrom>) {
    this.credit = credit;
    this.requiredCourses = requiredCourses;
  }

  removeCourse(course: CourseNumber) {

  }
}

const REQUIREMENT_LIST: Map<RequirementTypeString, Requirement> = new Map([
  [JSON.stringify(new RequirementType("교양필수 (학점)", null, null, null)), new Requirement(7, [
    new AllIn(null, [["교양필수 (학점)", "영어"]]),
    new ChooseNumFrom(1, ["HSS001", "HSS002", "HSS003", "HSS004"]),
  ])],
  [JSON.stringify(new RequirementType("교양필수 (AU)", null, null, null)), new Requirement(8, [
    new ChooseCreditIn(4, null, [["교양필수 (AU)", "체육"]]),
    new ChooseCreditIn(2, null, [["교양필수 (AU)", "인성 리더십"]]),
    new SpecificCourse("HSS090"),
    new SpecificCourse("HSS091"),
  ])],
  [JSON.stringify(new RequirementType("인문사회선택", null, null, false)), new Requirement(21, [
    new ChooseCreditIn(12, null, [["인문사회선택", null]]),
    // Missing handling for requiring >= 2 detailed classification
  ])],
  [JSON.stringify(new RequirementType("인문사회선택", null, null, true)), new Requirement(12, [
    new ChooseCreditIn(12, null, [["인문사회선택", null]]),
  ])],
  [JSON.stringify(new RequirementType("기초필수", null, null, null)), new Requirement(23, [
    new AllIn(null, [["기초필수", null]])
    // Missing handling for PH171, PH172
  ])],

  [JSON.stringify(new RequirementType(null, null, "자유융합전공", null)), new Requirement(12, [
    new ChooseCreditIn(12, null, [["전공선택", null], ["전공필수", null]]),
    // Missing handling for excluding major department and requiring >= 2 departments
  ])],

  [JSON.stringify(new RequirementType("기초선택", "전산학부", null, false)), new Requirement(9, [
    new SpecificCourse("MAS109"),
    new ChooseCreditIn(6, null, [["기초선택", null]]),
  ])],
  [JSON.stringify(new RequirementType("기초선택", "전산학부", null, true)), new Requirement(3, [
    new SpecificCourse("MAS109"),
  ])],
  [JSON.stringify(new RequirementType(null, "전산학부", "주전공", null)), new Requirement(49, [
    new AllIn("전산학부", [["전공필수", null]]),
    new ChooseCreditIn(30, "전산학부", [["전공선택", null]]),
  ])],
  [JSON.stringify(new RequirementType(null, "전산학부", "심화전공", null)), new Requirement(12, [
    new ChooseCreditIn(12, "전산학부", [["전공선택", null]]),
    // Missing handling for excluding 200 level courses
  ])],
  [JSON.stringify(new RequirementType(null, "전산학부", "부전공", null)), new Requirement(21, [
    new ChooseCreditIn(15, "전산학부", [["전공필수", null]]),
    new ChooseCreditIn(6, "전산학부", [["전공선택", null]]),
  ])],
  [JSON.stringify(new RequirementType(null, "전산학부", "복수전공", null)), new Requirement(40, [
    new AllIn("전산학부", [["전공필수", null]]),
    new ChooseCreditIn(21, "전산학부", [["전공선택", null]]),
    // Missing handling for overlapping courses
  ])],

  [JSON.stringify(new RequirementType("기초선택", "전기및전자공학부", null, false)), new Requirement(9, [
    new ChooseNumFrom(2, ["MAS109", "MAS201", "MAS202"]),
    new ChooseCreditIn(3, null, [["기초선택", null]]),
  ])],
  [JSON.stringify(new RequirementType("기초선택", "전기및전자공학부", null, true)), new Requirement(3, [
    new ChooseNumFrom(1, ["MAS109", "MAS201", "MAS202"]),
  ])],
  [JSON.stringify(new RequirementType(null, "전기및전자공학부", "주전공", null)), new Requirement(50, [
    new ChooseNumFrom(3, ["EE201", "EE202", "EE204", "EE209", "EE210", "EE211"]),
    new SpecificCourse("EE305"),
    new SpecificCourse("EE405"),
    new ChooseCreditIn(35, "전기및전자공학부", [["전공필수", null], ["전공선택", null]]),
  ])],
  [JSON.stringify(new RequirementType(null, "전기및전자공학부", "심화전공", null)), new Requirement(12, [
    new ChooseCreditIn(12, "전기및전자공학부", [["전공필수", null], ["전공선택", null]]),
  ])],
  [JSON.stringify(new RequirementType(null, "전기및전자공학부", "부전공", null)), new Requirement(21, [
    new SpecificCourse("EE305"),
    new ChooseCreditFrom(9, ["EE201", "EE202", "EE204", "EE209", "EE210", "EE211", "EE405"]),
    new ChooseCreditIn(9, "전기및전자공학부", [["전공필수", null], ["전공선택", null]]),
  ])],
  [JSON.stringify(new RequirementType(null, "전기및전자공학부", "복수전공", null)), new Requirement(40, [
    new ChooseNumFrom(3, ["EE201", "EE202", "EE204", "EE209", "EE210", "EE211"]),
    new SpecificCourse("EE305"),
    new SpecificCourse("EE405"),
    new ChooseCreditIn(25, "전기및전자공학부", [["전공필수", null], ["전공선택", null]]),
  ])],

  // TODO: Fill remaining requirements
  // Missing individual studies for elective major
  // Probably missing more stuff
]);
