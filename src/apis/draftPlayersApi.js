console.log('draftPlayersApi')
class DraftPlayersAPI {
  static getPlayers(league_id, contest_id, token) {
    const url = `http://api.dailysportboss.com/lobby/players/${contest_id}`;
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

export default DraftPlayersAPI;
 