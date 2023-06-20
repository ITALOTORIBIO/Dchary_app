import * as Producto from './ringGroupSlice';

export const setProducto = (producto) => {
    return (dispatch) => dispatch(Producto.SET_PRODUCTO(producto));
};
export const setNombreProducto = (nombreProducto) => {
    return (dispatch) => dispatch(Producto.SET_NOMBRE_PRODUCTO(nombreProducto));
};
export const setPrecioProducto = (precioProducto) => {
    return (dispatch) => dispatch(Producto.SET_PRECIO_PRODUCTO(precioProducto));
};
export const setCantidadProducto = (cantidadProducto) => {
    return (dispatch) => dispatch(Producto.SET_CANTIDAD_PRODUCTO(cantidadProducto));
};
export const setCantidadIngProducto = (cantidadIngProducto) => {
    return (dispatch) => dispatch(Producto.SET_CANTIDAD_ING_PRODUCTO(cantidadIngProducto));
};
export const setCantidadSalProducto = (cantidadSalProducto) => {
    return (dispatch) => dispatch(Producto.SET_CANTIDAD_SAL_PRODUCTO(cantidadSalProducto));
};
export const setCantidadMinProducto = (cantidadMinProducto) => {
    return (dispatch) => dispatch(Producto.SET_CANTIDAD_MIN_PRODUCTO(cantidadMinProducto));
};
export const setUnidadProducto = (unidadProducto) => {
    return (dispatch) => dispatch(Producto.SET_UNIDAD_PRODUCTO(unidadProducto));
};
