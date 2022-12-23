import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [column_headings, setColumnHeadings] = useState([])
  const [headings, setHeadings] = useState([])
  const [programmes, setProgrammes] = useState([])
  const history = useHistory();
  const [file_data, setFileData] = useState("")
  // const [totalProgrammes, setTotalPrograms] = useState(0)



  const changeHandler = async (event) => {

    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    // console.log(event.target.files[0]);
    setFileData(event.target.files[0]);
    // console.log(formData.data);
    fetch('http://localhost:8000/', {
      method: 'POST',
      body: formData,
    }).then(response => response.json().then(data => {
      setHeadings(data[2].modules)
      // console.log(data[0].table_data)
      setColumnHeadings(data[0].table_data)
      // setTotalPrograms(data[1].list_programs.total_programs)
      setProgrammes(data[1].list_programs.data)
    })

    ).catch(exception => {
      console.log(exception)
    })
  };

  const saveAction = async () => {

    const formFile = new FormData();
    formFile.append('filename', file_data.name);
    console.log(formFile)
    formFile.append('excelFile', file_data);
    console.log(formFile)

    fetch('http://localhost:8000/save/', {
      method: 'POST',
      body: formFile,
    }).then(res => res.json().then(data => {

      history.push('/curriculum_mapping')
    })


    ).catch(err => {
      console.log(err)
    })
  };






  return (

    <div className="container py-5 px-3">
      <div className="row">
        <div className="col-12 pb-3"><h2>Home</h2></div>
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

                <div className="row d-flex justify-content-end">
                  <div className="col-auto form-group d-flex">
                    <span htmlFor="file" className="form-label pe-2 pt-1" style={{ whiteSpace: "nowrap" }}>Excel Sheet</span>
                    <input className="form-control" type="file" id="file" name="file" onChange={changeHandler} />
                  </div>

                </div>



              </div>
              <div className="col">

                <div className="row d-flex justify-content-end">
                  <div className="col-auto form-group d-flex">
                    <Link to="/add" className="btn btn-outline-success">CREATE NEW</Link>
                  </div>

                </div>



              </div>
            </div>
          </div>
          <div className="col-12 px-4  table-responsive">
            <table className="table text-center bg-light text-dark">
              <thead className="bg-gray">
                <tr>
                  <th className="border">Programmes</th>

                  {programmes.map((val, key) => {
                    return (
                      <th key={key} colSpan={val.merge_columns} className="border">
                        {val.name}
                      </th>

                    )
                  })}

                </tr>
                <tr>
                  <th className="border">List programmes that this Curriculum Map refers to</th>
                  {headings.map((val, key) => {
                    return (

                      <th key={key} className="border">

                        {val.module_name}<br />
                        {val.module_code}
                      </th>

                    )
                  })}
                </tr>
              </thead>

              {column_headings.map((val, key) => {
                return (
                  <tbody className="border">
                    <tr>
                      <td colSpan="13" className="border">{val.title}</td>
                    </tr>
                    {val.data.map((val2, key2) => {
                      return (
                        <tr key={key2}>

                          <td className="border">{val2.column_name}</td>
                          {/* <td>{val2.data[0] == null ? "No Data" : val2.data[0]}</td> */}
                          {val2.data.map((val3, key3) => {
                            return (


                              <td key={key3} className="border">{val3}</td>

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


          <div className="row py-4">

            <div className="col row d-flex justify-content-end">
              <div className="col-auto"><button onClick={saveAction} className="btn btn-sm text-light bg-success">Save</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
