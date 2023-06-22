const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const PlaceController = require("../controllers/place");

router.get("/add-place", PlaceController.getAddPlace);

router.get("/edit-place", PlaceController.getEditPlace);

router.get("/:placeId", PlaceController.getPlace);

router.post("/add-place", upload.single("img"), PlaceController.postAddPlace);

router.patch(
  "/edit-place",
  upload.single("img"),
  PlaceController.patchEditPlace
);

router.delete("/", PlaceController.deletePlace);

module.exports = router;
