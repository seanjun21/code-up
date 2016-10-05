import React from 'react';
import {connect} from 'react-redux';
import UserName from './user-name';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';

function NavBar () {
  return (
    <div className="nav-bar">
      <center className="wrapper">
        <table className="outer" width="100%">
          <tr>
            <td className="content">
              <div className="nav-column title-column">
                <table className="inner" width="100%">
                  <tr>
                    <td className="inner-col">
                      <div className="title">
                        <h1 id="app-name"><Link to="/">Code Roulette</Link></h1>
                        <h4 id="beta">beta</h4>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="nav-column input-column">
                <table className="inner" width="100%">
                  <tr>
                    <td className="inner-col">
                      <UserName />
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </center>
    </div>
  );
}

export default NavBar;
