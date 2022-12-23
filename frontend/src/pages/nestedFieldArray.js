import React from "react";
import { useFieldArray } from "react-hook-form";

export default ({ nextName,heading_index, control, register,defaultValues }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${nextName}[${heading_index}].data]`
    
  });

  return (
    <div>
   
      
      {fields.map((item, k) => {
        return (
          <div className="row mx-3 mb-3 p-3" key={k} style={{ marginLeft: 20 }}>
            <div className="col-3"><h5>Cell Data</h5></div>
            <div className="col-12 row">
                  <div className="col-3 form-group">
                  <input
                    name={`${nextName}[${heading_index}].data[${k}]`}
                    ref={register()}
                    className="form-control"
                
                  />
                  </div>
                  <div className="col">
                  <button className="btn btn-danger" type="button" onClick={() => remove(k)}>
                    X
                  </button>

                  </div>
            </div>
           
          </div>
        );
      })}
      <br />
      <button
        type="button"
        className="btn btn-success"
        onClick={() =>
          append({ name: "append" })
        }
      >
        + Data
      </button>
      <br />
      <hr />
    </div>
  );
};
