const mongoose = require("mongoose");

const Category = require("./models/category");
const Place = require("./models/place");

// Default Mockup: 3 categories and 9 places
const defaultCategories = ["Mountains", "Lakes", "Cities"];
const defaultPlaces = [
  "Mountain 1",
  "Mountain 2",
  "Mountain 3",
  "Lake 1",
  "Lake 2",
  "Lake 3",
  "City 1",
  "City 2",
  "City 3",
];
const defaultImages = [
  "mountain1.jpg",
  "mountain2.jpg",
  "mountain3.jpg",
  "lake1.jpg",
  "lake2.jpg",
  "lake3.jpg",
  "city1.jpg",
  "city2.jpg",
  "city3.jpg",
];
const defaultDates = [
  "03 Nov 2022",
  "02 Nov 2022",
  "13 Nov 2022",
  "08 Nov 2022",
  "10 Nov 2022",
  "07 Nov 2022",
  "04 Nov 2022",
  "05 Nov 2022",
  "02 Nov 2022",
];
const defaultDescriptionCategories =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam ipsum ante, a pharetra est congue quis.";
const defaultDescriptionPlaces =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam ipsum ante, a pharetra est congue quis. Nulla nec aliquet ante. Vivamus dui nisl, tempor in sollicitudin ut, congue in sem. Morbi sit amet eleifend mauris. Ut sagittis porta sem, feugiat commodo dolor pulvinar porttitor. Vivamus commodo dui metus, sed pulvinar augue malesuada in. Nam consequat placerat tortor at molestie. Vivamus laoreet nisl sit amet sem gravida sodales. Integer gravida mi vel scelerisque porta. Nullam vitae arcu vestibulum, feugiat sapien sit amet, consectetur quam.\nSuspendisse gravida sed urna eu dapibus. Nunc congue, turpis sed rhoncus porttitor, eros nibh semper elit, eu posuere urna lacus id lorem. Ut ornare, leo sed tempus porttitor, risus turpis iaculis dolor, vel sagittis arcu risus eu lacus. Mauris semper purus id quam condimentum, in dictum nisl aliquam. Morbi auctor tellus sit amet feugiat euismod. Curabitur porttitor tempus leo, vel luctus tortor. Praesent ut neque sit amet urna bibendum vestibulum sit amet id nibh. Vestibulum id urna tincidunt, facilisis lectus vitae, volutpat est. Nulla a mattis quam, ac efficitur nisi.";

for (let i = 0; i < 3; i++) {
  Category.countDocuments(
    { title: defaultCategories[i] },
    function (err, count) {
      if (count < 1) {
        const category = new Category({
          _id: new mongoose.Types.ObjectId(),
          title: defaultCategories[i],
          description: defaultDescriptionCategories,
          img: defaultImages[i * 3],
        });

        category
          .save()
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      for (let j = 0; j < 3; j++) {
        Place.countDocuments(
          { title: defaultPlaces[i * 3 + j] },
          function (err, count) {
            if (count < 1) {
              const place = new Place({
                _id: new mongoose.Types.ObjectId(),
                category: defaultCategories[i],
                title: defaultPlaces[i * 3 + j],
                description: defaultDescriptionPlaces,
                img: defaultImages[i * 3 + j],
                date: defaultDates[i * 3 + j],
              });

              place
                .save()
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        );
      }
    }
  );
}
