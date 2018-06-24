const Comment = require('../models/Comment.model.js');
const Temple = require('../models/temple.model');
const mongoose = require('mongoose');

exports.create = (req, res) => {
  let templeObject;
  if(!req.body.content){
    return res.status(400).send({
      message: "Comment Content / title cannot be empty"
    })
  }
  const comment = new Comment({
    content: req.body.content,
    createdBy: req.body.createdBy,
    temple: req.body.temple
  })

  comment.save().then(data => {
    Temple.findById(req.body.temple)
      .then(temple => {
        if(!temple.comments){
          temple.comments = [comment._id]
        }
        else{
          temple.comments.push(comment._id);
        }
        temple.save().then(updatedTemple => {
          console.log(updatedTemple);
          res.send(updatedTemple);
        })
      })

    
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some Error Occured While Creating a Comment.'
    })
  })
  
  
};



// Find a single note with a noteId
exports.findCommentByTemple = (req, res) => {
  Comment.find({temple: req.params.templeId}).populate('temple').then(comments => {
    if(!comments) {
      return res.status(404).send({
        message: "comment not found with id " + req.params.templeId
      });
    }

    res.send(comments);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "comments not found with id " + req.params.templeId
      });   
    }
    return res.status(500).send({
      message: "Error retrieving comments with id " + req.params.templeId
    });
  })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  if(!req.body.content) {
    return res.status(400).send({
        message: "content content can not be empty"
    });
  }
  
  Temple.findByIdAndUpdate(req.params.commentId, {
    content: req.body.content
  }, {new: true})
  .then(comment => {
      if(!comment) {
          return res.status(404).send({
              message: "comment not found with id " + req.params.commentId
          });
      }
      res.send(comment);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "comment not found with id " + req.params.commentId
        });                
    }
    return res.status(500).send({
        message: "Error updating comment with id " + req.params.commentId
    });
  });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId).then(comment => {
    if(!comment) {
        return res.status(404).send({
            message: "comment not found with id " + req.params.commentId
        });
    }
    res.send({message: "comment deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "comment not found with id " + req.params.commentId
        });                
    }
    return res.status(500).send({
        message: "Could not delete comment with id " + req.params.commentId
    });
  });
};