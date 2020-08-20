(function (seedData) {
    let comments = require('./seedCommentData');
    seedData.initialBugs = [
        {
            name: "Broken link",
            author: "Brock",
            status: "Created",
            description: "There was a a typo in the URL?",
            tags: ["URL", "Link"],
            date: "06/01/2020",
            comments: comments.initialComments
        },
        {
            name: "Home page button",
            author: "Misty",
            status: "Fixed",
            description: "The Button doesn't work on the home page :(",
            tags: ["UI", "Button", "Bootstrap"],
            date: "01/03/2020" 
        },
        {
            name: "Database Connection Broken",
            author: "Proffesor Oak",
            status: "In-Progress",
            description: "The Database connection is giving an error on startup",
            tags: ["Mongo", "Database", "Mongoose"],
            date: "03/07/2020"
        }
     ]
})(module.exports);