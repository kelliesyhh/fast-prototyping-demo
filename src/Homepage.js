import React from 'react';
import './Homepage.css';
import {FancyBorder} from './FancyBorder.js';
import {TextFormat} from './TextFormat.js';
import {Card, Icon, Avatar} from 'antd';

const {Meta} = Card;
const description = (
  <div>
    <p />
    <p>
      A web application to enable evaluations of novel language technologies for improving workflow efficiencies
      in a hospital telehealth setting.
    </p>
    <p>
      Click on the above links to navigate between the Home Page, Speech Data Demo, Structured Data Demo and Summary.
    </p>
  </div>
);

class Homepage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return (
      <div className="grid-container">
        <div className="topHeader">
          <FancyBorder color="white">
            <TextFormat header2="Home Page" />
            {/* <TextFormat normalText="This is the home page"/> */}
          </FancyBorder>
        </div>
        <div className="content">
          <FancyBorder color="white">
            <Card>
              <Card.Meta
                // avatar={<Avatar src="/static/images/avatar.jpg" />}
                title="Description"
                description={description}
              />
            </Card>
          </FancyBorder>
        </div>
        <div className="credits">
          <FancyBorder color="white">
            <TextFormat credits="© Kellie Sim 2019 | Made with React and Flask" />
          </FancyBorder>
        </div>
      </div>
    );
  }
}

export default Homepage;
