import React, { useState,useEffect } from "react";
import { useHistory,useLocation  } from "react-router-dom";
import axios from "axios"
export default function Content() {

  const [title,setTitle] = useState("")
  const [studyType,setStudyType] = useState("Books")
  const history = useHistory();
  const listOfMaterialType = ["Books", "Internet", "Newspaper"]
  const Add = listOfMaterialType.map(Add => Add
  )
  const handleChange = (e) => {
    setDefaultKey(e.target.value)
    setStudyType(listOfMaterialType[e.target.value])}
  const titleHandler = (e) => setTitle(e.target.value)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [defaultKey, setDefaultKey] = useState("")
  const id = params.get("id")


    useEffect(() => {

    
    let url = `http://localhost:8000/study_material?id=${id}`
    axios.get(url,{
				method: 'GET',
			
			}).then(res=>{
      setTitle(res.data["title"])
      setStudyType(res.data["material_type"])
      let defaultValue = res.data["material_type"]
      for(let v=0;v<listOfMaterialType.length;v++){
        if (listOfMaterialType[v]==defaultValue){
          setDefaultKey(v);
          break;
        }
      }
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
          fetch('http://localhost:8000/delete_study_material/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>res.json().then(data=>{
              history.push('/study_materials')
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
            "material_type":studyType
          };
          // console.log(data)
          fetch('http://localhost:8000/update_study_material/',{
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
          <select required value={defaultKey} onChange={e => handleChange(e)} className="form-select form-select" id="material_type">
            {
              Add.map((address, key) => <option key={key} value={key}>{address}</option>)
            }
          </select>
        </div>
           <div className="row">
                <button type="submit" className="col-3 col-md-3 col-lg-2 btn btn-warning mx-3">Update</button>
            <button type="button" className="col-3 col-md-3 col-lg-2 btn btn-danger" onClick={deleteRecord}>Delete</button>
        </div>
      </form>
    </div>
  );
}
