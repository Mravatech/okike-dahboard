<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                       Update Profile
                    </h3>
                </div>

                <div class="row">
                    <div class="col-md-6 grid-margin stretch-card">
                        <Loader v-if="loading" :show-full="true" :loading-text="loadingText"/>

                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Update Your Profile</h4>
                                <p class="card-description"></p>

                                <div class="row">

                                        <div class="form-group center">
                                            <button @click="request()"
                                                    class="btn btn-block btn-gradient-primary btn-lg  ">Request

                                            </button>
                                        </div>
                                        <div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>


            </div>

    </Layout>
</template>

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {settings} from "../../services/settings.services";
    export default {
        name: "Request",
        components: {Loader, Layout},
        data: function () {
            return {
                loading: false,
                loadingText: "please wait...",
                user: {},
            }
        },
        created() {
             this.currentUser();
        },
        methods: {
            currentUser(){
                this.user = this.$store.getters.GET_USER;
            },
           async request(){
                this.loading = true;
                await settings.dedicatedChannel()
                    .then((res) => {
                        this.loading = false;
                        this.$toastr.success(res.message, "Successfully!", {timeOut: 5000});
                       console.log(res);
                    }).catch((err) =>{
                        this.loading = false;
                        err.error.message.forEach((val, index) => {
                            this.$toastr.error(val, "Unable to send Request!", {timeOut: 5000});
                        });
                    });
            }
        }
    }
</script>

<style scoped>

</style>
