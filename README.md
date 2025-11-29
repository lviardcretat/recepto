<h1 align='center'> Recepto </h1>


<p align='center'>
A solution for storing a large number of recipes and ingredients for daily use (recipe book, weekly recipe management, shopping list).
</p>

<p align='center'>
	<img src="https://img.shields.io/badge/nuxt%20js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Drizzle-%23000000?style=for-the-badge&logo=drizzle&logoColor=C5F74F" /> 
</p>
<p align='center'>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> 
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> 
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> 
	<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" /> 
</p>
<p align='center'>
	<img src="https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" /> 
	<img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" /> 
</p>

## 📦​ Features

The site allows you to :
- Create recipes, ingredients, utensils and other entities.
- Visualize these data in a fast, simple and readable way.
- Filter data according to a wide range of parameters.
- **\[Planned\]** Create a weekly schedule to stay organized.
- **\[Planned\]** Create a shopping list based on your schedule.

## 🛠️​ Local Development

### Setup

You will need [pnpm](https://pnpm.io/installation) installed before you begin.

1. Clone this repository
1. Install the [extensions](https://github.com/lviardcretat/recepto/blob/master/.vscode/extensions.json) needed
1. Install the dependencies `pnpm install --frozen-lockfile`
1. Create the database by following the steps below
1. Run the command : `pnpm run dev`

### Local Database

You will need to set up a local database in order to use the application
1. Create a `.env` file with this variable : `DB_FILE_NAME="file:./local.db"` 
1. Comment and uncomment database config lines following the comments `DB : `
1. Run the command : `pnpm run db:push`
