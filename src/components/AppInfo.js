import React from 'react';

// Styles
import './AppInfo.scss';

const AppInfo = () => (
  <div className='app-info'>
    <ul className='no-list-style'>
      <li>HiGlass App: Version {VERSION_HIGLASS_APP}</li>
      <li>HiGlass Viewer: Version {VERSION_HIGLASS_VIEWER}</li>
      <li>HiGlass Server: Version ?.?.?</li>
    </ul>
    <p>
      Please report bugs at <a href='https://github.com/hms-dbmi/higlass/issues' target='_blank' rel='noopener noreferrer'>GitHub</a>.
      For questions how to use or integrate please use <a href='https://stackoverflow.com/questions/ask?tags=higlass' target='_blank' rel='noopener noreferrer'>Stackoverflow</a>.
    </p>
    <p className='copyright'>
      &copy; 2017 Harvard College
    </p>
  </div>
);

export default AppInfo;
