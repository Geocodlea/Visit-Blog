$("#editCategoryBtn").click(function (e) {
  $("form").removeAttr("hidden");
});

// edit category
$("#editCategoryForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let formData = new FormData();
  formData.append("category", titleCategory);

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
    fetch("/category", {
      method: "PATCH",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        $("#formResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
        $("#titleCategory").html(res.updateCategory.title);
        titleCategory = res.updateCategory.title;
        $("#descriptionCategory").html(res.updateCategory.description);
        $("#imgCategory").attr("src", "../../images/" + res.updateCategory.img);
        console.log(res.updateCategory);
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

// delete category
$("#deleteCategoryBtn").click(function (e) {
  e.preventDefault();

  fetch("/category", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: titleCategory }),
  }).then(() => (window.location = "../../"));
});
