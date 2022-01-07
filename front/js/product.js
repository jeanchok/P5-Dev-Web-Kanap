let params = new URLSearchParams(window.location.search);

let id= params.get('id');

console.log(id);

getInfo();
// appel à l'API
function getInfo() {
    let url = `http://localhost:3000/api/products/${id}`;
    console.log(url);
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .catch((error) => console.log(`Erreur : ` + error))


    .then(function (returnAPI) {
      const articles = returnAPI;
      console.log(articles);
        // création des informations produits
        
        let itemImg = document.createElement("img");
        let imgContainer = document.getElementsByClassName("item__img")[0];
        itemImg.src = returnAPI.imageUrl;
        imgContainer.appendChild(itemImg);
        itemImg.setAttribute("alt",returnAPI.altTxt);

        
        let itemTitle = document.getElementById("title");
        itemTitle.innerHTML = returnAPI.name;

        let itemPrice = document.getElementById("price");
        itemPrice.innerHTML = returnAPI.price;
        
        let itemDescription = document.getElementById("description");
        itemDescription.innerHTML = returnAPI.description;

      // selection des couleurs
        const colors = returnAPI.colors;
        console.log(colors);

        let select = document.getElementById("colors");
        

        for(let i = 0; i < colors.length; i++) {
            let opt = colors[i];
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
            select.setAttribute("value", el);
        }

    });
}
