<template>
  <section class="hero home is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <!--<VueSlickCarousel :arrows="true" :dots="false" :responsive="settings.responsive">-->
        <VueSlickCarousel v-bind="settings">
          <router-link v-for="(serie, index) in allSeries" v-bind:key="index" :to="`/serie/${serie.id}`" :title="serie.name">
            <img :src="serie.image" :alt="serie.name">
          </router-link>
          
        </VueSlickCarousel>
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    VueSlickCarousel
    //HelloWorld
  },
  data(){
    return {
      series: [],
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
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },
  created(){
    fetch('http://psdtohtmlandcss.com.br/stream-vue/wordpress/wp-json/wp/v2/series')
    .then(res => res.json())
    .then(res => {
      let carouselArray = res.map((item) => {
        let carouselItem = {
          image: item.acf.imagem,
          name: item.name,
          id: item.id
        }
        return carouselItem
      });
      this.series = carouselArray;
      //console.log('carouselArray', carouselArray);
    })
  },
  computed: {
      allSeries(){
          return this.series;
      }
  },
};
</script>


<style lang="sass">
.slick-slide
  border: 1px solid red
</style>