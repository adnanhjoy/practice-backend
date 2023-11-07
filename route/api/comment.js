const express = require('express');
const Comment = require('../../models/Comment');
const Template = require('../../models/Template');
const router = express.Router();

// post comment

router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            ...req.body,
            user: req.body.id
        })
        const result = await comment.save();
        await Template.updateOne(
            {
                _id: req.body.commentId
            },
            {
                $push: {
                    comment: result._id
                }
            }
        )
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get comment

router.get('/', async (req, res) => {
    try {
        const comment = await Comment.find();
        res.status(200).json({
            success: true,
            data: comment
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;