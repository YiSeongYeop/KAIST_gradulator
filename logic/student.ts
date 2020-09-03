class Student {
  majorDepartment: Department;
  extraType: ExtraType;
  extraDepartment: Department;
  courses: Array<CourseNumber>;
  requirements: Map<RequirementType, Requirement>;

  getMissingCourses(): Array<CourseNumber> {
    // TODO: Implement
    return [];
  }
}
