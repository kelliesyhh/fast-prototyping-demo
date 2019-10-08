// must have for all React apps
import React from 'react';

// declaring arrays of objects
const dataArray = [
  {
    TimePoint: 't1',
    RiskLvl: 2,
  },
  {
    TimePoint: 't2',
    RiskLvl: 3,
  },
];

// mapping arrays of objects
dataArray.map (_item => {
  inputArray.push (_item);
});

// axios post and get
axios
  .post (FLASK_URL + '/route', {valuesToPost})
  .then (function (response) {
    console.log ('Response: ' + JSON.stringify (response.data));
    // whatever you want to do with the response data
  })
  .catch (function (error) {
    console.log ('Error: ' + error);
  });
axios
  .get (FLASK_URL + '/route')
  .then (function (response) {
    console.log ('Response: ' + JSON.stringify (response.data));
    // whatever you want to do with the response data
  })
  .catch (function (error) {
    console.log ('Flask Returns E: ' + error);
  });

// setting timeouts or delays
var millisecondsToWait = 3000;
setTimeout (() => {
  // Whatever you want to do after the wait
}, millisecondsToWait);

// using firebase on the frontend
firebase
  .storage ()
  .ref ('uploads')
  .child (filename)
  .getDownloadURL ()
  .then (url => this.setState ({fileURL: url}));
console.log (this.state.fileURL);

// and wrap the main JS file (in this case App.js) with this
<FirebaseContext.Provider value={new Firebase ()}>
  <App />
</FirebaseContext.Provider>;

// sample of a class extending React.Component
class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      // insert states here
      // states are where you store property values that belongs to the component
      // when the state object changes, the component re-renders
      stateName: '',
      anotherStateName: '',
    };
  }

  render () {
    // to set states, use
    this.setState ({stateName: newStateValue});
    return (
      // insert things to return here
      console.log ('hi')
    );
  }
}
export default App;
