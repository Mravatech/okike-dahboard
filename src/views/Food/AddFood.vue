<template>
    <Layout>

        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Manage Food
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
                                    <h4>Hello Admin ! Add Food </h4>
                                    <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                                    <form class="pt-3" @submit.prevent="addFood">

                                        <div class="form-group">
                                            <label data-error="wrong" data-success="right">Category</label>

                                            <select v-model="category_id" class="form-control" v-if="categories.length > 0">
                                                <option v-for="cat in categories" :key="cat.uuid" :value="cat.uuid"> {{ cat.name }}</option>
                                            </select>
                                        </div>

                                        <br/>


                                        <div class="form-group">
                                            <label data-error="wrong" data-success="right">Name</label>

                                            <input type="text" class="form-control form-control-lg"

                                                   placeholder="Food Name" v-model="food_name"
                                                   required>
                                        </div>

                                        <div class="form-group">
                                            <label data-error="wrong" data-success="right">Description</label>

                                            <textarea  class="form-control form-control-lg"

                                                   placeholder="Food Description" v-model="food_description"
                                                   required>
                                            </textarea>
                                        </div>

                                        <div class="form-group">
                                            <label data-error="wrong" data-success="right">Price</label>

                                            <input type="number" class="form-control form-control-lg"

                                                   placeholder="Food Name" v-model="food_price"
                                                   required>
                                        </div>


                                        <div class="mt-3">
                                            <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            >Add Food
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
    import {Category as Food} from "../../services/Food.services";

    export default {
        name: "AddFood",
        components: {Loader, Layout},
        data: function () {
            return {
                loadingText: '',
                user: this.$store.getters.GET_USER,
                category_id: '',
                file: '',
                fileName: '',
                loading: false,
                categories: [],
                food_name: '',
                food_description: '',
                food_price: '',
                food_image: ''

            }
        },
        async created() {
            await this.fetchCategories();
        },
        mounted: function () {
            (function ($) {
                'use strict';
                $('.dropify').dropify();
            })(jQuery);
        },
        methods: {
            fetchCategories(){
                Category.listCategory().then((response) => {
                    console.log(response);
                    this.categories = response.data;
                }).catch(() => {

                });
            },
            async addFood(){
                this.loadingText = "Adding Food";
                this.loading = true;
                let bodyFormData = new FormData();
                bodyFormData.set('name', this.food_name);
                bodyFormData.set('description', this.food_description);
                bodyFormData.set('price', this.food_price);
                bodyFormData.set('category_id', this.category_id);
                bodyFormData.set('image', this.food_image);
                await Food.addFood(bodyFormData).then((res) => {
                    this.$toastr.success(res.message);
                    this.$router.push('/')

                }).catch((error) => {
                    this.$toastr.error(error.error.message, "Oops!", {timeOut: 5000});
                    this.loading = false;
                });
                this.loading = false;
            },

            onFileUpload(event) {
                this.food_image = event.target.files[0];
                this.fileName = this.file.name;

            },
        }
    }
</script>

<style scoped>

</style>
