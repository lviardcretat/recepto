<template>
    <div class="alternative-recipes-selection-content">
        <swiper-container slides-per-view="auto" loop="false" effect="coverflow" grabcursor="true" centered-slides="true"
        coverflow-effect-rotate="0" coverflow-effect-stretch="0" coverflow-effect-depth="150" coverflow-effect-modifier="2.5"
        coverflow-effect-slide-shadows="false" mousewheel="true">
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
            <swiper-slide lazy="true"><RecipeCard/></swiper-slide>
        </swiper-container>
    </div>
</template>

<script>
import { register } from 'swiper/element/bundle';
register();
</script>

<style lang="scss">
    .alternative-recipes-selection-content {
        height: 100vh;
        width: 70vw;
        display: flex;
        flex-direction: column;
        justify-content: center;

        swiper-container {
            width: 100%;
            height: 80%;

            swiper-slide {
                width: 40%;
                height: 100%;
            }
        }
    }
</style>