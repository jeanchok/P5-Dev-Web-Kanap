getArticles();
// appel à l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
  .then(res => res.json())

  .catch(error => console.log(`Erreur : ` + error))

  .then(function (returnAPI) {
    const articles = returnAPI;
    console.log(articles);
    displayArticles(articles,returnAPI);
  });
}

// Affichage des articles
function displayArticles(articles,returnAPI){
  for (let article in articles){
    let itemLink = document.createElement("a");
    let items = document.getElementById("items");
    itemLink.href = `product.html?id=${returnAPI[article]._id}`;
    items.appendChild(itemLink);
    
    let newEltArticle = document.createElement("article");
    itemLink.appendChild(newEltArticle);
    
    let itemImg = document.createElement("img");
    itemImg.src = returnAPI[article].imageUrl;
    newEltArticle.appendChild(itemImg);
    itemImg.setAttribute("alt",returnAPI[article].altTxt);
    
    let itemTitle = document.createElement("h3");
    itemTitle.innerHTML = returnAPI[article].name;
    newEltArticle.appendChild(itemTitle);
    itemTitle.classList.add("productName");
    
    let itemDescription = document.createElement("p");
    itemDescription.innerHTML = returnAPI[article].description;
    newEltArticle.appendChild(itemDescription);
    itemDescription.classList.add("productDescription");
  }
}