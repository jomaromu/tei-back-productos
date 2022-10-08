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
productRouter.post("/nuevoProducto", [auth_1.verificaToken], (req, resp) => {
    const nuevoProducto = new productClass_1.Product();
    nuevoProducto.nuevoProducto(req, resp);
});
// ==================================================================== //
// Editar un producto
// ==================================================================== //
productRouter.put("/editarProducto", [auth_1.verificaToken], (req, resp) => {
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
// Obtener todos los productos
// ==================================================================== //
productRouter.get("/obtenerProductos", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductos = new productClass_1.Product();
    obtenerProductos.obtenerProductos(req, resp);
});
// ==================================================================== //
// Eliminar un producto
// ==================================================================== //
productRouter.delete("/eliminarProducto", [auth_1.verificaToken], (req, resp) => {
    const eliminarProducto = new productClass_1.Product();
    eliminarProducto.eliminarProducto(req, resp);
});
// ==================================================================== //
// Obtener por criterio
// ==================================================================== //
productRouter.get("/obtenerProductoCriterio", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductoCriterio = new productClass_1.Product();
    obtenerProductoCriterio.obtenerProductoCriterio(req, resp);
});
exports.default = productRouter;
