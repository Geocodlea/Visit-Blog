const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const CategoryController = require("../controllers/category");

router.get("/:categoryId", CategoryController.getCategory);

router.post(
  "/add-category",
  upload.single("img"),
  CategoryController.postAddCategory
);

router.patch("/", upload.single("img"), CategoryController.patchEditCategory);

router.delete("/", CategoryController.deleteCategory);

module.exports = router;
