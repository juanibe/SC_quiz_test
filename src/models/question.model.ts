import mongoose, { Schema, Model, model } from 'mongoose';

export interface Question extends mongoose.Document {
    text: string;
    isPublished: boolean;
    answers: [string]
}

function arrayLimit(val: any): boolean {
    return val.length > 1;
}

const QuestionSchema = new Schema({
    text: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    answers: {
        type: [{
            isCorrect: Boolean,
            text: String,
        }],
    }
});

export default model<Question>('Question', QuestionSchema);