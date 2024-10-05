
<template>
    <div class="recipe-card-content">
        <h1 class="name">Lasagnes</h1>
        <NuxtImg src="~/assets/lasagne.jpg" />
        <div class="data">
            <p>blablablablabla</p>
            <p>blablablablabla</p>
            <p>blablablablabla</p>
            <p>blablablablabla</p>
            <p>blablablablabla</p>
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
