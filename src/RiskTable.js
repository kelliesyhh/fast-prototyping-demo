import React from 'react';
import './App.css';
import {Row, Col} from 'antd';

// Usage:
// to print the risk table, use <TableComponent riskArray={riskArrayHere}/>

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
        <Col span={12} className="headerCol">Time Point</Col>
        <Col span={12} className="rightHeaderCol">Risk Level</Col>
      </Row>
    </div>
  );
};

const TableBody = props => {
  return (
    <div className="tableBody">
      {props.riskArray.map (_item => (
        <Row type="flex" align="middle" style={{textAlign: 'center'}}>
          <Col span={12} className="tableCol">{_item.TimePoint}</Col>
          <Col span={12} className="rightTableCol">{_item.RiskLevel}</Col>
        </Row>
      ))}
    </div>
  );
};

class TableComponent extends React.Component {
  render () {
    const {riskArray} = this.props;
    return (
      <div>
        <TableHeaders />
        <TableBody riskArray={riskArray} />
      </div>
    );
  }
}

export {TableComponent};
