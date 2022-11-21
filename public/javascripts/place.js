// put all places for the selected category in selectPlace
$("#selectCategory").change(function (e) {
  $("#selectPlace").html("");
  $("#selectPlace").removeAttr("disabled");
  $("#title").removeAttr("disabled");
  $("#description").removeAttr("disabled");
  $("#img").removeAttr("disabled");
  for (const key in allPlaces) {
    if (this.value == key) {
      allPlaces[key].map((item) => {
        $("#selectPlace").append(`<option value="${item}">${item}</option>`);
      });
    }
  }
});

$("#editPlaceBtn").click(function (e) {
  $("form").removeAttr("hidden");
});

// edit place
$("#editPlaceForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  let place = $("#selectPlace option:selected").val();
  if (!place) {
    place = titlePlace;
  }
  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let date = new Date().toDateString().split(" ");
  date = `Edited: ${date[2]} ${date[1]} ${date[3]}`;

  let formData = new FormData();

  formData.append("place", place);
  formData.append("date", date);

  if (title) {
    formData.append("title", title);
  }
  if (description) {
    formData.append("description", description);
  }
  if (file) {
    formData.append("img", file);
  }

  if (title || description || file) {
    fetch("/category/place/edit-place", {
      method: "PATCH",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#formResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#titlePlace").html(res.updatePlace.title);
        titlePlace = res.updatePlace.title;
        $("#descriptionPlace").html(res.updatePlace.description);
        $("#datePlace").html(res.updatePlace.date);
        $("#imgPlace").attr("src", "../../images/" + res.updatePlace.img);
        console.log(res.updatePlace);
      })
      .catch((err) => {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      });
  } else {
    $("#formResponse").append(
      '<div class="error-block">All fields are empty</div>'
    );
  }
});

// delete place
$("#deletePlaceBtn").click(function (e) {
  e.preventDefault();

  fetch("/category/place", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ place: titlePlace }),
  }).then(() => (window.location = "../../"));
});
