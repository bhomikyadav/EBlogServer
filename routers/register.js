const router = require("express").Router();
const registerCntl = require("../controllers/register_contol");
const upload = require("../helpers/multerhelper");
const login__Cnt = require("../controllers/login__control");

router.post("/register", upload.single("myfile"), registerCntl);
router.post("/login", login__Cnt);

module.exports = router;
