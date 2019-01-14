import { PropTypes } from "prop-types";
import React from "react";

const classNames = props => {
  let className = "arrow";

  className += ` arrow-${props.direction}`;

  return className;
};

const BarChart = props => (
  <div
    className={classNames(props)}
    // style={styles(props)}
  />
);

BarChart.defaultProps = {
  bins: 11,
  xAxis: false,
  yAxis: false
};

BarChart.propTypes = {
  data: PropTypes.array.required,
  bins: PropTypes.number,
  xAxis: PropTypes.bool,
  yAxis: PropTypes.bool
};

export default BarChart;
