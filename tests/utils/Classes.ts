import classes from "@/utils/Classes";

const class_string = "class1";
const class_arr = ["class2", "class3"];
const class_obj = { "class4": true, "class5": false };
const class_result = "class1 class2 class3 class4";

describe("Check classes", () => {

  test("Classes are appended well", () => {
    const cls = classes(class_string, class_arr, class_obj);
    expect(cls).toEqual(class_result);
  });

  test("No double classes are in the array", () => {
    const cls = classes(class_string, class_string, class_arr, class_arr, class_obj, class_obj);
    expect(cls).toEqual(class_result);
  });

  test("An empty string is returned when no classes are defined", () => {
    const cls = classes();
    expect(cls).toEqual("");
  });

});