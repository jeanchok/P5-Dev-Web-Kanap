const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', productRoutes);

module.exports = app;

document.body.onload = addElement;

function addElement () {
  // crée un nouvel élément div
  var newA = document.createElement('a');
  // et lui donne un peu de contenu
  var newContent = document.createTextNode('Hi there and greetings!');
  // ajoute le nœud texte au nouveau div créé
  newA.appendChild(newContent);

  // ajoute le nouvel élément créé et son contenu dans le DOM
  var currentDiv = document.getElementById('items');
  document.body.appendChild(newA, currentDiv);
}

// let url = `http://localhost:3000/api/products`;

// fetch(url).then((response)=>
//   response.json().then((data)=> {
//     console.log(data);
//     document.querySelector('.productName').innerHTML = data.name;
//     document.querySelector('.productDescription').innerHTML = data.description;
//   })
//   .catch((err) => console.log('Erreur : '+ err));
// );