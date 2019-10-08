import React from 'react';
import './App.css';
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom';
import {FancyBorder} from './FancyBorder.js';
import {TextFormat} from './TextFormat.js';
import Homepage from './Homepage.js';
import SpeechData from './SpeechData.js';
import StructuredData from './StructuredData.js';
import Summary from './Summary.js';
import {Row, Col, Divider} from 'antd';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return (
      <div className="grid-container">
        <div className="title">
          <FancyBorder color="white">
            <TextFormat header1="Fast Prototyping" />
          </FancyBorder>
        </div>
        <div className="home">
          <FancyBorder color="white">
            <Router>
              <Row type="flex" justify="middle">
                <Col span={4} />
                <Col span={4} style={{textAlign: 'center'}}>
                  <Link to="/">
                    Home Page
                  </Link>
                </Col>
                <Divider type="vertical" />
                <Col span={4} style={{textAlign: 'center'}}>
                  <Link to="/SpeechData">
                    Speech Data
                  </Link>
                </Col>
                <Divider type="vertical" />
                <Col span={4} style={{textAlign: 'center'}}>
                  <Link to="/StructuredData">
                    Structured Data
                  </Link>
                </Col>
                <Divider type="vertical" />
                <Col span={4} style={{textAlign: 'center'}}>
                  <Link to="/Summary">
                    Summary
                  </Link>
                </Col>
                <Col span={4} />
              </Row>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/home" component={Homepage} />
                <Route path="/SpeechData" component={SpeechData} />
                <Route path="/StructuredData" component={StructuredData} />
                <Route path="/Summary" component={Summary}/>
              </Switch>
            </Router>
          </FancyBorder>
        </div>
      </div>
    );
  }
}

export default App;
