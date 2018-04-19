/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';

import loadDraftContest from '../actions/loadDraftContest'
import loadDraftEvents from '../actions/loadDraftEvents'
import loadDraftPlayers from '../actions/loadDraftPlayers'
import { contestTime } from '../lib/contestTime'

function splitURI(inputURI) {  
  const splitURI = inputURI.split('/');
  if(splitURI.count == 0){
      return null;
  }
  return splitURI
}

function searchPlayer(value, draftPlayers) {
  if(draftPlayers !== undefined) {
    const searchResult = draftPlayers.filter(player => (player.first_name.includes(value) || player.last_name.includes(value)))
    this.setState({players: searchResult})

  }
}

class Draft extends Component {
  constructor(props) {
    super(props)
    this.state = {countdownTimer: '00:00:00:00'}
    this.setState({players: [{
      player_phase_id: '',
      first_name: '',
      last_name: '',
      team_phase_id: '',
      team_name: '',
      team_shorthand: '',
      descrip: '',
      pos: '',
      role: '',
      oppid: '',
      opp_team_name: '',
      opp_team_shorthand: '',
      fp_avg: '',
      fp_form: '',
      salary: '',
      selected: false
    }]})
  }

  //Start the loading
  componentDidMount() {
    const complete_uri = window.location.href
    const uri = splitURI(complete_uri)
    
    const league_id = 1
    const contest_id = 21

    this.props.loadDraftContest(league_id, contest_id);
    this.props.loadDraftEvents(league_id, contest_id)
    this.props.loadDraftPlayers(league_id, contest_id)

    setInterval(function () {
      if(this.props.draftContest.start_date) {
        let countdown = contestTime(this.props.draftContest.start_date, this.props.draftContest.start_time)
        this.setState({countdownTimer: countdown})
      }
    }.bind(this), 1000);
  }

  render() {
    const { draftContest, draftEvents, draftPlayers } = this.props
    let salery_rem = 100000
    let playerCount = document.getElementById('table-selected-player')

    // this.state.players = draftPlayers
    // console.log(this.state.players)

    if(draftPlayers != undefined) {
      console.log(draftPlayers.filter(player => player.first_name.includes('Alex')))
    }

    return (
      <div className='container-fluid lobby no-padding no-margin box-content'>
        <div className="container container-1">  
          <div className="row row-1 visible-md visible-lg">
            <table className="table-header">
              <tbody>
                <tr>
                  <td>
                    <br />
                    <hr />
                  </td>
                  <td>
                    <h1 className="text-center">TEAM DRAFT</h1>
                  </td>
                  <td>
                    <br />
                    <hr />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="container container-2">
          <div className="visible-md visible-lg clearfix">
            <div className="col-sm-12 col-md-12 col-lg-12 contest-name">
              <h4 ng-click="showContestModal()"><span id="step3">{draftContest.contest_name}</span></h4>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 entry-contest">
              <div className="col-sm-6 col-md-6 col-lg-6 entry-box">
                <div className="col-sm-12 col-md-12 col-lg-12 size-box">
                  {draftContest != undefined ? (
                  <h4 className="has-data" ng-if="!noData.contest">
                    <span> Entry Size:</span> {draftContest.entry_count} / {draftContest.entry_max}
                  </h4>
                  ) : (
                  <h4 ng-if="noData.contest">
                    Loading...
                  </h4>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 number-box">
                  {draftContest != undefined ? (
                  <h4 className="has-data" ng-if="!noData.contest">
                    <span>User Entry:</span> {draftContest.user_entry_count} / {draftContest.entry_max_register}
                  </h4>
                  ) : (
                  <h4 ng-if="noData.contest">
                    Loading...
                  </h4>
                  )}
                </div>
              </div>
              <div className=" col-sm-6 col-md-6 col-lg-6 prize-box">
                <span>PRIZE</span>
                {draftContest != undefined ? (
                <h3 className="orange-text" ng-if="!noData.contest">{draftContest.prize}</h3>
                ) : (
                <h3 ng-if="noData.contest">
                  Loading...
                </h3>
                )}
              </div>
            </div>
            {draftContest != undefined ? (
            <div className="col-sm-6 col-md-6 col-lg-6 img-box" ng-if="!noData.contest">
              <img className="image visible-md visible-lg" src={draftContest.sponsorbannerdesktop} alt="placeholder image" height="110px" width="100%"></img>
            </div>
            ) : (
            <div className="col-sm-6 col-md-6 col-lg-6 img-box" ng-if="noData.contest">
              Loading...
            </div>
            )}           
          </div>
        </div>

        <div className="container container-3">
          <div className="visible-md visible-lg clearfix">
            <div className="col-md-6 col-xs-12 col-sm-12 col-lg-6 box-input-section">
                <div id="step12" className="col-md-6 col-xs-12 col-sm-12 col-lg-6 box-input">
                  {draftPlayers != undefined ? (
                  <input type="text" className="form-control player_name" placeholder="Search a Player" onChange={searchPlayer(event => searchPlayer(event.target.value), draftPlayers)} />
                  ) : (
                    <input type="text" className="form-control player_name" placeholder="Search a Player"/>
                  )}
                </div>
                <div id="step13" className="col-md-6 col-xs-12 col-sm-12 col-lg-6 box-select">
                  <select ng-model="selectedEventId" className="form-control">
                    <option value="[0,0,0]" defaultValue>Filter By Matches - All</option>
                    {draftEvents != undefined ? (
                    draftEvents.map(event =>
                    <option ng-repeat="option in events" ng-value={'"[' + event.team_name_home + ', ' + event.team_name_away + ', ' + event.eventsid + ']"'}>
                      {event.team_full_away + ' @ ' + event.team_full_home}
                    </option>
                    )) : (
                    <option>Loading...</option>
                    )}
                  </select>
                </div>
            </div>
            <div className="col-md-6 col-xs-12 col-sm-12 col-lg-6 box-timer">
              <table className="table-header visible-md visible-lg">
                <tbody>
                  <tr>
                    <td>
                      <hr />
                    </td>
                    <td>
                      {draftContest != undefined ? (
                      <h3 className="text-center" ng-if="!noData.contest">
                        {this.state.countdownTimer}
                      </h3>
                      ) : (
                      <h3 className="text-center" ng-if="noData.contest">
                        <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
                      </h3>
                      )}
                    </td>
                    <td>
                      <hr/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container container-4">
          <div className="visible-md visible-lg clearfix">

            <div className="col-sm-12 col-md-6 col-lg-6 player-section">
                <div id="step14" className="col-sm-12 col-md-12 col-lg-12 player-filter">
                  <button className="btn btn-filter" ng-click="posFilter = '';activeMenu = 'all'" ng-className="{active : activeMenu === 'all'}">
                    All
                  </button>
                  <button className="btn btn-filter" ng-click="posFilter = 'forward';activeMenu = 'forward'" ng-className="{active : activeMenu === 'forward'}">
                    Forward
                  </button>
                  <button className="btn btn-filter" ng-click="posFilter = 'midfielder';activeMenu = 'midfielder'" ng-className="{active : activeMenu === 'midfielder'}">
                    Midfielder
                  </button>
                  <button className="btn btn-filter" ng-click="posFilter = 'defender';activeMenu = 'defender'" ng-className="{active : activeMenu === 'defender'}">
                    Defender
                  </button>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 table-container">
                  <div className="table-container-head">
                    <table className="table players-head">
                      <thead>
                        <tr id="step15" className="table-players-thead">
                            <th className="th-name" ng-click="orderByFilter('first_name')">
                              PLAYER NAME
                            </th>
                            <th className="th-opp" ng-click="orderByFilter('opp_team_name')">OPPONENT</th>
                            <th className="th-avg_fp" ng-click="orderByFilter('fp_avg')">AVG. FP</th>
                            <th className="th-form" ng-click="orderByFilter('fp_form')">FORM</th>
                            <th className="th-salary" ng-click="orderByFilter('salary')">SALARY</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  {draftPlayers != undefined ? (
                  <div className="table-container-body" ng-scrollbars ng-scrollbars-config="config" ng-if="!noData.players">
                    <table className="table players">
                      <tbody>
                        {draftPlayers.map(player =>
                        <tr repeat-done-contest id="step6" className="table-players-tbody" ng-repeat="player in (filteredPlayers = (players | customMatch:selectedEventId | filter:posFilter | filter:player_name | orderBy:orderByStatus:reverse | limitTo:displayPlayerCount))"  ng-if="player.selected == false">
                            <td className="td-name-pos-team">
                              <span className="first-row">
                                <a id="step7" ng-click="detailsPlayer(player)">{player.first_name} {player.last_name}</a>
                              </span>
                              <span className="second-row">
                                <span>{player.pos.slice(0, 3).toUpperCase()}</span> - <span> {player.team_name}</span>
                              </span>
                            </td>
                            <td className="td-opponent">
                              <span ng-if="player.opp_team_name == contest.team_full_home">@</span><span className="first-row">{player.opp_team_name}</span>
                              <span id="step72" className="role" ng-className="{'reserve': player.role == 'Reserve', 'bench': player.role == 'Bench', 'starter': player.role == 'Starter', }">
                                {player.role.slice(0, 1).toUpperCase()}
                              </span>
                            </td>
                            <td className="td-avg-fp">
                              <span id="step8" className="first-row">{player.fp_avg}</span>
                            </td>
                            <td className="td-form">
                              <span id="step9" className="first-row">{player.fp_form}</span>
                            </td>
                            <td className="td-salary">
                              <span id="step10" className="first-row">${player.salary}</span>
                            </td>
                            <td className="td-action">
                              <button ng-click="selectPlayer(player, $event.stopPropagation())">
                                <i className="glyphicon glyphicon-plus" aria-hidden="true"></i>
                              </button>
                            </td>
                        </tr>
                        )}
                        {draftPlayers.length == 0 ? (
                        <tr className="table-players-tbody" ng-if="!players.length">
                          <td className="td-no-data">
                            NO PLAYERS DATA
                          </td>
                        </tr>
                        ) : (
                          null
                        )}
                      </tbody>
                    </table>
                  </div>
                  ) : (
                  <div className="table-container-body" ng-if="noData.players">
                    Loading...
                  </div>
                  )}
                </div>
            </div>
            
            <div className="col-sm-12 col-md-6 col-lg-6 draft-section">
              <div className="col-sm-12 col-md-12 col-lg-12 draft-details">
                <span className="heading">ROSTER NAME</span>
                <div id="step16" className="draft-name-container">
                  <input type="text" className="form-control" placeholder="Insert Your Roster Name" ng-model="draftName" />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 table-container">
                <div className="table-container-head">
                  <span className="heading">YOUR TEAM</span>
                  <div id="step5" className="draft-salary-container">
                    <span className="label">Salary Remaining</span>
                    <span className="value">${salery_rem}</span>
                  </div>
                  <div className="avg-salary">
                    <span className="label">Avg/Player</span>
                    <span className="value" ng-if="events.length < 5 && (playerCount > 0 && playerCount < 7)">
                      ${salery_rem/(7-(playerCount))}
                    </span>
                    <span className="value" ng-if="events.length > 5 && (playerCount > 0 && playerCount < 10)">
                      ${salery_rem/(10-(playerCount))}
                    </span>

                    <span className="value" ng-if="events.length < 5 && playerCount > 6">
                    -
                    </span>
                    <span className="value" ng-if="events.length > 5 && playerCount > 9">
                    -
                    </span>

                    <span className="value" ng-if="events.length < 5 && playerCount < 1">
                      ${salery_rem/7}
                    </span>
                    <span className="value" ng-if="events.length > 5 && playerCount < 1">
                      ${salery_rem/10}
                    </span>
                  </div>
                </div>
                <div className="table-container-body" ng-scrollbars ng-scrollbars-config="config" ng-if="!noData.roster">
                  <table className="table table-selected-player">
                    <tbody>
                      <tr className="table-selected-tbody" ng-repeat="player in players_select track by $index" ng-className="{'no-player': !player.selected}">
                        {/* <td className="td-name-pos-team">
                          <span className="first-row">
                            <a ng-click="detailsPlayer(player)">{player.first_name} {player.last_name}</a>
                          </span>
                          <span className="second-row" ng-if="player.selected == true">
                            <span style="color: #FF921E;">{player.pos.slice(0, 3).toUpperCase()}</span> - <span style="font-size: 12px; line-height: 14px;">{player.team_name}
                            </span>
                          </span>
                          <span className="second-row" ng-if="player.selected == false">
                            <span style="color: #FF921E;">{player.pos.slice(0, 3).toUpperCase()}</span>
                          </span>
                        </td>
                        <td className="td-opponent">
                          <span className="first-row">{player.opp_team_name}</span>
                          <span className="role" ng-className="{'reserve': player.role == 'Reserve', 'bench': player.role == 'Bench', 'starter': player.role == 'Starter', }">
                            {player.role.slice(0, 1).toUpperCase()}
                          </span>
                        </td>
                        <td className="td-avg-fp">
                          <span className="first-row">{player.fp_avg}</span>
                        </td>
                        <td className="td-form">
                          <span className="first-row">{player.fp_form}</span>
                        </td>
                        <td className="td-salary">
                          <span className="first-row">${player.salary}</span>
                        </td>
                        <td className="td-action">
                          <button ng-click="removePlayer($index, player)" ng-if="player.selected == true">
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </button>
                          <button ng-click="onButtonClick(player.pos)" ng-if="player.selected == false">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>          
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <a href='' ng-click='downloadCSV({ filename: "players-data.csv", data:players });' className="btn btn-float-right btn-submit-draft">EXPORT</a>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div ng-if="events.length < 5">
                  <button className="btn btn-float-right btn-submit-draft" ng-click="draftTeamClick()" ng-disabled="playerCount < 7 || salery_rem < 0">
                    DRAFT TEAM
                  </button>
                </div>
                <div ng-if="events.length > 5">
                  <button className="btn btn-float-right btn-submit-draft" ng-click="draftTeamClick()" ng-disabled="playerCount < 10 || salery_rem < 0">
                    DRAFT TEAM
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> 
    );
  }
}


Draft.propTypes = {
  draftContest : PropTypes.object,
  draftEvents: PropTypes.array,
  draftPlayers : PropTypes.array
};

const mapStateToProps =(state) => ({
  draftContest : state.draftContest.draftContest,
  isLoading : state.draftContest.isLoading,
  draftEvents : state.draftEvents.draftEvents,
  draftPlayers : state.draftPlayers.draftPlayers
});

function mapDispatchToProps(dispatch) {
  return {
    loadDraftContest : function(league_id, contest_id) {
      return dispatch(loadDraftContest({league_id, contest_id}));
    },
    loadDraftEvents : function(league_id, contest_id) {
      return dispatch(loadDraftEvents({league_id, contest_id}));
    },
    loadDraftPlayers : function(league_id, contest_id) {
      return dispatch(loadDraftPlayers({league_id, contest_id}));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);
