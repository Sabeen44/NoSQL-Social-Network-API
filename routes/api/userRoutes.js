const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  //deleteStudent,
  // addAssignment,
  // removeAssignment,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:studentId").get(getSingleUser);

//.delete(deleteStudent);

// /api/students/:studentId/assignments
// router.route("/:studentId/assignments").post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route("/:studentId/assignments/:assignmentId").delete(removeAssignment);

module.exports = router;
