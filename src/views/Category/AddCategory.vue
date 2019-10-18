<template>

    <Layout>

        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Manage Category
                    </h3>
                </div>


                <div class="container-scroller">
                    <Loader v-if="loading" :loading-text="loadingText" :show-full="true"/>

                    <div class="container-fluid page-body-wrapper full-page-wrapper bg-white">

                        <div class="row w-100">
                            <div class="col-md-6 mx-auto">
                                <div class="auth-form-light text-left p-5">
                                    <div class="brand-logo">
                                    </div>
                                    <h4>Hello Admin ! Add Category </h4>
                                    <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                                    <form class="pt-3" @submit.prevent="addCategory">

                                        <div class="form-group">
                                            <label data-error="wrong" data-success="right">Name</label>

                                            <input type="text" class="form-control form-control-lg"

                                                   placeholder="Category Name" v-model="category_name"
                                                   required>
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                                    >Create Category
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Select File</h4>
                                        <input type="file" @change="onFileUpload" class="dropify"/>

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
    import {Category} from "../../services/Category.services";
    import Loader from "../../components/Loader/Loader";
    import Layout from "../../components/Layout";

    export default {
        name: "AddCategory",
        components: {Loader, Layout},
        data: function () {
            return {
                loadingText: '',
                user: this.$store.getters.GET_USER,
               category_name: '',
                category_image: '',
                file: '',
                fileName: '',
                loading: false,
            }
        },
        mounted: function () {
            (function ($) {
                'use strict';
                $('.dropify').dropify();
            })(jQuery);
        },

        methods: {
           async addCategory(){
                this.loadingText = "Creating Category";
                this.loading = true;
                let bodyFormData = new FormData();
                bodyFormData.set('name', this.category_name);
                bodyFormData.set('image', this.category_image);
                await Category.addCategory(bodyFormData).then((res) => {
                    this.$toastr.success(res.message);
                }).catch((error) => {
                    this.$toastr.error(error.error.message, "Oops!", {timeOut: 5000});
                });
               this.loading = false;
            },

            onFileUpload(event) {
                this.category_image = event.target.files[0];
                this.fileName = this.file.name;

            },
        }

    }
</script>

<style scoped>

</style>
