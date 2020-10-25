<template>
    <div>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <Breadcrumb :breadcrumb="bread" />
                    <h1 class="title">{{serie.name}}</h1>
                    <Carousel :carousel="temporadas" />
                </div>
            </div>
        </section>
        <section class="section is-dark">
            <div class="container is-fullhd">
                <div class="columns is-desktop">
                    <div class="column">
                        <EpisodesList
                         :epsodios="epsodios"
                         :count="serie.count"
                         :pagesCount="serie.pages"
                         :pageActive="paged" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Carousel from "@/components/Carousel.vue";
import EpisodesList from "@/components/EpisodesList.vue";

export default {
    name: "Serie",
    components: {
        Breadcrumb,
        Carousel,
        EpisodesList
    },
    data() {
        return {
            serie: {
                id: this.$route.params.serie_id,
                name: '',
                count: 0,
                pages: 0
            },
            bread: [
                { link: '/', name: 'Home', icon: 'fas fa-home' }
            ],
            temporadas: [],
            epsodios: [],
            paged: 1
        };
    },
    methods: {
        setPaginator() {
            let paramsGet = window.location.search;
            if(paramsGet.indexOf('?page') > -1) {
                paramsGet = +paramsGet.split('=')[1];
                this.paged = paramsGet
            }
        },
        async fetchInfoSerie(){
            await fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/series/${this.serie.id}`)
            .then(res => res.json())
            .then(res => {
                this.serie.name = res.name;
                this.serie.count = res.count;
                this.serie.pages = Math.ceil(res.count / 10);

                this.bread.push({ link: `/serie/${this.serie.id}`, name: this.serie.name, icon: 'fas fa-tv' });
            });
        },
        async fetchTemporadas() {
            await fetch("http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/temporadas")
            .then(res => res.json())
            .then(res => {
                for (let a = 0; a < res.length; a++) {
                    let serieIdParent = res[a].acf.serie.term_id;
                    if (serieIdParent == this.serie.id) {
                        let temporada = {
                            image: res[a].acf.imagem,
                            name: res[a].name,
                            id: `/temporada/${res[a].id}`
                        };
                        this.temporadas.unshift(temporada);
                    }
                }
            });
        },
        async fetchVideos(){            
            await fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/videos?series=${this.serie.id}&order=asc&page=${this.paged}`)
            .then(res => res.json())
            .then(resVideos => {
                const videos = resVideos.map(video => {
                    const movie = {
                        id: video.id,
                        name: video.title.rendered,
                        //url_video: video.acf.url_video,
                        serie_id: video.series[0],
                        temporada_id: video.temporadas[0]
                    }
                    return movie
                })
                this.epsodios = videos
            })
        }
    },
    created() {
        this.fetchInfoSerie();
        this.setPaginator();
        
        this.fetchTemporadas();
        this.fetchVideos();
        

    },
    computed: {
        allEpsodios(){
            return this.epsodios;
        }
    }
}
</script>

<style lang="sass">
.is-dark
    background: #363636
    color: #fff

.panel
    background-color: #fff

.pagination
    width: 100%
    text-transform: uppercase
</style>