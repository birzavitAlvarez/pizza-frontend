import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import "../../styles/general.scss"

export const InputNumber = ({ label, defaultValue, maxLength, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const input = useRef();

    useEffect(() => {
        if(defaultValue) helpers.setValue(defaultValue);
    }, [defaultValue]);

    const handleInput = () => {
        let value = input.current.value;
        if (value.length > maxLength) value = value.slice(0, maxLength)
        if (!/^[0-9]+$/.test(value)) value = value.replaceAll(/[^0-9]+/g, "")
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
