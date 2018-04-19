const loadDraftEvents = function loadDraftEvents ({league_id, contest_id}) {  
  return {
    type: 'LOAD_DRAFT_EVENTS',
    league_id,
    contest_id
  }
}

export default loadDraftEvents