import 'core-js/stable'
import Vue from 'vue'

import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'

import config from "./plugins/config";
// import axios from "./axios";
import  axios from'./plugins/axios'
Vue.prototype.$http = axios;
import store from './store'

import './assets/tailwind.css'
import './registerServiceWorker'


// Vue Head
import VueHead from "vue-head";
Vue.use(VueHead, {
  separator: "-",
  complement: config.appName
});

// Vee Validate
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// import { required, email } from 'vee-validate/dist/rules';
import { messages } from "vee-validate/dist/locale/en.json";
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});
extend("internal_identifier", {
  validate: value => {
    let regex = RegExp("^((?!-)*)([A-Za-z0-9-]+)((?!-)*)$");
    return regex.test(value);
  },
  message:
    "The {_field_} field may contain alpha-numeric characters as well as dashes."
});
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

// // Vue Loading Overlay
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading, {
  canCancel: false,
  color: "#0040a1", 
  width: 120,
  height: 120,
  backgroundColor: "#fff",
  loader: "spinner" // spinner, dots, bars
});

// Progress
import VueEllipseProgress from 'vue-ellipse-progress';
Vue.use(VueEllipseProgress);

import VCalendar from 'v-calendar';
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  // componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});
 
// vue-sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2, {
  // confirmButtonColor: "#41b882",
  // cancelButtonColor: "#ff7674",
  reverseButtons: false,
  buttonsStyling: false,
  customClass: {
    confirmButton: "btn btn-primary mx-2",
    cancelButton: "btn btn-secondary mx-2"
  }
});
// import vue-select
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);
// Vue2Editor
import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

// Moment
Vue.use(require("vue-moment"));
// FontAwesome Icon
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon';
Vue.component('v-icon', Icon);``

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

// Filters
Vue.filter('toLower', function(value){
  return value.toLowerCase();
});

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
