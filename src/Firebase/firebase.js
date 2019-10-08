import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyD0wAoRVft_vRP0EZQ7qLMlcZplyL7mAeA",
  authDomain: "structured-data-demo.firebaseapp.com",
  databaseURL: "https://structured-data-demo.firebaseio.com",
  projectId: "structured-data-demo",
  storageBucket: "structured-data-demo.appspot.com",
  messagingSenderId: "367739181740",
  appId: "1:367739181740:web:90132fda49be89e3"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}
export default Firebase;