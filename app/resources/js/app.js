import './bootstrap.js';

import Vue from 'vue';
import Home from './components/Home';
import Sidebar from './components/partials/Sidebar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import { faHistory} from '@fortawesome/free-solid-svg-icons'
import { faChartBar} from '@fortawesome/free-solid-svg-icons'
import { faWrench} from '@fortawesome/free-solid-svg-icons'



import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faPlayCircle, faHistory, faChartBar, faWrench)
Vue.config.productionTip = false

new Vue({
    el: '#app',

    components: {
        Home,
        Sidebar,
        FontAwesomeIcon
    },

});
