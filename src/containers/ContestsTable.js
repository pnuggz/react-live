/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';

class ContestsTable extends Component {
  constructor() {
    super()
    this.state = {contestfilter: ''};
    this.allcontestFilter = this.allcontestFilter.bind(this)
    this.laligacontestFilter = this.laligacontestFilter.bind(this)
  }

  allcontestFilter() {
    this.setState({contestfilter: ''})
  }
  
  laligacontestFilter() {
    this.setState({contestfilter: 2})
  }

  //Start the loading
  componentDidMount() {
    this.props.loadContests();
  }

  render() {
    console.log(this.state.contestfilter)
    return (
      <div>
        <button onClick={this.allcontestFilter}>ALL CONTEST</button>
        <button onClick={this.laligacontestFilter}>LA LIGA</button>
        <ul>
          {this.props.contests === undefined ? (
            <div className='sweet-loading'>
              <RingLoader
                color={'#123abc'} 
              />
            </div>
          ) : (
            this.props.contests
              .filter((contest) =>
                contest.leagues_id.includes(
                  this.state.contestfilter
                )
              )
              .map((contest) => (
                <li key={contest.contest_id} league_id={contest.leagues_id}>{contest.contest_name}</li>
              ))
            )
          }
        </ul>
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
