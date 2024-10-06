
<script setup lang="ts">
const name: string = defineModel('name');
const preparationTime: Date = defineModel('preparationTime');
const description: string = defineModel('description');
</script>

<template>
    <div class="recipe-card-content">
        <h1 class="name">{{ name }}</h1>
        <img src="~/assets/img/lasagnes.jpg" />
        <div class="data">
            <p>{{ preparationTime }}</p>
            <p>{{ description }}</p>
        </div>
        <button type="button">X</button>
    </div>
</template>

<style lang="scss">
    .recipe-card-content {
        width: 100%;
        height: 100%;
        background-color: antiquewhite;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        img {
            height: 20%;
            width: 100%;
            background-size: contain;
        }
    }
</style>
