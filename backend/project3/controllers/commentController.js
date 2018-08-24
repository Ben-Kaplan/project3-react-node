const express = require('express');
const router = express.Router();
const Comments = require('../models/Comments');


// Index Route
router.get('/', async (req, res, next) => {
    try  {
      const allComments = await Comments.find();
      res.json({
        status: 200,
        data: allComments
      })
    } catch (err){
      res.send(err)
    }
});
// Create Route
router.post('/', async (req, res) => {
    try {
      const createdComment = await Comments.create(req.body);
      res.json({
        status: 200,
        data: createdComment
      });

    } catch(err){
      res.send(err);
    }
});
// Show route
router.get('/:id', async (req, res, next) => {
    try  {
        const foundComment = await Comments.findById(req.params.id);
        res.json({
          status: 200,
          data: foundComment
        });
    } catch (err){
        res.send(err);
    }
});
// Edit Route
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comments.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
          status: 200,
          data: updatedComment
    });
    } catch(err){
        res.send(err)
    }
});
// Delete route
router.delete('/:id', async (req, res) => {
  try {
        const deletedComment = await Comments.findByIdAndRemove(req.params.id);
        res.json({
          status: 200,
          data: deletedComment
      });
    } catch(err){
        res.send(err);
    }
});



module.exports = router;
