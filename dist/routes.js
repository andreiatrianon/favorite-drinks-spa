$(document).ready(() => {
  page('/', index);
  page('/:categoryName', getRecipesList);
  page('/product/:productId', product);
  page();
  
});


function index() {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  let success = getCategories;
  requestAPI(url, success);
}

function requestAPI(url, success) {
  $.ajax({
    type: 'GET',
    url,
    success,
    error: erro
  });
}

function getCategories(data) {
  mainTemplateDefault('categories', 'Choose a Category');
  getEachCategory(data);

}

function mainTemplateDefault(id, title) {
  $('main').html(`
  <div class="container">
    <div class="section">
      <div class="row">
        <div class="col s12">                    
          <div id="${id}" class="section">
            <div class="col s12">
              <span class="title">${title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `);
}

function getEachCategory(data) {
  data['drinks'].map(el => 
    $('#categories').append(`
      <div class="col s12 m6 l4">                            
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <a href="${Object.values(el)[0]}">
              <img width="305" height="229" src="https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-305x229.jpg" class="responsive-img wp-post-image" alt="Noble Café" title="Noble Café" srcset="https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-305x229.jpg 305w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-300x225.jpg 300w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-768x576.jpg 768w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c.jpg 800w" sizes="(max-width: 305px) 100vw, 305px" />
              <span class="card-title home">${Object.values(el)[0]}</span>
            </a>
          </div>
        </div>
      </div>
    `)
  );
}

async function getRecipesList(ctx) {
  let thisCategory = ctx.params.categoryName;
  mainTemplateDefault('recipes-list', thisCategory);
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + thisCategory.replace(' ','_');
  let success = getEachRecipe;
  requestAPI(url, success);
}

function getEachRecipe(data) {
  data['drinks'].map(el =>
    $('#recipes-list').append(`
      <div class="col s12 m6 l4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <a href="https://adbeus.com/chicago/ugly-mug-cafe/">
            <img width="305" height="229" src="https://adbeus.com/wp-content/uploads/2016/11/acymngxbxu87xroakfoi-305x542.jpg" class="responsive-img wp-post-image" alt="Ugly Mug Cafe" title="Ugly Mug Cafe" srcset="https://adbeus.com/wp-content/uploads/2016/11/acymngxbxu87xroakfoi-305x542.jpg 305w, https://adbeus.com/wp-content/uploads/2016/11/acymngxbxu87xroakfoi-169x300.jpg 169w, https://adbeus.com/wp-content/uploads/2016/11/acymngxbxu87xroakfoi.jpg 405w" sizes="(max-width: 305px) 100vw, 305px" />    </a>
          </div>
          <div class="card-content">
            <p class="area"><a href="https://adbeus.com/coffee/chicago/">Chicago</a></p>
            <a href="https://adbeus.com/chicago/ugly-mug-cafe/" data-deeplink="adbeus://ugly-mug-cafe"><span class="card-title activator brown-text text-darken-4">Ugly Mug Cafe</span></a>
          </div>
        </div>
      </div>
    `)
  );
  console.log(data)
}

function erro() {
  console.log(error);
}

function product(ctx) {
  console.log(ctx.params.productId);
}