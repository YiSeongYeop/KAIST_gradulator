class RequirementType {
    constructor(classification, department, forMajorOrExtra, isForDoubleMajor) {
        this.classification = classification;
        this.department = department;
        this.forMajorOrExtra = forMajorOrExtra;
        this.isForDoubleMajor = isForDoubleMajor;
    }
}
class RequiredCourse {
}
class SpecificCourse extends RequiredCourse {
    constructor(course) {
        super();
        this.course = course;
    }
}
class ChooseNumFrom extends RequiredCourse {
    constructor(num, courses) {
        super();
        this.num = num;
        this.courses = courses;
    }
}
class ChooseNumIn extends RequiredCourse {
    constructor(num, department, classifications) {
        super();
        this.num = num;
        this.department = department;
        this.classifications = classifications;
    }
}
class ChooseCreditFrom extends RequiredCourse {
    constructor(credit, courses) {
        super();
        this.credit = credit;
        this.courses = courses;
    }
}
class ChooseCreditIn extends RequiredCourse {
    constructor(credit, department, classifications) {
        super();
        this.credit = credit;
        this.department = department;
        this.classifications = classifications;
    }
}
class AllIn extends RequiredCourse {
    constructor(department, classifications) {
        super();
        this.department = department;
        this.classifications = classifications;
    }
}
class Requirement {
    constructor(credit, requiredCourses) {
        this.credit = credit;
        this.requiredCourses = requiredCourses;
    }
}
const REQUIREMENT_LIST = new Map([
    [JSON.stringify(new RequirementType("교양필수 (학점)", null, null, false)), new Requirement(7, [
            new AllIn(null, [["교양필수 (학점)", "영어"]]),
            new ChooseNumFrom(1, ["HSS001", "HSS002", "HSS003", "HSS004"]),
        ])],
    [JSON.stringify(new RequirementType("교양필수 (AU)", null, null, true)), new Requirement(8, [
            new ChooseCreditIn(4, null, [["교양필수 (AU)", "체육"]]),
            new ChooseCreditIn(2, null, [["교양필수 (AU)", "인성 리더십"]]),
            new SpecificCourse("HSS090"),
            new SpecificCourse("HSS091"),
        ])],
    [JSON.stringify(new RequirementType("인문사회선택", null, null, false)), new Requirement(21, [
            new ChooseCreditIn(12, null, [["인문사회선택", null]]),
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
        ])],
    [JSON.stringify(new RequirementType(null, "전산학부", "부전공", null)), new Requirement(21, [
            new ChooseCreditIn(15, "전산학부", [["전공필수", null]]),
            new ChooseCreditIn(6, "전산학부", [["전공선택", null]]),
        ])],
    [JSON.stringify(new RequirementType(null, "전산학부", "복수전공", null)), new Requirement(40, [
            new AllIn("전산학부", [["전공필수", null]]),
            new ChooseCreditIn(21, "전산학부", [["전공선택", null]]),
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
]);
