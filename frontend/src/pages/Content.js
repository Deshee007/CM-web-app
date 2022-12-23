import React, { useState } from "react";
import { useHistory  } from "react-router-dom";

export default function Content() {

  const [title,setTitle] = useState("")
  const [studyType,setStudyType] = useState("Books")
  const history = useHistory();
  const listOfMaterialType = ["Books", "Internet", "Newspaper"]
  const Add = listOfMaterialType.map(Add => Add
  )
  const handleChange = (e) => setStudyType(listOfMaterialType[e.target.value])
  const titleHandler = (e) => setTitle(e.target.value)
  const onSubmitForm=(e) => {
          e.preventDefault();
          let data = {
            "title":title,
            "material_type":studyType
          };
          fetch('http://localhost:8000/add_study_material/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>{
              history.push('/study_materials')
            }
            
            
          ).catch(err=>{
            console.log(err)
          })
          


  }

  return (
    <div className="row">
      <div className="col-12 col-lg-2"></div>
      <form className="col-12 col-lg-8 container p-5" onSubmit={onSubmitForm}>
        <h3 className="py-4">Add New Study Material</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input required type="text" onChange={titleHandler} value={title} className="form-control" id="title" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="material_type" className="form-label">Material Type</label>
          <select required onChange={e => handleChange(e)} className="form-select form-select" id="material_type">
            {
              Add.map((address, key) => <option key={key} value={key}>{address}</option>)
            }
          </select>
        </div>
        <button type="submit" className="btn btn-outline-success">Add</button>
      </form>
    </div>
  );
}
