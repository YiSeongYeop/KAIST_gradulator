var _requirements, _normalizedRequirements;
class Student {
    constructor(majorDepartment, extraType, extraDepartment, courses) {
        _requirements.set(this, void 0);
        _normalizedRequirements.set(this, void 0);
        this.majorDepartment = majorDepartment;
        this.extraType = extraType;
        this.extraDepartment = extraDepartment;
        this.courses = courses;
    }
    getMissingCourses() {
        // TODO: Implement
        return [];
    }
}
_requirements = new WeakMap(), _normalizedRequirements = new WeakMap();
