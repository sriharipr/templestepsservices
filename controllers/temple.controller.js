const Temple = require('../models/temple.model.js');


exports.create = (req, res) => {
  if(!req.body.content || !req.body.title){
    return res.status(400).send({
      message: "temple Content / title cannot be empty"
    })
  }
  const temple = new Temple({
    title: req.body.title ,
    content: req.body.content
  })

  temple.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some Error Occured While Creating a Temple.'
    })
  })
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Temple.find().populate('temple').then( temples => {
    res.send(temples);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some Error Occured While Creating a Temple.'
    })
  })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Temple.findById(req.params.templeId).then(temple => {
    if(!temple) {
      return res.status(404).send({
        message: "Temple not found with id " + req.params.templeId
      });
    }

    res.send(temple);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Temple not found with id " + req.params.templeId
      });   
    }
    return res.status(500).send({
      message: "Error retrieving temple with id " + req.params.templeId
    });
  })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  if(!req.body.content) {
    return res.status(400).send({
        message: "Temple content can not be empty"
    });
  }
  
  Temple.findByIdAndUpdate(req.params.templeId, {
    title: req.body.title,
    content: req.body.content
  }, {new: true})
  .then(temple => {
      if(!temple) {
          return res.status(404).send({
              message: "Temple not found with id " + req.params.templeId
          });
      }
      res.send(temple);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Temple not found with id " + req.params.templeId
        });                
    }
    return res.status(500).send({
        message: "Error updating temple with id " + req.params.templeId
    });
  });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Temple.findByIdAndRemove(req.params.templeId).then(temple => {
    if(!temple) {
        return res.status(404).send({
            message: "temple not found with id " + req.params.templeId
        });
    }
    res.send({message: "temple deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "temple not found with id " + req.params.templeId
        });                
    }
    return res.status(500).send({
        message: "Could not delete temple with id " + req.params.templeId
    });
  });
};