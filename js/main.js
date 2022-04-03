const lightbox = new SimpleLightbox('.featuredInfo button', { sourceAttr: "data-src", nav: false, captionSelector: "self" });

function getRating(cat) {
  let arrRating = [];
  for (let i = 0; i < 10; i++) {
    if (i < cat.rate) {
      arrRating.push("<img src='img/cat.png'>");  
    }
    else {
      arrRating.push("<img src='img/cat.png' class='white-rating'>");  
    }
  }

  return arrRating.join("");
}

let path = {
  getAll: "http://sb-cats.herokuapp.com/api/2/elementalia/show",
  getOne: "http://sb-cats.herokuapp.com/api/2/elementalia/show/",
  getId: "http://sb-cats.herokuapp.com/api/2/elementalia/ids",
  add: "http://sb-cats.herokuapp.com/api/2/elementalia/add",
  upd: "http://sb-cats.herokuapp.com/api/2/elementalia/update/",
  del: "http://sb-cats.herokuapp.com/api/2/elementalia/delete/"
}

fetch(path.getAll)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        if (result.data) {
          const container = document.querySelector(".featuredItems");

          for (let cat of result.data) {
            const block = `<div class="featuredItem">
              <div class="featuredImgWrap">
                  <div class="featuredInfo">
                      <a href="cat.html#${cat.id}">
                          <img src="img/infoCard.png" alt="infoCard">
                          Подробнее обо мне
                      </a>
                  </div>
                  <img class="featuredProduct" src="${cat.img_link}" alt="У этого котика еще нет фотографии">
              </div>
              <div class="featuredNameAndRating">
                  <div class="featuredItemName">${cat.name}</div>
                  <div class="featuredItemRating">${getRating(cat)}</div>
              </div>
            </div>`;
          
            container.insertAdjacentHTML('beforeend', block);
          }
        }
    });
