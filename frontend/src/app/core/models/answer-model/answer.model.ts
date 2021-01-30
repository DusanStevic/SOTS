import { QuestionEntity } from "../question-model/question.model";

export class AnswerEntity {
    public id: number;
    public answer_text: string;
    public question: QuestionEntity;
    public correct_answer: boolean;
    
    constructor(id?: number, answer_text?: string,  question?: QuestionEntity,
        correct_answer?: boolean) {
            this.id = id;
            this.answer_text = answer_text;
            this.question = question;
            this.correct_answer = correct_answer;
    }
}