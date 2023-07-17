import { useField } from 'formik';
import { useEffect } from 'react';
import "../../styles/general.scss"

export const Input = ({ label, defaultValue, ...props }) => {
    const [field, meta, helpers] = useField(props);

    useEffect(() => {
        if(defaultValue) helpers.setValue(defaultValue);
    }, [defaultValue]);

    return (
      <>
        <div>
          <div className='input-contenedor'>
              <input 
                  className="input"
                  type={ props.type || "text"}
                  placeholder=" "
                  autoComplete="off"
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
