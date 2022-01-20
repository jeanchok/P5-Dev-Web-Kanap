// Récupération de l'id du produit contenu dans l'URL
let params = new URLSearchParams(window.location.search);
let id = params.get('id');

// Appel à l'API
getInfo();
function getInfo() {
  let url = `http://localhost:3000/api/products/${id}`;
  fetch(url)
  .then(res => res.json())
  .catch((error) => console.log(`Erreur : ` + error))
  .then(function (returnAPI) {
    displayInfoProduct(returnAPI);
    colorSelect (returnAPI.colors);
  });
}

// Création des informations produits
function displayInfoProduct(returnAPI) {
  // Création de l'élément <Img>
  let itemImg = document.createElement("img");
  let imgContainer = document.getElementsByClassName("item__img")[0];
  itemImg.src = returnAPI.imageUrl;
  imgContainer.appendChild(itemImg);
  // Ajoût de l'attribut "alt"
  itemImg.setAttribute("alt",returnAPI.altTxt);

  // Insertion du nom de l'article dans le titre
  let itemTitle = document.getElementById("title");
  itemTitle.innerHTML = returnAPI.name;

  // Insertion du prix du produit
  let itemPrice = document.getElementById("price");
  itemPrice.innerHTML = returnAPI.price.toLocaleString(undefined,{ minimumFractionDigits: 2 });
  
  // Insertion de la description du produit
  let itemDescription = document.getElementById("description");
  itemDescription.innerHTML = returnAPI.description;
}

// Sélection des couleurs
function colorSelect (colors){
  let select = document.getElementById("colors");
  for(let i = 0; i < colors.length; i++) {
    let opt = colors[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    select.setAttribute("value", el);
  }
}


// Création du panier ou récupération du panier existant
let cart = [];
function loadCart() {
  cart = JSON.parse(localStorage.getItem('shoppingCart'));
}
if (localStorage.getItem("shoppingCart") != null) {
  loadCart();
}
let addToCart = document.getElementById("addToCart");

const log = console.log;

// Evenement appuyer sur "Ajouter au panier"
addToCart.onclick = function() {   
  const infoArticle = {};
  let isInCart = false;
  let quantityArticle = document.getElementById("quantity").value;
  let colorSelect = document.getElementById( "colors" ).value;
  infoArticle.qty = Number(quantityArticle);
  infoArticle.id = id;
  infoArticle.color = colorSelect;

  if(quantityArticle > 0 && colorSelect != ""){
    // Iteration de chaque élément pour ajouter seulement la quantité si produit est déjà présent
    cart.forEach(function(item){
      if(item.id === infoArticle.id && item.color === infoArticle.color){
        item.qty = Number(item.qty) + Number(infoArticle.qty);
        isInCart = true;
      }
    });

    if(!isInCart){
      cart.push(infoArticle);
    }

    // Ajout au cart du local storage 
    localStorage.setItem("shoppingCart",JSON.stringify(cart));

  } else {
    log("Veuillez sélectionner une couleur et un quantité.");
  } 
}

