import React from "react";
import { useFieldArray } from "react-hook-form";
import FieldArray from "./fieldArray";



export default function FirstField({
  control,
  register,
  unregister,
  setValue,
  getValues,
  defaultValues,
  errors

}) {
  const { fields,remove, append } = useFieldArray({
    control,
    name: "test"
  });

  

  return (
    <>
    <h3 className="">Table Information</h3>

    
        {fields.map((item, index) => {
          return (
            
    <div key={index} className="row mt-2 border" style={{backgroundColor:"#c7c7c7"}}>
      <div className="col-12 row bg-dark text-light p-0 m-0">
        
        <div className="col-6 p-3 ">
          <h5>Title</h5>
        </div>
        <div className="col-2 p-3">
          <h5>Bg-Color</h5>
        </div>
          <div className="col-4 me-0 d-flex justify-content-end p-0">
                    <button
                    type="button"
                    className="btn btn-danger btn-sm" style={{width:"50px", borderRadius:"0px !important"}}
                    onClick={() => {
                      remove(index);
                    }}
                    >
                      X
                    </button>
          </div>
          </div>
            <div className="col-12 border-0 py-2 rounded bg-dark text-light " key={index} style={{listStyle: "none"}}>
              <div className="row  pb-2">
                  <div className="col-6 form-group">
                  <input
                    name={`test[${index}].title`}
                    ref={register()}
                    className="form-control"
                  />
                  </div>
                  <div className="col-2 form-group">
                  <input
                    name={`test[${index}].bg_color`}
                    ref={register()}
                    style={{height:"100%", padding: "0px !important"}}
                    type="color"
                    className="h-100 w-100"
                    
                  />
                  </div>
                
              </div>

              <FieldArray prevNest = {index}
                {...{ control, register,defaultValues,errors,unregister }}
              />
            </div>
    </div>
            
          );
        })}
   
      <section  className="row m-0 p-0">
        <div className="col p-0">
          <button
            type="button"
            className="my-2 btn btn-success"
            onClick={() => {
              append({ name: "append" });
            }}
          >
            + Title
          </button>
        </div>



     
      </section>

     
    </>
  );
}
