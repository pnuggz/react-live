const loadDraftContest = function loadDraftContest ({league_id, contest_id}) {  
  return {
    type: 'LOAD_DRAFT_CONTEST',
    league_id,
    contest_id
  }
}

export default loadDraftContest  