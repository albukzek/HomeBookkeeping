import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import Paginate from 'vuejs-paginate'
import tooltipDirective from '@/directives/tooltip.directives.js'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import currencyFilter from './filters/currency.filter'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader',Loader)
Vue.directive('tooltip',tooltipDirective)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyAYkZjpVJsTq9ZiR2rvlWvIjT0ffG7yYHE",
  authDomain: "vue-tregubenko.firebaseapp.com",
  databaseURL: "https://vue-tregubenko-default-rtdb.firebaseio.com",
  projectId: "vue-tregubenko",
  storageBucket: "vue-tregubenko.appspot.com",
  messagingSenderId: "52355143363",
  appId: "1:52355143363:web:53d238173e34e4da86f476",
  measurementId: "G-X4NT09YZB1"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
