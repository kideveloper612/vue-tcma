<template>
<v-select ref="selectMultiple" class="vsmultiple" :options="optionsList" v-bind:value="value" v-on:input="$emit('input', value)" :reduce="item => item.value" multiple :close-on-select="false">
    <template #option="{ label, value, preview }">
        <div class="vsmultiple__item" @click="selectValue(value)">
            <span class="mdi mdi-checkbox-blank-outline mdi-24px vsmultiple__marker ml-2" v-if="!checkVariable(value)"></span>
            <span class="mdi mdi-checkbox-marked mdi-24px vsmultiple__marker ml-2" v-if="checkVariable(value)"></span>
            <b-avatar size="3rem" variant="gray-400 text-white" rounded="" class="m-2" :src="preview" v-if="preview"></b-avatar>
            {{ label }}
        </div>
    </template>
    <template #selected-option="{ label, value }">
        <div style="display: flex; align-items: baseline;">
            {{ label }}
            <button @mousedown.prevent.stop="deselect(value, $event)" type="button" class="vsmultiple__deselect" ref="deselectButtons">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                    <path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" />
                </svg>
            </button>
        </div>
    </template>
    <template #list-footer>
        <b-button variant="outline-primary" class="btn-tertiary m-2 mt-4" @click="saveSelection">
            {{ $t('app.templates.manage_version.forms.save_button') }}
        </b-button>
    </template>
</v-select>
</template>

<script>
export default {
    props: ['optionsList', 'value'],
    mounted() {
        if(!this.value) {
            this.value = [];
        } else if (typeof this.value == 'string') {
            this.value = [];
        }
    },
    methods: {
        saveSelection() {
            this.$refs['selectMultiple'].open = false;
        },
        checkVariable(value) {
            if (this.optionsList && this.value) {
                try {
                    if (this.value.find(o => o.value == value)) {
                        return true;
                    }
                } catch {
                    if(this.value == value) {
                        return true;
                    }
                    return false;
                }
            }
            return false;
        },
        selectValue(value) {
            var selectedElement = this.optionsList.find(ol => ol.value == value);
            if (this.checkVariable(value)) {
                var index = -1;
                var i = 0;
                this.value.forEach(element => {
                    if (element.value == selectedElement.value) {
                        index = i;
                    }
                    i++;
                });
                this.value.splice(index, 1);
            } else {
                if(this.value) {
                    this.value.push(selectedElement);
                }
            }
        },
        deselect(value) {
            this.selectValue(value);
        }
    }
}
</script>

<style lang="scss">
.vsmultiple {
    .vs__dropdown-menu {
        padding: 8px;
    }
    .vs__dropdown-option--selected {
        background: #2250BA !important;
        // background-color: #4285f4 !important;
        color: #fff !important;

        .vsmultiple__item {
            box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
        }
    }

    .vs__dropdown-option {
        padding: 0;
        color: #2250BA;
    }
    .vsmultiple__marker {
        vertical-align: middle;
    }


    .vs__deselect {
        display: none;
    }

    .vsmultiple__deselect {
        display: inline-flex;
        appearance: none;
        margin-left: 4px;
        padding: 0;
        border: 0;
        cursor: pointer;
        background: none;
        fill: rgba(60, 60, 60, 0.5);
        text-shadow: 0 1px 0 #fff;
    }
}

.mdi-28px {
    font-size: 28px;
}
</style>
