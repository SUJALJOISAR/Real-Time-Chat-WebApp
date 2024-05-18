
const router = require("express").Router();
const { register, login, setAvatar, getAllUsers, logOut } = require("../controllers/userController");

 router.post("/register",register);
 router.post("/login",login);
 router.post("/setAvatar/:id",setAvatar);
 router.get("/allusers/:id", getAllUsers);
 router.get("/logout/:id", logOut);

 module.exports = router;