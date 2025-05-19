import './assets/main.css'
import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, text } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import IntSlider from "./components/states_test/IntSlider.vue"
import BoolButton from "./components/states_test/BoolButton.vue"
import EnumList from "./components/states_test/EnumList.vue"
import example from './components/basicComponent/example.vue';
import State_data_instance from './js/state_data_instance';

State_data_instance.stateInstancePack.init().then(()=>{

    var userView;
    const render=()=>{
        userView = createApp({
            data(){
                return{
                    text:"hello"
                }
            }
        })
        //createApp(App).mount('#app')
        library.add(faUser, faHome)
        
        // app.component('BoolButton', BoolButton);
        // app.component('IntSlider', IntSlider);
        // app.component('EnumList', EnumList);
        
        userView.component('boolbutton', BoolButton);
        userView.component('intslider', IntSlider);
        userView.component('enumlist', EnumList);
        userView.component('example', example);
        userView.config.globalProperties.$devtools = true;
        userView.mount('#userView');
    
    }
    if(window.parent.theAiHtml!=null){
        document.getElementById('aiHtml').innerHTML = window.parent.theAiHtml;
        document.getElementById('aiCss').innerHTML = window.parent.theAiCss;
        document.getElementById('aiJs').innerHTML = window.parent.theAiJs;
    }
    else{
        document.getElementById('aiHtml').innerHTML=`
            <example></example>
            <boolbutton dataApiName="chandelier_power_living_room"></boolbutton>
        `;
    }
    render();
});
