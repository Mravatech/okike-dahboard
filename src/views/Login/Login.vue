<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <Loader v-if="loading" :show-full="true" :loading-text='getMessage'/>

            <div class="content-wrapper d-flex align-items-center auth">
                <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 class="font-weight-light">Sign in to continue.</h6>
                            <form class="pt-3" @submit.prevent="login">
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                                           v-model="email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg"
                                           id="exampleInputPassword1" v-model="password" placeholder="Password">
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn btn-rounded">
                                        SIGN IN
                                    </button>
                                </div>
                                <div  class="text-center mt-4 font-weight-light">
                                    Don't have an account? <router-link  :to="{name: 'register'}" class="text-primary">Create</router-link>
                                </div>

                            </form>
                        </div>
                    </div>
                      <!-- <div class="text-center mt-4 font-weight-light">
                             Already have an account? <router-link to="login" class="text-primary">Login</router-link>
                    </div> -->
                    
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import {mapActions} from 'vuex';
    import router from '../../router'

    export default {
        name: 'Login',
        components: {Loader},
        data: function () {
            return {
                email: '', password: '', client_id: '', loading: false,
                random: [
                    'ok', 'fish', 'rat'
                ]
            }
        },
        computed: {
            getMessage: function () {
                var s = Math.floor(Math.random() * Math.floor(5));
                var dd=['ok', 'fish', 'rat', 'rug'];

                return dd[s];
            }
        },
        methods: {
            ...mapActions({loginUser: 'LOGIN'}),
            async login() {
                this.loading = true;
                await this.loginUser({
                    email: this.email,
                    password: this.password,
                    client_id: 3,
                }).then(function () {
                    router.push({name: 'dashboard'});
                }).catch((error) => {
                    if(error.message){
                        this.$toastr.error(error.message, "Login Failed!", {timeOut: 5000});
                    }else if(error.error.message){
                        this.$toastr.error(error.error.message, "Login Failed!", {timeOut: 5000});

                    }
                });
                this.loading = false;
            }
        }
    }
</script>
<style scoped>
    .content-wrapper {
        background: #000000;
    }

    .auth .auth-form-light {
        border-radius: 20px;
         background: #101010; 
    }

    h4, h6 {
        color: white;
    }

    .auth form .form-group .form-control {
        border-radius: 30px;
        color: white;
    }
    .font-weight-light{
        color:white
    }
</style>
