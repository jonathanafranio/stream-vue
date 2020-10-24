<template>
    <div>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{serie.name}}</h1>
                    <Carousel :carousel="temporadas" />
                </div>
            </div>
        </section>
        <section class="section is-dark">
        <div class="container is-fullhd">
            <div class="columns is-desktop">
            <div class="column">
                <article class="panel is-info">
                    <p class="panel-heading">Episódios</p>
                    <div class="panel-block">
                        <p class="control has-icons-left">
                        <input class="input is-info" type="text" placeholder="Search" />
                        <span class="icon is-left">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div>

                    <!--<a class="panel-block is-active">
                        <span class="panel-icon">
                            <i class="fas fa-film" aria-hidden="true"></i>
                        </span>
                        bulma
                    </a>-->
                    
                    <router-link  to="/caralho" :title="item.name" class="panel-block" v-for="(item, index) in allEpsodios" v-bind:key="index">
                        <span class="panel-icon">
                            <i class="fas fa-film" aria-hidden="true"></i>
                        </span>
                        {{item.name}}
                    </router-link>
                </article>
            </div>
            <div class="column is-two-thirds">
                <p class="bd-notification is-primary">2</p>
            </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";

export default {
    name: "Serie",
    components: {
        Carousel
    },
    data() {
        return {
            serie: {
                id: this.$route.params.serie_id,
                name: '',
                count: 0,
                pages: 0
            },
            temporadas: [],
            epsodios: []
        };
    },
    methods: {
        fetchInfoSerie(){
            fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/series/${this.serie.id}`)
            .then(res => res.json())
            .then(res => {
                this.serie.name = res.name;
                this.serie.count = res.count;
                this.serie.pages = Math.ceil(res.count / 10);
                localStorage.setItem('serieWatch', JSON.stringify(this.serie));                
            });
        }
    },
    created() {
        if(localStorage.getItem('serieWatch')!=null) {
            const storageSerieWatch = JSON.parse(localStorage.getItem('serieWatch'));
            if(this.serie.id == storageSerieWatch.id) {
                this.serie.name = storageSerieWatch.name;
                this.serie.count = storageSerieWatch.count;
                this.serie.pages = Math.ceil(storageSerieWatch.count / 10);
            } else {
                localStorage.clear()
                this.fetchInfoSerie()
            }
        } else {
            this.fetchInfoSerie();
        }


        fetch("http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/temporadas")
        .then(res => res.json())
        .then(res => {
            for (let a = 0; a < res.length; a++) {
                let serieIdParent = res[a].acf.serie.term_id;
                if (serieIdParent == this.serie.id) {
                    let temporada = {
                        image: res[a].acf.imagem,
                        name: res[a].name,
                        id: `/serie/${this.serie.id}/temporada/${res[a].id}`
                    };
                    this.temporadas.unshift(temporada);
                }
            }
        });

        fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/videos?series=${this.serie.id}&order=asc`)
        .then(res => res.json())
        .then(resVideos => {
            const videos = resVideos.map(video => {
                const movie = {
                    id: video.id,
                    name: video.title.rendered,
                    url_video: video.acf.url_video,
                    serie_id: video.series[0],
                    temporada_id: video.temporadas[0]
                }
                return movie
            })
            this.epsodios = videos
            //this.epsodios.unshift(videos)
            //console.log('videos', videos);
        })
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
</style>