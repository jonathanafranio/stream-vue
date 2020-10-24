import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './../node_modules/bulma/css/bulma.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/main.sass';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
