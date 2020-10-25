<template>
    <nav class="breadcrumb is-small pt-2 pb-2 has-text-white-ter" aria-label="breadcrumbs">
        <ul>
            <li v-for="(item, index) in breadcrumb" v-bind:key="index">
                <router-link :to="item.link" class="has-text-white">
                    <span class="icon is-small" v-if="item.icon">
                        <i :class="item.icon" aria-hidden="true"></i>
                    </span>
                    <span>{{item.name}}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            breadcrumb: { type: Array }
        }
    }
</script>

<style lang="sass" scoped>
.breadcrumb
    border-bottom: 1px solid #fff
</style>