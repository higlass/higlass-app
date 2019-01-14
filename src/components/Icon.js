import { PropTypes } from "prop-types";
import React from "react";

// Config
import icons, { WARNING } from "../configs/icons";

// Styles
import "./Icon.scss";

const wrapHtml = html => ({ __html: html });

const getClassName = props => {
  let className = `icon icon-${props.iconId}`;

  if (props.mirrorH) className += " is-mirror-h";
  if (props.mirrorV) className += " is-mirror-v";
  if (props.isInline) className += " is-inline";

  return className;
}

const getSvg = id => wrapHtml(icons[id] ? icons[id].svg : WARNING.svg);

const getFillRule = id =>
  icons[id] && icons[id].fillRule ? icons[id].fillRule : "";

const getViewBox = id =>
  icons[id] && icons[id].viewBox ? icons[id].viewBox : "0 0 16 16";

const convertId = id => (id ? id.replace(/-/g, "_").toUpperCase() : "");

const Icon = props => (
  <span
    className={getClassName(props)}
    title={props.title}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="full-dim"
      viewBox={getViewBox(convertId(props.iconId))}
      fillRule={getFillRule(convertId(props.iconId))}
      dangerouslySetInnerHTML={getSvg(convertId(props.iconId))}
    />
  </span>
);

Icon.defaultProps = {
  isInline: false
};

Icon.propTypes = {
  iconId: PropTypes.string.isRequired,
  isInline: PropTypes.bool,
  mirrorH: PropTypes.bool,
  mirrorV: PropTypes.bool,
  title: PropTypes.string
};

export default Icon;
