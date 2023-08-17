import axios from 'axios';

// Constants for axios
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const currentPage = 1;
const recipesPerPage = 9;

// DOM Elements
const popularRecipesListRef = document.querySelector('.popular-recipes-list');
const searchCategoriesListRef = document.querySelector(
  '.search-categories-list'
);
const allCategoriesBtnRef = document.querySelector(
  '.search-all-categories-btn'
);
const recipeGalleryListRef = document.querySelector('.recipe-gallery-list');

// Event Listeners
searchCategoriesListRef.addEventListener('click', handleCategoryClick);
allCategoriesBtnRef.addEventListener('click', handleAllCategoriesClick);

// Event Handlers
function handleCategoryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const searchQuery = event.target.value;
  fetchRecipeByCategory(searchQuery);
}

function handleAllCategoriesClick(event) {
  event.preventDefault();
  fetchAllCategoriesRecipe();
}

// Fetching Functions
function fetchRecipeByCategory(category) {
  return axios.get(
    `${BASE_URL}recipes?page=${currentPage}&limit=${recipesPerPage}&category=${category}`
  );
}

function fetchAllCategoriesRecipe() {
  return axios.get(
    `${BASE_URL}recipes?page=${currentPage}&limit=${recipesPerPage}`
  );
}

function fetchPopularRecipes() {
  return axios.get(`${BASE_URL}recipes/popular`);
}

function fetchRecipesCategories() {
  return axios.get(`${BASE_URL}categories`);
}

// Rendering Functions

function renderGalleryMarkup({ data }) {
  const markup = data.results
    .map(recipe => {
      return `<li><div class="gallery-list-item"></div></li>`;
    })
    .join('');

  recipeGalleryListRef.insertAdjacentHTML('beforeend', markup);
}

function renderPopularRecipes({ data }) {
  const markup = data
    .map(
      recipe => `
      <li class="popular-recipes-list-item">
        <img class="popular-recipes-list-item-img" src="${
          recipe.preview
        }" alt="Food photo"/>
        <div class="popular-recipes-list-item-info">
          <h2 class="popular-recipes-list-item-title">${
            recipe.title.length <= 14
              ? recipe.title
              : recipe.title.slice(0, 14) + '...'
          }</h2>
          <p class="popular-recipes-list-item-description">${
            recipe.description.length <= 80
              ? recipe.description
              : recipe.description.slice(0, 80) + '...'
          }</p>
        </div>
      </li>
    `
    )
    .join('');

  popularRecipesListRef.insertAdjacentHTML('beforeend', markup);
}

function renderRecipesCategories({ data }) {
  const markup = data
    .map(
      category => `
      <li class="search-categories-item">
        <button type="submit" class="search-categories-button" value="${category.name}">${category.name}</button>
      </li>
    `
    )
    .join('');

  searchCategoriesListRef.insertAdjacentHTML('beforeend', markup);
}

// Initialization
fetchPopularRecipes().then(renderPopularRecipes).catch(console.warn);

fetchRecipesCategories().then(renderRecipesCategories).catch(console.warn);

fetchAllCategoriesRecipe().then(renderGalleryMarkup);
