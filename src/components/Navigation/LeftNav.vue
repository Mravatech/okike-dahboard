<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item nav-profile">
                <a href="#" class="nav-link">
                    <div class="nav-profile-image">
                        <i class="mdi mdi-account-circle mdi-48px"></i>
                        <span class="login-status online"></span> <!--change to offline or busy as needed-->
                    </div>
                    <div class="nav-profile-text d-flex flex-column">
                        <span class="font-weight-bold mb-2">{{user.email}}</span>
                        <span class="text-secondary text-small">Admin</span>

                    </div>
                    <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </a>
            </li>
            <li class="nav-item" v-bind:class="{active : ['dashboard'].includes(currentPage)}">
                <router-link class="nav-link" :to="{name: 'dashboard'}">
                    <span class="menu-title">Dashboard</span>
                    <i class="mdi mdi-home menu-icon"></i>
                </router-link>
            </li>



            <li class="nav-item" v-bind:class="{ active: ['AddAdsContent','ListAds','ListAdsType'].includes(currentPage)}">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-content" aria-expanded="false"
                   aria-controls="ui-content">
                    <span class="menu-title">Manage Category</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-key menu-icon"></i>
                </a>
                <div class="collapse" id="ui-content" style="" v-bind:class="{ show: ['ListPeak','AddAdsContent','ListAds','ListAdsType'].includes(currentPage)}">
                    <ul class="nav flex-column sub-menu">
                         <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddCategory'}"> Create Category</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListCategories'}">List Category</router-link>
                        </li>
                        
                        
                    </ul>
                </div>
            </li>

            <li class="nav-item" v-bind:class="{ active: ['AddAdsContent','AddFood','ListAdsType'].includes(currentPage)}">
                <a class="nav-link collapsed" data-toggle="collapse" href="#food-content" aria-expanded="false"
                   aria-controls="food-content">
                    <span class="menu-title">Manage Foods</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-key menu-icon"></i>
                </a>
                <div class="collapse" id="food-content" style="" v-bind:class="{ show: ['ListPeak','AddAdsContent','ListAds','ListAdsType'].includes(currentPage)}">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddFood'}"> Add Food</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListFood'}">List Food</router-link>
                        </li>


                    </ul>
                </div>
            </li>



            <li class="nav-item" v-bind:class="{ active: ['contentSettings'].includes(currentPage)}">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-settings" aria-expanded="false"
                   aria-controls="ui-settings">
                    <span class="menu-title">Settings</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-key menu-icon"></i>
                </a>
                <div class="collapse" id="ui-settings" style="" v-bind:class="{ show: ['ChangePassword'] .includes(currentPage)}">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ChangePassword'}">Change Password
                            </router-link>
                        </li>
                        <!--<li class="nav-item">-->
                            <!--<router-link class="nav-link" :to="{name: 'addContent'}"-->
                                         <!--v-bind:class="{ active: 'addContent' === currentPage }">Add Content-->
                            <!--</router-link>-->
                        <!--</li>-->
                    </ul>
                </div>
            </li>

            <!--<li class="nav-item" v-bind:class="{ active: 'popUps' === currentPage }">-->
                <!--<a class="nav-link" href="../../pages/ui-features/popups.html">-->
                    <!--<span class="menu-title">Settings</span>-->
                    <!--<i class="mdi mdi-settings menu-icon"></i>-->
                <!--</a>-->
            <!--</li>-->

        </ul>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "LeftNav",
        computed: {
            ...mapGetters({user: "GET_USER"}),
            currentPage() {
                return this.$route.name;
            }
        }
    }
</script>

<style scoped>

</style>
