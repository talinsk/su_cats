console.log(cats);


const container = document.querySelector(".featuredItems");


for (let cat of cats) {
  const block = `<div class="featuredItem">
    <div class="featuredImgWrap">
        <div class="featuredInfo">
            <button data-src="${cat.img_link}" title="${cat.description}">
                <img src="img/infoCard.png" alt="infoCard">
                Подробнее обо мне
            </button>
        </div>
        <img class="featuredProduct" src="${cat.img_link}" alt="featuredItem">
    </div>
    <div class="featuredNameAndRating">
        <div class="featuredItemName">${cat.name}</div>
        <div class="featuredItemRating">${getRating(cat)}</div>
    </div>
  </div>`;

  container.insertAdjacentHTML('beforeend', block);
}

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


