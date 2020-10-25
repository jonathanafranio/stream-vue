<template>
    <div>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{temporada.serie.name}}</h1>
                    <h2 class="subtitle">{{temporada.name}}</h2>
                </div>
            </div>
        </section>
        <section class="section is-dark">
            <div class="container is-fullhd">
                <div class="columns is-desktop">
                    <div class="column">
                        <EpisodesList
                         :epsodios="allEpsodios"
                         :count="temporada.count"
                         :pagesCount="temporada.pages"
                         :pageActive="paged" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import EpisodesList from "@/components/EpisodesList.vue";

export default {
    name: "Temporada",
    components: {
        EpisodesList
    },

    data() {
        return {
            temporada: {
                id: this.$route.params.temporada_id,
                name: '',
                count: 0,
                pages: 0,
                serie: {
                    id: '',
                    name: ''
                }
            },
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
        async fetchInfoTemporadas(){
            await fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/temporadas/${this.temporada.id}`)
            .then(res => res.json())
            .then(res => {
                this.temporada.name = res.name;
                this.temporada.count = res.count;
                this.temporada.pages = Math.ceil(res.count / 10);
                this.temporada.serie = {
                    id: res.acf.serie.term_id,
                    name: res.acf.serie.name
                }
            });
        },
        async fetchVideos(){            
            await fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/videos?temporadas=${this.temporada.id}&order=asc&page=${this.paged}`)
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
        this.fetchInfoTemporadas();
        this.setPaginator();        
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