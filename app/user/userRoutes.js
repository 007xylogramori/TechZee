const express = require("express");
const { signupUser, loginUser, generateNewAccessToken , addFavourite} = require("./userControllers");
const verifyAccessToken = require("../user/userMiddleware");
const router = express.Router();

router.post("/user/signup", signupUser);
router.post("/user/login", loginUser);
router.post("/user/newtoken", generateNewAccessToken);
router.post("/user/addtofav", addFavourite);

module.exports = router;
