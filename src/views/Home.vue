<template>
    <section class="hero home is-dark is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">{{ title }}</h1>
                <Carousel :carousel="series" />
            </div>
        </div>
    </section>
</template>

<script>
import Carousel from "@/components/Carousel.vue";

export default {
    name: "Home",
    components: {
        Carousel
    },
    data() {
        return {
            title: "Escolha uma serie",
            series: []
        };
    },
    created() {
        fetch("https://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/series")
        .then(res => res.json())
        .then(res => {
            let carouselArray = res.map(item => {
                let carouselItem = {
                    image: item.acf.imagem,
                    name: item.name,
                    id: `/serie/${item.id}`
                }

                return carouselItem
            });
            this.series = carouselArray
        });
    },
    computed: {
        allSeries: () => this.series
    }
}
</script>

<style lang="sass" scoped>
.title
    text-align: left
</style>