import { Answer } from './answer';
// You must have the same names for fields in models on the backend and frontend app.
export interface Question {
    question_text: string;
    problem_id: number;
    answers: Answer[];
}
