const answers = [
  {
    id: '1',
    title: 'answer 1'
  },
  {
    id: '2',
    title: 'answer 1'
  },
  {
    id: '3',
    title: 'answer 1'
  }
]
export const fetchAnswers = () => {
  return {
    type: 'FETCH_ANSWERS',
    answers: answers
  }
}
