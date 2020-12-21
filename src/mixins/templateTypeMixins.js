const formTypes = [
    {
        value: 'TextBox',
        label: 'Text Box',
        icon: 'mdi-form-textbox'
    },
    {
        value: 'TextArea',
        label: 'Text Area',
        icon: 'mdi-form-textbox'
    },
    {
        value: 'DropDown',
        label: 'Drop Down',
        icon: 'mdi-form-dropdown'
    },
    {
        value: 'RadioButtons',
        label: 'Radio Button',
        icon: 'mdi-radiobox-marked'
    },
    {
        value: 'Date',
        label: 'Date Picker',
        icon: 'mdi-calendar-month'
    },
    {
        value: 'ImageAssetSelect',
        label: 'Image Asset',
        icon: 'mdi-image-multiple'
    },
    {
        value: 'DocumentAssetSelect',
        label: 'Document Asset',
        icon: 'mdi-text-box-multiple'
    },
    {
        value: 'Checkbox',
        label: 'Checkbox',
        icon: 'mdi-checkbox-marked'
    },
    {
        value: 'ImageUpload',
        label: 'Image Upload',
        icon: 'mdi-image-plus'
    },
    {
        value: 'DbUpload',
        label: 'DB Upload',
        icon: 'mdi-database-plus'
    },
];

const actionTagTypes = [
    {
        value: 'Text',
        label: 'app.templates.manage_version.action_tags.tag_types.text',
        icon: 'mdi-form-textbox',
        showDBCheckbox: true,
        showRedactedCheckbox: true,
        route: 'text',
        discoveryTagTypes: ["Text", "Hyperlink", "TableCell", "ChartData", "Shape"],
        additionalElements: [],
    },
    {
        value: 'Picture',
        label: 'app.templates.manage_version.action_tags.tag_types.picture',
        icon: 'mdi-file-image',
        showDBCheckbox: true,
        showRedactedCheckbox: true,
        route: 'picture',
        discoveryTagTypes: ["Picture"],
        additionalElements: [
            {
                type: 'dropdown',
                label: 'app.templates.manage_version.action_tags.picture_type.crop_type.label',
                model: 'cropType',
                list: [
                    {
                        label: 'app.templates.manage_version.action_tags.picture_type.crop_type.stretch',
                        value: 'Stretch'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.picture_type.crop_type.croptofit',
                        value: 'CropToFit'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.picture_type.crop_type.scale',
                        value: 'Scale'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.picture_type.crop_type.scaleandaddwhitespace',
                        value: 'ScaleAndAddWhiteSpace'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.picture_type.crop_type.scalemax',
                        value: 'ScaleMax'
                    },
                ]
            },
            {
                type: 'inputnumber',
                label: 'app.templates.manage_version.action_tags.picture_type.dpi',
                model: 'dpi'
            }
        ]
    },
    {
        value: 'Barcode',
        label: 'app.templates.manage_version.action_tags.tag_types.barcode',
        icon: 'mdi-barcode',
        showDBCheckbox: true,
        showRedactedCheckbox: true,
        route: 'barcode',
        discoveryTagTypes: ["Picture"],
        additionalElements: [{
            type: 'dropdown',
            label: 'app.templates.manage_version.action_tags.barcode_type.label',
            model: 'barcodeType',
            list: [
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.qrcode',
                    value: 'QRCode'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.datamatrix',
                    value: 'DataMatrix'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code39',
                    value: 'Code39'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code39extended',
                    value: 'Code39Extended'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.codabar',
                    value: 'Codabar'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code32',
                    value: 'Code32'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code93',
                    value: 'Code93'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code93extended',
                    value: 'Code93Extended'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code128A',
                    value: 'Code128A'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code128B',
                    value: 'Code128B'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.code128C',
                    value: 'Code128C'
                },
                {
                    label: 'app.templates.manage_version.action_tags.barcode_type.upc',
                    value: 'UPC'
                },
            ]
        }]
    },
    {
        value: 'Number',
        label: 'app.templates.manage_version.action_tags.tag_types.number',
        icon: 'mdi-numeric',
        showDBCheckbox: true,
        showRedactedCheckbox: true,
        route: 'number',
        discoveryTagTypes: ["Text", "Hyperlink", "TableCell", "ChartData", "Shape"],
        additionalElements: [
            {
                type: 'dropdown',
                label: 'app.templates.manage_version.action_tags.number_type.decimal_positions',
                model: 'decimalPositions',
                list: [
                    {
                        label: '0',
                        value: '0'
                    },
                    {
                        label: '1',
                        value: '1'
                    },
                    {
                        label: '2',
                        value: '2'
                    },
                    {
                        label: '3',
                        value: '3'
                    },
                    {
                        label: '4',
                        value: '4'
                    },
                    {
                        label: '5',
                        value: '6'
                    }
                ]
            },
            {
                type: 'checkbox',
                label: 'app.templates.manage_version.action_tags.number_type.currency',
                model: 'isCurrency'
            }
        ]
    },
    {
        value: 'DocumentAsset',
        label: 'app.templates.manage_version.action_tags.tag_types.documentasset',
        icon: 'mdi-text-box-multiple',
        showDBCheckbox: false,
        showRedactedCheckbox: true,
        route: 'asset',
        discoveryTagTypes: ["Text", "Hyperlink"],
        additionalElements: [
            {
                type: 'checkbox',
                label: 'app.templates.manage_version.action_tags.document_asset_type.insert_new_page_before',
                model: 'newPageBeforeAsset'
            },
            {
                type: 'checkbox',
                label: 'app.templates.manage_version.action_tags.document_asset_type.insert_new_page_after',
                model: 'newPageAfterAsset'
            }
        ]
    },
    {
        value: 'TableColumnSummary',
        label: 'app.templates.manage_version.action_tags.tag_types.tablecolumnsummary',
        icon: 'mdi-calculator-variant',
        showDBCheckbox: false,
        showRedactedCheckbox: true,
        route: 'tablecolumnsummary',
        discoveryTagTypes: [],
        additionalElements: [
            {
                type: 'dropdown',
                label: 'app.templates.manage_version.action_tags.table_column_summary_type.sumary_type.label',
                model: 'columnSummaryType',
                list: [
                    {
                        label: 'app.templates.manage_version.action_tags.table_column_summary_type.sumary_type.sum',
                        value: 'Sum'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.table_column_summary_type.sumary_type.average',
                        value: 'Average'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.table_column_summary_type.sumary_type.min',
                        value: 'Min'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.table_column_summary_type.sumary_type.max',
                        value: 'Max'
                    },
                    {
                        label: 'app.templates.manage_version.action_tags.table_column_summary_type.sumary_type.count',
                        value: 'Count'
                    }
                ]
            },
            {
                type: 'dropdown',
                label: 'app.templates.manage_version.action_tags.number_type.decimal_positions',
                model: 'decimalPositions',
                list: [
                    {
                        label: '0',
                        value: '0'
                    },
                    {
                        label: '1',
                        value: '1'
                    },
                    {
                        label: '2',
                        value: '2'
                    },
                    {
                        label: '3',
                        value: '3'
                    },
                    {
                        label: '4',
                        value: '4'
                    },
                    {
                        label: '5',
                        value: '6'
                    }
                ]
            },
            {
                type: 'checkbox',
                label: 'app.templates.manage_version.action_tags.table_column_summary_type.currency',
                model: 'isCurrency'
            }
        ]
    },
    {
        value: 'SuppressParagraph',
        label: 'app.templates.manage_version.action_tags.tag_types.suppressparagraph',
        icon: 'mdi-text-box-remove',
        showDBCheckbox: false,
        showRedactedCheckbox: false,
        route: 'suppressparagaph',
        discoveryTagTypes: ["Text"],
        additionalElements: []
    },
    {
        value: 'SuppressPage',
        label: 'app.templates.manage_version.action_tags.tag_types.suppresspage',
        icon: 'mdi-file-remove',
        showDBCheckbox: false,
        showRedactedCheckbox: false,
        route: 'suppresspage',
        additionalElements: []
    },
    {
        value: 'SuppressTableRow',
        label: 'app.templates.manage_version.action_tags.tag_types.suppresstablerow',
        icon: 'mdi-file-remove',
        showDBCheckbox: false,
        showRedactedCheckbox: false,
        route: 'suppresstablerow',
        additionalElements: []
    },
    {
        value: 'Date',
        label: 'app.templates.manage_version.action_tags.tag_types.date',
        icon: 'mdi-calendar-month',
        showDBCheckbox: true,
        showRedactedCheckbox: true,
        route: 'datetime',
        discoveryTagTypes: ["Text", "Hyperlink", "TableCell", "ChartData", "Shape"],
        additionalElements: [{
            type: 'dropdown',
            label: 'app.templates.manage_version.action_tags.date_format_type.label',
            model: 'formatType',
            list: [
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.shortdate',
                    value: 'ShortDate'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.longdate',
                    value: 'LongDate'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.fulldateshorttime',
                    value: 'FullDateShortTime'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.fulldatelongtime',
                    value: 'FullDateLongTime'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.generaldateshorttime',
                    value: 'GeneralDateShortTime'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.generaldatelongtime',
                    value: 'GeneralDateLongTime'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.monthday',
                    value: 'MonthDay'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.rfc1123',
                    value: 'RFC1123'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.shorttime',
                    value: 'ShortTime'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.longtime',
                    value: 'LongTime'
                },
                {
                    label: 'app.templates.manage_version.action_tags.date_format_type.yearmonth',
                    value: 'YearMonth'
                },
            ]
        }]
    }
];

const templateTypeMixins = {
    computed: {
        getFormTypes() {
            return formTypes;
        },
        getActionTagTypes() {
            return actionTagTypes;
        }
    },
    methods: {
        getFormIcon(type) {
            var returnValue = undefined;
            formTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.icon;
                }
            })
            return returnValue;
        },
        getActionTagIcon(type) {
            var returnValue = undefined;
            actionTagTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.icon;
                }
            })
            return returnValue;
        },
        getActionTagRoute(type) {
            var returnValue = undefined;
            actionTagTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.route;
                }
            })
            return returnValue;
        },
        showDbBound(type) {
            var returnValue = undefined;
            actionTagTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.showDBCheckbox;
                }
            })
            return returnValue;
        },
        showRedactable(type) {
            var returnValue = undefined;
            actionTagTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.showRedactedCheckbox;
                }
            })
            return returnValue;
        },
        getAdditionalElements(type) {
            var returnValue = [];
            actionTagTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.additionalElements;
                }
            })
            return returnValue;
        },
        isAllowedDiscoveryTagTypes(type) {
            var returnValue = false;
            console.log(type);
            actionTagTypes.forEach(item => {
                if(item.discoveryTagTypes.indexOf(type) !== -1 || type == 'Undefined') {
                    returnValue = true;
                }
            })
            return returnValue;
        }
    }
}

export default templateTypeMixins;