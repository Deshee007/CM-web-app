import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory,useParams  } from "react-router-dom";

export default function ViewFile() {
  const params = useParams();
  const id = params.id;
  console.log(params.id)
  const [column_headings,setColumnHeadings] = useState([])
  const [headings,setHeadings] = useState([])
  const [programmes, setProgrammes] = useState([])
  const history = useHistory();
  const [file_data, setFileData] = useState("")
  // const [totalProgrammes, setTotalPrograms] = useState(0)



	useEffect(() => {

    
		fetch('http://localhost:8000/file?id='+id,{
				method: 'GET',
			}).then(res=>res.json().then(data=>{
        setHeadings(data[2].modules)
      // console.log(data[0].table_data)
      setColumnHeadings(data[0].table_data)
      // setTotalPrograms(data[1].list_programs.total_programs)
      setProgrammes(data[1].list_programs.data)
      })

      
    ).catch(err=>{
      console.log(err)
    })
 },[])




const goBack = () =>{
  history.push('/curriculum_mapping')
}




  return (
    
    <div className="container py-5 px-3">
      <div className="row">
      
        <div className="col-12 row bg-light">
        <div className="col-12 ms-3 mb-3">
          <button className="btn btn-dark" onClick={goBack}>Back</button>
        </div>
        <div className="col-12 px-4  table-responsive">
            <table className="table text-center bg-light text-dark">
              <thead className="bg-gray">
                <tr>
                  <th  className="border">Programmes</th>
               
                    {programmes.map((val, key) => {
                return (
                    <th key={key} colSpan={val.merge_columns} className="border">
                      {val.name}
                    </th>
            
                  )
                })}
                 
                </tr>
                <tr>
                  <th  className="border">List programmes that this Curriculum Map refers to</th>
               {headings.map((val, key) => {
                return (
                   
                    <th key={key}  className="border">
                      
                      {val.module_name}<br/>
                      {val.module_code}
                    </th>
            
                  )
                })}
                </tr>
              </thead>
             
                {column_headings.map((val, key) => {
                    return(
                       <tbody  className="border">
                        <tr>
                          <td colSpan="13"  className="border">{val.title}</td>
                        </tr>
                    {val.data.map((val2, key2) => {
                      return(
                    <tr key={key2}>
                      
                      <td  className="border">{val2.column_name}</td>
                      {/* <td>{val2.data[0] == null ? "No Data" : val2.data[0]}</td> */}
                      {val2.data.map((val3, key3) => {
                      return(
                          
                            
                            <td key={key3}  className="border">{val3}</td>
                 
                      )  
                  }

                  )}


                    </tr>
                      )  
                  }

                  )}
                  </tbody>
                  )
                
                }
                   
              
                
                )}
             
            </table>
        </div>
   
   
       
           </div>
        </div>
    </div>
  );
}
