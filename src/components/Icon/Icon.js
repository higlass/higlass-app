import { PropTypes } from 'prop-types';
import React from 'react';

import icons, { WARNING } from '../../configs/icons';

const getSvg = id => wrapHtml(icons[id] ? icons[id].svg : WARNING.svg);

const getFillRule = id => icons[id] && icons[id].fillRule ?
  icons[id].fillRule : '';

const getViewBox = id => icons[id] && icons[id].viewBox ?
  icons[id].viewBox : '0 0 16 16';

const id = id => id ? id.replace(/-/g, '_').toUpperCase() : '';

const wrapHtml = html => ({ __html: html });

const Icon = (props) => (
  <div className="svg-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={getViewBox(id(props.iconId))}
      fillRule={getFillRule(id(props.iconId))}
      dangerouslySetInnerHTML={getSvg(id(props.iconId))} />
  </div>
)

Icon.propTypes = {
  iconId: PropTypes.string.isRequired
}

export default Icon;
