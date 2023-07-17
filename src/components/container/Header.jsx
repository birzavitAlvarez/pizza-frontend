import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/header.scss';
import { IconoNotificacion } from '../pure/IconoNotificacion';

export const Header = () => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const controlarMenu = () => setMostrarMenu(!mostrarMenu);
    const usuario = useSelector(state => state.usuario);
    
    useEffect(() => {
        const cerrarMenu = () => 
            mostrarMenu && setMostrarMenu(false);

        document.addEventListener('click', cerrarMenu);

        return () => 
            document.removeEventListener('click', cerrarMenu);
    }, [mostrarMenu]);

    return (
        <header className="cabecera" onClick={(e) => e.stopPropagation()}>
            <div className="contenido">
            <div>Amanti Pizzas</div>
            <div className={`opciones ${mostrarMenu && 'activo'}`}>
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/carta">Carta</NavLink>
                {
                    usuario.idRol > 1 && (
                        <>
                            <NavLink to="/proveedores">Proveedores</NavLink>
                            <NavLink to="/productos">Productos</NavLink>
                            <NavLink to="/comprobantes">Comprobantes</NavLink>
                            <NavLink to="/almacen">Almacen</NavLink>
                            <NavLink to="/ventas">Ventas</NavLink>
                        </>
                        )
                    }
                {
                    usuario.idRol > 2 && (
                        <>
                            <NavLink to="/usuarios">Usuarios</NavLink>
                            <NavLink to="/trabajadores">Trabajadores</NavLink>
                        </>
                        )
                }
                <NavLink to="/perfil">Perfil</NavLink>
            </div>
            <div className='btn-opciones-contenedor'>
                <IconoNotificacion />
                <button onClick={ controlarMenu } className="btn-opciones">
                    Menú
                </button>
            </div>
            </div>
        </header>
    );
};
