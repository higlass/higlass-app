import React from 'react';

import { NavLink } from 'react-router-dom';

// Components
import ButtonLikeLink from './ButtonLikeLink';
import Icon from './Icon';

// Styles
import './Footer.scss';

const runByOrganization =
  typeof window.HGAC_RUN_BY_ORGANIZATION === 'string'
    ? window.HGAC_RUN_BY_ORGANIZATION // from compiled `config.js`
    : null;

const runByOrganizationUrl =
  typeof window.HGAC_RUN_BY_ORGANIZATION_URL === 'string'
    ? window.HGAC_RUN_BY_ORGANIZATION_URL // from compiled `config.js`
    : null;

const runBySlogan =
  typeof window.HGAC_RUN_BY_SLOGAN === 'string'
    ? window.HGAC_RUN_BY_SLOGAN // from compiled `config.js`
    : null;

const runByLogoUrl =
  typeof window.HGAC_RUN_BY_LOGO_URL === 'string'
    ? window.HGAC_RUN_BY_LOGO_URL // from compiled `config.js`
    : null;

const runByLogoOnly = !!window.HGAC_RUN_BY_LOGO_ONLY;

const runByContactUrl =
  typeof window.HGAC_RUN_BY_CONTACT_URL === 'string'
    ? window.HGAC_RUN_BY_CONTACT_URL // from compiled `config.js`
    : null;

const Footer = () => (
  <footer className="footer">
    {runByOrganization && (
      <div id="run-by">
        <div className="wrap flex-c flex-v">
          <div className="flex-c run-by-slogan">{runBySlogan || 'Run by'}</div>
          <div className="flex-c flex-a-c flex-jc-sb">
            <div className="flex-c flex-a-c">
              {runByLogoUrl && (
                <img
                  src={runByLogoUrl}
                  alt={`${runByOrganization} Logo`}
                  className="run-by-logo"
                  style={{ width: runByLogoOnly ? 'auto' : null }}
                />
              )}
              {(!runByLogoUrl || !runByLogoOnly) && (
                <span
                  className="run-by-organization"
                  style={{
                    marginBottom: !runByLogoUrl ? 0 : null
                  }}
                >
                  {runByOrganizationUrl ? (
                    <a
                      href={runByOrganizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {runByOrganization}
                    </a>
                  ) : (
                    { runByOrganization }
                  )}
                </span>
              )}
            </div>
            <div>
              {runByContactUrl && (
                <ButtonLikeLink
                  to={runByContactUrl}
                  external={true}
                  newWindow={true}
                  className="run-by-contact"
                  style={{
                    marginBottom: !runByLogoUrl ? 0 : null
                  }}
                >
                  Contact
                </ButtonLikeLink>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="wrap flex-c flex-a-c flex-jc-sb">
      <div className="flex-c flex-a-c flex-v">
        <div className="flex-c">
          <Icon iconId="logo-hms" title="Harvard Medical School" />
          <Icon
            iconId="logo-seas"
            title="Harvard John A. Paulson School of Engineering and Applied Sciences"
          />
          <Icon
            iconId="logo-mit"
            title="Masssachusetts Institute of Technology"
          />
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()}{' '}
          <NavLink to="/about#copyright">Harvard College</NavLink>.
        </p>
      </div>

      <nav>
        <ul className="flex-c flex-jc-e flex-a-s no-list-style">
          <li>
            <NavLink exact to="/" activeClassName="is-active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/about" activeClassName="is-active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/blog" activeClassName="is-active">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/examples" activeClassName="is-active">
              Examples
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/plugins" activeClassName="is-active">
              Plugins
            </NavLink>
          </li>
          <li>
            <a href="https://docs.higlass.io">Docs</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
