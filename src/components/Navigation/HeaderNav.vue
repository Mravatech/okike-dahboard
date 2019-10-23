<template>
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <router-link class="navbar-brand brand-logo" to="dashboard">
                <img src="../../assets/images/okike-favicon.png" alt="logo">
            </router-link>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">
            <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize"
                    @click="toggleSidebar">
                <span class="mdi mdi-menu"></span>
            </button>
            <div class="search-field d-none d-md-block">
                <form class="d-flex align-items-center h-100" action="#">
                    <div class="input-group">
                        <div class="input-group-prepend bg-transparent">
                            <i class="input-group-text border-0 mdi mdi-magnify"></i>
                        </div>
                        <input type="text" class="form-control bg-transparent border-0"
                               placeholder="Search projects">
                    </div>
                </form>
            </div>
            <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown"
                       aria-expanded="false">
                        <div class="nav-profile-text">
                            <p class="mb-1 text-black">{{user.email}}</p>
                        </div>
                    </a>
                    <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-cached mr-2 text-success"></i>
                            Activity Log
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click="logout">
                            <i class="mdi mdi-logout mr-2 text-primary"></i>
                            Signout
                        </a>
                    </div>
                </li>
                <li class="nav-item nav-logout d-none d-lg-block">
                    <a class="nav-link" href="#">
                        <i class="mdi mdi-power"></i>
                    </a>
                </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                <span class="mdi mdi-menu"></span>
            </button>
        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "HeaderNav",
        computed: {
            ...mapGetters({user: "GET_USER"})
        },
        methods:{
             toggleSidebar: function () {
                const body = document.body;

                if ((body.classList.contains('sidebar-toggle-display')) || (body.classList.contains('sidebar-absolute'))) {
                    (!body.classList.contains('sidebar-hidden')) ? body.classList.add('sidebar-hidden') : body.classList.remove('sidebar-hidden')
                } else {
                    (!body.classList.contains('sidebar-icon-only')) ? body.classList.add('sidebar-icon-only') : body.classList.remove('sidebar-icon-only');
                }
            },
            async logout() {
                this.$store.dispatch('UNSET_USER');
                this.isAuth = this.$store.getters.is_AUTHENTICATED;
                this.$router.push('/')
            }
        }

    }
</script>

<style scoped>
    .brand-logo img{
        height: 70px !important;
        width: 145px;
        object-fit: contain;
    }
</style>
