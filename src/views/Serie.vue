<template>
    <section class="hero home is-dark is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">serie do Id: {{serieId}}</h1>
                <!--<Carousel :carousel="series" />-->
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Serie",
        data(){
            return {
                serieId: this.$route.params.serie_id, 
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>