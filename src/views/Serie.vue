<template>
    <section class="hero home is-dark is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">serie do Id: {{serieId}}</h1>
                <Carousel :carousel="temporadas" />
            </div>
        </div>
    </section>
</template>

<script>
    import Carousel from "@/components/Carousel.vue";
    
    export default {
        name: "Serie",
        components: {
            Carousel
        },
        data(){
            return {
                serieId: this.$route.params.serie_id,
                temporadas: []
            }
        },
        created() {
            fetch('http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/temporadas')
            .then(res => res.json())
            .then(res => {
                for (let a = 0; a < res.length; a++) {
                    let serieIdParent = res[a].acf.serie;
                    if(serieIdParent == this.serieId) {
                        let temporada = {
                            image: res[a].acf.imagem,
                            name: res[a].name,
                            id: `/serie/${this.serieId}/temporada/${res[a].id}`
                        }
                        this.temporadas.unshift(temporada)
                    }                    
                }                
            })
        }
    }
</script>

<style lang="sass" scoped>

</style>