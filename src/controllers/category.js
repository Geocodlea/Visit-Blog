const path = require("path");
const mongoose = require("mongoose");
const sharp = require("sharp");
const fs = require("fs");

const Category = require("../models/category");
const Place = require("../models/place");

const forNavbar = async () => {
  const categories = await Category.find({}, "_id title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.title);

  return { idAllCategories, titleAllCategories };
};

// get category
const getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const titleCategory = category.title;
  const shortDescription = category.description;
  const imageCategory = category.img;

  const places = await Place.find(
    { category: titleCategory },
    "_id title img date"
  )
    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const idPlace = places.map((item) => item._id);
  const titlePlace = places.map((item) => item.title);
  const imagePlace = places.map((item) => item.img);
  const datePlace = places.map((item) => item.date);

  //for navbar
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("category", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    shortDescription,
    imageCategory,
    idPlace,
    titlePlace,
    imagePlace,
    datePlace,
  });
};

// add new category
const postAddCategory = async (req, res, next) => {
  await sharp(req.file.path)
    .resize(480, 270)
    .toFile(path.resolve(req.file.destination, "images", req.file.filename));
  fs.unlinkSync(req.file.path);

  const category = await new Category({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    img: req.file.filename,
  });

  category
    .save()
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

// edit category
const patchEditCategory = async (req, res) => {
  let result = {};

  if (req.body.title) {
    const title = req.body.title;
    console.log(title);
    result.title = title;
  }
  if (req.body.description) {
    const description = req.body.description;
    console.log(description);
    result.description = description;
  }
  if (req.file) {
    await sharp(req.file.path)
      .resize(480, 270)
      .toFile(path.resolve(req.file.destination, "images", req.file.filename));
    fs.unlinkSync(req.file.path);
    result.img = req.file.filename;
  }

  let updateCategory = await Category.findOneAndUpdate(
    { title: req.body.category },
    result,
    { new: true }
  );
  console.log(updateCategory);

  res.json({ updateCategory });
};

// delete category
const deleteCategory = async (req, res) => {
  const deleteCategory = await Category.deleteOne({ title: req.body.category });
  console.log(deleteCategory);

  res.end();
};

module.exports = {
  getCategory,
  postAddCategory,
  patchEditCategory,
  deleteCategory,
};
