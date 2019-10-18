<template>
    <Layout>
        <div slot="head">
            <modal :height="700" @before-open="beforeOpen" name="addExtra">
                <div class="modal-header">
                    Add Extra
                </div>
                <div class="modal-dialog" role="document">
                    <form @submit.prevent="addExtra()">
                        <div class="modal-content" style="background-color:#FFF">
                            <div class="modal-body mx-3">
                                <div class="md-form mb-5 form-space">

                                    <label data-error="wrong" data-success="right">Name</label>


                                    <input class="form-control validate form-input" ref="contents" type="text"
                                           v-model="extra_name">
                                </div>
                                <div class="md-form mb-5">
                                    <label data-error="wrong" data-success="right">Price</label>
                                    <input class="form-control validate form-input" ref="periods" type="text"
                                           v-model="extra_price">
                                </div>


                            </div>
                            <div class="modal-footer d-flex justify-content-center">

                                <button class="btn btn-primary">Add Extra
                                    <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
                </div>
            </modal>
        </div>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader :loading-text="loadingText" :showFull=true v-if="isLoading"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        List Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->

                                <div class="card-body">
                                    <h4 class="card-title"></h4>
                                    <b-row>
                                        <b-col class="float-left" md="3">
                                            Choose entries
                                            <b-form-select :options="pageOptions"
                                                           class="form-control"
                                                           v-model="perPage"></b-form-select>
                                        </b-col>
                                        <b-col class="col-m2-4"></b-col>
                                    </b-row>
                                    <div class="row">
                                        <div class="col-12 table-responsive">
                                            <div class="mb-lg-5"></div>
                                            <b-table :busy="loading" :current-page="currentPage"
                                                     :fields="columnsHeader"
                                                     :items="allContent"
                                                     :per-page="0"
                                                     show-empty>
                                                <div class="text-center text-primary my-2" slot="table-busy">
                                                    <b-spinner class="align-middle"></b-spinner>
                                                    <strong>Loading...</strong>
                                                </div>
                                                <span slot="Icon" slot-scope="data" v-html="data.item.Icon"></span>
                                                <template slot="actions" slot-scope="data">
                                                    <table-actions :actions=actions
                                                                   :data=data.item
                                                                   @openExtra="openExtra"
                                                                   @viewAdDetails="viewAdDetails"></table-actions>
                                                </template>
                                            </b-table>
                                            <b-pagination :per-page="perPage" :total-rows="total" size="md"
                                                          v-model="currentPage"></b-pagination>
                                        </div>
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
    import Layout from '../../components/Layout';
    import TableActions from "../../components/TableHelpers/TableActions";
    import Loader from '../../components/Loader/Loader'
    import {Category} from "../../services/Category.services";
    import {Category as Food} from "../../services/Food.services";

    const action = [
        {
            class: 'btn btn-primary btn-md',
            text: 'Options',
            title: "Options",
            dropdown: [
                {
                    args: ['uuid'],
                    callback: 'openExtra',
                    text: 'Add Extra',
                },
                {
                    args: ['uuid'],
                    callback: 'viewAdDetails',
                    text: 'View',
                }
            ]
        }
    ];
    export default {
        components: {Layout, Loader, TableActions},
        name: "ListCategory",
        data() {
            return {
                title: "ListCategories",
                actions: action,
                columnsHeader: ['Icon', 'Name', 'Description', 'Price', 'actions'],
                ads: [],
                contentData: {},
                currentPage: 1,
                total: 0,
                perPage: 12,
                pageOptions: [6, 12, 18, 24, 36, 50],
                filter: '',
                sortable: false,
                searchable: true,
                loading: true,
                allContent: [],
                isLoading: false,
                loadingText: 'loading',
                currentAd: '',
                currentAmount: 0,
                currentReference: '',
                user: this.$store.getters.GET_USER,
                extra_price: 0,
                extra_name: '',
                catuuid: ''
            }
        },
        async created() {
            await this.fetchCategories();
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchCategories();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchCategories();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchCategories();
                    }
                }
            },
            isLoading: {
                handler(value) {
                    if (!value) {
                        this.loadingText = '';
                    }
                }
            }
        },

        methods: {
            fetchCategories() {
                this.loading = true;
                Food.listFood(this.perPage, this.currentPage).then((response) => {
                    this.fillCategory(response);
                }).catch(() => {
                });
            },
            fillCategory(data = []) {
                this.allContent = [];
                this.total = data.total;
                data.data.forEach(({image_url: image_url, name: name, uuid: uuid, description: description, price: price}) => {
                    this.allContent.push({
                        Icon: '<img src="' + image_url + '"/>',
                        Name: name,
                        Description: description,
                        Price: price,
                        uuid: uuid
                    });
                });
                this.loading = false;
            },
            beforeOpen(event) {
                this.editData = event.params;
            },
            async addExtra(uuid) {
                this.isLoading = true;
                let data = {
                    food_uuid: this.catuuid,
                    name: this.extra_name,
                    price: this.extra_price
                };
                await Food.addExtra(data).then((res) => {
                    this.extra_name = '';
                    this.extra_price = '';
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.error.message, "Update Ads Content Creation failed!", {timeOut: 5000});
                });
                this.isLoading = false;
            },
            openExtra(uuid) {
                this.catuuid = uuid;
                    this.$modal.show('addExtra');
            },
            viewAdDetails(AdID) {
            },
            openUpdateAdvert(AdID, content, period, target, campaign) {
                this.$modal.show('updatePeak', {
                    AdID: AdID,
                    content: content,
                    period: period,
                    target: target,
                    campaign: campaign
                })
            },
        }
    }
</script>

<style scoped>

</style>
