import { createApp } from 'vue'
import './style.css'
import './assets/style/reset.css'
import './assets/style/main.css'
import App from './App.vue'


import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faHand, faAddressBook, faCreditCard, faLemon, faHourglass, 
     faFileLines, faImage } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faXmark, faFolder, faArrowLeft, faArrowRight, faHouse, faFolderPlus, faCheck, 
     faTrash, faUpDownLeftRight, faCheckDouble   } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart, faHand, faAddressBook, faCreditCard, faLemon, faHourglass,
     faMagnifyingGlass, faXmark, faFolder, faArrowLeft, faHouse, faFolderPlus, 
     faFileLines, faCheck, faTrash, faUpDownLeftRight, faCheckDouble, faArrowRight, faImage  );


// import PrimeVue from "primevue/config";
// import Lara from '@primevue/themes/lara';
// import { definePreset } from '@primevue/themes'


const app = createApp(App)




app.component('font-awesome-icon', FontAwesomeIcon)


// const MyPreset = definePreset(Lara, {
//   semantic: {
//     primary: {
//         50: '{cyan.50}',
//         100: '{cyan.100}',
//         200: '{cyan.200}',
//         300: '{cyan.300}',
//         400: '{cyan.400}',
//         500: '{cyan.500}',
//         600: '{cyan.600}',
//         700: '{cyan.700}',
//         800: '{cyan.800}',
//         900: '{cyan.900}',
//         950: '{cyan.950}'
//         }
//       }
//     }
// );


// app.use(PrimeVue, {
//     theme: {
//       preset: MyPreset,
//     },
//     options: {
//       prefix: 'p',
//       darkModeSelector: 'system',
//       cssLayer: false
//   }

//   });






app.use(router)
app.mount('#app')


