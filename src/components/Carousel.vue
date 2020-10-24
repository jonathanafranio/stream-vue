<template>
    <div>
        <VueSlickCarousel v-if="carousel" v-bind="settings">
            <div v-for="(item, index) in allItensCarousel" v-bind:key="index">
                <router-link :to="item.id" :title="item.name">
                    <img :src="item.image" :alt="item.name">
                </router-link>
            </div>
        </VueSlickCarousel>
        <div class="is-block is-center" v-else>
            <span class="icon is-large">
                <i class="fas fa-spinner fa-3x fa-pulse"></i>
            </span>
        </div>
    </div>
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
.is-center
    padding-top: 50px
    text-align: center

</style>