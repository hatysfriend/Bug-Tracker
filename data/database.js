(function(database) {
    database.do = function(){
        console.log("This Ran Now");
    }
    const mongoose = require('mongoose');
    const seedData = require('./seedData');

    mongoose.connect('mongodb://localhost:30000/bugDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.error('connection failed' + err)
    });

    //Schema
    const commentSchema = new mongoose.Schema({
        id: Number,
        name: String,
        title: String,
        body: String,
        date: {type: Date, default: Date.now() }
    });

    const bugSchema = new mongoose.Schema({
        name: String,
        author: String,
        status: String,
        Description: String,
        tags: [String],
        date: { type: Date, default: Date.now() },
        comments: [commentSchema]
    })

    //Model
    const BugObject = mongoose.model('bugs', bugSchema);

    async function createBug_Save() {
        const bugs = seedData.initialBugs;
        console.log(bugs);
        //save the data to DB
        const result = await BugObject.insertMany(bugs);
        console.log(result);
    }
    createBug_Save();
})(module.exports);