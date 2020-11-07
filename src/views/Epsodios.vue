<template>
    <div>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <Breadcrumb :breadcrumb="bread" />
                    <h1 class="title">{{serie.name}}</h1>
                    <h2 class="subtitle">{{temporada.name}}</h2>
                    <div class="level">
                        <div class="level-left">
                            <h3 class="subtitle is-4">{{video.name}}</h3>
                        </div>

                        <div class="level-right">
                            <div class="level-item">                                
                                <div class="field">
                                    <input id="autoplay" type="checkbox" class="switch is-rounded is-info is-rtl" v-model="autoreload">
                                    <label for="autoplay">Reprodução automática</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section is-dark">
            <div class="container is-fullhd">
                <div class="columns is-desktop">
                    
                    <video-player v-if="playerOptions.sources[0].src" class="column is-three-fifths vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true">
                    </video-player>

                    <div class="column prev-wrap">
                        <a
                         v-if="video.navegacao.previous"
                         :href="`/epsodio/${video.navegacao.previous}`"
                         class="has-text-white">
                            <span class="icon is-medium">
                                <i class="fas fa-2x fa-caret-square-left"></i> Anterior
                            </span>
                        </a>
                    </div>

                    <div class="column next-wrap">
                        <a
                         v-if="video.navegacao.next"
                         :href="`/epsodio/${video.navegacao.next}`"
                         class="has-text-white">
                            
                            <span class="icon is-medium">
                                Próximo <i class="fas fa-2x fa-caret-square-right"></i>
                            </span>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
export default {
    name: "Epsodios",
    components: {
        Breadcrumb,
        videoPlayer 
    },
    data() {
        return {
            bread: [
                { link: '/', name: 'Home', icon: 'fas fa-home' }
            ],
            serie: {
                id: '',
                name: ''
            },
            temporada: {
                id: '',
                name: ''
            },
            video: {
                id: this.$route.params.ep_id,
                name: '',
                url: '',
                navegacao: {
                    previous: null,
                    next: null
                }
            },
            autoreload: true,
            playerOptions: {
                height: 450,
                autoplay: false,
                muted: false,
                language: 'pt-br',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: null,
                }]
            }
        }
    },
    methods: {
        async fetctBread() {
            await fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/temporadas?post=${this.video.id}`)
            .then(res => res.json())
            .then(res => {
                this.serie.id = res[0].acf.serie.term_id;
                this.serie.name = res[0].acf.serie.name;

                let serie = {
                    link: `/serie/${res[0].acf.serie.term_id}`,
                    name: res[0].acf.serie.name,
                    icon: 'fas fa-tv'
                };
                this.bread.push(serie);
                
                this.temporada.id = res[0].id;
                this.temporada.name = res[0].name;

                let temporada = {
                    link: `/temporada/${res[0].id}`,
                    name: res[0].name,
                    icon: 'fas fa-film'
                };
                this.bread.push(temporada);
            })
        },
        async fetctVideo(){
            await fetch(`http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/videos/${this.video.id}`)
            .then(res => res.json())
            .then(res => {
                console.log('video',res)
                let prevLink = res.acf.video_anterior;
                let nextLink = res.acf.proximo_video;

                if(prevLink!='') {
                    this.video.navegacao.previous = prevLink[0];
                }
                if(nextLink!='') {
                    this.video.navegacao.next = nextLink[0];
                }
                this.bread.push({
                    link: `/epsodio/${res.id}`,
                    name: res.title.rendered,
                    icon: 'fas fa-play'
                })
                this.video.name = res.title.rendered;
                this.playerOptions.sources[0].src = res.acf.url_video;
                //this.playerOptions.autoplay = true;
                this.video.url = res.acf.url_video;
            });
        }
    },
    created() {
        this.fetctBread();
        this.fetctVideo();
    }
}
</script>

<style lang="sass">
@import '~bulma-switch'

.is-dark
    background: #363636
    color: #fff
.video-js
    width: 100%
    .vjs-big-play-button
        top: 50%
        left: 50%
        transform: translateY(-50%) translateX(-50%)

.prev-wrap,
.next-wrap
    display: flex
    align-items: center
    justify-content: center
    .fas
        margin: 0 10px

.prev-wrap    
    @media screen and (min-width: 1024px)
        order: 1

.video-player
    @media screen and (min-width: 1024px)
        order: 2

.next-wrap
    @media screen and (min-width: 1024px)
        order: 3
</style>