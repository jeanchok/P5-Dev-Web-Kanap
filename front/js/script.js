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

// Affichage des articles (HTML)
function displayArticles(articles,returnAPI){
  for (let article in articles){
    // Création du lien
    let itemLink = document.createElement("a");
    let items = document.getElementById("items");
    itemLink.href = `product.html?id=${returnAPI[article]._id}`;
    items.appendChild(itemLink);
    
    // Création de l'élément <Article>
    let newEltArticle = document.createElement("article");
    itemLink.appendChild(newEltArticle);
    
    // Création de l'élément <Img>
    let itemImg = document.createElement("img");
    itemImg.src = returnAPI[article].imageUrl;
    newEltArticle.appendChild(itemImg);
    itemImg.setAttribute("alt",returnAPI[article].altTxt);
    
    // Création de l'élément <h3>
    let itemTitle = document.createElement("h3");
    itemTitle.innerHTML = returnAPI[article].name;
    newEltArticle.appendChild(itemTitle);
    itemTitle.classList.add("productName");
    
    // Création de l'élément <p>
    let itemDescription = document.createElement("p");
    itemDescription.innerHTML = returnAPI[article].description;
    newEltArticle.appendChild(itemDescription);
    itemDescription.classList.add("productDescription");
  }
}