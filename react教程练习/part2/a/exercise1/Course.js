import React from 'react'

const Header = ({header}) => {
    return (
      <h1>{header}</h1>
    )
  }
  
  const Part = ({part}) => {
    return (
    <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) => <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
  const Sum = ({parts}) => {
    let total = parts.reduce((pre,cur) => {
      return pre + cur.exercises
    }, 0)
    console.log(total)
    return (
    <p>total of {total} exercises</p>
    )
  } 
  
  const Course = ({course}) => {
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <Sum parts={course.parts}/>
      </div>
    )
  }

  export default Course
