<template>
    <nav class="pagination is-centered is-small" role="navigation" aria-label="pagination">
        <a
         v-if="active>1"
         :href="`${pathUrl}/page/${active-1}`"
         class="pagination-previous">
            anterior
        </a>
        <a
         v-if="active<pages"
         :href="`${pathUrl}/page/${active+1}`"
         class="pagination-next">
            próxima
        </a>

        <ul class="pagination-list">
            <li v-for="n in pages" v-bind:key="n">
                <a
                 v-if="n > 1"
                 :href="`${pathUrl}/page/${n}`"
                 class="pagination-link"
                 :class="{'is-current': n === active}">
                    {{ n }}
                </a>
                <a
                 v-else
                 :href="pathUrl"
                 class="pagination-link"
                 :class="{'is-current': n === active}">
                    {{ n }}
                </a>
            </li>
        </ul>

    </nav>
</template>

<script>
    export default {
        props: {
            pages: { type: Number, required: true },
            active: { type: Number, required: true },
        },
        created() {
            let pathName = window.location.pathname
            console.log('indexOf', pathName.indexOf('/page/'))
            pathName.indexOf('/page/') > -1 ? pathName = pathName.split('/page/')[0] : pathName
            console.log('pathName', pathName.split('/page/')[0])
            
            this.pathUrl = pathName

        }
    }
</script>

<style lang="sass" scoped>

</style>