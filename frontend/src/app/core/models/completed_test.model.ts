import { TestEntity } from "./test.model";
import { UserEntity } from "./user.model";

export class CompletedTestEntity {
    public id: number;
    public score: number;
    public test: TestEntity;
    public student: UserEntity;

    constructor(id?: number, score?: number, test?: TestEntity,
        student?: UserEntity) {
            this.id = id;
            this.score = score;
            this.test = test;
            this.student = student;
    }
} 