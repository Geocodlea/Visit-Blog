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

// get add place
const getAddPlace = async (req, res, next) => {
  const categories = await Category.find({}, "title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const titleCategory = categories.map((item) => item.title);

  //for navbar
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("add-place", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
  });
};

// get edit place
const getEditPlace = async (req, res, next) => {
  const categories = await Category.find({}, "title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const titleCategory = categories.map((item) => item.title);

  const places = await Place.find({}, "category title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const categoryPlace = places.map((item) => item.category);
  const titlePlace = places.map((item) => item.title);

  const allPlaces = {};

  for (let i = 0; i < titleCategory.length; i++) {
    allPlaces[titleCategory[i]] = [];
    for (let j = 0; j < titlePlace.length; j++) {
      if (categoryPlace[j] == titleCategory[i]) {
        allPlaces[titleCategory[i]].push(titlePlace[j]);
      }
    }
  }

  console.log(allPlaces);

  //for navbar
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("edit-place", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    allPlaces: JSON.stringify(allPlaces),
  });
};

// get place
const getPlace = async (req, res, next) => {
  const place = await Place.findById(req.params.placeId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const titlePlace = place.title;
  const descriptionPlace = place.description;
  const imagePlace = place.img;
  const datePlace = place.date;

  //for navbar
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("place", {
    idAllCategories,
    titleAllCategories,
    titlePlace,
    descriptionPlace,
    imagePlace,
    datePlace,
  });
};

// add new place
const postAddPlace = async (req, res, next) => {
  await sharp(req.file.path)
    .resize(480, 270)
    .toFile(path.resolve(req.file.destination, "images", req.file.filename));
  fs.unlinkSync(req.file.path);

  const place = new Place({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    img: req.file.filename,
    date: req.body.date,
  });

  place
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

// edit place
const patchEditPlace = async (req, res) => {
  let result = {};

  result.date = req.body.date;
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

  console.log(req.body.place);
  let updatePlace = await Place.findOneAndUpdate(
    { title: req.body.place },
    result,
    { new: true }
  );
  console.log(updatePlace);

  res.json({ updatePlace });
};

// delete place
const deletePlace = async (req, res) => {
  const deletePlace = await Place.deleteOne({ title: req.body.place });
  console.log(deletePlace);

  res.end();
};

module.exports = {
  getAddPlace,
  getEditPlace,
  getPlace,
  postAddPlace,
  patchEditPlace,
  deletePlace,
};
