import { useField } from "formik";
import { useEffect } from "react";
import "../../styles/InputCombo.scss"

export const InputCombo = ({ label, defaultValue="", children, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const handleChange = (event) => {
        helpers.setValue(event.target.value);
    }
    useEffect(()=>{
        helpers.setValue(defaultValue)
    }, [defaultValue])
    return (
        <div className="input-combo">
            <label htmlFor={ props.id || props.name }>{ label }</label>
            <select 
                { ...field } { ...props } 
                onChange={ handleChange }
                value={ field.value }
                className="select-field"
            >
                { children }
            </select>
            { meta.touched && meta.error ? (
                <div className="error">{ meta.error }</div>
            ) : null }
        </div>
    );
};