import React from 'react';
import ContestsTable from '../../containers/ContestsTable'
import Navigation from '../templates/Navigation'

const HomePage = () => (
  <div>
    <Navigation />
  <div id='homepage' className='container-fluid main-container'>
    <div className='container-fluid lobby no-padding no-margin box-content'>
      <div className='container lobby-header'>
        <table className='table-header'>
          <tbody>
            <tr>
              <td> 
                <br /><hr />
              </td>
              <td>
                <h1 className='lobby-text text-center'>LOBBY</h1>
              </td>
              <td> 
                <br /><hr />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='container league-filter'>
        <div className='slick-responsive slick-slider'>
          <button type='button' className='league-filter-prev slick-arrow'>PREV</button>
          <div className='slick-list draggable'>
            <div className='slick-track'>
              <div className='slick-slide slick-current slick-active all-contest'>
                <a className='btn btn-all-outlet btn-all-contest active'>ALL CONTEST</a>
              </div>
              <div className='slick-slide slick-current'>
                <a className='btn btn-all-outlet btn-barclays'>BARCLAYS PREMIER LEAGUE</a>
              </div>
              <div className='slick-slide slick-current'>
                <a className='btn btn-all-outlet btn-champions'>CHAMPIONS LEAGUE</a>
              </div>
              <div className='slick-slide slick-current'>
                <a className='btn btn-all-outlet btn-bundesliga'>BUNDESLIGA</a>
              </div>
            </div>
          </div>
          <button type='button' className='league-filter-next slick-arrow'>NEXT</button>
        </div>
      </div>
      <div className='container contest'>
        <div className='table-responsive table-lobby-container'>
          <ContestsTable />
        </div>
      </div>
    </div>
  </div>
  </div>
);

export default HomePage;