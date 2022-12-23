import React, { useState, useEffect } from "react";
import { useHistory,useLocation   } from "react-router-dom";
import axios from "axios"
export default function Update_Discipline() {

  const [discipline_code,setDisciplineCode] = useState("")
  const [discipline_name,setDisciplineName] = useState("")
  const history = useHistory();
  
  const handleCode = (e) => setDisciplineCode(e.target.value)
  const handleName = (e) => setDisciplineName(e.target.value)
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const id = params.get("id")

  useEffect(() => {

    
    let url = `http://localhost:8000/discipline?id=${id}`
    axios.get(url,{
				method: 'GET',
			
			}).then(res=>{
      setDisciplineCode(res.data["discipline_code"])
      setDisciplineName(res.data["discipline_name"])
      
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
          fetch('http://localhost:8000/delete_discipline/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>res.json().then(data=>{
              history.push('/engineering_disciplines')
            })
                
            
            
            
          ).catch(err=>{
            console.log(err)
          })
  }

  const onSubmitForm=(e) => {
          e.preventDefault();
    let data = {
            "id":id,
            "discipline_name": discipline_name
          };
          // console.log(data)
          fetch('http://localhost:8000/update_discipline/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>res.json().then(data=>{
              history.push('/engineering_disciplines')
            })

            
          ).catch(err=>{
            console.log(err)
          })


  }

  return (
    <div className="row">
      <div className="col-12 col-lg-2"></div>
      <form className="col-12 col-lg-8 container p-5" onSubmit={onSubmitForm}>
        <h3 className="py-4">Update Discipline</h3>
        <div className="mb-3">
          <label htmlFor="discipline_code" className="form-label">Discipline Code</label>
          <input disabled required type="text" onChange={handleCode} value={discipline_code} className="form-control" id="discipline_code"/>
          <label htmlFor="warning_message" className="form-label text-danger">* You cannot change the Discipline Code</label>

        </div>
       <div className="mb-3">
          <label htmlFor="discipline_name" className="form-label">Discipline Name</label>
          <input required type="text" onChange={handleName} value={discipline_name} className="form-control" id="discipline_name"/>
        </div>
        <div className="row">
            <button type="submit" className="col-3 col-md-3 col-lg-2 btn btn-warning mx-3">Update</button>
            <button type="button" className="col-3 col-md-3 col-lg-2 btn btn-danger" onClick={deleteRecord}>Delete</button>
        </div>
      </form>
    </div>
  );
}
