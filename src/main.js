import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(store);
app.use(Toast, {
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
});

app.mount('#app');
