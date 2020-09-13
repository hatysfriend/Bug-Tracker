const express = require("express");
const controller = require('../controllers/commentController');

let router = express.Router();

router.post('/update', controller.update_comment);
router.post('/add', controller.insert_comment);
router.get('/getall', controller.get_comments);
router.post('/delete', controller.delete_comment);

module.exports = router;