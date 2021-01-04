<template>
    <div>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <Breadcrumb :breadcrumb="bread" />
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
import Breadcrumb from "@/components/Breadcrumb.vue";
import EpisodesList from "@/components/EpisodesList.vue";

export default {
    name: "Temporada",
    components: {
        Breadcrumb,
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
            bread: [
                { link: '/', name: 'Home', icon: 'fas fa-home' }
            ],
            epsodios: [],
            paged: 1
        };
    },
    methods: {
        setPaginator() {
            let paramPage = window.location.pathname;
            if(paramPage.indexOf('page/') > -1) {
                paramPage = +paramPage.split('page/')[1];
                this.paged = paramPage
            }
        },
        async fetchInfoTemporadas(){
            await fetch(`https://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/temporadas/${this.temporada.id}`)
            .then(res => res.json())
            .then(res => {
                this.temporada.name = res.name;
                this.temporada.count = res.count;
                this.temporada.pages = Math.ceil(res.count / 10);
                this.temporada.serie = {
                    id: res.acf.serie.term_id,
                    name: res.acf.serie.name
                }

                this.bread.push({ link: `/serie/${this.temporada.serie.id}`, name: this.temporada.serie.name, icon: 'fas fa-tv' });
                this.bread.push({ link: `/temporada/${this.temporada.id}`, name: this.temporada.name, icon: 'fas fa-film' })
            });
        },
        async fetchVideos(){            
            await fetch(`https://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/videos?temporadas=${this.temporada.id}&order=asc&page=${this.paged}`)
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
        
        //.push({ link: `/temporada/${temporada.id}`, name: temporada.name, icon: 'fas fa-film' })  

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