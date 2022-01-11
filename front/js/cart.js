var cart = localStorage.getItem('cart');
console.log('cart: ', JSON.parse(cart));

let addedToCart = JSON.parse(cart);

addedToCart.forEach(function(){
    let itemArt = document.createElement("article");
    let items = document.getElementById("cart__items");
    //itemArt.data-id = ;
    items.appendChild(itemArt);
        
    
});

// let newEltArticle = document.createElement("article");
//         itemLink.appendChild(newEltArticle);
        
//     let itemImg = document.createElement("img");
//     itemImg.src = returnAPI[article].imageUrl;
//     newEltArticle.appendChild(itemImg);
//     itemImg.setAttribute("alt",returnAPI[article].altTxt);
        
//         let itemTitle = document.createElement("h3");
//         itemTitle.innerHTML = returnAPI[article].name;
//         newEltArticle.appendChild(itemTitle);
//         itemTitle.classList.add("productName");
        
//         let itemDescription = document.createElement("p");
//         itemDescription.innerHTML = returnAPI[article].description;
//         newEltArticle.appendChild(itemDescription);
//         itemDescription.classList.add("productDescription");