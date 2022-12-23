import React, { useState ,useEffect } from "react";
import { useHistory,useLocation  } from "react-router-dom";
import axios from "axios"
export default function Update_Course() {

  const [courseName,setCourseName] = useState("")
  const [courseCode,setCourseCode] = useState("")
  const history = useHistory();
  const [discipline,setDiscipline]  = useState("")
  const [options,setOptions] = useState([])
  const [defaultKey, setDefaultKey] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params.get("id")
  async function fetchCourseData(){

      
    axios.get(`http://localhost:8000/course?id=${id}`,{
				method: 'GET',
			}).then(res=>{
        // console.log(res.data)
        setCourseCode(res.data["course_code"])
        setCourseName(res.data["course_name"])
        let did = res.data["discipline_id"]
        setDiscipline(res.data["discipline_id"])

        axios.get('http://localhost:8000/disciplines/',{
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
    e.preventDefault();
    // console.log(e.target.value)
    setDefaultKey(e.target.value)
    setDiscipline(options[e.target.value]["id"])
  }
  const CourseNameHandler = (e) => setCourseName(e.target.value)
  const CourseCodeHandler = (e) => setCourseCode(e.target.value)
 
    const deleteRecord = (e)=>{
    e.preventDefault();
    let data = {
            "id":id,
          };
          // console.log(data)
          fetch('http://localhost:8000/delete_course/',{
              method: 'POST',
              body: JSON.stringify(data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>res.json().then(data=>{
              history.push('/courses')
            })
                
            
            
            
          ).catch(err=>{
            console.log(err)
          })
  }

  const onSubmitForm=(e) => {
          e.preventDefault();



          let data = {
                  "id":id,
                  "course_name": courseName,
                  "discipline_id": discipline
                };
                // console.log(data)
                fetch('http://localhost:8000/update_course/',{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                      },
                  }).then(res=>res.json().then(data=>{
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
        <h3 className="py-4">Update Course</h3>
        <div className="mb-3">
          <label htmlFor="course_code" className="form-label">Course Code</label>
          <input disabled required type="text" onChange={CourseCodeHandler} value={courseCode} className="form-control" id="course_code"/>
        </div>
        <div className="mb-3">
          <label htmlFor="course_name" className="form-label">Course Name</label>
          <input required type="text" onChange={CourseNameHandler} value={courseName} className="form-control" id="course_name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="discipline_id" className="form-label">Discipline</label>
          <select required value={defaultKey} onChange={e => handleChange(e)} className="form-select form-select" id="discipline_id">
            {
              options.map((address, key) => <option key={key} value={key}>{address.discipline_name}</option>)
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
