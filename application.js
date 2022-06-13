// Updates EACH ITEM Price/Quantity 
var updateItemPrice = function (ele) {
  
  var itemQuantity = (parseFloat($(ele).find('.quantity input').val()) || 0);
  var itemPrice = (parseFloat($(ele).find('.pricePerItem input').val()) || 0);

  var itemTotal = itemQuantity * itemPrice;
  $(ele).children('.totalItemPrice').html('$' + itemTotal);

  return itemTotal;
};


//Updates Item Price when DOM is loaded
$(document).ready(function () {
  $('tbody tr').each(function (i, ele) {
    var itemTotal = updateItemPrice(ele);
  });

  // Adds all item total cost
  var sum = function (acc, x) { return acc + x; };
  
  // updates Total Items cost in an array
  var updateCartItemsTotal = function () {
    var cartItemsTotal = [];

  // pushes item price into total cost array
  $('tbody tr').each(function (i, ele) {
    var itemTotal = updateItemPrice(ele);
    cartItemsTotal.push(itemTotal);
  });

  // creates function to show totalCartPrice
  var cartTotal = cartItemsTotal.reduce(sum);
  $('#totalCartPrice').html(cartTotal);
  };

  // calls function previously created
  $(document).ready(function () {
    updateCartItemsTotal();

    // removes item via remove button
    $(document).on('click', '.remove', function () {
      $(this).closest('tr').remove();
      updateCartItemsTotal();
    });

    // to reduce calculations in browser, this function tells the browser
    // to calculate only 1000 ms after the user stops typing.
    var timeout;
    $(document).on('input', 'tr input', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        updateCartItemsTotal();
      }, 1000);
    });

    // places user added items into table
    $('#addItem').on('submit', function (event) {
      event.preventDefault();
      var name = $(this).children('[name=item]').val();
      var price = ($(this).children('[name=price]').val() || 0);
      var quantity = ($(this).children('[name=quantity]').val() || 0);

      // places above items at the end of the HTML table element w/ append.
      $('tbody').append('<tr>' +
      '<td class="item text-center">' + name + '</td>' +
      '<td class="pricePerItem text-center"><input type="number" class="text-center" value="' + price + '" /></td>' +
      '<td class="quantity text-center"><input type="number" class="text-center" value="' + quantity + '" /></td>' +
      '<td class="totalItemPrice text-center"></td>' +
      '<td><button class="btn btn-danger btn-sm remove">Remove</button></td>' +
      '</tr>');

      updateCartItemsTotal();
      $(this).children('[name=item]').val('');
      $(this).children('[name=price]').val('');
      $(this).children('[name=quantity]').val('');
    });
  });
});