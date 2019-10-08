import React from 'react';
import './App.css';
import {Row, Col} from 'antd';

// Usage:
// to print the speech table, use <TableComponent
//   symptomArray={this.state.symptomArray}
//   noSymptomArray={this.state.noSymptomArray}
// />

const TableHeaders = props => {
  return (
    <div className="tableHeaders">
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{width: '100%', textAlign: 'center'}}
      >
        {/* span has to add up to 24 */}
        <Col span={4} className="headerCol">Symptom</Col>
        <Col span={4} className="headerCol">Activity</Col>
        <Col span={4} className="headerCol">Extent</Col>
        <Col span={4} className="headerCol">Time</Col>
        <Col span={4} className="headerCol">Frequency</Col>
        <Col span={4} className="rightHeaderCol">Location</Col>
      </Row>
    </div>
  );
};

const TableBody = props => {
  // console.log (props.noSymptomArray);
  return (
    <div className="tableBody">
      <div className="normalRows">
        {props.symptomArray.map (_item => (
          <Row type="flex" align="middle" style={{textAlign: 'center'}}>
            <Col span={4} className="tableCol">{_item.symptom}</Col>
            <Col span={4} className="tableCol">{_item.activity}</Col>
            <Col span={4} className="tableCol">{_item.extent}</Col>
            <Col span={4} className="tableCol">{_item.time}</Col>
            <Col span={4} className="tableCol">{_item.frequency}</Col>
            <Col span={4} className="rightTableCol">{_item.location}</Col>
          </Row>
        ))}
      </div>
      <div className="noSymptomHeader">
        <Row type="flex" align="middle" style={{width: '100%'}}>
          {/* span has to add up to 24 */}
          <Col span={24}>{'No Symptom:'}</Col>
        </Row>
      </div>

      <div className="nosymptomRow">
        {props.noSymptomArray.map (_item => (
          <Row type="flex" align="middle">
            {/* span has to add up to 24 */}
            <Col span={24}>{_item.nosymptom}</Col>
          </Row>
        ))}
      </div>

    </div>
  );
};

class TableComponent extends React.Component {
  render () {
    const {symptomArray, noSymptomArray} = this.props;
    return (
      <div>
        <TableHeaders />
        <TableBody
          symptomArray={symptomArray}
          noSymptomArray={noSymptomArray}
        />
      </div>
    );
  }
}

export {TableComponent};