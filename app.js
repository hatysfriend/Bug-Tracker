//express Module: contains functions for building web apps & API's i.e. set(), get()
const express = require('express');
const data = require('./data/database');
const fs = require('fs');

let app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/index', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let jsonData = JSON.parse(data);
            let bugList = jsonData.bugs;
            console.log(bugList);

            res.render(
                'index',
                {
                    title: "The Bug Tracker",
                    subTitle: "Buggy Tracker",
                    bugList: bugList
                }
            );
        }
    });
});

app.get('/save', (req, res) => {
    data.do();
    res.send('OK');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});