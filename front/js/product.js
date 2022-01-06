let params = new URLSearchParams(window.location.search);

let id= params.get('id');

console.log(id);

getInfo();

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
        
        
        let itemImg = document.createElement("img");
        let imgContainer = document.getElementsByClassName("item__img")[0];
        itemImg.src = returnAPI.imageUrl;
        imgContainer.appendChild(itemImg);
        
        let itemTitle = document.getElementById("title");
        itemTitle.innerHTML = returnAPI.name;

        let itemPrice = document.getElementById("price");
        itemPrice.innerHTML = returnAPI.price;
        
        let itemDescription = document.getElementById("description");
        itemDescription.innerHTML = returnAPI.description;

        const colors = returnAPI.colors;
        console.log(colors);
    
        for (let color in colors){
            let itemColor = document.createElement("option");
            let colorsForm = document.getElementById("colors");
            itemColor.innerHTML = color;
            for (let i in colors) {
                itemColor.innerHTML = returnAPI.colors[i];
                console.log(colors[i]);
                colorsForm.appendChild(itemColor);
            }
            
        }

    });
}
