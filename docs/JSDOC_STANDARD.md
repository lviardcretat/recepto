# JSDoc Documentation Standard

This document defines the JSDoc documentation standard for the Recepto project.

## General Principles

- **Language**: English (consistent with the codebase)
- **Detail level**: Mixed (concise for simple utilities, detailed for complex functions)
- **Required tags**: `@param`, `@returns`
- **Conditional tags**: `@throws` (when errors can be thrown), `@template` (for generics)

---

## Templates by Function Type

### 1. Simple Utility Function

Use for functions with 1-2 lines of logic and straightforward behavior.

```typescript
/**
 * Brief description of what the function does.
 * @param paramName - Description of the parameter
 * @returns Description of the return value
 */
```

**Example:**
```typescript
/**
 * Converts the first letter of a string to uppercase.
 * @param str - The string to transform
 * @returns The string with its first letter capitalized
 */
function firstLetterUppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

---

### 2. Complex Function / Business Logic

Use for functions with significant logic, multiple conditions, or business rules.

```typescript
/**
 * Detailed description of what the function does.
 * Explains the context, behavior, and any important details.
 *
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of the return value and its structure
 * @throws {ErrorType} When and why this error occurs
 */
```

**Example:**
```typescript
/**
 * Retrieves filtered recipes from the database based on multiple criteria.
 * Applies filters for ingredients, allergens, meal types, dish types, and utensils.
 * Returns paginated results with optional sorting.
 *
 * @param filters - Object containing all filter criteria
 * @param pagination - Pagination options (page, limit)
 * @returns Array of recipes matching the filters with total count
 * @throws {DatabaseError} When the database query fails
 */
async function getRecipesFiltered(
  filters: RecipeFilters,
  pagination: Pagination
): Promise<PaginatedRecipes> {
  // Implementation
}
```

---

### 3. Database Function (CRUD)

Use for functions that interact directly with the database.

**Pattern:** `[Action] a [entity] [details if needed].`

```typescript
/**
 * [Action] a [entity] [details if needed].
 *
 * @param id - The unique identifier of the entity
 * @param data - The data to insert/update
 * @returns The created/updated/deleted entity or void
 * @throws {NotFoundError} When the entity does not exist
 * @throws {DatabaseError} When the operation fails
 */
```

**Examples:**

```typescript
/**
 * Creates a new recipe in the database.
 *
 * @param data - The recipe data to insert
 * @returns The newly created recipe with its generated ID
 * @throws {DatabaseError} When the insertion fails
 */
async function postRecipe(data: InsertRecipe): Promise<SelectRecipe> {
  // Implementation
}

/**
 * Retrieves a recipe by its ID.
 *
 * @param id - The unique identifier of the recipe
 * @returns The recipe if found, null otherwise
 */
async function getRecipeById(id: number): Promise<SelectRecipe | null> {
  // Implementation
}

/**
 * Updates a recipe with new data.
 *
 * @param id - The unique identifier of the recipe to update
 * @param data - The partial recipe data to update
 * @returns The updated recipe
 * @throws {NotFoundError} When no recipe exists with the given ID
 */
async function putRecipe(id: number, data: Partial<InsertRecipe>): Promise<SelectRecipe> {
  // Implementation
}

/**
 * Deletes a recipe by its ID.
 *
 * @param id - The unique identifier of the recipe to delete
 * @throws {NotFoundError} When no recipe exists with the given ID
 * @throws {DatabaseError} When the deletion fails
 */
async function deleteRecipe(id: number): Promise<void> {
  // Implementation
}
```

---

### 4. Vue Composable

Use for Vue composition functions that provide reactive state and methods.

```typescript
/**
 * Description of what the composable provides.
 * Explains the reactive state and methods returned.
 *
 * @returns Object containing reactive state and methods
 */
```

**Example:**
```typescript
/**
 * Provides reactive state and methods for managing recipe filters.
 * Handles ingredient, allergen, meal type, dish type, and utensil selections.
 *
 * @returns Object with filter state, setters, and reset method
 */
function useFilter() {
  // Implementation
  return {
    filters,
    setIngredients,
    setAllergens,
    reset
  }
}
```

---

### 5. API Request Composable

Use for composables that handle API requests.

```typescript
/**
 * Description of the API operation.
 *
 * @template T - Description of the generic type if applicable
 * @param params - Request parameters
 * @param options - Optional fetch options
 * @returns Promise with the response data
 * @throws {ApiError} When the request fails
 */
```

**Example:**
```typescript
/**
 * Fetches all ingredients from the API with SSR support.
 * Results are cached for subsequent requests.
 *
 * @template T - The transformed data type
 * @param options - Optional transform and default value options
 * @returns Async data with ingredients array
 */
function useIngredientsSSR<T>(options?: UseAsyncDataOptions<T>): AsyncData<T> {
  // Implementation
}
```

---

### 6. Generic Function

Use for functions with type parameters.

```typescript
/**
 * Description of the generic function.
 *
 * @template T - Description of what T represents
 * @template U - Description of what U represents (if multiple)
 * @param param - Parameter description
 * @returns Return description
 */
```

**Example:**
```typescript
/**
 * Converts a query parameter to a number with type safety.
 *
 * @template T - The expected return type (number or undefined)
 * @param value - The query parameter value to convert
 * @returns The converted number or undefined if invalid
 */
function queryToNumber<T extends number | undefined>(value: unknown): T {
  // Implementation
}
```

---

### 7. Type Guard

Use for functions that narrow types.

```typescript
/**
 * Type guard that checks if [condition].
 *
 * @param value - The value to check
 * @returns True if the value is of type X, false otherwise
 */
```

**Example:**
```typescript
/**
 * Type guard that checks if a value is a non-null object.
 *
 * @param value - The value to check
 * @returns True if value is an object and not null
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
```

---

## Writing Guidelines

### Description

| Complexity | Style |
|------------|-------|
| Simple (1-2 lines of code) | One concise sentence |
| Medium (simple business logic) | 1-2 descriptive sentences |
| Complex (filters, queries) | Description + context + behavior |

### Parameters (`@param`)

- Always use the format: `@param name - Description`
- Start the description with a capital letter
- Do not end with a period (except for multiple sentences)
- For complex objects: describe the structure or reference the type

**Good:**
```typescript
/**
 * @param id - The unique identifier of the recipe
 * @param filters - Object containing ingredient IDs and allergen IDs to filter by
 */
```

**Bad:**
```typescript
/**
 * @param id the id.
 * @param filters filters
 */
```

### Returns (`@returns`)

- Describe what is returned, not how
- For `void`: omit `@returns` or use `@returns Nothing`
- For Promises: describe the resolved value

**Good:**
```typescript
/**
 * @returns The recipe with all related data, or null if not found
 */
```

**Bad:**
```typescript
/**
 * @returns Returns the result of the database query
 */
```

### Errors (`@throws`)

- Format: `@throws {ErrorType} Description`
- Only document explicitly thrown errors
- Include the condition that triggers the error

**Good:**
```typescript
/**
 * @throws {NotFoundError} When no recipe exists with the given ID
 * @throws {ValidationError} When the provided data is invalid
 */
```

---

## Quick Reference

| Function Type | Tags to Use |
|---------------|-------------|
| Simple utility | `@param`, `@returns` |
| Complex/Business | `@param`, `@returns`, `@throws` |
| Database CRUD | `@param`, `@returns`, `@throws` |
| Vue composable | `@returns` |
| API composable | `@template`, `@param`, `@returns`, `@throws` |
| Generic function | `@template`, `@param`, `@returns` |
| Type guard | `@param`, `@returns` |

---

*Last updated: January 2026*
