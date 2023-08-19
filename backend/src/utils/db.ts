import mongoose from 'mongoose';
import { HighscoreEntry } from "../types"

const HighscoreEntrySchema = new mongoose.Schema<HighscoreEntry>({
    correctWord: String,
    allowRepeatedLetters: Boolean,
    SubmitedGuesses: [String],
    wordLength: Number,
    start: Date,
    finnish: Date,
    name: String,
});

const HighscoreModel = mongoose.model<HighscoreEntry>(
    'HighscoreEntry', HighscoreEntrySchema);

    export { HighscoreModel };