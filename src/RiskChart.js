import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

class RiskChart extends React.Component {
  render() {
    // // the data from flask is an array of objects anyway,
    // // so can just use that instead of const data [{}, {}]
    // const data = [
    //   {
    //     timepoint: "t1",
    //     risklvl: 1,
    //     patient: "PA"
    //   },
    //   {
    //     timepoint: "t2",
    //     risklvl: 2,
    //     patient: "PA"
    //   }, 
    //   {
    //     timepoint: "t3",
    //     risklvl: 1,
    //     patient: "PA"
    //   },
    //   {
    //     timepoint: "t4",
    //     risklvl: 3,
    //     patient: "PA"
    //   }, 
    //   {
    //     timepoint: "tn",
    //     risklvl: 4,
    //     patient: "PA"
    //   },
    // ];
    const {riskArray} = this.props;
    return (
      <div>
        <Chart height={window.innerHeight} data={riskArray} forceFit>
          <Axis 
            name="TimePoint" 
            title={{ 
              offset: 35,
              textStyle: {fontSize: '12', textAlign: 'right', fill: '#999', fontWeight: 'bold' }, 
              position: 'end'}} />
          <Axis 
            name="RiskLevel"
            title={{ 
              offset: 35, 
              textStyle: {fontSize: '12', textAlign: 'right', fill: '#999', fontWeight: 'bold' }, 
              position: 'end'}}/>
          <Tooltip
            containerTpl="<div class=&quot;g2-tooltip&quot;><p class=&quot;g2-tooltip-title&quot;></p><table class=&quot;g2-tooltip-list&quot;></table></div>"
            itemTpl="<tr class=&quot;g2-tooltip-list-item&quot;><td style=&quot;color:{color}&quot;>{name}</td><td>{value}</td></tr>"
            offset={50}
            g2-tooltip={{
              position: "absolute",
              visibility: "hidden",
              border: "1px solid #efefef",
              backgroundColor: "white",
              color: "#000",
              opacity: "0.8",
              padding: "5px 15px",
              transition: "top 200ms,left 200ms"
            }}
            g2-tooltip-list={{
              margin: "10px"
            }}
          />
          <Geom type="line" position="TimePoint*RiskLevel" shape="smooth"/>
        </Chart>
      </div>
    );
  }
}
// ReactDOM.render(<RiskChart />, mountNode)
export {RiskChart}
