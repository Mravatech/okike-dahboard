<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
              </span>
                        Dashboard
                    </h3>
                </div>
                <div class="row">
                    <div class="col-md-6 stretch-card grid-margin">
                        <div class="card bg-gradient-info card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Total Food
                                    <i class="mdi mdi-cards mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.total_food || 0}}</h2>
                                <!--<h6 class="card-text">Decreased by 10%</h6>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 stretch-card grid-margin">
                        <div class="card bg-gradient-primary card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Total Orders
                                    <i class="mdi mdi-nature-people mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.total_orders || 0}}</h2>
                                <!--<h6 class="card-text">Increased by 5%</h6>-->
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row">
                    <div class="col-lg-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Okike Food Chart</h4>
                                <canvas id="doughnutChart2" style="height:250px"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <canvas id="doughnutChart" style="height:250px"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2019 Okike Food. All rights reserved.</span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                            class="mdi mdi-heart text-danger"></i></span>
                </div>
            </footer>
            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {dashboardService} from "../../services/Dashboard.Service";


    export default {
        name: "Dashboard",
        scripts: [

        ],
        components: {Layout},
        data() {
            return {
                loading: true,
                dashboardData: "",
                scripts:[],

                doughnutPieData: {
                    datasets: [{
                        data: [30, 40, 30],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels:['Desktop', 'Mobile', 'Taxi']
                },
                doughnutPieOptions: {
                    responsive: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                },
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        type: 'datetime'
                    }
                },
                series: [{
                    name: 'Monthly Earnings',
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }],
                earnings_per_platform: [{
                    name: 'earnings_per_platform',
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }],
                doughnutPieData2: {
                    datasets: [{
                        data: [30, 40, 30],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels:['Desktop', 'Mobile', 'Taxi']
                },
                doughnutPieOptions2: {
                    responsive: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                },


                chartOptions: {
                    labels: ['Desktop', 'Mobile', 'Taxi'],

                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            }
        },
        async created() {
            await dashboardService.fetchStats()
                .then((res) => {
                    this.loading = false;
                    this.dashboardData = res.data;
                    this.getChart(res.data);
                }).catch((err) => window.console.log(err));


        },
        methods: {
            initCharts() {
                let that = this;

                if ($("#doughnutChart2").length) {
                    var doughnutChartCanvas2 = $("#doughnutChart2").get(0).getContext("2d");
                    var doughnutChart2 = new Chart(doughnutChartCanvas2, {
                        type: 'doughnut',
                        data: that.doughnutPieData2,
                        options: that.doughnutPieOptions2
                    });
                }
                if ($("#doughnutChart").length) {
                    var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
                    var doughnutChart = new Chart(doughnutChartCanvas, {
                        type: 'doughnut',
                        data: that.doughnutPieData,
                        options: that.doughnutPieOptions
                    });
                }
            },
            getChart(data) {
                // this.options.xaxis = {
                //     categories: Object.keys(data.charts.monthly_earnings).map((val, index) => {
                //         return data.charts.monthly_earnings[val].label;
                //     }),
                // };
                //
                // this.areaData.labels = Object.keys(data.charts.monthly_earnings).map((val, index) => {
                //     return data.charts.monthly_earnings[val].label
                // })
                // this.areaData.datasets[0].data = Object.keys(data.charts.monthly_earnings).map((val, index) => {
                //     return data.charts.monthly_earnings[val].amount
                // })
                this.doughnutPieData.datasets[0].data = Object.keys(data.total_ads_view_per_platform).map((val, index) => {
                    return data.total_ads_view_per_platform[val];
                });

                this.doughnutPieData2.datasets[0].data = Object.keys(data.total_hours_of_ad_server_per_platform).map((val, index) => {
                    return data.total_hours_of_ad_server_per_platform[val];
                });
                // this.areaData.datasets[0].data = Object.keys(data.charts.monthly_earnings).map((val, index) => {
                //     return data.charts.monthly_earnings[val].amount
                // })


                // this.series = [{
                //     name: "Earned",
                //     data: Object.keys(data.charts.monthly_earnings).map((val, index) => {
                //         return data.charts.monthly_earnings[val].amount;
                //     }),
                // }];
                //
                // this.earnings_per_platform = [{
                //     name: "Earned",
                //     data: Object.keys(data.earnings_per_platform).map((val, index) => {
                //         return data.earnings_per_platform[val].amount;
                //     }),
                // }]

            }
        },
        watch: {
            dashboardData(value) {
                this.initCharts();
            }
        }

    }
</script>

<style scoped>
    .card .card-body {
        padding: 0.5rem 1.5rem;
    }

    .card-body > h4 {
        padding-top: 15px;
        font-size: 1em;
        font-family: 'Montserrat', sans-serif;

    }

</style>
