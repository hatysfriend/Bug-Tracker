const express = require("express");
const bugController = require('../controllers/bugController');
const testController = require('../controllers/testBugController');
const { get_all_bugs_json } = require("../controllers/bugController");

let router = express.Router();

router.get("/", bugController.get_all_bugs);
router.get('/getBugsJson', get_all_bugs_json);
router.get("/save", testController.create_bug);
router.get("/seed", testController.seed_data);
router.get("/addbug", bugController.create_bug_get);
router.post("/addbug", bugController.create_bug_post);
router.post('/updateStatus', bugController.update_bug_status);
module.exports = router;
