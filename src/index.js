import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
let currentPage = 1;
const recipesPerPage = 9;

const popularRecipesListRef = document.querySelector('.popular-recipes-list');
const searchCategoriesListRef = document.querySelector(
  '.search-categories-list'
);

searchCategoriesListRef.addEventListener('click', e => {
  e.preventDefault();
  const searchQuery = e.target.value;
  fetchRecipeByCategorie(searchQuery);
});

function fetchRecipeByCategorie(categorie) {
  return axios.get(
    `${BASE_URL}recipes?page=${currentPage}&limit=${recipesPerPage}&category=${categorie}`
  );
}

const allCategoriesBtnRef = document.querySelector('.search-all-categories');
allCategoriesBtnRef.addEventListener('click', e => {
  e.preventDefault();
  fetchAllCategoriesRecipe();
});

function fetchAllCategoriesRecipe() {
  axios.get(`${BASE_URL}recipes?page=${currentPage}&limit=${recipesPerPage}`);
}

fetchPopularRecipes().then(renderPopularRecipes).catch(console.warn);

function fetchPopularRecipes() {
  return axios.get(`${BASE_URL}recipes/popular`);
}

function renderPopularRecipes({ data }) {
  console.log(data);
  const markup = data
    .map(recipe => {
      return `
      <li class="popular-recipes-list-item">
        <img class="popular-recipes-list-item-img" src="${recipe.preview}" alt="Food photo"/>
        <div class="popular-recipes-list-item-info">
          <h2 class="popular-recipes-list-item-title">${recipe.title}</h2>
          <p class="popular-recipes-list-item-description">${recipe.description}</p>
        </div>
      </li>`;
    })
    .join('');

  popularRecipesListRef.insertAdjacentHTML('beforeend', markup);
}

fetchRecipesCategories().then(renderRecipesCategories).catch(console.warn);

function fetchRecipesCategories() {
  return axios.get(`${BASE_URL}categories`);
}

function renderRecipesCategories({ data }) {
  const markup = data
    .map(categorie => {
      return `
      <li class="search-categories-item">
         <button type="submit" class="search-categories-button" value="${categorie.name}">${categorie.name}</button>
      </li>`;
    })
    .join('');

  searchCategoriesListRef.insertAdjacentHTML('beforeend', markup);
}
