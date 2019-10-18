<template>
    <Layout>
        <div class="main-panel" slot="body">
            <Loader :loading-text="loadingText" :showFull=true v-if="isLoading"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Reset Password

                    </h3>
                </div>
                <div class="row">
                    <div class="modal-dialog" role="document">
                        <form @submit.prevent="resetPassword()">
                            <div class="modal-content" style="background-color:#FFF">
                                <div class="modal-body "style="width: 500px;mheight: 216px;" >
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="alert alert-danger" role="alert"
                                                 v-if="password1 !== password2 ">
                                                Password does not match.
                                            </div>
                                            <div class="form-group ">
                                                <label data-error="wrong" data-success="right">Password</label>
                                                <input class="form-control validate form-input" ref="channel" type="password"
                                                       v-model="password1">
                                            </div>
                                            <div class="form-group ">
                                                <label data-error="wrong" data-success="right">Password Again</label>
                                                <input class="form-control validate form-input" type="password"
                                                       v-model="password2">
                                            </div>

                                        </div>

                                    </div>
                                    <button class="btn btn-primary btn-block" v-if="password1 === password2">
                                        <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                        Reset Password
                                    </button>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {settings} from "../../services/settings.services";
    import {mapGetters} from "vuex";

    export default {
        name: "ChangePassword",
        components: {Layout},
        data() {
            return {
                loading: true,
                isLoading: false,
                password1: '',
                password2: '',
            }
        },
        computed: {
            ...mapGetters({user: "GET_USER"})
        },
        methods: {
            async resetPassword() {

                this.isLoading = false;
                if (this.password1 !== this.password2) return;

                let bodyFormData = new FormData();

                bodyFormData.set('email', this.user.email);
                bodyFormData.set('client_id', 3);
                bodyFormData.set('password', this.password1);
                bodyFormData.set('password_confirmation', this.password2);
                //bodyFormData.set('email', this.email);

                await settings.changePassword(
                    bodyFormData
                ).then((res) => {
                    this.$toastr.success(res.message, {timeOut: 5000});
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000)

                }).catch((error) => {
                    this.$toastr.error(error.message, "Update Content Partner failed!", {timeOut: 5000});
                });
                this.isLoading = false;
            },
        }
    }
</script>

<style scoped>

</style>
