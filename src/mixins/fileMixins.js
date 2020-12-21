const validTypes= [
    {
        type: 'Doc',
        extensions: [
            ".DOCX", ".DOC", ".ODT", ".TXT", ".RTF", ".HTM", ".HTML"
        ],
        icon: 'mdi-file-word-outline',
        color: 'text-cyan'
    },
    {
        type: 'Excel',
        extensions: [
            ".XLSX", ".XLS", ".CSV"
        ],
        icon: 'mdi-file-excel-outline',
        color: 'text-green'
    },
    {
        type: 'PowerPoint',
        extensions: [
            ".PPTX", ".PPT", ".PPTM"
        ],
        icon: 'mdi-file-powerpoint-outline',
        color: 'text-orange'
    },
    {
        type: 'Image',
        extensions: [
            ".JPG", ".TIF", ".TIFF", ".GIF", ".PNG", ".BMP", ".JPEG"
        ],
        icon: 'mdi-file-image-outline',
        color: 'text-indigo'
    },
    // {
    //     type: 'Font',
    //     extensions: [
    //         ".TTF", ".OTF"
    //     ],
    //     icon: 'mdi-format-font'
    // },
    {
        type: 'PDF',
        extensions: [
            '.PDF'
        ],
        icon: 'mdi-file-pdf-outline',
        color: 'text-red'
    }
];

const fileMixins = {
    computed: {
        getExtensions() {
            var returnValue = [];
            validTypes.forEach(item => {
                returnValue = returnValue.concat(item.extensions);
            })
            return returnValue.toString();
        },
        getTypes() {
            var returnValue = [];
            validTypes.forEach(item => {
                returnValue.push(item.type);
            })
            return returnValue;
        }
    },
    methods: {
        getMainType(type) {
            var returnValue = undefined;
            type = type != undefined ? type.toUpperCase() : type;
            validTypes.forEach(item => {
                if(item.extensions.indexOf(type) !== -1) {
                    returnValue = item.type;
                }
            })
            return returnValue;
        },
        getExtensionByMainType(mainType) {
            var returnValue = [];
            mainType = mainType != undefined ? mainType.toUpperCase() : mainType;
            validTypes.forEach(item => {
                if(item.type.toUpperCase() == mainType) {
                    returnValue = item.extensions;
                }
            })
            return returnValue;
        },
        getIcon(type) {
            var returnValue = undefined;
            type = type != undefined ? type.toUpperCase() : type;
            validTypes.forEach(item => {
                if(item.extensions.indexOf(type) !== -1) {
                    returnValue = item.icon;
                }
            })
            return returnValue;
        },
        getIconByMainType(type) {
            var returnValue = undefined;
            type = type != undefined ? type.toUpperCase() : type;
            validTypes.forEach(item => {
                if(item.type.toUpperCase() === type) {
                    returnValue = item.icon;
                }
            })
            return returnValue;
        },
        getAllowedExtensions(type) {
            var returnValue = undefined;
            type = type != undefined ? type.toUpperCase() : type;
            validTypes.forEach(item => {
                if(item.extensions.indexOf(type) !== -1) {
                    returnValue = item.extensions.toString();
                }
            })
            return returnValue;
        },
        downloadFile(item, itemType) {
            this.$http.get('/' + itemType + '/' + item.id)
                .then(response => {
                    var fileLink = document.createElement('a');
                    fileLink.href = response.data.versions[0].fileUrl;
                    fileLink.target = '_blank';
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(error => {
                    console.log(error)
                });
        },
        downloadFileByUrl(fileUrl) {
            var fileLink = document.createElement('a');
            fileLink.href = fileUrl;
            fileLink.target = '_blank';
            fileLink.setAttribute('download', 'file.pdf');
            document.body.appendChild(fileLink);
            fileLink.click();
        },
        getExtensionByFilename(filename) {
            if(!filename) {
                return '';
            }
            var ext = "." + filename.split('.').pop();
            ext = ext.toUpperCase();
            var returnValue = undefined;
            validTypes.forEach(item => {
                if(item.extensions.indexOf(ext) !== -1) {
                    returnValue = ext;
                }
            })
            return returnValue;
        },
        getColor(type) {
            var returnValue = undefined;
            type = type != undefined ? type.toUpperCase() : type;
            validTypes.forEach(item => {
                if(item.extensions.indexOf(type) !== -1) {
                    returnValue = item.color;
                }
            })
            return returnValue;
        },
        getColorIcon(type) {
            return this.getIcon(type) + ' ' + this.getColor(type);
        }
    }
}

export default fileMixins;