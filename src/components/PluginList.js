import PropTypes from 'prop-types';
import React from 'react';

// Styles
import './PluginList.scss';

const PluginList = props => (
  <ul className='plugin-list flex-c flex-w-w no-list-style'>
    {props.plugins.map((plugin, index) => (
      <li key={index}>
        {plugin.title
          && (
            <a
              href={plugin.url && plugin.url}
              target='_blank'
              rel='noopener noreferrer'
              className='plugin-title'
            >
              {plugin.title}
            </a>
          )
        }
        <a href={plugin.url && plugin.url} target='_blank' rel='noopener noreferrer'>
          <figure
            className={`plugin-figure ${plugin.imageFullScreen ? 'plugin-figure-full' : ''}`}
            style={{
              backgroundImage: `url(${plugin.image ? plugin.image : ''})`,
            }}>
          </figure>
        </a>
        {plugin.description
          && <p>{plugin.description}</p>
        }
        {plugin.liveDemo
          && <div className='flex-c flex-a-c one-line'>
            <label>demo</label>
            <div className="flex-g-1">
              <a href={plugin.liveDemo} target='_blank' rel='noopener noreferrer'>
                {plugin.liveDemo}
              </a>
            </div>
          </div>
        }
        {plugin.sourceCode
          && <div className='flex-c flex-a-c one-line'>
            <label>code</label>
            <div className="flex-g-1">
              <a href={plugin.sourceCode} target='_blank' rel='noopener noreferrer'>
                {plugin.sourceCode}
              </a>
            </div>
          </div>
        }
        {plugin.npmPackageName
          && <div className='flex-c flex-a-c one-line'>
            <label>npm</label>
            <div className="flex-g-1">
              <a
                href={`https://www.npmjs.com/package/${plugin.npmPackageName}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {plugin.npmPackageName}
              </a>
            </div>
          </div>
        }
      </li>
    ))}
  </ul>
);

PluginList.propTypes = {
  plugins: PropTypes.array,
};

export default PluginList;
