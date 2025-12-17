export enum ApiResource {
  ALLERGENS = 'allergens',
  AUTH = 'auth',
  BLOB = 'blob',
  DISH_TYPES = 'dishTypes',
  FOOD_TYPES = 'foodTypes',
  INGREDIENTS = 'ingredients',
  MEAL_TYPES = 'mealTypes',
  RECIPES = 'recipes',
  RECIPES_CATEGORIES = 'recipesCategories',
  SEASONS = 'seasons',
  SEQUENCES = 'sequences',
  UNITS = 'units',
  USTENSILS = 'ustensils',
}

export enum ApiEndpoint {
  ALL = 'all',
  GUEST = 'guest',
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
  SEASONALS = 'seasonals',
  FILTERED = 'filtered',
  SEARCH = 'search',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}
