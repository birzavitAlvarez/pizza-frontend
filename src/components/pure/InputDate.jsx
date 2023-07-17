import { useField } from 'formik';
import { useEffect } from 'react';
import styles from "../../styles/InputDate.module.scss";

export const InputDate = ({ label, defaultValue, ...props }) => {
    const [field, meta, helpers] = useField(props);

    useEffect(() => {
        if(defaultValue) helpers.setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className={ styles["input-contenedor"]}>
            <label 
                    htmlFor={props.id || props.name}
                    className={ styles["texto"]}
                >
                { label }
            </label>
            <input 
                className={ styles["input"]}
                type="date"
                value={ field.value }
                {...field} {...props} 
            />
            { meta.touched && meta.error 
                ? ( <div className={ styles["error"]}>{ meta.error }</div> ) 
                : null }
        </div>
    );
}
