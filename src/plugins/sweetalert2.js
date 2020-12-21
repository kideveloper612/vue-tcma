// main.js
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
    showCancelButton: true,
    showCloseButton: true,
    customClass: {
        confirmButton: 'btn btn-primary ml-4',
        cancelButton: 'btn btn-outline-danger',
        actions: 'mt-5 justify-content-end p-0',
        content: 'mt-5 p-2'
    },
    buttonsStyling: false,
    reverseButtons: true,
    width: 'auto',
    padding: '16px'
  }
 
Vue.use(VueSweetalert2,options);