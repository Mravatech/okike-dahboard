<template>
    <Layout>
        <div slot="head">
            <modal :height="700" @before-open="beforeOpen" name="addExtra">
                <div class="modal-header">
                    View Order
                </div>
                <div class="modal-dialog" role="document">
                        <div class="modal-content" style="background-color:#FFF">
                            <div class="modal-body mx-3">
                                <div class="md-form mb-3 form-space">
                                    <label> Order</label>
                                    <div class="input-group">
                                        <label class="form-control">Name : {{detail.Name}} </label>
                                        <label class="form-control">Total : {{detail.Price}} </label>
                                    </div>
                                </div>
                                <div class="md-form mb-3 form-space">
                                    <label> Order Details</label>
                                    <div class="input-group" v-for="(order, index) in detail.order" :key="index">
                                        <label class="form-control">Name : {{order.name}} </label>
                                        <label class="form-control">Price : {{order.price}} </label>
                                    </div>
                                </div>
                                <div class="md-form mb-3 form-space">
                                    <label> User</label>
                                    
                                        <div class="input-group">
                                            <label class="form-control">State : {{detail.State}} </label>
                                            <label class="form-control">LGA : {{detail.LGA}} </label>
                                        </div>
                                        <div class="input-group">
                                            <label class="form-control">Address : {{detail.Address}} </label>
                                            <label class="form-control">State : {{detail.Phone}} </label>
                                        </div>
                                </div>

                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <form @submit.prevent="acceptOrder(detail.uuid)">
                                    <button class="btn btn-success">Accept
                                        <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                    </button>
                                </form>
                                <form @submit.prevent="rejectOrder(detail.uuid)">
                                    <button class="btn btn-danger">Reject
                                        <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
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
                        List Orders
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
                                                                   @acceptOrder="acceptOrder"
                                                                   @rejectOrder="rejectOrder"
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
    import {Order} from "../../services/order.services";
    import moment from "moment";

    const action = [
        {
            class: 'btn btn-primary btn-md',
            text: 'Options',
            title: "Options",
            dropdown: [
                {
                    args: ['detail'],
                    callback: 'openExtra',
                    text: 'View',
                },
                {
                    args: ['uuid'],
                    callback: 'acceptOrder',
                    text: 'Accept',
                },
                {
                    args: ['uuid'],
                    callback: 'rejectOrder',
                    text: 'Reject',
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
                columnsHeader: ['Number', 'Name', 'Status', 'Price','State','LGA', 'Time', 'actions'],
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
                detail: [],
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
            await this.fetchOrders();
            // await this.fetchCategories();
            
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchOrders();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchOrders();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchOrders();
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
            fetchOrders(){
                this.loading = true;
                Order.list(this.perPage, this.currentPage).then((response)=>{
                    this.sortOrders(response);
                }).catch(()=>{

                });
            },
            sortOrders(data){
                this.allContent = [];
                let n = 0;
                this.total = data.total;
                data.data.forEach((order) => {
                    const orders = JSON.parse(order.orders)
                    const address = JSON.parse(order.address)
                    let detail = {
                        Number : ++n,
                        detail: order,
                        Name: orders[0].food,
                        order: orders,
                        Address: address.address,
                        State: address.state,
                        LGA: address.lga,
                        Phone: address.phone,
                        Time: moment(order.created_at).add(1, 'hour').fromNow(),
                        Price: order.price,
                        uuid: order.uuid,
                        Status: order.status,
                        Paid: order.paid,
                    }
                     
                    this.allContent.push({
                        ...detail,
                        detail: detail
                    });
                });
                this.loading = false;
            },
            beforeOpen(event) {
                this.editData = event.params;
            },
            async acceptOrder(uuid) {
                this.isLoading = true;
                await Order.accept(uuid).then((res)=>{
                    this.isLoading = false;
                    this.$toastr.success(res.message);
                    this.fetchOrders()
                }).catch((error)=> {
                    
                })
            },
            async rejectOrder(uuid) {
                this.isLoading = true;
                await Order.reject(uuid).then((res)=>{
                    this.isLoading = false;
                    this.$toastr.success(res.message);
                    this.fetchOrders()
                }).catch((error)=> {
                    
                })
            },
            openExtra(detail) {
                this.detail = detail
                this.catuuid = detail.uuid;
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
