main();

function main() {
  getArticles();
}

function getArticles(){

let url = `http://localhost:3000/api/products`;
fetch(url)
    .then(function(response){
        return response.json();
    })
        
    .catch((err) => console.log('Erreur : '+ err))

    .then(function(returnAPI){
    const articles = returnAPI;
    console.log(articles);
    for (let article in articles){
        let itemLink = document.createElement("a");
        let items = document.getElementById("items");
        itemLink.href = `product.html?id=${resultatAPI[article]._id}`;
        items.appendChild(itemLink);
        
        let newEltArticle = document.createElement("article");
        itemLink.appendChild(newEltArticle);
        
        let itemImg = document.createElement("img");
        itemImg.src = resultatAPI[article].imageUrl;
        newEltArticle.appendChild(itemImg);
        
        let itemTitle = document.createElement("h3");
        itemTitle.innerHTML = returnAPI[article].name;
        newEltArticle.appendChild(itemTitle);
        itemTitle.classList.add("productName");
        
        let itemDescription = document.createElement("p");
        itemDescription.innerHTML = returnAPI[article].description;
        newEltArticle.appendChild(itemDescription);
        itemDescription.classList.add("productDescription");
    }
    })
};