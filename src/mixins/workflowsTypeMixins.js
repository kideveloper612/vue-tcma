const stepTypes = [
    {
        value: "Merge",
        icon: "mdi-file-replace"
    },
    {
        value: "Approve",
        icon: "mdi-eye-check"
    },
    {
        value: "ConvertToPDF",
        icon: "mdi-pdf-box"
    },
    {
        value: "Encrypt",
        icon: "mdi-lock"
    },
    {
        value: "Email",
        icon: "mdi-email"
    },
    {
        value: "GoogleDrive",
        icon: "mdi-google-drive"
    },
    {
        value: "OneDrive",
        icon: "mdi-cloud"
    },
    {
        value: "SalesForce",
        icon: "mdi-salesforce"
    },
    {
        value: "FTP",
        icon: "mdi-folder-network"
    },
    {
        value: "CustomStep",
        icon: "mdi-pencil-ruler"
    },
    {
        value: "Cancel",
        icon: "mdi-cancel"
    },
    {
        value: "Finished",
        icon: "mdi-checkbox-marked-circle"
    },
    {
        value: "Print",
        icon: "mdi-printer"
    },
    {
        value: "DocumentManagement",
        icon: "mdi-file-cog"
    },
    {
        value: "DigitalSignature",
        icon: "mdi-signature-freehand"
    }
];

const workflowsTypeMixins = {
    methods: {
        getStepIcon(type) {
            var returnValue = undefined;
            stepTypes.forEach(item => {
                if(item.value === type) {
                    returnValue = item.icon;
                }
            })
            return returnValue;
        },
    }
}

export default workflowsTypeMixins;