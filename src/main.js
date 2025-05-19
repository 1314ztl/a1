import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import smart_container from './components/layoutComponent/smart_container.vue'
import head_side_body_foot from "./components/layoutComponent/head_side_body_foot.vue"
import IntSlider from "./components/states_test/IntSlider.vue"
import BoolButton from "./components/states_test/BoolButton.vue"
import EnumList from "./components/states_test/EnumList.vue"
import State_data_instance from './js/state_data_instance';
var app;

await State_data_instance.stateInstancePack.init();
app = createApp(App)
library.add(faUser, faHome)

// app.component('BoolButton', BoolButton);
// app.component('IntSlider', IntSlider);
// app.component('EnumList', EnumList);

// app.component('boolButton', BoolButton);
// app.component('intSlider', IntSlider);
// app.component('enumList', EnumList);

// app.component('boolbutton', BoolButton);
// app.component('intslider', IntSlider);
app.mount('#app')
