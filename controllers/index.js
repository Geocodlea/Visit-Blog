const mongoose = require("mongoose");

const Category = require("../models/category");
const Place = require("../models/place");

const getHomePage = async (req, res, next) => {
  const categories = await Category.find()
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

  const idCategory = categories.map((item) => item._id);
  const titleCategory = categories.map((item) => item.title);
  const shortDescription = categories.map((item) => item.description);
  const imageCategory = categories.map((item) => item.img);

  //for navbar
  const idAllCategories = idCategory;
  const titleAllCategories = titleCategory;

  const places = await Place.find({}, "id category title date")
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
  const categoryPlace = places.map((item) => item.category);
  const titlePlace = places.map((item) => item.title);
  const datePlace = places.map((item) => item.date);

  const nrPlaces = titleCategory.map((item) => {
    let count = 0;
    for (let i = 0; i < categoryPlace.length; i++) {
      if (item === categoryPlace[i]) {
        count++;
      }
    }
    return count;
  });

  res.render("index", {
    idAllCategories,
    titleAllCategories,
    idCategory,
    titleCategory,
    shortDescription,
    imageCategory,
    nrPlaces,
    idPlace,
    titlePlace,
    datePlace,
  });
};

module.exports = { getHomePage };
