import { DomainEntity } from "./domain.model";
import { UserEntity } from "./user.model";

export class CourseEntity {
    public id: number;
    public domain: DomainEntity;
    public title: String;
    public teachers: UserEntity[];
    public students: UserEntity[];

    constructor(id?: number, domain?: DomainEntity, title?: String, 
        teachers?: UserEntity[], students?: UserEntity[]) {
            this.id = id;
            this.domain = domain;
            this.title = title;
            this.teachers = teachers;
            this.students = students;
    }
} 