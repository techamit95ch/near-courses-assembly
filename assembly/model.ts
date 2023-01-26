import { context, PersistentUnorderedMap, u128 } from "near-sdk-as";

@nearBindgen
export class Course {
  id: string = "";
  name: string = "";
  price: u128 = new u128();
  owner: string = "";
  image: string = "https://mdbootstrap.com/img/new/standard/nature/182.jpg";

  public static fromPayload(_course: Course): Course {
    const course = new Course();
    course.id = _course.id;
    course.name = _course.name;
    course.price = _course.price;
    course.image = _course.image;
    course.owner = context.sender;
    return course;
  }
}

export const listedCourse = new PersistentUnorderedMap<string, Course>(
  "LISTED COURSE"
);
