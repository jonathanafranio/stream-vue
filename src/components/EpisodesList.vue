<template>
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

        <template v-if="allEpsodios.length">
            <router-link
            v-for="(item, index) in allEpsodios"
            :to="`/serie/${item.serie_id}/temporada/${item.temporada_id}/epsodio/${item.id}`"
            :title="item.name" class="panel-block"
            v-bind:key="index">
                <span class="panel-icon">
                    <i class="fas fa-film" aria-hidden="true"></i>
                </span>
                {{item.name}}
            </router-link>
        </template>
        <div class="panel-block is-loading" v-else>
            <span class="icon is-large mt-1 mb-1">
                <i class="fas fa-spinner fa-3x fa-pulse"></i>
            </span>
        </div>

        <div class="panel-block mt-1" v-if="this.count>10">
            <Paginate :pages="pagesCount" :active="pageActive" />
        </div>
    </article>
</template>

<script>
    import Paginate from "./Paginate.vue";
    export default {
        components: {
            Paginate
        },
        props: {
            epsodios: { type: Array, default: () => [] },
            count: { type: Number, required: true },
            pagesCount: { type: Number, default: () => 1 },
            pageActive: { type: Number, default: () => 1 }            
        },
        
        computed: {
            allEpsodios() {
                return this.epsodios;
            }
        }
    }
</script>

<style lang="sass" scoped>
.is-loading
    text-align: center
    justify-content: center
</style>