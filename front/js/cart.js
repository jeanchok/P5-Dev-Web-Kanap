const log = console.log;

// Chargement du Panier si il existe
let cart = [];
function loadCart() {
  cart = JSON.parse(localStorage.getItem('shoppingCart'));
}
if (localStorage.getItem("shoppingCart") != null) {
  loadCart();
}
log (cart);

// Affichage de chaque articles du panier
function displayCart(returnAPI, item, color, qty,id){

  // Création de l'élément <Article> et de ses attributs
  let itemArticle = document.createElement("article");
  let items = document.getElementById("cart__items");
  itemArticle.setAttribute ("data-id", item.id);
  itemArticle.setAttribute ("data-color",  color);
  items.appendChild(itemArticle);
  itemArticle.classList.add("cart__item");

  // Création du container de l'image
  let imgContainer = document.createElement("div");
  itemArticle.appendChild(imgContainer);
  imgContainer.classList.add("cart__item__img");

  // Création de l'élément <image> et de son attribut "alt"
  let itemImg = document.createElement("img");
  itemImg.src = returnAPI.imageUrl;
  imgContainer.appendChild(itemImg);
  itemImg.setAttribute("alt",returnAPI.altTxt);

  // Création du container des infos produit
  let itemContent = document.createElement("div");
  itemArticle.appendChild(itemContent);
  itemContent.classList.add("cart__item__content");

  // Création du container de la description produit
  let itemDescription = document.createElement("div");
  itemContent.appendChild(itemDescription);
  itemDescription.classList.add("cart__item__content__description");

  // Création du titre
  let itemTitle = document.createElement("h2");
  itemTitle.innerHTML = returnAPI.name;
  itemDescription.appendChild(itemTitle);

  // Création de la couleur
  let itemColor = document.createElement("p");
  itemColor.innerHTML = color;
  itemDescription.appendChild(itemColor);

    // Création du prix
  let itemPrice = document.createElement("p");
  itemPrice.innerHTML = `${returnAPI.price.toLocaleString(undefined,{ minimumFractionDigits: 2 })} €`;
  itemDescription.appendChild(itemPrice);

  // Création du container pour la gestion de la quantité et de la suppression produit
  let itemSettings = document.createElement("div");
  itemContent.appendChild(itemSettings);
  itemSettings.classList.add("cart__item__content__settings");

  // Création du container pour la quantité
  let itemSettingsQuantity = document.createElement("div");
  itemSettings.appendChild(itemSettingsQuantity);
  itemSettingsQuantity.classList.add("cart__item__content__settings__quantity");

  // Création du texte pour la quantité
  let itemQuantity = document.createElement("p");
  itemQuantity.innerHTML = `Qté : `;
  itemSettingsQuantity.appendChild(itemQuantity);

  // Création de l'input pour la quantité
  let itemQuantityInput = document.createElement("input");
  itemQuantityInput.id = id;
  itemQuantityInput.color = color;
  itemSettingsQuantity.appendChild(itemQuantityInput);
  itemQuantityInput.classList.add("itemQuantity");
  itemQuantityInput.setAttribute("type", "number");
  itemQuantityInput.setAttribute("name", "itemQuantity");
  itemQuantityInput.setAttribute("min", 1);
  itemQuantityInput.setAttribute("max", 100);
  itemQuantityInput.setAttribute("value", qty);

  // Création du container pour la suppression produit
  let itemSettingsDelete = document.createElement("div");
  itemSettings.appendChild(itemSettingsDelete);
  itemSettingsDelete.classList.add("cart__item__content__settings__delete");

  // Création de l'élément pour la suppression produit
  let itemDelete = document.createElement("p");
  itemDelete.innerHTML = `Supprimer`;
  itemSettingsDelete.appendChild(itemDelete);
  itemDelete.classList.add("deleteItem");
};

// Appel à l'API
let APIinfos = [];
APIcall ();
function APIcall (){
  APIinfos.length = 0;
  cart.forEach(function(item){
    let id = item.id;
    let color = item.color;
    let qty = Number(item.qty);
    let url = `http://localhost:3000/api/products/${id}`;
    fetch(url)
    .then(res => res.json())
    .catch((error) => console.log(`Erreur : ` + error))
    .then(function (returnAPI){
      APIinfos.push(returnAPI);
      // Appel de la fonction pour l'affichage de chaque articles du panier
      displayCart(returnAPI, item, color, qty);
    });
  });  
}

// Cacul des totaux
calculTotal();
function calculTotal(){
  if(APIinfos.length > 0){
    let pricePerItems = 0;
    let SumQty = 0;
    let sumPrice = [];
    cart.forEach(function(item){
      let qty = Number(item.qty);
      let APIinfosItem =  APIinfos.find(obj => obj._id === item.id);
      pricePerItems = qty * APIinfosItem.price;
      sumPrice.push(pricePerItems);
      SumQty += qty;
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      let totalQuantity = document.getElementById("totalQuantity");
      totalQuantity.innerHTML = SumQty;
      let totalPrice = document.getElementById("totalPrice");
      totalPrice.innerHTML = sumPrice.reduce(reducer).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    });
  }else{
    setTimeout(calculTotal, 100);
  }
};

// Gestion du changement de quantité produit
document.querySelector('body').addEventListener('change', function(event) {
  if (event.target.className === 'itemQuantity') {
    let inputTargeted = event.target;
    let articleTargeted = inputTargeted.closest(".cart__item");
    cart.forEach(function(item){
      if(event.target.value > 0 && item.id === articleTargeted.dataset.id && item.color === articleTargeted.dataset.color){
        item.qty = event.target.value;
        localStorage.setItem("shoppingCart",JSON.stringify(cart));
        loadCart();
        log(cart);  
      } if(event.target.value < 0) {
        log("La quantité doit être supérieure à zéro.");
      }
    });
    calculTotal();
  }
});

// Supprimer un article du panier
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'deleteItem'){
    let deleteEvent = event.target;
    let itemToDelete = deleteEvent.closest(".cart__item");
    itemToDelete.remove();
    cart.forEach(function(item){
      if(item.id === itemToDelete.dataset.id && item.color === itemToDelete.dataset.color){
        const index = cart.indexOf(item);
        if(index > -1){
          cart.splice(index, 1);
          localStorage.setItem("shoppingCart",JSON.stringify(cart));
          loadCart();
        };
      };
    });
    calculTotal();
  };
});

//Vérification des entrées utilisateur
const input_fields = {
  firstName: /^[A-Z\-]+$/i,
  lastName: /^[A-Z\-]+$/i,
  address: /^[a-zA-Z0-9\s,'-]*$/i,
  city: /^[A-Z\-]+$/i,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
}

// Vérification si il y a correspondance entre le regex et le field
let isValid = [];
function validate(field, regex){
  regex.test(field.value) ? (field.nextElementSibling.innerHTML = "",isValid = isValid.filter(e => e !== field.id)) : (field.nextElementSibling.innerHTML = "Entrée invalide !", isValid.push(field.id));
}
// Vérification de la correspondance pour chacun des inputs
let entree = document.querySelectorAll('input');
entree.forEach(item => item.addEventListener('change', function(event){
  validate(event.target, input_fields[event.target.attributes.name.value]);
  log(isValid)
}));

// Rassembler les entrée dans un objet contact
function getContact(){
  const contact = {};
  contact.firstName = document.getElementById("firstName").value;
  contact.lastName = document.getElementById("lastName").value;
  contact.address = document.getElementById("address").value;
  contact.city = document.getElementById("city").value;
  contact.email = document.getElementById("email").value;
  return contact;
};

// Vérification si les entrées sont remplis
function areFieldsEmpty(contact){
  for (let key in contact){
    if (contact[key] !== "")
    return true;
  }
  return false;
};

// Création d'un tableau de string avec seulement les ids du panier
function getIdFromCart(){
  let idFromCart = [];
  cart.forEach(function(item){
    let itemId = item.id;
    let itemIdString = itemId.toString();
    idFromCart.push(itemIdString);
  });
  return idFromCart;
};

//POST à l'API et récupération de l'IdOrder
function postToAPI(order){
  fetch("http://localhost:3000/api/products/order", {
    method : "POST",
    body : JSON.stringify(order),
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
  })
  .then(function(res){
    if(res.ok){
      return res.json();
    }
  })
  .catch((error) => console.log(`Erreur : ` + error))
  .then(function getIdOrder(data){
    // Redirection vers la page de confirmation
    window.location.replace(`confirmation.html?id=${data.orderId}`);
    localStorage.clear();
  })
};

// Passer la commande
let orderButton = document.getElementById('order');
orderButton.addEventListener('click',function(event){
  event.preventDefault();
  let contact = getContact();
  let theFieldsAreNotEmpty = areFieldsEmpty(contact);
    if(isValid.length == 0 && theFieldsAreNotEmpty == true){
      let products = getIdFromCart();
      let order = {contact, products};
      postToAPI(order);   
    }
    if(theFieldsAreNotEmpty == false){
      log("Entrée vide");
    }
    if(isValid.length !== 0){
      log("Entrée incorrecte");
    } 
  }
);