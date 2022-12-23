import { Link } from "react-router-dom";
import React,{useState,useEffect} from "react";
export default function Learning_units() {
  const [dataObj,setDataObj] = useState([])
  const [courses,setCourses] = useState([])

useEffect(() => {

    fetch('http://localhost:8000/learning_units/').then(res=>res.json().then(data=>{
      // console.log(data)
      setDataObj(data)

     
    })).catch(err=>{
      console.log(err)
    })

    fetch('http://localhost:8000/courses/').then(res=>res.json().then(data=>{
      // console.log(data)
      setCourses(data)

     
    })).catch(err=>{
      console.log(err)
    })
    
  },[])



  return (
    
    <div className="container py-5 px-3">
      <div className="row">
        <div className="col-12 pb-3"><h2>Learning Units</h2></div> 
        <div className="col-12 row bg-light">
        <div className="col-12 py-4 px-4">
          <div className="row  d-flex">
            <div className="col-auto">
            <div className="form-group d-flex">
                <span htmlFor="sort" className="form-label pt-2 pe-3">show</span>
              <select id="sort" className="form-control form-select">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <span className="form-label pt-2">entries</span>
              </div>
            </div>
              <div className="col">
              {/* <div className="row d-flex justify-content-end">
              <div className="col-auto form-group d-flex">
                <span htmlFor="search" className="form-label pt-2 pe-3">Search</span>
               <input className="form-control" id="search" name="search" value="" />
              </div>
              
              </div> */}
               <div className="row d-flex justify-content-end">
              <div className="col-auto form-group d-flex">
                <Link to="/add_learning_unit/" className="btn btn-outline-success">ADD</Link>
              </div>
              
              </div>
                  
               
              
            </div>
          </div>
        </div>
        <div className="col-12 px-4  table-responsive">
            <table className="table text-center bg-light text-dark">
              <thead className="bg-gray">
                <tr>
                  <th  className="border">Id</th>
                  <th  className="border">Title</th>
                  <th  className="border">State</th>
                  <th  className="border">Course</th> 
                  <th  className="border">Action</th> 
                </tr>
              </thead>
              <tbody  className="border">
                {dataObj.map((val, key) => {
                    return(
                       
                        <tr key={key}>
                          <td className="border">{val.id}</td>
                          <td className="border">{val.title}</td>
                          <td className="border">{val.level}</td>
                          <td className="border">{val.course_code}</td>
                          <td className="border"><Link to={"/learning_unit?id="+val.id}><i className="text-danger fa fa-cog fa-2x" aria-hidden="true"></i></Link></td>
                        </tr>
                    
                  )
                
                }
                   
              
                
                )}
                </tbody>
             
            </table>
        </div>
   
   
          <div className="row py-4">
            <div className="col">Showing 1 to 3 of 3 entries</div>
            <div className="col row d-flex justify-content-end">
            <div className="col-auto"><button className="btn btn-sm text-dark bg-gray">Previous</button></div>
            <div className="col-auto"><button className="btn btn-sm btn-primary text-light border-0 rounded-0">1</button></div>
            <div className="col-auto"><button className="btn btn-sm text-dark bg-gray">Next</button></div>
            </div>
          </div>
           </div>
        </div>
    </div>
  );
}
