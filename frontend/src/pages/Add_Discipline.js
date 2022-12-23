import React, { useState } from "react";
import { useHistory  } from "react-router-dom";

export default function Add_Discipline() {

  const [discipline_code,setDisciplineCode] = useState("")
  const [discipline_name,setDisciplineName] = useState("")
  const history = useHistory();
  
  const handleCode = (e) => setDisciplineCode(e.target.value)
  const handleName = (e) => setDisciplineName(e.target.value)

  const onSubmitForm=(e) => {
          e.preventDefault();
          let data = {
            "discipline_code":discipline_code,
            "discipline_name":discipline_name
          };
          fetch('http://localhost:8000/add_discipline/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>{
              history.push('/engineering_disciplines')
            }
            
            
          ).catch(err=>{
            console.log(err)
          })
          


  }

  return (
    <div className="row">
      <div className="col-12 col-lg-2"></div>
      <form className="col-12 col-lg-8 container p-5" onSubmit={onSubmitForm}>
        <h3 className="py-4">Add New Discipline</h3>
        <div className="mb-3">
          <label htmlFor="discipline_code" className="form-label">Discipline Code</label>
          <input required type="text" onChange={handleCode} value={discipline_code} className="form-control" id="discipline_code"/>
        </div>
       <div className="mb-3">
          <label htmlFor="discipline_name" className="form-label">Discipline Name</label>
          <input required type="text" onChange={handleName} value={discipline_name} className="form-control" id="discipline_name"/>
        </div>
        <button type="submit" className="btn btn-outline-success">Add</button>
      </form>
    </div>
  );
}
