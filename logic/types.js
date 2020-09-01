var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Course = /** @class */ (function () {
    function Course() {
    }
    return Course;
}());
var Student = /** @class */ (function () {
    function Student() {
    }
    return Student;
}());
var RequiredCourse = /** @class */ (function () {
    function RequiredCourse() {
    }
    return RequiredCourse;
}());
var SpecificCourse = /** @class */ (function (_super) {
    __extends(SpecificCourse, _super);
    function SpecificCourse(course) {
        var _this = _super.call(this) || this;
        _this.course = course;
        return _this;
    }
    return SpecificCourse;
}(RequiredCourse));
var ChooseNum = /** @class */ (function (_super) {
    __extends(ChooseNum, _super);
    function ChooseNum(num, courses) {
        var _this = _super.call(this) || this;
        _this.num = num;
        _this.courses = courses;
        return _this;
    }
    return ChooseNum;
}(RequiredCourse));
var AnyCourseIn = /** @class */ (function (_super) {
    __extends(AnyCourseIn, _super);
    function AnyCourseIn(department, classifications) {
        var _this = _super.call(this) || this;
        _this.department = department;
        _this.classifications = classifications;
        return _this;
    }
    return AnyCourseIn;
}(RequiredCourse));
var Requirement = /** @class */ (function () {
    function Requirement(credit, requiredCourses) {
        this.credit = credit;
        this.requiredCourses = requiredCourses;
    }
    return Requirement;
}());
var exampleRequirementsForStudent = [
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
    ]),
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
    ]),
    new Requirement(15, [
        new ChooseNum(3, ["EE201", "EE202", "EE204", "EE209", "EE210", "EE211"]),
        new SpecificCourse("EE305"),
        new SpecificCourse("EE405"),
    ]),
    new Requirement(25, [
        new AnyCourseIn("전기및전자공학부", ["전공선택", "전공필수"]),
    ]),
];
