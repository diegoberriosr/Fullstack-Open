import { useState } from 'react'



const StatisticLine = ({title, number}) => {
  return (
    <p>{title} {number}</p>
  )
}

const Statistics = ({opinions}) => {

  const getTotalOpinions = () => opinions.good + opinions.bad + opinions.neutral
  const getAverage = () => {
     if(getTotalOpinions() === 0) return 0
     return (opinions.good - opinions.bad)/getTotalOpinions()
    }

  const getPositiveOpinions = () => {
    if(getTotalOpinions() === 0) return 0
    return (opinions.good / getTotalOpinions()) * 100}

  if(getTotalOpinions() === 0) return(
    <>
      <h1>statistics</h1>
      <p>no feedback given</p>
    </>
  )
  
  return(
    <>
      <h1>statistics</h1>
      <StatisticLine title='good' number={opinions.good}/>
      <StatisticLine title='bad' number={opinions.bad}/>
      <StatisticLine title='neutral' number={opinions.neutral}/>
      <StatisticLine title='average' number={getAverage()}/>
      <StatisticLine title='positive' number={getPositiveOpinions().toString() + " %"} />    
    </>
  )
  
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

function App() {
  const [opinions, setOpinions] = useState({
    good: 0,
    bad: 0,
    neutral: 0
  })


  const handleGood = () => {
    setOpinions(
      {
        ...opinions,
        good: opinions.good+1
      }
    )
  }

  const handleBad = () => {
    setOpinions(
      {
        ...opinions,
        bad: opinions.bad+1
      }
    )
  }

  const handleNeutral = () => {
    setOpinions(
      {
        ...opinions,
        neutral: opinions.neutral+1
      }
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text='good' handleClick={handleGood}/>
        <Button text='bad' handleClick={handleBad}/>
        <Button text='neutral' handleClick={handleNeutral}/>
      </div>
      <Statistics opinions={opinions} />
    </div>
  )
}

export default App
