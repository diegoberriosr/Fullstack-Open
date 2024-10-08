import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({course}) => {


    return(
      <div>
          <Header title={course.name}/>
          <Content parts={course.parts}/>
          <Total exercises={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}/>
      </div>
    )
  }

export default Course