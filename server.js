const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const applicationConfig = require('./config/app.config.js');
const mongoose = require('mongoose');

const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
  .then(()=>{
    console.log("Successfully connected to the database");   
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  })

app.set('port', process.env.PORT || 3000);
app.set('secret',applicationConfig.secret);

app.get('/',(req,res) => {
  res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


require('./routes/user.routes.js')(app);
require('./routes/note.routes.js')(app);

app.listen(app.get('port'),()=>{
  console.log(`server is running on port ${app.get('port')}`)
})
