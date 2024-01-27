// write your code here
document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000";
  const ramenMenu = document.querySelector("#ramen-menu");
  const ramenDetail = document.querySelector("#ramen-detail");
  const detailImg = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  const ratingDisplay = document.querySelector("#rating-display");
  const commentDisplay = document.querySelector("#comment-display");
  const newRamenForm = document.querySelector("#new-ramen");
  const editRamenForm = document.querySelector("#edit-ramen");
  const editRating = document.querySelector("#edit-rating").value;
  const editComment = document.querySelector("#edit-comment").value;

  function fetchRamens() {
    fetch(`${baseURL}/ramens`)
      .then((resp) => resp.json())
      .then((data) => {
        displayRamens(data);

        if (data.length > 0) {
          showDetail(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }

  function displayRamens(ramens) {
    ramens.forEach((ramen) => {
      const detailImg = document.createElement("img");
      detailImg.src = ramen.image;
      detailImg.alt = ramen.name;

      detailImg.addEventListener("click", () => {
        showDetail(ramen);
      });

      const deleteRamenBtn = document.createElement("button");
      deleteRamenBtn.classList.add("delete-ramen");
      deleteRamenBtn.textContent = "Delete";

      deleteRamenBtn.addEventListener("click", () => {
        deleteRamen(ramen, detailImg, deleteRamenBtn);
      });
      ramenMenu.appendChild(detailImg);
      ramenMenu.appendChild(deleteRamenBtn);
    });
  }

  function showDetail(ramen) {
    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;

    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;

    ramenDetail.dataset.ramenId = ramen.id;
  }

  function addNewRamen() {
    const newName = document.querySelector("#new-name");
    const newRestaurant = document.querySelector("#new-restaurant");
    const newImg = document.querySelector("#new-image");
    const newRating = document.querySelector("#new-rating");
    const newComment = document.querySelector("#new-comment");

    const newRamen = {
      name: newName.value,
      restaurant: newRestaurant.value,
      image: newImg.value,
      rating: newRating.value,
      comment: newComment.value,
    };

    createNewRamen(newRamen, (data) => {
      const newRamenImg = document.createElement("img");
      newRamenImg.src = data.image;
      newRamenImg.alt = data.name;

      newRamenImg.addEventListener("click", () => {
        showDetail(data);
      });

      const deleteRamenBtn = document.createElement("button");
      deleteRamenBtn.classList.add("delete-ramen");
      deleteRamenBtn.textContent = "Delete";

      deleteRamenBtn.addEventListener("click", () => {
        deleteRamen(data, newRamenImg, deleteRamenBtn);
      });

      ramenMenu.appendChild(newRamenImg);
      ramenMenu.appendChild(deleteRamenBtn);

      newName.value = "";
      newRestaurant.value = "";
      newImg.value = "";
      newRating.value = "";
      newComment.value = "";
    });
  }

  newRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewRamen();
  });

  function deleteRamen(ramen, detailImg, deleteRamenBtn) {
    ramenMenu.removeChild(detailImg);
    ramenMenu.removeChild(deleteRamenBtn);
    clearDetail();
  }

  function clearDetail() {
    detailImg.src = "./assets/image-placeholder.jpg";
    detailImg.alt = "Insert Name Here";

    ramenName.textContent = "Insert Name Here";
    restaurant.textContent = "Insert Restaurant Here";
    ratingDisplay.textContent = "Insert rating here";
    commentDisplay.textContent = "Insert comment here";
  }

  editRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ramenId = ramenDetail.dataset.ramenId;
    const updatedRating = document.querySelector("#edit-rating").value;
    const updatedComment = document.querySelector("#edit-comment").value;
    updateRamens(
      ramenId,
      { rating: updatedRating, comment: updatedComment },
      (data) => {
        showDetail(data);
      }
    );
  });

  //persist my updates to a ramen's rating and comment
  function updateRamens(ramenId, updatedData, callback) {
    fetch(`${baseURL}/ramens/${ramenId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (callback) {
          callback(data);
        }
        const updatedRating = (document.querySelector("#edit-rating").value =
          "");
        const updatedComment = (document.querySelector("#edit-comment").value =
          "");
      })
      .catch((err) => console.error(err));
  }

  //persist new ramens
  function createNewRamen(newRamen, callback) {
    fetch(`${baseURL}/ramens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRamen),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (callback) {
          callback(data);
        }
      })
      .catch((err) => console.error(err));
  }

  //persist any ramen deletions
  function deleteRamen(ramen, detailImg, deleteRamenBtn) {
    const ramenId = ramen.id;
    fetch(`${baseURL}/ramens/${ramenId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        ramenMenu.removeChild(detailImg);
        ramenMenu.removeChild(deleteRamenBtn);
        clearDetail();
      })
      .catch((err) => console.error(err));
  }

  fetchRamens();
});
