import { CourseEntity } from "./course.model";
import { TYPE_OD_TEST } from "./TYPE_OF_TEST.model";

export class TestEntity {
    public id: number;
    public title: string;
    public course: CourseEntity;
    public type_of_test: TYPE_OD_TEST;

    constructor(id?: number, title?: string, course?: CourseEntity,
        type_of_test?: TYPE_OD_TEST) {
            this.id = id;
            this.title = title;
            this.course = course;
            this.type_of_test = type_of_test;
    }
} 