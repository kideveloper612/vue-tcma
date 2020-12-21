<template>
    <div>
        <ul class="timeline clearfix">
            <li class="timeline-line"></li>
            <li class="timeline-item" v-for="audit of list" :key="audit.id">
                <div class="timeline-badge">
                    <i class="badge-icon bg-success text-white  mdi mdi-check-circle-outline mdi-24px" v-if="!audit.errorCode"></i>
                    <i class="badge-icon bg-danger text-white  mdi mdi-alert-circle-outline mdi-24px" v-if="audit.errorCode"></i>
                </div>
                <div class="timeline-card card">
                    <div class="card-body">
                        <div class="ul-contact-page__profile">
                            <div class="user-profile-img">
                                <b-avatar size="5rem" variant="gray-400 text-white" class="mb-3" :src="audit.userAvatarURL" :text="showInitials(audit.userFirstName, audit.userLastName)"></b-avatar>
                                <p class="text-primary location-icon mt-5" v-if="showDetails[audit.id]">
                                    <img class="ml-2 rounded" :src="showFlag(audit.countryFlagURL)" alt="" rounded/>
                                </p>
                            </div>
                            <div class="ul-contact-page__info ml-0">
                                <div>
                                    <p class="operation-name">{{$t('app.audits.operations.' + audit.operationName)}}</p>
                                    <span class="date-time">{{showDateTime(audit.date)}}</span><br>
                                    <span class="user">{{$t('app.audits.targetHistory.by') + ' ' + audit.userFirstName + ' ' + audit.userLastName}} </span>
                                    <button type="button" class="btn float-right btn-outline-primary btn-details" @click="showMore(audit)" v-if="!showDetails[audit.id]">{{ $t("app.audits.targetHistory.more_details") }}</button>
                                </div>
                                <div class="mb-4 mt-5" v-if="showDetails[audit.id]">
                                    <p class="m-0 text-danger text-small mb-1" v-if="audit.errorCodeName">{{audit.errorCodeName}}</p>
                                    <p class="m-0 text-info text-small mb-1" v-if="audit.logMessage" v-html="showLogMessage(audit.logMessage)"></p>
                                    <p class="mb-1 mt-2">{{$t('app.audits.targetHistory.ip') + ' ' + audit.ipAddress}}</p>
                                    <p class="mb-1">{{$t('app.audits.targetHistory.lat_long') + ' ' + audit.longitude + ',' + audit.latitude}}</p>
                                    <p>{{audit.region}}</p>
                                    <b-row>
                                        <b-col>
                                            <b-card no-body class="o-hidden">
                                                <img :src="audit.nationalMapURL" class="d-block w-100" alt="" />
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card no-body class="o-hidden">
                                                <img :src="audit.regionalMapURL" class="d-block w-100" alt="" />
                                            </b-card>
                                        </b-col>
                                    </b-row>
                                </div>
                                <button type="button" class="btn float-right btn-primary" @click="showLess(audit)" v-if="showDetails[audit.id]">{{ $t("app.audits.targetHistory.less_details") }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="timeline clearfix">
            <li class="timeline-line"></li>
            <li class="timeline-group text-center">
                <button class="btn btn-icon-text btn-primary" @click="getHistory()" v-if="showMoreButton">
                    {{ $t("app.audits.targetHistory.more_history") }}
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
import {
    mapGetters
} from "vuex";
import commonMixins from "@/mixins/commonMixins";

export default {
    props:['list', 'showMoreButton'],
    mixins: [
        commonMixins
    ],
    data() {
        return {
            showDetails: []
        }
    },
    computed: {
        ...mapGetters(["loggedInUser"])
    },
    methods: {
        showMore(audit) {
            this.$set(this.showDetails, audit.id, true);
        },
        showLess(audit) {
            this.$set(this.showDetails, audit.id, false);
        },
        showDateTime(inputDate) {
            this.$moment.locale(this.loggedInUser.culture);

            var localeData = this.$moment.localeData();
            var format = localeData.longDateFormat('L') + ' ' + localeData.longDateFormat('LTS');
            return this.$moment.tz(inputDate,'UTC').tz(this.loggedInUser.timezone).format(format);
        },
        getHistory() {
            this.$emit('getMoreHistory');
        },
        showLogMessage(message) {
            var re = new RegExp("\\|", "g");
            return message.replace(re, '<br>');
        },
        showFlag(flag) {
            return flag.toLowerCase();
        }
    }
}
</script>
<style>
.location-icon img {
    width: 80px;
}
.timeline-item {
    display: flex !important;
    z-index: 1;
    margin-bottom: 2em;
    width: 100% !important;
    padding: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 1rem !important;
}
.timeline-item:nth-child(odd) {
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
}
.timeline-card {
    width: 45%;
}
.timeline .timeline-item .timeline-badge {
    left: calc(50% - 14px) !important;
    top: calc(50% - 14px) !important;
}
.timeline .timeline-item .badge-icon {
    width: 28px;
    height: 28px;
    line-height: 28px;
}
.user-profile-img {
    align-self: self-start;
    height: 80px;
    margin-top: 10px;
}
.operation-name {
    font-size: 21px;
    margin-bottom: 20px;
}
.date-time {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0;
}
.user {
    font-size: 15px;
    font-weight: 300;
}
.btn-details {
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
    margin-bottom: 3px;
}
</style>