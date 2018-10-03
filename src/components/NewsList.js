import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

// Components
import ButtonIcon from './ButtonIcon';

// Styles
import './NewsList.scss';

const NewsList = props => (
  <ul className='news-list no-list-style'>
    {props.news.map((news, index) => (
      <li key={index}>
        <div className="news-text">
          <ReactMarkdown source={news.text} />
        </div>
        <div className="flex-c news-meta">
          <time className="news-date" dateTime={news.date}>{news.date}</time>
          <div className="flex-c news-links">
            {news.moreUrl && (
              <ButtonIcon
                icon='external'
                iconOnly={true}
                href={news.moreUrl}
                external={true}
                className='news-more'
              />
            )}
            {news.twitterUrl && (
              <ButtonIcon
                icon='twietter'
                iconOnly={true}
                href={news.twitterUrl}
                external={true}
                className='news-twitter'
              />
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

NewsList.propTypes = {
  news: PropTypes.array,
};

export default NewsList;
