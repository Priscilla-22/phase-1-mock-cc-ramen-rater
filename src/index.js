// write your code here
document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000";
  const ramenMenu = document.querySelector("#ramen-menu");
  const detailImg = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  const ratingDisplay = document.querySelector("#rating-display");
  const commentDisplay = document.querySelector("#comment-display");
  const newRamenForm = document.querySelector("#new-ramen");

  fetch(`${baseURL}/ramens`)
    .then((resp) => resp.json())
    .then((data) => {
      displayRamens(data);
    })
    .catch((err) => console.log(err));

  function displayRamens(ramens) {
    ramens.forEach((ramen) => {
      const detailImg = document.createElement("img");
      detailImg.src = ramen.image;
      detailImg.alt = ramen.name;

      detailImg.addEventListener("click", () => {
        showDetail(ramen);
      });
      ramenMenu.appendChild(detailImg);
    });
  }

  function showDetail(ramen) {
    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;

    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
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
    const newRamenImg = document.createElement("img");
    newRamenImg.src = newRamen.image;
    newRamenImg.alt = newRamen.name;

    newRamenImg.addEventListener("click", () => {
      showDetail(newRamen);
    });

    ramenMenu.appendChild(newRamenImg);
    
    newName.value = "";
    newRestaurant.value = "";
    newImg.value = "";
    newRating.value = "";
    newComment.value = "";
  }

  newRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewRamen();
  });
});
