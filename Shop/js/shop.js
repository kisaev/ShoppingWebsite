var cart = {}; //cart

$('document').ready(function(){
  loadGoods();
  checkCart();
  showMiniCart();

});

function loadGoods(){
  //loading goods on site
  $.getJSON('goods.json', function (data) {
          //console.log(data);
          var out = '';
          for (var key in data){
            out+='<div class="single-goods">'
            out+='<h3>'+data[key]['name']+'<h3>';
            out+='<p>Price: '+data[key]['cost']+'<p>';
            out+='<img src="'+data[key].image+'">';
            out+='<button class="add-to-cart" data-art="'+key+'">Purchase<button>';
            out+='</div>';
          }
          $('#goods').html(out);
          $('button.add-to-cart').on('click', addToCart);

  });

}

function addToCart() {
  //adding product to cart
  var article = $(this).attr('data-art');
  if (cart[article]!=undefined) {
    cart[article]++;
  }
  else {
    cart[article] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart) );
  //console.log(cart);
  showMiniCart();

}

function checkCart() {
  //checking if anything inside of the cart in local Storage
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse (localStorage.getItem('cart'));
  }
}

function showMiniCart() {
  //shows what is inside of cart
  var out = '';
  for (var w in cart){
      out += w + '---'+cart[w]+'<br>';
  }
  out+='<br><a href="cart">Cart</a>';
  $('#mini-cart').html(out);
}
