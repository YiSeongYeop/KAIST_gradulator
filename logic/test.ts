function testJsonStringifyEqual(left: any, right: any) {
  if (JSON.stringify(left) === JSON.stringify(right)) {
    console.log("PASS", left);
  } else {
    console.log("FAIL", left, right);
  }
}

testJsonStringifyEqual(
  COURSE_LIST.get("HSS001"),
  new Course("인문사회과학부", "교양필수 (학점)", "논술", "HSS001", "10.103", "논리적 글쓰기", 3, []),
);
testJsonStringifyEqual(
  COURSE_LIST.get("PH141"),
  new Course("물리학과", "기초필수", "", "PH141", "20.141", "일반물리학 I", 3, ["PH121", "PH161"]),
);

let student = new Student("전산학부", "복수전공", "전기및전자공학부", ["HSS022", "HSS023", "HSS024", "HSS025"]);
console.table(student.requirements);
console.table(student.missingRequirements);
for (let [requirementTypeJson, normalizedRequirement] of student.missingRequirements) {
  let requirementTypeString = RequirementType.fromJson(requirementTypeJson).toString();
  console.log(`# ${requirementTypeString}`);
  console.log(`Total ${normalizedRequirement.credit} credit required`);
  console.log('Breakdown:');
  for (let requiredCourse of normalizedRequirement.requiredCourses) {
    console.log(`* ${requiredCourse.credit} credit required from ${requiredCourse.courses}`);
  }
  console.log();
}
