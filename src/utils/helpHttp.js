export const helpHttp = () => {
    const customFetch = async (endpoint, options) => {
        const defaultHeaders = {
            "content-type": "application/json"
        };
        options.cors = "cors"
        // El AbortController sirve para poder detener la petición en caso de que la url se haya caido
        const controller = new AbortController();
        options.signal = controller.signal;

        // Método a usar
        options.method = options.method || "GET";

        // Cabeceras
        options.headers = options.headers ? {...defaultHeaders, ...options.headers} : defaultHeaders;

        // Cuerpo
        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;
        
        // Tiempo máximo de espera
        setTimeout(() => controller.abort(), 5000);
        
        // Hacemos la petición
        return await fetch(endpoint, options)
            .then(res => res.ok ? res.json() : Promise.reject({
                err: true, 
                status: res.status || 0,
                statusText: res.statusText || "Ocurrió un error"
            }))
            .catch(err => ({ err: true, message: err }))
    };

    // Usamos las diferentes opciones
    const get = (url, options = {}) => customFetch(url, options);
    const post = (url, options = {}) => {
        options.method = "POST"
        return customFetch(url, options)
    }
    const put = (url, options = {}) => {
        options.method = "PUT"
        return customFetch(url, options)
    }
    const del = (url, options = {}) => {
        options.method = "DELETE"
        return customFetch(url, options)
    }

    // Retornamos los métodos
    return {
        get,
        post,
        put,
        del
    };
}