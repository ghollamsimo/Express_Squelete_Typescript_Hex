import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    }
})

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;