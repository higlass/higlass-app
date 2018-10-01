import PropTypes from 'prop-types';
import React from 'react';

// Components
import Icon from './Icon';

// Styles
import './RangeSelectionViewer.scss';

const getValue = (rangeSelection, axis, locus) => {
  let val = 'Unknown';

  try {
    const idx = 2 * locus;
    val = `${rangeSelection[axis][idx]}: ${rangeSelection[axis][idx + 1]}`;
  } catch (e) {
    // Nothing
  }

  return val;
};

const RangeSelectionViewer = props => (
  <div className='range-selection-viewer'>
    {props.isHeadingShown
      && <h4 className='range-selection-headline'>Range Selection</h4>
    }
    {props.center && (
      <div className='flex-c range-selection-viewer-center'>
        <Icon iconId='center' />
        <div className='flex-c flex-g-1'>
          <strong className='axis'>X</strong>
          <div className='flex-g-1'>
            {getValue(props.center, 0, 0)}
          </div>
          <div className='range-selection-separator'>&mdash;</div>
          <strong className='axis'>Y</strong>
          <div className='flex-g-1'>
            {getValue(props.center, 1, 0)}
          </div>
        </div>
      </div>
    )}
    <div className='flex-c range-selection-viewer-x'>
      <Icon iconId='arrow-bottom-from-right' />
      <div className='flex-c flex-g-1'>
        <strong className='axis'>X</strong>
        <div className='flex-g-1'>
          {getValue(props.rangeSelection, 0, 0)}
        </div>
        <div className='range-selection-separator'>&mdash;</div>
        <div className='flex-g-1'>
          {getValue(props.rangeSelection, 0, 1)}
        </div>
      </div>
    </div>
    <div className='flex-c range-selection-viewer-y'>
      <Icon
        iconId='arrow-right-with-body'
        mirrorV={true} />
      <div className='flex-c flex-g-1'>
        <strong className='axis'>Y</strong>
        <div className='flex-g-1'>
          {getValue(props.rangeSelection, 1, 0)}
        </div>
        <div className='range-selection-separator'>&mdash;</div>
        <div className='flex-g-1'>
          {getValue(props.rangeSelection, 1, 1)}
        </div>
      </div>
    </div>
  </div>
);

RangeSelectionViewer.propTypes = {
  isHeadingShown: PropTypes.bool,
  rangeSelection: PropTypes.array,
  center: PropTypes.array,
};

export default RangeSelectionViewer;
