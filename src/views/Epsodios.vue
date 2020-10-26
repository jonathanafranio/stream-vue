<template>
    <div>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <Breadcrumb :breadcrumb="bread" />
                    <h1 class="title">{{serie.name}}</h1>
                    <h2 class="subtitle">{{temporada.name}} - {{video.name}}</h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
    name: "Epsodios",
    components: {
        Breadcrumb,        
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

<style lang="sass" scoped>

</style>