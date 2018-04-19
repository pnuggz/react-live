console.log('draftEventsApi')
class DraftEventsAPI {
  static getEvents(league_id, contest_id, token) {
    const url = `http://api.dailysportboss.com/lobby/events/${contest_id}`;
    console.log(url)
    return(
      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": token
        }
      })
    );
  }
}

export default DraftEventsAPI;
 