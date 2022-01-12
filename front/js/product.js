let params = new URLSearchParams(window.location.search);

let id= params.get('id');

console.log(id);

getInfo();
// appel à l'API
function getInfo() {
    let url = `http://localhost:3000/api/products/${id}`;
    console.log(url);
  fetch(url)
    .then(res => res.json())
    .catch((error) => console.log(`Erreur : ` + error))


    .then(function (returnAPI) {
      const articles = returnAPI;
      //console.log(articles);
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
        //console.log(colors);

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

let cart = [];
let addToCart = document.getElementById("addToCart");
const log = console.log;

// Evenement appuyer sur "Ajouter au panier"
addToCart.onclick = function() {   
  const infoArticle = {};

  let x = true;
  var quantityArticle = document.getElementById("quantity").value;
  //log(quantityArticle);
  var colorSelect = document.getElementById( "colors" ).value;
  //log(colorSelect);
  infoArticle.qty = Number(quantityArticle);
  infoArticle.id = id;
  infoArticle.color = colorSelect;

  if(quantityArticle > 0 && colorSelect != ""){
    //log(infoArticle);
    
    // Iteration de chaque élément pour ajouter seulement la quantité si produit est déjà présent
    cart.forEach(function(item){
      console.log('hello', item.id === infoArticle.id, item.color === infoArticle.color)
        if(item.id === infoArticle.id && item.color === infoArticle.color){
          log(item.id, infoArticle.color);
          log(item.qty);
          log(infoArticle.qty);
          item.qty = Number(item.qty) + Number(infoArticle.qty);
          
          x = false;
          // return;
        }
      
    });
    if(x){
      cart.push(infoArticle);
    }
    
    log("cart(after):",cart);
    
    // Ajout au cart du local storage 
    // localStorage.setItem("cart",JSON.stringify(cart));
    // var cartJsonParsed = localStorage.getItem('cart');
    // console.log('retrievedObject: ', JSON.parse(cartJsonParsed));
  } else {
    // let warning = document.createElement("h3");
    // let containerAddToCart = document.getElementsByClassName("item__content__addButton")[0];
    // containerAddToCart.appendChild(warning);
    // warning.innerHTML = 'Veuillez sélectionner une couleur et un quantité. <br>';
    log("Veuillez sélectionner une couleur et un quantité.");
  } 
}

