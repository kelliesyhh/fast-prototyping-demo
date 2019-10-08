import React from 'react';
import './Homepage.css';
import {FancyBorder} from './FancyBorder.js';
import {TextFormat} from './TextFormat.js';
import { RiskChart } from './RiskChart';

// these two arrays (SpeechDataArr and StructuredDataArr) can be changed according to the model used to generate them
// to get arrays from backend, you can use axios.get()
const SpeechDataArr = [
  {
    TimePoint: "t5",
    RiskLevel: 3,
  }, {
    TimePoint: "t6",
    RiskLevel: 4,
  },
]

const StructuredDataArr = [
  {
    TimePoint: "t1",
    RiskLevel: 1,
  }, {
    TimePoint: "t2",
    RiskLevel: 2,
  }, {
    TimePoint: "t3",
    RiskLevel: 3,
  }, {
    TimePoint: "t4",
    RiskLevel: 2,
  },
]

class Summary extends React.Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    let CombinedArr = [...StructuredDataArr, ...SpeechDataArr];
    console.log(CombinedArr);
    return (
      <div className="grid-container">
        <div className="topHeader">
          <FancyBorder color="white">
            <TextFormat header2="Summary"/>
          </FancyBorder>
        </div>
        <div className="content">
          <FancyBorder color="white">
            <TextFormat header3="Speech Data"/>
            <RiskChart riskArray={SpeechDataArr}/>
            <TextFormat header3="Structured Data"/>
            <RiskChart riskArray={StructuredDataArr}/>
            <TextFormat header3="Summary"/>
            <RiskChart riskArray={CombinedArr}/>
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

export default Summary;
