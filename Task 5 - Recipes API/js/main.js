const options = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'];

const controlMenu = document.querySelector('#control-menu');
const menu = document.querySelector('#menu');
const menuList = document.querySelector('#menu ul');

const recipesContainer = document.querySelector('#recipes-container');
const recipeorderBox = document.querySelector('#recipeorder-box');
const closeBtn = document.querySelector('#close-btn');

const recipeorderContainer = document.querySelector('#recipe-order-container');

const searchInput = document.querySelector('.form-control');
const searchButton = document.querySelector('.btn-success');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '' && options.includes(query)) {
        getApi(query);
    } else {
        alert('Warning: The search query does not match any available options.');
    }
});

controlMenu.addEventListener('click', () => {
    if (menu.style.left === '-100%') {
        menu.style.left = '0';
        controlMenu.classList.replace('text-white-50', 'text-white');
    } else {
        menu.style.left = '-100%';
        controlMenu.classList.replace('text-white', 'text-white-50');
    }
});

options.forEach(option => {
    const optionEle = document.createElement('li');
    optionEle.classList.add('py-3', 'ps-3', 'border-bottom', 'fs-3');
    optionEle.setAttribute('id', option);
    optionEle.innerHTML = `<span></span> <p>${option}</p>`;
    menuList.appendChild(optionEle);
});

menuList.addEventListener('click', (e) => {
    if (e.target.innerText !== '') {
        getApi(e.target.innerText);
    }
    menu.style.left = '-100%';
});

const getApi = (query) => {
    console.log('Fetching recipes for:', query);
    const api = new XMLHttpRequest();
    api.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${query}`);
    api.send();
    api.addEventListener('readystatechange', () => {
        if (api.readyState === 4 && api.status === 200) {
            display(JSON.parse(api.response).recipes);
        }
    });
};
getApi('pizza');

const display = (response) => {
    let str = '';

    response.forEach(recipe => {
        str +=
            `<div class="col-md-4">
                <div class="recipe-box make-pointer bg-light shadow-lg border rounded" id="${recipe.recipe_id}">
                    <div class="recipe-img">
                        <img src=${recipe.image_url} class='w-100' alt="">
                    </div>
                    <div class="content px-2">
                        <h3 class="my-3">${recipe.title}</h3>
                        <p>${recipe.publisher}</p>
                    </div>
                </div>
            </div>`;
    });
    recipesContainer.innerHTML = str;
    console.log('Recipes displayed:', response);
};

const getrecipeDecripe = (req) => {
    console.log('Fetching recipe details for ID:', req);
    const api = new XMLHttpRequest();
    api.open('GET', `https://forkify-api.herokuapp.com/api/get?rId=${req}`);
    api.send();
    api.addEventListener('readystatechange', () => {
        if (api.readyState === 4 && api.status === 200) {
            showOrder(JSON.parse(api.response));
        }
    });
};

recipesContainer.addEventListener('click', (e) => {
    const clickedRecipeCard = e.target.closest('.recipe-box');
    if (clickedRecipeCard) {
        const clickedRecipeId = clickedRecipeCard.id;
        console.log('Card clicked, recipe ID:', clickedRecipeId);
        getrecipeDecripe(clickedRecipeId);
        recipeorderContainer.classList.replace('d-none', 'd-flex');
    }
});

closeBtn.addEventListener('click', (e) => {
    recipeorderContainer.classList.replace('d-flex', 'd-none');
});

recipeorderContainer.addEventListener('click', (e) => {
    recipeorderContainer.classList.replace('d-flex', 'd-none');
});

recipeorderBox.addEventListener('click', (e) => {
    e.stopPropagation();
});

const recipeBoxImg = document.querySelector('#recipe-box-img');
const recipeTitle = document.querySelector('#recipe-title');
const recipePuplsher = document.querySelector('#recipe-publisher');
const ingredientsMenu = document.querySelector('#ingredients-menu');

const showOrder = (req) => {
    console.log('Showing order for:', req);
    ingredientsMenu.innerHTML = ''; // Clear previous ingredients
    req.recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerHTML = ingredient;
        li.classList.add('py-3');
        ingredientsMenu.appendChild(li);
    });
    recipeBoxImg.src = req.recipe.image_url;
    recipeTitle.innerText = req.recipe.title;
    recipePuplsher.innerText = req.recipe.publisher;
};
