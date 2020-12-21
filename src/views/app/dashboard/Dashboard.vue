<template>
<div class="main-content">
    <page-title :page="$t('app.template.navigation.dashboard')">
        <div slot="actions" class="page-actions">
        </div>
    </page-title>
    <b-row>
        <b-col md="4">
            <b-overlay :show="loading.users" rounded opacity="0.6" spinner-small spinner-variant="primary">
                <b-card class=" mb-30">
                    <h4 class="card-title m-0">{{$t('app.dashboard.users')}}</h4>
                    <div class="chart-wrapper" style="height: 300px ; width:100% ">
                        <apexchart width="100%" height="300px" type="pie" :options="pieOptions(users.labels, 'users', 'users')" :series="users.values" v-if="users.values"></apexchart>
                    </div>
                </b-card>
            </b-overlay>
        </b-col>
        <b-col md="4">
            <b-overlay :show="loading.assets" rounded opacity="0.6" spinner-small spinner-variant="primary">
                <b-card class="mb-30">
                    <h4 class="card-title m-0">{{$t('app.dashboard.assets')}}</h4>
                    <div class="chart-wrapper text-center" style="height: 300px ; width:100% ">
                        <apexchart width="100%" height="300px" type="donut" :options="pieOptions(assets.labels, 'assets', 'assets')" :series="assets.values" v-if="assets.values"></apexchart>
                    </div>
                </b-card>
            </b-overlay>
        </b-col>
    </b-row>
</div>
</template>

<script>
import Vue from 'vue';

import dateMixins from "@/mixins/dateMixins";

import VueApexCharts from 'vue-apexcharts';

export default {
    name: "Dashboard",
    mixins: [
        dateMixins
    ],
    components: {
        'apexchart': VueApexCharts
    },
    data() {
        return {
            dashboardRequests: [],
            loading: {
                users: false,
                assets: false,
            },
            users: {},
            assets: {
                labels: [],
                values: []
            },
            maps: {
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1600,
                    animateGradually: {
                        enabled: true,
                        delay: 300
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getDashboard();
        },
        getDashboard() {
            this.dashboardRequests.push(this.$http.get('dashboard/user_counts'));
            this.dashboardRequests.push(this.$http.get('dashboard/asset_count_by_type'));
            this.loading.users = true;
            this.loading.assets = true;

            Promise.all(this.dashboardRequests)
                .then(results => {
                    this.getUsers(results[0]);
                    this.getAssets(results[1]);
                })
        },
        getUsers(response) {
            this.users = {
                labels: [this.$t('app.dashboard.users_legend.active'), this.$t('app.dashboard.users_legend.deleted')],
                values: [response.data[0].activeCount, response.data[0].deletedCount]
            };
            this.loading.users = false;
        },
        getAssets(response) {
            this.assets = {
                labels: [],
                values: []
            };
            response.data.forEach(asset => {
                this.assets.labels.push(asset.type);
                this.assets.values.push(asset.assetCount);
            });
            this.loading.assets = false;
        },
        openAssets(index) {
            var selectedType = this.assets.labels[index];
            this.$router.push({
                name: 'assets',
                params: {
                    dashboardType: selectedType
                }
            })
        },
        openUsersOrTemplates(index, name) {
            var showDeleted = false;
            if (index == 1) {
                showDeleted = true;
            }
            this.$router.push({
                name: name,
                params: {
                    showDeleted: showDeleted
                }
            })
        },
        pieOptions(seriesTitle, id, type) {
            var _this = this;
            var chartOptions = {
                chart: {
                    id: id,
                    events: {
                        dataPointSelection: function (event, chartContext, config) {
                            if (type == 'users' || type == 'templates') {
                                _this.openUsersOrTemplates(config.dataPointIndex, type);
                            }
                            if (type == 'assets') {
                                _this.openAssets(config.dataPointIndex);
                            }
                        },
                        dataPointMouseEnter: function (event) {
                            if (type != 'openMergeSessions') {
                                event.target.style = 'cursor: pointer;';
                            }
                        }
                    },
                    animations: this.maps.animations
                },
                legend: {
                    position: 'bottom'
                },
                labels: seriesTitle,
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#2250BA'
                    }
                },
                title: {
                    text: ""
                },
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
                }],
                dataLabels: {
                    formatter: function (val, opts) {
                        return opts.w.config.series[opts.seriesIndex]
                    },
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '45%',
                            labels: {
                                show: type == 'assets',
                                name: {
                                    show: type == 'assets'
                                },
                                value: {
                                    show: type == 'assets'
                                },
                                total: {
                                    show: type == 'assets',
                                    showAlways: type == 'assets'
                                }
                            }
                        }
                    }
                }
            }
            return chartOptions;
        }
    },
}
</script>

<style>
.text-dashboard-value {
    font-size: 110px;
    line-height: 300px;
}
</style>
