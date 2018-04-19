console.log('draftContestApi')
class DraftContestAPI {
  static getContest(league_id, contest_id, token) {
    const url = `http://api.dailysportboss.com/lobby/contestdetails/${league_id}/${contest_id}`;
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

export default DraftContestAPI;
 