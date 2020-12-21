import {
    mapGetters
} from "vuex";

const dateMixins = {
    computed: {
        getCulture() {
            return this.loggedInUser.culture;
        },
        ...mapGetters(["loggedInUser"])
    },
    methods: {
        convertDateToAPI(inputDate) {
            if(!inputDate) {
                return "";
            }
            return this.$moment.tz(inputDate,this.loggedInUser.timezone).tz('UTC');
        },
        showDatePure(inputDate) {
            if(!inputDate) {
                return "";
            }
            var localeData = this.$moment.localeData();

            var format = localeData.longDateFormat('L');
            return this.$moment(inputDate).format(format);
        },
        showDate(inputDate) {
            if(!inputDate) {
                return "";
            }
            this.$moment.locale(this.loggedInUser.culture);
            var localeData = this.$moment.localeData();

            var format = localeData.longDateFormat('L');
            return this.$moment.tz(inputDate,'UTC').tz(this.loggedInUser.timezone).format(format);
        },
        showDateTime(inputDate) {
            if(!inputDate) {
                return "";
            }
            this.$moment.locale(this.loggedInUser.culture);
            var localeData = this.$moment.localeData();

            var format = localeData.longDateFormat('L') + ' ' + localeData.longDateFormat('LTS');
            return this.$moment.tz(inputDate,'UTC').tz(this.loggedInUser.timezone).format(format);
        },
        showDateTimeExtended(inputDate) {
            this.$moment.locale(this.loggedInUser.culture);
            var localeData = this.$moment.localeData();

            var format = localeData.longDateFormat('LL') + ' ' + localeData.longDateFormat('LTS');
            return this.$moment.tz(inputDate, 'UTC').tz(this.loggedInUser.timezone).format(format);
        },
        isDeleted(item) {
            var UIEndDate = this.$moment.tz(item.endDate,'UTC').tz(this.loggedInUser.timezone);
            return item.endDate !== undefined && item.endDate !== null && this.$moment().isAfter(UIEndDate);
        },
    }
}

export default dateMixins;