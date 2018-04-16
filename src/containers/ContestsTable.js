/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';

import loadContests from '../actions/loadContests'

class ContestsTable extends Component {
  constructor() {
    super()
    this.state = {contestfilter: ''};
    this.allcontestFilter = this.allcontestFilter.bind(this)
    this.premiercontestFilter = this.premiercontestFilter.bind(this)
    this.laligacontestFilter = this.laligacontestFilter.bind(this)
  }

  allcontestFilter() {
    this.setState({contestfilter: ''})
  }
  
  premiercontestFilter() {
    this.setState({contestfilter: 1})
  }

  laligacontestFilter() {
    this.setState({contestfilter: 2})
  }

  //Start the loading
  componentDidMount() {
    this.props.loadContests();
  }

  render() {
    return (
      // <div>
        // <button onClick={this.allcontestFilter}>ALL CONTEST</button>
        // <button onClick={this.laligacontestFilter}>LA LIGA</button>
      //   <ul>
      //     {this.props.contests === undefined ? (
      //       <div className='sweet-loading'>
      //         <RingLoader
      //           color={'#123abc'} 
      //         />
      //       </div>
      //     ) : (
      //       this.props.contests
      //         .filter((contest) =>
                // contest.leagues_id.includes(
                //   this.state.contestfilter
                // )
      //         )
      //         .map((contest) => (
      //           <li key={contest.contest_id} league_id={contest.leagues_id}>{contest.contest_name}</li>
      //         ))
      //       )
      //     }
      //   </ul>
      // </div>
      <div>
        <button onClick={this.allcontestFilter}>ALL CONTEST</button>
        <button onClick={this.premiercontestFilter}>BARCLAYS PREMIER LEAGUE</button>
        <button onClick={this.laligacontestFilter}>LA LIGA</button>

        {this.props.contests === undefined ? (
          <div className='sweet-loading'>
            <RingLoader
              color={'#123abc'} 
            />
          </div>
        ) : (
      <table className="table table-lobby">
        <thead>
          <tr className="table-lobby-thead">
              <th>
                <h5 className="circular-header">CONTEST</h5>
              </th>
              <th>
                <h5 className="circular-header">SPONSOR</h5>
              </th>
              <th>
                <h5 className="circular-header">TOTAL PRIZE</h5>
              </th>
              <th>
                <h5 className="circular-header" >ENTRY</h5>
              </th>
              <th>
                <h5 className="circular-header">START</h5>
              </th>
              <th> </th>
          </tr>
        </thead>
        <tbody>

          {(this.props.contests === undefined || 
            this.props.contests
              .filter(contest => contest.leagues_id
                .includes(this.state.contestfilter)).length === 0) ? (

            <tr className="table-lobby-tbody no-data">
              <td>
                <h3>No Contest Available</h3>
              </td>
            </tr>
          ) : (
            this.props.contests
              .filter(contest => 
                contest.leagues_id.includes(this.state.contestfilter))
              .map(contest => 
            <tr className="table-lobby-tbody" key={contest.contest_id}>
                <td id="step5" >
                <span className="value">
                    <span>League: </span><span className="value-league">{contest.league_name}</span>
                </span>
                <span className="value-name">{contest.contest_name}</span><br/>
                
                <span className="value-entry-max">{contest.entry_max_register > 1 ? 'Multiple Entries Allowed' : 'Single Entry'}</span>
                {/* <span className="value-entry-max" style="font-weight: normal; padding: 0px 7px 0px 7px; text-decoration: none; text-align: left;">Single Entry</span>' */}
                </td>
                <td>
                  <img src="{contest.sponsorlogodesktop}" className="img-responsive"/>
                </td>
                <td id="step6">
                <span className="value value-big text-bold">{contest.prize}</span><br/>
                <span className="value">
                    <span>Entry Fee: </span>
                    <span>
                        <span className="text-bold">FREE</span>
                    </span>
                </span>
                {/* <span className="value" style="font-weight: normal;" ng-if="contest.entry_fee > 0">
                    <span ng-show="language == 'EN'">Entry Fee: </span>
                    <span ng-show="language == 'IND'">Harga Entry: </span>
                    <span style="font-weight: bold">{{contest.entry_fee}}</span>
                </span> */}
                </td>
                <td id="step7">
                  <span className="value value-big">{contest.entry_count} / {contest.entry_max}</span>
                  {/* <span className="value" ng-if="contest.entry_fee < 1">User Entry: <span style="font-weight: bold">-</span></span> */}
                  <span className="value">User Entry: <span>{contest.user_entry_count}</span></span>
                </td>
                <td id="step8">
                <span className="value value-big">{contest.start_date}</span>
                <span className="value value-big">{contest.start_time}*</span>
                </td>
                <td className="action">
                <a>
                    <img className="img-responsive" src="/assets/button_enter_idle.png" alt="" />
                </a>
                </td>
            </tr>
            )
          )}
        </tbody>
      </table>
      )}
      </div>
    );
  }
}


ContestsTable.propTypes = {
  contests : PropTypes.array,
};

const mapStateToProps =(state) => ({
  contests : state.contests.contests,
  isLoading : state.contests.isLoading,
  contestfilter : state.contests.contestfilter
});

function mapDispatchToProps(dispatch) {
  return {
    loadContests : function() {
      return dispatch({type: 'LOAD_CONTEST'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestsTable);
