function testJsonStringifyEqual(left, right) {
    if (JSON.stringify(left) === JSON.stringify(right)) {
        console.log("PASS", left);
    }
    else {
        console.log("FAIL", left, right);
    }
}
testJsonStringifyEqual(COURSE_LIST.get("HSS001"), new Course("인문사회과학부", "교양필수 (학점)", "논술", "HSS001", "10.103", "논리적 글쓰기", 3));
// TODO: Add tests
