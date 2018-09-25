page('/', index);
page('/product/:productId', product);
page();

function index() {
  
}

function product(ctx) {
  console.log(ctx.params.productId);
}