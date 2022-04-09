"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const productClass_1 = require("../class/productClass");
// instanciar el Router
const productRouter = (0, express_1.Router)();
// ==================================================================== //
// Crear un producto
// ==================================================================== //
productRouter.post("/nuevoProducto", [auth_1.verificaToken, auth_1.crearUsuario], (req, resp) => {
    const nuevoProducto = new productClass_1.Product();
    nuevoProducto.nuevoProducto(req, resp);
});
// ==================================================================== //
// Editar un producto
// ==================================================================== //
productRouter.put("/editarProducto", [auth_1.verificaToken, auth_1.editarUsuario], (req, resp) => {
    const editarProducto = new productClass_1.Product();
    editarProducto.editarProducto(req, resp);
});
// ==================================================================== //
// Obtener un producto por ID
// ==================================================================== //
productRouter.get("/obtenerProductoID", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductoID = new productClass_1.Product();
    obtenerProductoID.obtenerProductoID(req, resp);
});
// ==================================================================== //
// Obtener un producto por ID Referencia
// ==================================================================== //
productRouter.get("/obtenerProductoIDRef", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductoIDRef = new productClass_1.Product();
    obtenerProductoIDRef.obtenerProductoIDRef(req, resp);
});
// ==================================================================== //
// Obtener un productos por criterio nombre
// ==================================================================== //
productRouter.get("/obtenerProductoCriterioNombre", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductoCriterioNombre = new productClass_1.Product();
    obtenerProductoCriterioNombre.obtenerProductoCriterioNombre(req, resp);
});
// ==================================================================== //
// Obtener un productos por criterio nombre en producto del pedido
// ==================================================================== //
productRouter.get("/obtenerProductoCriterioNombrePedido", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductoCriterioNombrePedido = new productClass_1.Product();
    obtenerProductoCriterioNombrePedido.obtenerProductoCriterioNombrePedido(req, resp);
});
// ==================================================================== //
// Obtener todos los productos
// ==================================================================== //
productRouter.get("/obtenerProductos", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductos = new productClass_1.Product();
    obtenerProductos.obtenerProductos(req, resp);
});
// ==================================================================== //
// Obtener un productos por sucursal
// ==================================================================== //
productRouter.get("/obtenerProductosSucursal", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductosSucursal = new productClass_1.Product();
    obtenerProductosSucursal.obtenerProductosSucursal(req, resp);
});
// ==================================================================== //
// Eliminar un producto
// ==================================================================== //
productRouter.delete("/eliminarProducto", [auth_1.verificaToken, auth_1.eliminarUsuario], (req, resp) => {
    const eliminarProducto = new productClass_1.Product();
    eliminarProducto.eliminarProducto(req, resp);
});
exports.default = productRouter;
