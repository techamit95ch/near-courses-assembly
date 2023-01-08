import {PersistentUnorderedMap} from "near-sdk-as"

export const courses = new PersistentUnorderedMap<string,string>("COURSES")