import React, { useState  } from "react";
import { useHistory  } from "react-router-dom";
import { useForm } from "react-hook-form";
 import {saveAs} from "file-saver";
import FirstFieldArray from "./firstFieldArray";
import axios from "axios"
import "../styles.css"


const defaultValues = {
      data: [
        {
          title: "useFieldArray1",
          bg_color: "0",
          data: [
            { heading: "heading1", 
              data: ["1"] 
            }]
        }
      ]
    };
export default function Create_Sheet() {
    const history = useHistory();
    const [programmes, setProgrammes] = useState([{ merge_columns: 1, name : ""}])
    const [fileName, setFileName] = useState("")

   
    const {
        control,
        register,
        unregister,
        handleSubmit,
        getValues,
        errors,
        setValue
      } = useForm({
        defaultValues
      });


    let handleChangeProgrammes  = (i, e) => {
        let newFormValues = [...programmes];
        if (e.target.type == "number"){
          newFormValues[i][e.target.name] = parseInt(e.target.value);
        }
        else{
          newFormValues[i][e.target.name] = e.target.value;

        }
        setProgrammes(newFormValues);
      }
    
    let addFormFieldsProgrammes  = () => {
        setProgrammes([...programmes, { merge_columns: 1, name: "" }])
      }
    
    let removeFormFieldsProgrammes  = (i) => {
        let newFormValues = [...programmes];
        newFormValues.splice(i, 1);
        setProgrammes(newFormValues)
    }
    
    const onSubmit = (data) => {
      // console.log(data);
        let final_data = {

          "fileName": fileName,
          "programmes": programmes,
          "modules": modules,
          "table_data": data['test']
        }
        // console.log(JSON.stringify(final_data))

        fetch('http://localhost:8000/create/',{
              method: 'POST',
              body: JSON.stringify(final_data),
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
            }).then(res=>{
              history.push("/curriculum_mapping");
            }
          ).catch(err=>{
            console.log(err)
          })
    }

  // Modules ------------------------> 
    const [modules, setModules] = useState([{ module_name: "", module_code : ""}])
    let handleChangeModules  = (i, e) => {
        let newFormValues = [...modules];
        if (e.target.type == "number"){
          newFormValues[i][e.target.name] = parseInt(e.target.value);
        }
        else{
          newFormValues[i][e.target.name] = e.target.value;

        }
        setModules(newFormValues);
      }
    
    let addFormFieldsModules  = () => {
        setModules([...modules, { module_name: "", module_code : ""}])
      }
    
    let removeFormFieldsModules  = (i) => {
        let newFormValues = [...modules];
        newFormValues.splice(i, 1);
        setModules(newFormValues)
    }
    
   
    // Table Data  ------------------------> 


    
  



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
          <div className="row mt-5">
            <div className="col-4">
              <div className="form-group">
                <label className="form-label"><h3>Filename (without extension)</h3></label>
                <input className="form-control" value={fileName} name="filename" onChange={e => setFileName(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <h3 className="">Programmes</h3>
              {programmes.map((element, index) => (

                <div className="row form-inline" key={index}>
                  
                  <div className="col-5 col-lg-auto form-group">
                  <label className="form-label">Merge Columns</label>
                  <input type="number"  className="form-control" name="merge_columns" value={parseInt(element.merge_columns) || 1} onChange={e => handleChangeProgrammes(index, e)} />
                  </div>
                  <div className="col-5 col-lg-auto form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={element.name || ""} onChange={e => handleChangeProgrammes(index, e)} />
                  </div>
                  <div className="col-2 col-lg-auto pt-4">
                  {
                    index ? 
                      <button type="button"  className="btn btn-danger" onClick={() => removeFormFieldsProgrammes(index)}>X</button> 
                    : null
                  }
                </div>
                </div>
              ))}





              <div className="py-3">
                  <button className="btn btn-success px-3" type="button" onClick={() => addFormFieldsProgrammes()}>+</button>
                
              </div>
          </div>


          {/* Modules --------------------> */}
          <div className="col-12 col-lg-6">
              <h3 className="">Modules</h3>
              {modules.map((element, index) => (

                <div className="row form-inline" key={index}>
                  
                  <div className="col-5 col-lg-auto form-group">
                  <label className="form-label">Module Code</label>
                  <input type="text"  className="form-control" name="module_code" value={element.module_code || ""} onChange={e => handleChangeModules(index, e)} />
                  </div>
                  <div className="col-5 col-lg-auto form-group">
                  <label className="form-label">Module Name</label>
                  <input type="text" className="form-control" name="module_name" value={element.module_name || ""} onChange={e => handleChangeModules(index, e)} />
                  </div>
                  <div className="col-2 col-lg-auto pt-4">
                  {
                    index ? 
                      <button type="button"  className="btn btn-danger" onClick={() => removeFormFieldsModules(index)}>X</button> 
                    : null
                  }
                </div>
                </div>
              ))}





              <div className="py-3">
                  <button className="btn btn-success px-3" type="button" onClick={() => addFormFieldsModules()}>+</button>
                
              </div>
          </div>

          </div>
          


          {/* Table Data from here ------------------------->> */}
          
           <FirstFieldArray
              {...{ control, register, defaultValues, getValues, setValue, errors,unregister }}
            />       

           <button className="btn btn-outline-success" type="submit">Submit</button>
      </form>
    )
}

