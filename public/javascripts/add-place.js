// select category
$("#selectCategory").change(function (e) {
  $("#title").removeAttr("disabled");
  $("#description").removeAttr("disabled");
  $("#img").removeAttr("disabled");
});

// add new place
$("#addPlaceForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const category = $("#selectCategory option:selected").val();
  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let date = new Date().toDateString().split(" ");
  date = `Added: ${date[2]} ${date[1]} ${date[3]}`;

  let formData = new FormData();

  if (!category || !title || !description || !file) {
    $("#formResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("img", file);
    formData.append("date", date);

    fetch("/category/place/add-place", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        $("#formResponse").append(
          '<div class="success-block">Added new place successfully</div>'
        );
      })
      .catch((err) => {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      });
  }
});
