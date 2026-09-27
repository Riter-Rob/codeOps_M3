import React from 'react'
import { useParams } from 'react-router-dom'
const {id} = useParams[]
function StudentDetail() {
  return (
    <div key={student.id}>
            <h2>{student.id}{student.name}</h2>
            <p>Age: {student.age}</p>
            <p>Major: {student.major}</p>
            <Link to={`/students/${student.id}`}>view Detail</Link>
        </div>
  )
  
}

export default StudentDetail