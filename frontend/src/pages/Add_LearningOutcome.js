import React, { useState } from "react";
import { useHistory  } from "react-router-dom";

export default function Add_LearningOutcome() {

  const [title,setTitle] = useState("")
  const [State,setState] = useState("")
  const history = useHistory();
  
  const handleState = (e) => setState(e.target.value)
  const handleTitle = (e) => setTitle(e.target.value)

  const onSubmitForm=(e) => {
          e.preventDefault();
          let data = {
            "title":title,
            "state":State
          };
          fetch('http://localhost:8000/add_learning_outcome/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>{
              history.push('/learning_outcomes')
            }
            
            
          ).catch(err=>{
            console.log(err)
          })
          


  }

  return (
    <div className="row">
      <div className="col-12 col-lg-2"></div>
      <form className="col-12 col-lg-8 container p-5" onSubmit={onSubmitForm}>
        <h3 className="py-4">Add New Learning Outcome</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input required type="text" onChange={handleTitle} value={title} className="form-control" id="title"/>
        </div>
       <div className="mb-3">
          <label htmlFor="State" className="form-label">Level</label>
          <input required type="text" onChange={handleState} value={State} className="form-control" id="State"/>
        </div>
        <button type="submit" className="btn btn-outline-success">Add</button>
      </form>
    </div>
  );
}
