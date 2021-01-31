import { templateJitUrl } from "@angular/compiler";
import { NodeEntity } from "./node.model";
import { TestEntity } from "./test.model";

export class QuestionEntity {
    public id: number;
    public question_text: string;
    public test: TestEntity;
    public problem: NodeEntity;

    constructor(id?: number, question_text?: string, test?: TestEntity,
        problem?: NodeEntity) {
            this.id = id;
            this.question_text = question_text;
            this.test = test;
            this.problem = problem;
    }
} 