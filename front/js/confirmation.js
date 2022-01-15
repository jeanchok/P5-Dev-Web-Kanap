// Afficher numéro de commande
let searchParams = new URLSearchParams(window.location.search);
let id= params.get('id');
document.getElementById('orderId').innerHTML = `${id}`;
