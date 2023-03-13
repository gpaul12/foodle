var drinkIngredientsEl = document.getElementById("drinkIngredients");
var mealIngredientsEl = document.getElementById("mealIngredients");
var getFoodleButton = document.getElementById("get-foodle");
var mealPictureEl = document.getElementById("mealPicture");
var drinkPictureEl = document.getElementById("drinkPicture");
var mealTitle = document.getElementById('meal-title');
var drinkTitle = document.getElementById('drink-title');
var saveButton = document.getElementById('save-button');
var saveButtonModal = document.getElementById('save-foodle-btn');
var clearButton = document.getElementById('clear-button');
var myFoodlesEl = document.getElementById('myFoodles');
var hide = document.getElementById('hide');

var myFoodles = [];
var mealResult;
var drinkResult;  

var modalMealInstructionsEl = document.getElementById('modal-meal-instructions');
var modalMealPicEl = document.getElementById('modal-meal-picture');
var modalDrinkPicEl = document.getElementById('modal-drink-image-container');
var modalMealIngredientsEl = document.getElementById('modal-meal-ingredients');
var modalDrinkIngredientsEl = document.getElementById('modal-drink-ingredients')
var modalTitle = document.getElementById('modal-title');
var modalDrinkTitle = document.getElementById('modal-drink-title');
var modalDrinkInstructionsEl = document.getElementById('modal-drink-instructions');

getFoodleButton.addEventListener("click", function () {
  clearOldFoodle();
  hide.removeAttribute('id', 'hide');
  mealResult = getRandomMeal();
  drinkResult = getRandomDrink();
});

saveButton.addEventListener('click', function() {

  var myFoodle = {
    mealIngredients: mealResult.ingredients,
    mealImg: mealResult.img,
    mealTitle: mealResult.title,
    mealInstructions: mealResult.instructions,
    drinkIngredients: drinkResult.ingredients,
    drinkImg: drinkResult.img,
    drinkTitle: drinkResult.title,
    drinkInstructions: drinkResult.instructions,
  };

  var storedFoodles = JSON.parse(localStorage.getItem("myFoodles"));

  if (storedFoodles !== null) {
    myFoodles = storedFoodles;
  }

  myFoodles.push(myFoodle);
  localStorage.setItem('myFoodles', JSON.stringify(myFoodles));
  renderMyFoodles();
});

saveButtonModal.addEventListener('click', function() {

  var myFoodle = {
    mealIngredients: mealResult.ingredients,
    mealImg: mealResult.img,
    mealTitle: mealResult.title,
    mealInstructions: mealResult.instructions,
    drinkIngredients: drinkResult.ingredients,
    drinkImg: drinkResult.img,
    drinkTitle: drinkResult.title,
    drinkInstructions: drinkResult.instructions,
  };

  var storedFoodles = JSON.parse(localStorage.getItem("myFoodles"));

  if (storedFoodles !== null) {
    myFoodles = storedFoodles;
  }

  myFoodles.push(myFoodle);
  localStorage.setItem('myFoodles', JSON.stringify(myFoodles));
  renderMyFoodles();
});

clearButton.addEventListener('click', function(){
  localStorage.removeItem('myFoodles');
  window.location.reload();
});

function getRandomMeal() {
  var requestRecipe = "https://www.themealdb.com/api/json/v1/1/random.php";
  var meal = {
    ingredients: [],
    measurements: [],
  };

  fetch(requestRecipe).then(function (response) {
    return response.json().then(function (data) {

      meal.img = data.meals[0].strMealThumb;
      meal.title = data.meals[0].strMeal;
      meal.instructions = data.meals[0].strInstructions;

      modalMealPicEl.setAttribute('src', meal.img);
      modalMealInstructionsEl.textContent = meal.instructions;
      modalTitle.textContent = meal.title;
      
      var mealData = data.meals[0];
      for (var key in mealData) {
        if (key.startsWith('strIngredient')) {
          if (!mealData[key]) {
            delete mealData[key];
          } else {
            var singleMealIngredient = mealData[key];
            meal.ingredients.push(singleMealIngredient);
          }
        }
      }

      for (var key in mealData) {
        if (key.startsWith('strMeasure')) {
          if (!mealData[key]) {
            delete mealData[key];
          } else {
            var singleMealMeasurement = mealData[key];
            meal.measurements.push(singleMealMeasurement);
          }
        }
      }

      for (var i = 0; i < meal.ingredients.length; i++) {
        var modalMealIngredientEl = document.createElement("p");
        modalMealIngredientEl.textContent = meal.measurements[i] + ' ' + meal.ingredients[i];
        modalMealIngredientsEl.appendChild(modalMealIngredientEl);
      }
      renderMealIngredients(meal);
    });
  });
  

  return meal;
}

function renderMealIngredients(meal) {

  mealTitle.textContent = meal.title;
  mealPictureEl.setAttribute('src', meal.img);

  for (var i = 0; i < meal.ingredients.length; i++) {
    var mealIngredientEl = document.createElement("p");
    mealIngredientEl.textContent = meal.measurements[i] + ' ' + meal.ingredients[i];
    mealIngredientsEl.appendChild(mealIngredientEl);
  }
}

function getRandomDrink() {
  var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  var drink = {
    ingredients: [],
    measurements: [],
  };

  fetch(requestUrl).then(function (response) {
    return response.json().then(function (data) {

      drink.img = data.drinks[0].strDrinkThumb;
      drink.title = data.drinks[0].strDrink;
      drink.instructions = data.drinks[0].strInstructions;

      drinkTitle.textContent = drink.title;
      modalDrinkTitle.textContent = drink.title;
      modalDrinkPicEl.setAttribute('src', drink.img);
      modalDrinkInstructionsEl.textContent = drink.instructions;

      var drinkData = data.drinks[0];
      for (var key in drinkData) {
        if (key.startsWith('strIngredient')) {
          if (!drinkData[key]) {
            delete drinkData[key];
          } else {
            var singleIngredient = drinkData[key];
            drink.ingredients.push(singleIngredient);
          }
        }
      }

      for (var key in drinkData) {
        if (key.startsWith('strMeasure')) {
          if (!drinkData[key]) {
            delete drinkData[key];
          } else {
            var singleIngredient = drinkData[key];
            drink.measurements.push(singleIngredient);
          }
        }
      }

      for (var i = 0; i < drink.ingredients.length; i++) {
        var modalDrinkIngredientEl = document.createElement("p");
        modalDrinkIngredientEl.textContent = drink.measurements[i] + ' ' + drink.ingredients[i];
        modalDrinkIngredientsEl.appendChild(modalDrinkIngredientEl);
      }

      renderDrinkIngredients(drink);
    });
  });
  return drink;
}

function renderDrinkIngredients(drink) {

  drinkPictureEl.setAttribute('src', drink.img);

  for (var i = 0; i < drink.ingredients.length; i++) {
    var ingredientEl = document.createElement('p');
    ingredientEl.textContent = drink.measurements[i] + ' ' + drink.ingredients[i];
    drinkIngredientsEl.appendChild(ingredientEl);
  }
}
//code for Bulma modal
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});

function renderMyFoodles() {
  var savedFoodles = JSON.parse(localStorage.getItem("myFoodles"));

  if (savedFoodles) {

    for (var i = 0; i < savedFoodles.length; i++) {

      // jamie - rendering saved meal information
      var myFoodlesMealTitle = document.createElement('h2');
      myFoodlesMealTitle.textContent = savedFoodles[i].mealTitle;
      myFoodlesEl.appendChild(myFoodlesMealTitle);

      var myFoodlesMealPic = document.createElement('img');
      myFoodlesMealPic.setAttribute('src', savedFoodles[i].mealImg);
      myFoodlesEl.appendChild(myFoodlesMealPic);

      // jamie - rendering saved drink information
      var myFoodlesDrinkTitle = document.createElement('h2');
      myFoodlesDrinkTitle.textContent = savedFoodles[i].drinkTitle;
      myFoodlesEl.appendChild(myFoodlesDrinkTitle);

      var myFoodlesDrinkPic = document.createElement('img');
      myFoodlesDrinkPic.setAttribute('src', savedFoodles[i].drinkImg);
      myFoodlesEl.appendChild(myFoodlesDrinkPic);
    }
  }
}

renderMyFoodles();

function clearOldFoodle() {
  while (mealIngredientsEl.firstChild) {
    mealIngredientsEl.removeChild(mealIngredientsEl.firstChild);
  }
  while (drinkIngredientsEl.firstChild) {
    drinkIngredientsEl.removeChild(drinkIngredientsEl.firstChild);
  }
}