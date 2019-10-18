import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import {ApiService} from './services/api.service'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import VModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue'

window.toastr = require('toastr');

// Set the base URL of the API
// ApiService.init('http://localhost:8001/api/v1');
ApiService.init('http://167.71.249.56/api/v1');

if (store.dispatch('isLoggedIn'))
    ApiService.setHeader(store.getters.GET_AUTH_TOKEN);
else
    store.dispatch('UNSET_USER').then(() => {
    });

Vue.config.productionTip = false;

Vue.use(VModal, {dialog: true, dynamic: true, injectModalsContainer: true});
Vue.use(VueToastr2);
Vue.use(BootstrapVue);
Vue.mixin({
    created: function () {
        let myScripts = this.$options.scripts;

        if (myScripts) {
            // window.console.log("+++Loading all scripts+++");
            myScripts.forEach(function (sc) {
                // var newScript = document.createElement("script");
                // newScript.src = sc;
                let f = document.getElementById('dyn');
                // window.console.log(f);
                document.getElementById('dyn').src = sc;
            });

        }
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


