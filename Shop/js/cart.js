var cart={}; //cart

$.getJSON('goods.json',function(data){
  var goods = data; //all products in array
  //console.log(goods);
  checkCart();
  //console.log(cart);
  showCart(); //showing products on site

  function showCart(){
    if ($.isEmptyObject(cart)) {
      //cart is empty
      var out = 'Cart is empty. Add products into the cart <a href="/Shop">Main page</a>';
      $('#my-cart').html(out);
    }
    else {

    var out='';
    for (var key in cart){
      out += '<button class="delete" data-art="'+key+'">x</button>';
      out += '<img src="'+goods[key].image+'" width="48">';
      out += goods[key].name;
      out += '<button class="minus" data-art="'+key+'">-</button>';
      out += cart[key];
      out += '<button class="plus" data-art="'+key+'">+</button>';
      out += cart[key]*goods[key].cost;
      out += '<br>';
    }
    $('#my-cart').html(out);
    $('.plus').on('click', plusGoods);
    $('.minus').on('click', minusGoods);
    $('.delete').on('click', deleteGoods);
    }
  }

  function plusGoods(){
    var article = $(this).attr('data-art');
    cart[article]++;
    saveCartToLS();
    showCart();
  }

  function minusGoods(){
    var article = $(this).attr('data-art');
    if (cart[article]>1) {
      cart[article]--;
    }
    else  {
    delete cart[article];

  }
  saveCartToLS();//saving cart to Local Storage
  showCart();
  }

  function deleteGoods(){
    var article = $(this).attr('data-art');
    delete cart[article];
    saveCartToLS();//saving cart to Local Storage
    showCart();
  }

});

function checkCart() {
  //checking if anything inside of the cart in local Storage
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse (localStorage.getItem('cart'));
  }
}
function saveCartToLS(){
  localStorage.setItem('cart', JSON.stringify(cart) );
}//saving Cart to Local Storage
