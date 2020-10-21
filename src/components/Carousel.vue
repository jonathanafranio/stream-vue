<template>
    <VueSlickCarousel v-bind="settings">
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
        <div>
            <router-link v-for="(item, index) in allItensCarousel" v-bind:key="index" :to="item.id" :title="item.name">
                <img :src="item.image" :alt="item.name">
            </router-link>
        </div>
    </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css"; // optional style for arrows & dots
export default {
    components: {
        VueSlickCarousel
    },
    props: {
        carousel: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            settings: {
                slidesToShow: 5,
                slideToScroll: 1,
                //adaptiveHeight: true,
                responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                    slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                    slidesToShow: 3,
                    arrows: false,
                    dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                    slidesToShow: 2,
                    arrows: false,
                    dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                    }
                }
                ]
            }
        }
    },
    computed: {
        allItensCarousel(){
            return this.carousel;
        }
    }
};
</script>

<style lang="sass" scoped>
</style>