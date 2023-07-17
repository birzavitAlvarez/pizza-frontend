import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import "../../styles/general.scss"

export const InputTel= ({ label, defaultValue, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const input = useRef();

    useEffect(() => {
        if(defaultValue) helpers.setValue(defaultValue);
    }, [defaultValue]);

    const handleInput = () => {
        let value = input.current.value;
        
        input.current.value = value;
    }

    return (
      <>
        <div>
          <div className='input-contenedor'>
              <input 
                  className="input number"
                  type={ props.type || "text"}
                  onInput={ handleInput }
                  placeholder=" "
                  autoComplete="off"
                  ref={ input }
                  value={ field.value }
                  {...field} {...props} />
              <label 
                  htmlFor={props.id || props.name}
                  className="texto"
              >
                  { label }
              </label>
          </div>
          { meta.touched && meta.error 
              ? ( <div className="input-error">{ meta.error }</div> ) 
              : null }
        </div>
      </>
    );
}
