let comments = require('./seedCommentData');

module.exports = {
    initialBugs: [
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
        },
        {
            name: "Date Bug",
            author: "Ash Ketchum",
            status: "In-Progress",
            description: "When a date is added to a bug entry it is being saved wrong, sometimes a day gets added, sometimes a month, we are thinking that is has"+
            " something to do with the mongo-db instance or the docker image/container",
            tags: ["Mongo", "Database", "Mongoose", "Container"],
            date: "03/07/2020"
        }
     ]
};