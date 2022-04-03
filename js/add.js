let path = {
  getAll: "http://sb-cats.herokuapp.com/api/2/elementalia/show",
  getOne: "http://sb-cats.herokuapp.com/api/2/elementalia/show/",
  getId: "http://sb-cats.herokuapp.com/api/2/elementalia/ids",
  add: "http://sb-cats.herokuapp.com/api/2/elementalia/add",
  upd: "http://sb-cats.herokuapp.com/api/2/elementalia/update/",
  del: "http://sb-cats.herokuapp.com/api/2/elementalia/delete/"
}

document.forms.addCat.addEventListener("submit", function(e) {
  e.preventDefault();
  let body = {};
  for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      if (el.name) {
          body[el.name] = el.value;
      }
  }
  body.favourite = !!body.favourite;
  console.log(body);
  console.log(JSON.stringify(body));
  fetch(path.add, {
      method: "post",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(body)
  })
      .then(res => res.json())
      .then(result => {
          console.log(result);
          if (result.message === "ok") {
              this.reset();
          }
      })
});
