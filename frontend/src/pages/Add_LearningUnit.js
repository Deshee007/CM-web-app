import React, { useState ,useEffect } from "react";
import { useHistory  } from "react-router-dom";
import axios from "axios"
export default function Add_LearningUnit() {

  const [title,setTitle] = useState("")
  const [State,setState] = useState("")
  const history = useHistory();
  const [course,setCourse]  = useState("")
  const [options,setOptions] = useState([])
 

  useEffect(() => {

    axios.get('http://localhost:8000/courses/',{
				method: 'GET',
			}).then(res=>{
        setOptions(res.data)
        setCourse(res.data[0]["id"])
        // console.log(res.data[0]["id"])
    }).catch(err=>{
      console.log(err)
    })

  },[])
  
  const handleChange = (e) => setCourse(options[e.target.value]["id"])
  const TitleHandler = (e) => setTitle(e.target.value)
  const StateHandler = (e) => setState(e.target.value)
  const onSubmitForm=(e) => {
          e.preventDefault();
          let data = {
            "title":title,
            "level":State,
            "course_id": course
          };
          fetch('http://localhost:8000/add_learning_unit/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>
              res.json()
            .then(data=>{
                history.push('/learning_units')
            })
            
            
          ).catch(err=>{
            console.log(err)
          })
          


  }

  return (
    <div className="row">
      <div className="col-12 col-lg-2"></div>
      <form className="col-12 col-lg-8 container p-5" onSubmit={onSubmitForm}>
        <h3 className="py-4">Add New Learning Unit</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input required type="text" onChange={TitleHandler} value={title} className="form-control" id="title"/>
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input required type="text" onChange={StateHandler} value={State} className="form-control" id="state"/>
        </div>
        <div className="mb-3">
          <label htmlFor="course_id" className="form-label">Course</label>
          <select required onChange={e => handleChange(e)} className="form-select form-select" id="course_id">
            {
              options.map((address, key) => <option key={key} value={key}>{address.course_code}</option>)
            }
          </select>
        </div>
        <button type="submit" className="btn btn-outline-success">Add</button>
      </form>
    </div>
  );
}
