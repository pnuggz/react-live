const loadDraftPlayers = function loadDraftPlayers ({league_id, contest_id}) {  
  return {
    type: 'LOAD_DRAFT_PLAYERS',
    league_id,
    contest_id
  }
}

export default loadDraftPlayers