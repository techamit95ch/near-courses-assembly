import {PersistentUnorderedMap} from "near-sdk-as"

export const courses = new PersistentUnorderedMap<string, string>( "COURSES" )

export function addCourse ( id: string, course: string ): void 
{
    courses.set(id,course)
}

export function getCourse ( id: string ):string|null
{
    return courses.get(id)
}