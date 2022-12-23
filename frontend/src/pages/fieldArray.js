import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";



export default function Fields({
  prevNest
  ,control,
  register,
  unregister,
  defaultValues,
    setValue,
  getValues
}) {
  const { fields,remove, append,errors } = useFieldArray({
    control,
    name: `test[${prevNest}].data`
  });



  return (
    <>
        {fields.map((item,index) => {
          return (
      <div key={index} id={`test[${prevNest}].data[${index}].heading`} className="row rounded m-3 p-3 bg-dark text-light">
        <div className="col-4"><h5>Heading</h5></div>
        <div className="col-8 d-flex justify-content-end">
          <button className="btn btn-danger" type="button" onClick={() => remove(index)}>
            X
          </button>
        </div>
            <div className="row " key={item.id}>
              <div className="col-4">
              <input
              className="form-control"
                name={`test[${prevNest}].data[${index}].heading`}
                ref={register()}
              />
              </div>
        
            
               <NestedArray nextName = {`test[${prevNest}].data`} heading_index = {index} {...{ control, register,errors,defaultValues,getValues,setValue,unregister }} />
            </div>
            
      </div>
          );
        })}

      <section  className="row rounded bg-dark text-light">
        <div className="col">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            append({ name: "append" });
          }}
        >

          + Heading
        </button>
  </div>


   
      </section>

 
    </>
  );
}
