const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref:'Template'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment