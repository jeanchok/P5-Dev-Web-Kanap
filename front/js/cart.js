const log = console.log;

let cart = [];
//Chargement du Panier
function loadCart() {
  cart = JSON.parse(localStorage.getItem('shoppingCart'));
}
if (localStorage.getItem("shoppingCart") != null) {
  loadCart();
}
log (cart);

let sumPrice = 0;
let pricePerItems = 0;
let SumQty = 0;

function sumToZero(){
sumPrice = 0;
pricePerItems = 0;
SumQty = 0;
}



// Affichage de chaque articles du panier
displayCart();
function displayCart(){

cart.forEach(function(item){
    getInfo();
// appel à l'API
    function getInfo() {
        let id = item.id;
        let color = item.color;
        let qty = Number(item.qty);
        let url = `http://localhost:3000/api/products/${id}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .catch((error) => console.log(`Erreur : ` + error))
        .then(function (returnAPI) {

        let itemArticle = document.createElement("article");
        let items = document.getElementById("cart__items");
        itemArticle.setAttribute ("data-id", item.id);
        itemArticle.setAttribute ("data-color", item.color);
        items.appendChild(itemArticle);
        itemArticle.classList.add("cart__item");

        let imgContainer = document.createElement("div");
        itemArticle.appendChild(imgContainer);
        imgContainer.classList.add("cart__item__img");

        let itemImg = document.createElement("img");
        itemImg.src = returnAPI.imageUrl;
        imgContainer.appendChild(itemImg);
        itemImg.setAttribute("alt",returnAPI.altTxt);

        let itemContent = document.createElement("div");
        itemArticle.appendChild(itemContent);
        itemContent.classList.add("cart__item__content");

        let itemDescription = document.createElement("div");
        itemContent.appendChild(itemDescription);
        itemDescription.classList.add("cart__item__content__description");

        let itemTitle = document.createElement("h2");
        itemTitle.innerHTML = returnAPI.name;
        itemDescription.appendChild(itemTitle);

        let itemColor = document.createElement("p");
        itemColor.innerHTML = color;
        itemDescription.appendChild(itemColor);

        let itemPrice = document.createElement("p");
        itemPrice.innerHTML = `${returnAPI.price.toLocaleString(undefined,{ minimumFractionDigits: 2 })} €`;
        itemDescription.appendChild(itemPrice);


        let itemSettings = document.createElement("div");
        itemContent.appendChild(itemSettings);
        itemSettings.classList.add("cart__item__content__settings");

        let itemSettingsQuantity = document.createElement("div");
        itemSettings.appendChild(itemSettingsQuantity);
        itemSettingsQuantity.classList.add("cart__item__content__settings__quantity");

        let itemQuantity = document.createElement("p");
        itemQuantity.innerHTML = `Qté : `;
        itemSettingsQuantity.appendChild(itemQuantity);


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

        

        let itemSettingsDelete = document.createElement("div");
        itemSettings.appendChild(itemSettingsDelete);
        itemSettingsDelete.classList.add("cart__item__content__settings__delete");

        let itemDelete = document.createElement("p");
        itemDelete.innerHTML = `Supprimer`;
        itemSettingsDelete.appendChild(itemDelete);
        itemDelete.classList.add("deleteItem");

        //Cacul et affichage des totaux
        pricePerItems = qty * returnAPI.price;
        sumPrice += pricePerItems;
        SumQty += qty;
        let totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.innerHTML = SumQty;
        let totalPrice = document.getElementById("totalPrice");
        totalPrice.innerHTML = sumPrice.toLocaleString(undefined,{ minimumFractionDigits: 2 });
        });
    }
});
}
// Gestion du changement de quantité produit
document.querySelector('body').addEventListener('change', function(event) {
    if (event.target.tagName.toLowerCase() === 'input') {
        let inputTargeted = event.target;
        let articleTargeted = inputTargeted.closest(".cart__item");

      cart.forEach(function(item){
        if(item.id === articleTargeted.dataset.id && item.color === articleTargeted.dataset.color){
          item.qty = event.target.value;
          localStorage.setItem("shoppingCart",JSON.stringify(cart));
          loadCart();
          log(cart);
        //   let itemsInCart = document.getElementById("cart__items");
        //   while (itemsInCart.firstChild){
        //     itemsInCart.removeChild(itemsInCart.firstChild);
        //   };
          sumToZero();
          //displayCart();
          
        }
      });
    }
});

// Supprimer un article du panier
document.querySelector('body').addEventListener('click', function(event) {
    if (event.target.className === 'deleteItem'){
        let deleteEvent = event.target;
        let itemToDelete = deleteEvent.closest(".cart__item");
        itemToDelete.remove();
        log(itemToDelete);
        cart.forEach(function(item){
            if(item.id === itemToDelete.dataset.id && item.color === itemToDelete.dataset.color){
              const index = cart.indexOf(item);
              if(index > -1){
                cart.splice(index, 1);
                localStorage.setItem("shoppingCart",JSON.stringify(cart));
                loadCart();
                log(cart);
              };
              
            };
        });
    };
});

let errorMessage = document.getElementById("firstNameErrorMsg");