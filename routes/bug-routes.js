const express = require("express");
const bugController = require('../controllers/bugController');
const testController = require('../controllers/testBugController');
const authHelpers = require('../authentication/authHelper');

let router = express.Router();
router.use(authHelpers.loginRedirect);

router.get("/", bugController.get_all_bugs);
router.get('/getBugsJson', bugController.get_all_bugs_json);
router.post('/getBugByIdJson', bugController.get_bug_by_id_json);
router.get("/save", testController.create_bug);
router.get("/seed", testController.seed_data);
router.get("/addbug", bugController.create_bug_get);
router.post("/addbug", bugController.create_bug_post);
router.post('/update', bugController.update_bug);
router.post('/addTag', bugController.add_tag);
router.get('/getBugViewComponent', bugController.get_bug_view_component)

module.exports = router;
