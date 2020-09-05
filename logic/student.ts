class Student {
  majorDepartment: Department;
  extraType: ExtraType;
  extraDepartment: Department | null;
  courses: Array<CourseNumber>;
  requirements: Map<RequirementTypeString, Requirement>;
  #normalizedRequirements: Map<RequirementTypeString, Requirement>;

  private addRequirement(requirementType: RequirementType) {
    let requirementTypeString = JSON.stringify(requirementType);
    this.requirements.set(requirementTypeString, REQUIREMENT_LIST[requirementTypeString]);
  }

  private buildRequirements() {
    let isDoubleMajor = this.extraType === "복수전공";
    this.addRequirement(new RequirementType("교양필수 (학점)", null, null, null));
    this.addRequirement(new RequirementType("교양필수 (AU)", null, null, null));
    this.addRequirement(new RequirementType("인문사회선택", null, null, isDoubleMajor));
    this.addRequirement(new RequirementType("기초필수", null, null, null));
    this.addRequirement(new RequirementType("기초선택", this.majorDepartment, null, isDoubleMajor));
    this.addRequirement(new RequirementType(null, this.majorDepartment, "주전공", null));
    switch(this.extraType) {
      case "심화전공":
        console.assert(this.extraDepartment === null);
        this.addRequirement(new RequirementType(null, this.majorDepartment, "심화전공", null));
        break;
      case "자유융합전공":
        console.assert(this.extraDepartment === null);
        this.addRequirement(new RequirementType(null, null, "자유융합전공", null));
        break;
      case "부전공":
      case "복수전공":
        console.assert(this.extraDepartment !== null);
        this.addRequirement(new RequirementType(null, this.extraDepartment, "부전공", null));
        break;
    }
  }

  constructor(majorDepartment: Department, extraType: ExtraType, extraDepartment: Department | null, courses: Array<CourseNumber>) {
    this.majorDepartment = majorDepartment;
    this.extraType = extraType;
    this.extraDepartment = extraDepartment;
    this.courses = courses;
    this.buildRequirements();
  }

  getMissingCourses(): Array<CourseNumber> {
    // TODO: Implement
    return [];
  }
}
