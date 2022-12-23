import React, { useState ,useEffect } from "react";
import { useHistory,useLocation  } from "react-router-dom";
import axios from "axios"
export default function Add_LearningUnit() {

  const [title,setTitle] = useState("")
  const [State,setState] = useState("")
  const history = useHistory();
  const [course,setCourse]  = useState("")
  const [options,setOptions] = useState([])
  const [defaultKey, setDefaultKey] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params.get("id")

  async function fetchCourseData(){

      
    axios.get(`http://localhost:8000/learning_unit?id=${id}`,{
				method: 'GET',
			}).then(res=>{
        // console.log(res.data)
        setTitle(res.data["title"])
        setState(res.data["level"])
        let did = res.data["course_id"]
        setCourse(res.data["course_id"])

        axios.get('http://localhost:8000/courses/',{
        method: 'GET',
        }).then(res=>{
          // console.log(res.data)
          setOptions(res.data)
          // console.log(res.data.length)
          for (let v=0;v<res.data.length;v++){
            if (res.data[v]["id"] == did){
              setDefaultKey(v)
              break;
            }
          }
 
      }).catch(err=>{
        console.log(err)
      })
    
        
    }).catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(() => {  
      fetchCourseData()
  },[])


  
  const handleChange = (e) => {
    setDefaultKey(e.target.value)
    setCourse(options[e.target.value]["id"])}
  const TitleHandler = (e) => setTitle(e.target.value)
  const StateHandler = (e) => setState(e.target.value)

  const deleteRecord = (e)=>{
    e.preventDefault();
    let data = {
            "id":id,
          };
          // console.log(data)
          fetch('http://localhost:8000/delete_learning_unit/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>res.json().then(data=>{
              history.push('/learning_units')
            })
                
            
            
            
          ).catch(err=>{
            console.log(err)
          })
  }

  const onSubmitForm=(e) => {
          e.preventDefault();
          // console.log(course)
          let data = {
                  "id":id,
                  "title": title,
                  "level": State,
                  "course_id": course
                };
                // console.log(data)
                fetch('http://localhost:8000/update_learning_unit/',{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                      },
                  }).then(res=>res.json().then(data=>{
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
          <select required value={defaultKey}  onChange={e => handleChange(e)} className="form-select form-select" id="course_id">
            {
              options.map((address, key) => <option key={key} value={key}>{address.course_code}</option>)
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
