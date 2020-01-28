import React from 'react';

// Components
import DropDownContent from './DropDownContent';
import DropDownTrigger from './DropDownTrigger';
import TopBarButtonLikeSpan from './TopBarButtonLikeSpan';
import TopBarDropDown from './TopBarDropDown';


const TopBarDropDownDocs = () => (
  <TopBarDropDown
    alignRight
    closeOnOuterClick
    closeOnMouseLeave
  >
    <DropDownTrigger openOnMouseEnter>
      <TopBarButtonLikeSpan>Docs</TopBarButtonLikeSpan>
    </DropDownTrigger>
    <DropDownContent>
      <nav>
        <li>
          <a
            href="https://docs.higlass.io"
            className="menu-button-like-link"
          >
            User Docs
          </a>
        </li>
        <li>
          <a
            href="https://docs-python.higlass.io"
            className="menu-button-like-link"
          >
            Python Developer Docs
          </a>
        </li>
      </nav>
    </DropDownContent>
  </TopBarDropDown>
);

export default TopBarDropDownDocs;
