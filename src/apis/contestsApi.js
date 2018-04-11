let url = 'http://api.dailysportboss.com/lobby/contests';

class ContestsAPI {

  static getContests() {
    return(
      fetch(url)
    );
  }
}

export default ContestsAPI;
 