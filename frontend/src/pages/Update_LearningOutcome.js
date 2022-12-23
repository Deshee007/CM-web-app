import React, { useState,useEffect } from "react";
import { useHistory,useLocation  } from "react-router-dom";
import axios from "axios"

export default function Add_LearningOutcome() {

  const [title,setTitle] = useState("")
  const [State,setState] = useState("")
  const history = useHistory();
  
  const handleState = (e) => setState(e.target.value)
  const handleTitle = (e) => setTitle(e.target.value)
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const id = params.get("id")
    useEffect(() => {

    
    let url = `http://localhost:8000/learning_outcome?id=${id}`
    axios.get(url,{
				method: 'GET',
			
			}).then(res=>{
      setState(res.data["state"])
      setTitle(res.data["title"])
      
    }).catch(err=>{
      console.log(err)
    })

  },[])

   const deleteRecord = (e)=>{
    e.preventDefault();
    let data = {
            "id":id,
          };
          // console.log(data)
          fetch('http://localhost:8000/delete_learning_outcome/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>res.json().then(data=>{
              history.push('/learning_outcomes')
            })
                
            
            
            
          ).catch(err=>{
            console.log(err)
          })
  }

  const onSubmitForm=(e) => {
          e.preventDefault();
          let data = {
            "id":id,
            "title":title,
            "state":State
          };
          // console.log(data)
          fetch('http://localhost:8000/update_learning_outcome/',{
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
        <h3 className="py-4">Update Learning Outcome</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input required type="text" onChange={handleTitle} value={title} className="form-control" id="title"/>
        </div>
       <div className="mb-3">
          <label htmlFor="State" className="form-label">Level</label>
          <input required type="text" onChange={handleState} value={State} className="form-control" id="State"/>
        </div>
           <div className="row">
                <button type="submit" className="col-3 col-md-3 col-lg-2 btn btn-warning mx-3">Update</button>
            <button type="button" className="col-3 col-md-3 col-lg-2 btn btn-danger" onClick={deleteRecord}>Delete</button>
        </div>
      </form>
    </div>
  );
}
