const darkStyles = [
    {
        color: "#FFFFFF",
        backgroundColor: "#0474D4"
    },
    {
        color: "#FFFFFF",
        backgroundColor: "#01A306"
    },
    {
        color: "#242933",
        backgroundColor: "#FFDA44"
    },
    {
        color: "#FFFFFF",
        backgroundColor: "#F87F14"
    },
    {
        color: "#FFFFFF",
        backgroundColor: "#F12525"
    },
    {
        color: "#FFFFFF",
        backgroundColor: "#00B393"
    }
];

const lightStyles = [
    {
        color: "#242933",
        backgroundColor: "#C7E2F9"
    },
    {
        color: "#242933",
        backgroundColor: "#A6EBA8"
    },
    {
        color: "#242933",
        backgroundColor: "#FFE990"
    },
    {
        color: "#242933",
        backgroundColor: "#FFDAB9"
    },
    {
        color: "#242933",
        backgroundColor: "#FFD1D1"
    },
    {
        color: "#242933",
        backgroundColor: "#80F0DC"
    }
];

const colorMixins = {
    methods: {
        getColors(elementsPerLine) {
            var arrayColors = [];
            var styles = lightStyles.concat(darkStyles);
            if(elementsPerLine) {
                var arrayGroup = [];
                styles.forEach(color => {
                    arrayGroup.push(color.backgroundColor);
                    if(arrayGroup.length == elementsPerLine) {
                        arrayColors.push(arrayGroup);
                        arrayGroup = [];
                    }
                });
                if(arrayGroup.length) {
                    arrayColors.push(arrayGroup);
                    arrayGroup = [];
                }
            } else {
                styles.forEach(color => {
                    arrayColors.push(color.backgroundColor);
                });
            }
            return arrayColors;
        },
        getStyleByColor(color) {
            var selectedStyle = undefined;
            var styles = lightStyles.concat(darkStyles);
            styles.forEach(item => {
                if(item.backgroundColor === color) {
                    selectedStyle = item;
                }
            })
            return selectedStyle;
        },
        getForegroundColor(color) {
            var selectedColor = undefined;
            var styles = lightStyles.concat(darkStyles);
            styles.forEach(item => {
                if(item.backgroundColor === color) {
                    selectedColor = item.color;
                }
            })
            return selectedColor;
        },
        getLightColors() {
            var arrayColors = [];
            lightStyles.forEach(color => {
                arrayColors.push(color.backgroundColor);
            });
            return arrayColors;
        },
        getDarkColors() {
            var arrayColors = [];
            darkStyles.forEach(color => {
                arrayColors.push(color.backgroundColor);
            });
            return arrayColors;
        }
    }
}

export default colorMixins;