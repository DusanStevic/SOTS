import { AnswerEntity } from "./answer.model";
import { CompletedTestEntity } from "./completed_test.model";

export class ChoseAnswerEntity {
    public id: number;
    public answer: AnswerEntity;
    public completed_test: CompletedTestEntity;

    constructor(answer?: AnswerEntity) {
            //this.id = id;
            this.answer = answer;
            //this.completed_test = completed_test;
    }

} 