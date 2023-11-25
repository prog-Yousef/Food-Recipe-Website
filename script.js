const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//Event Listeners

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
//Get meal list that matches with the ingredients

/* function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
.then(data => {
    console.log(data);
} );

 } */

async function getMealList() {
    try {
        // Get the value of the input with the id 'search-input' and trim any leading or trailing whitespace
        let searchInputTxt = document.getElementById('search-input').value.trim();

        // Use the fetch function to make a network request to the specified URL
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);

        // Once the request is complete, parse the response as JSON
        const data = await response.json();
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `        <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
            </div>`;
            });
            mealList.classList.remove('notFound');
        } else {
            html = "Sorry, no meals found.";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;

        // Log the data to the console (you might want to perform other actions here)
        console.log(data);
    } catch (error) {
        // Handle any errors that occurred during the fetch or data processing
        console.error('Error:', error);
    }
}

//get Recipe of meal


async function getMealRecipe(e) {
    try {
        e.preventDefault();

        if (e.target.classList.contains('recipe-btn')) {
            let mealItem = e.target.parentElement.parentElement;

            // Assuming you have a 'data-id' attribute on the mealItem element
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
            const data = await response.json();

            // Assuming you have a function named mealRecipeModal
            mealRecipeModal(data.meals);

            // Do something with the data, for example, log it
            console.log(data.meals);
        }
    } catch (error) {
        // Handle any errors that occurred during the fetch or data processing
        console.error('Error:', error);
    }
}

//Create a Modal
async function mealRecipeModal(meal) {
    try {
        console.log(meal);
        meal = meal[0];
        let html = `      <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>instruction:</h3>
            <li>${meal.strInstructions}</li>
            
        
          
            </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="Food">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>`;
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');

        console.log(meal.strInstructions);

    } catch (error) {
        // Handle any errors that occurred during the fetch or data processing
        console.error('Error:', error);
    }
}

