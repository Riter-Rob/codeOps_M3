import React from 'react'
import { students } from '../data'
import {Link} from 'react-router-dom'

function Students() {
  return (

    <div><h1>Students list portal</h1>
    {students.map((student)=>(
        <div key={student.id}>
            <h2>{student.id}{student.name}</h2>
            <p>Age: {student.age}</p>
            <p>Major: {student.major}</p>
            <Link to={`/students/${student.id}`}>view Detail</Link>
        </div>
    ))
 
    }
    
    
    </div>

  )
}

export default Students