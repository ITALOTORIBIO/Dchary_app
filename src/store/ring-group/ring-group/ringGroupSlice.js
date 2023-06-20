import { createSlice } from '@reduxjs/toolkit';

export const ringGroupSlice = createSlice({
    name: 'ring-group',
    initialState: {
        nombreProducto: '',
        precioProducto: '',
        cantidadProducto: '',
        cantidadIngProducto: '',
        cantidadSalProducto: '',
        cantidadMinProducto: '',
        unidadProducto: ''
    },
    reducers: {
        SET_PRODUCTO: (state, { payload }) => {
            state.nombreProducto = payload.nombreProducto;
            state.precioProducto = payload.precioProducto;
            state.cantidadProducto = payload.cantidadProducto;
            state.cantidadIngProducto = payload.cantidadIngProducto;
            state.cantidadSalProducto = payload.cantidadSalProducto;
            state.cantidadMinProducto = payload.cantidadMinProducto;
            state.unidadProducto = payload.unidadProducto;
        },
        SET_NOMBRE_PRODUCTO: (state, { payload }) => void (state.nombreProducto = payload),
        SET_PRECIO_PRODUCTO: (state, { payload }) => void (state.precioProducto = payload),
        SET_CANTIDAD_PRODUCTO: (state, { payload }) => void (state.cantidadProducto = payload),
        SET_CANTIDAD_ING_PRODUCTO: (state, { payload }) => void (state.cantidadIngProducto = payload),
        SET_CANTIDAD_SAL_PRODUCTO: (state, { payload }) => void (state.cantidadSalProducto = payload),
        SET_CANTIDAD_MIN_PRODUCTO: (state, { payload }) => void (state.cantidadMinProducto = payload),
        SET_UNIDAD_PRODUCTO: (state, { payload }) => void (state.unidadProducto = payload)
    }
});

export const {
    SET_PRODUCTO,
    SET_NOMBRE_PRODUCTO,
    SET_PRECIO_PRODUCTO,
    SET_CANTIDAD_PRODUCTO,
    SET_CANTIDAD_ING_PRODUCTO,
    SET_CANTIDAD_SAL_PRODUCTO,
    SET_CANTIDAD_MIN_PRODUCTO,
    SET_UNIDAD_PRODUCTO
} = ringGroupSlice.actions;
