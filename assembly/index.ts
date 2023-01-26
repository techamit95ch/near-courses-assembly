import {
  context,
  ContractPromiseBatch,
  MapEntry,
  PersistentUnorderedMap,
} from "near-sdk-as";
import { listedCourse, Course } from "./model";
export const courses = new PersistentUnorderedMap<string, string>("COURSES");

export function purchaseCourse(id: string): void {
  const course = getCourse(id);
  if (!course) {
    throw new Error("Course doesn't exists " + id);
  }
  if (course.price.toString() !== context.attachedDeposit.toString()) {
    throw new Error(
      "Diposit did not equal colurse price" + course.price.toString()
    );
  }

  ContractPromiseBatch.create(course.owner).transfer(context.attachedDeposit);
  course.owner = context.sender;
  listedCourse.set(course.id, course);
}
export function addCourse(course: Course): void {
  if (listedCourse.get(course.id)) {
    throw new Error("Course exists " + course.id);
  }
  listedCourse.set(course.id, Course.fromPayload(course));
}

export function getCourse(id: string): Course | null {
  return listedCourse.get(id);
}

export function getCourses(): Course[] {
  return listedCourse.values();
}
