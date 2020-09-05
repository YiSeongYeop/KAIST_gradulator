"use strict";
class RequirementType {
    constructor(classification, department, forMajorOrExtra, isForDoubleMajor) {
        this.classification = classification;
        this.department = department;
        this.forMajorOrExtra = forMajorOrExtra;
        this.isForDoubleMajor = isForDoubleMajor;
    }
    static fromJson(json) {
        let obj = JSON.parse(json);
        return new RequirementType(obj.classification, obj.department, obj.forMajorOrExtra, obj.isForDoubleMajor);
    }
    toString() {
        function f(str) {
            return str === null ? "" : str;
        }
        return `${f(this.classification)} ${f(this.department)} ${f(this.forMajorOrExtra)}`.trim();
    }
}
class RequiredCourse {
}
class SpecificCourse extends RequiredCourse {
    constructor(course) {
        super();
        this.course = course;
    }
    normalized() {
        return new ChooseCreditFrom(COURSE_LIST.get(this.course).credit, [this.course]);
    }
}
class ChooseNumFrom extends RequiredCourse {
    constructor(num, courses) {
        super();
        this.num = num;
        this.courses = courses;
    }
    normalized() {
        return new ChooseCreditFrom(COURSE_LIST.get(this.courses[0]).credit * this.num, this.courses);
    }
}
class ChooseCreditFrom extends RequiredCourse {
    constructor(credit, courses) {
        super();
        this.credit = credit;
        this.courses = courses;
    }
    normalized() {
        return new ChooseCreditFrom(this.credit, this.courses);
    }
    removeCourse(course) {
        if (this.credit <= 0) {
            return false;
        }
        let index = this.courses.findIndex(c => c === course || COURSE_LIST.get(c).substitutes.indexOf(course) !== -1);
        if (index === -1) {
            return false;
        }
        else {
            this.credit -= COURSE_LIST.get(course).credit;
            this.courses.splice(index, 1);
            return true;
        }
    }
}
function getAllCoursesIn(department, classification) {
    let courses = [];
    for (let [courseNumber, course] of COURSE_LIST) {
        if ((department === null || (course.department === department)) &&
            course.classification === classification[0] &&
            (classification[1] === null || course.detailedClassification === classification[1])) {
            courses.push(courseNumber);
        }
    }
    return courses;
}
class ChooseNumIn extends RequiredCourse {
    constructor(num, department, classifications) {
        super();
        this.num = num;
        this.department = department;
        this.classifications = classifications;
    }
    normalized() {
        let courses = [];
        for (let classification of this.classifications) {
            courses.push(...getAllCoursesIn(this.department, classification));
        }
        return new ChooseCreditFrom(COURSE_LIST.get(courses[0]).credit * this.num, courses);
    }
}
class ChooseCreditIn extends RequiredCourse {
    constructor(credit, department, classifications) {
        super();
        this.credit = credit;
        this.department = department;
        this.classifications = classifications;
    }
    normalized() {
        let courses = [];
        for (let classification of this.classifications) {
            courses.push(...getAllCoursesIn(this.department, classification));
        }
        return new ChooseCreditFrom(this.credit, courses);
    }
}
class AllIn extends RequiredCourse {
    constructor(department, classifications) {
        super();
        this.department = department;
        this.classifications = classifications;
    }
    normalized() {
        let courses = [];
        for (let classification of this.classifications) {
            courses.push(...getAllCoursesIn(this.department, classification));
        }
        return new ChooseCreditFrom(courses.reduce((sum, c) => sum + COURSE_LIST.get(c).credit, 0), courses);
    }
}
class Requirement {
    constructor(credit, requiredCourses) {
        this.credit = credit;
        this.requiredCourses = requiredCourses;
    }
    normalized() {
        let normalizedRequiredCourses = this.requiredCourses.map(rc => rc.normalized());
        return new NormalizedRequirement(this.credit, normalizedRequiredCourses);
    }
}
class NormalizedRequirement {
    constructor(credit, requiredCourses) {
        this.credit = credit;
        this.requiredCourses = requiredCourses;
    }
    removeCourse(course) {
        if (this.credit <= 0) {
            return false;
        }
        for (let requiredCourse of this.requiredCourses) {
            if (requiredCourse.removeCourse(course) === true) {
                this.credit -= COURSE_LIST.get(course).credit;
                return true;
            }
        }
        return false;
    }
}
const REQUIREMENT_LIST = new Map([
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
        ])],
    [JSON.stringify(new RequirementType("인문사회선택", null, null, true)), new Requirement(12, [
            new ChooseCreditIn(12, null, [["인문사회선택", null]]),
        ])],
    [JSON.stringify(new RequirementType("기초필수", null, null, null)), new Requirement(23, [
            new SpecificCourse("PH141"),
            new SpecificCourse("PH142"),
            new SpecificCourse("PH151"),
            new SpecificCourse("BS120"),
            new SpecificCourse("MAS101"),
            new SpecificCourse("MAS102"),
            new SpecificCourse("CH101"),
            new SpecificCourse("CH102"),
            new SpecificCourse("CS101"),
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
            new SpecificCourse("CS204"),
            new SpecificCourse("CS206"),
            new SpecificCourse("CS300"),
            new SpecificCourse("CS311"),
            new SpecificCourse("CS320"),
            new SpecificCourse("CS330"),
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
    // 전산학 프로젝트 처리 없음
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
