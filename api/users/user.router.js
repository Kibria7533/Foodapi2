const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { body, validationResult } = require('express-validator');
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/",[ body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')], createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
