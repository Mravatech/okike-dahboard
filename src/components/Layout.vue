<template>
    <div class="container-scroller">
        <v-dialog/>
        <slot name="head"></slot>
        <!-- partial:partials/_navbar.html -->
        <HeaderNav/>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <LeftNav/>
            <!-- partial:partials/_sidebar.html -->
            <slot name="body"></slot>
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
</template>

<script>
    import LeftNav from './Navigation/LeftNav';
    import HeaderNav from './Navigation/HeaderNav';
    import Route from '../router';

    export default {
        name: "Layout",
        components: {LeftNav, HeaderNav},
        async mounted() {
            // Verify the User token is still valid
            let loginValid = await this.$store.dispatch('AUTHORISE_USER', this.$store.getters.GET_AUTH_TOKEN);

            // If login is not valid
            if (!loginValid) {
                this.$store.dispatch("UNSET_USER");
                Route.push({name: 'login'});
            }
        }
    }
</script>

<style scoped>

</style>