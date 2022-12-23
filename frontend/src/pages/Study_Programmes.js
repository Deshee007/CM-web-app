import React from "react";
import { useHistory  } from "react-router-dom";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

export default function Study_Programmes() {
  const history = useHistory();
const [dataObj,setDataObj] = useState([])
useEffect(() => {

    fetch('http://localhost:8000/files/').then(res=>res.json().then(data=>{
      setDataObj(data)

     
    })).catch(err=>{
      console.log(err)
    })

  },[])

  const onView=(id) => {
        
          
          fetch('http://localhost:8000/file?id='+id,{
              method: 'GET',
            }).then(res=>{
                fetch('http://localhost:8000/files/').then(res=>res.json().then(data=>{
                setDataObj(data)

              
              })).catch(err=>{
                console.log(err)
              })
            }
 
            
          ).catch(err=>{
            console.log(err)
          })
          


  }


  const onSubmitForm=(id) => {
        
          
          fetch('http://localhost:8000/remove?id='+id,{
              method: 'GET',
            }).then(res=>{
                fetch('http://localhost:8000/files/').then(res=>res.json().then(data=>{
                setDataObj(data)

              
              })).catch(err=>{
                console.log(err)
              })
            }
 
            
          ).catch(err=>{
            console.log(err)
          })
          


  }
  return (
    <div className="container py-5 px-3">
      <div className="row">
        <div className="col-12 pb-3"><h2>Curriculum Files</h2></div> 
        <div className="col-12 row bg-light">
     
        <div className="col-12 px-4  table-responsive">
            <table className="table text-center bg-light text-dark">
              <thead className="bg-gray">
                <tr>
                  <th  className="border">File </th>
                  <th  className="border">View </th>
                  <th  className="border">Download</th>
                  <th  className="border">Action</th> 
                </tr>
              </thead>
              <tbody  className="border">
                {dataObj.map((val, key) => {
                    return(
                       
                        <tr key={key}>
                          <td className="border">{val.filename}</td>
                          <td className="border"><a href={"/file/"+val.id}><button className="btn btn-primary">View</button></a></td>
                          <td className="border"><a href={"http://localhost:8000/download?id="+val.id}><button className="btn btn-success">Download</button></a></td>
                          <td className="border"><button className="btn btn-danger" onClick={()=>onSubmitForm(val.id)}>Remove</button></td>
                        </tr>
                    
                  )
                
                }
                   
              
                
                )}
                </tbody>
             
            </table>
        </div>
   
   
          {/* <div className="row py-4">
            <div className="col">Showing 1 to 3 of 3 entries</div>
            <div className="col row d-flex justify-content-end">
            <div className="col-auto"><button className="btn btn-sm text-dark bg-gray">Previous</button></div>
            <div className="col-auto"><button className="btn btn-sm btn-primary text-light border-0 rounded-0">1</button></div>
            <div className="col-auto"><button className="btn btn-sm text-dark bg-gray">Next</button></div>
            </div>
          </div> */}
           </div>
        </div>
    </div>
  );
}
