import React, { useState ,useEffect } from "react";
import { useHistory  } from "react-router-dom";
import axios from "axios"
export default function Add_Course() {

  const [courseName,setCourseName] = useState("")
  const [courseCode,setCourseCode] = useState("")
  const history = useHistory();
  const [discipline,setDiscipline]  = useState("")
  const [options,setOptions] = useState([])
 

  useEffect(() => {

    axios.get('http://localhost:8000/disciplines/',{
				method: 'GET',
			}).then(res=>{
        setOptions(res.data)
        setDiscipline(res.data[0]["id"])
        // console.log(res.data[0]["id"])
    }).catch(err=>{
      console.log(err)
    })

  },[])
  
  const handleChange = (e) => setDiscipline(options[e.target.value]["id"])
  const CourseNameHandler = (e) => setCourseName(e.target.value)
  const CourseCodeHandler = (e) => setCourseCode(e.target.value)
  const onSubmitForm=(e) => {
          e.preventDefault();
          let data = {
            "course_name":courseName,
            "course_code":courseCode,
            "discipline_id": discipline
          };
          fetch('http://localhost:8000/add_course/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>
              res.json()
            .then(data=>{
                history.push('/courses')
            })
            
            
          ).catch(err=>{
            console.log(err)
          })
          


  }

  return (
    <div className="row">
      <div className="col-12 col-lg-2"></div>
      <form className="col-12 col-lg-8 container p-5" onSubmit={onSubmitForm}>
        <h3 className="py-4">Add New Course</h3>
        <div className="mb-3">
          <label htmlFor="course_code" className="form-label">Course Code</label>
          <input required type="text" onChange={CourseCodeHandler} value={courseCode} className="form-control" id="course_code"/>
        </div>
        <div className="mb-3">
          <label htmlFor="course_name" className="form-label">Course Name</label>
          <input required type="text" onChange={CourseNameHandler} value={courseName} className="form-control" id="course_name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="discipline_id" className="form-label">Discipline</label>
          <select required onChange={e => handleChange(e)} className="form-select form-select" id="discipline_id">
            {
              options.map((address, key) => <option key={key} value={key}>{address.discipline_name}</option>)
            }
          </select>
        </div>
        <button type="submit" className="btn btn-outline-success">Add</button>
      </form>
    </div>
  );
}
