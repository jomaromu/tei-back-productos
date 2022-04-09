"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose = require('mongoose');
const nanoid_1 = require("nanoid");
// Modelo
const productModel_1 = __importDefault(require("../models/productModel"));
class Product {
    constructor() {
        this.idRef = (0, nanoid_1.nanoid)(10);
    }
    // Crear producto
    nuevoProducto(req, resp) {
        const idCreador = req.usuario._id;
        const nombre = req.body.nombre;
        const precio = Number(parseFloat(req.body.precio).toFixed(2));
        const descripcion = req.body.descripcion;
        // const sucursal: string = req.get('sucursal');
        const fecha = (0, moment_1.default)().format("MMM Do YY");
        const categoria = new mongoose.Types.ObjectId(req.body.categoria);
        const nuevoProducto = new productModel_1.default({
            idReferencia: this.idRef,
            idCreador: idCreador,
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            // sucursal: sucursal,
            categoria: categoria,
            fecha_alta: fecha,
        });
        if (isNaN(precio)) {
            return resp.json({
                ok: false,
                mensaje: `Ingrese un precio`,
            });
        }
        // guardar el producto
        nuevoProducto.save((err, productoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `No se pudo crear el producto`,
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    mensaje: `Producto creado`,
                    productoDB,
                });
            }
        });
    }
    // Editar un producto
    editarProducto(req, res) {
        const id = req.get("id") || "";
        // const estadoHeader: string = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);
        const estado = req.body.estado;
        const query = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            // sucursal: req.body.sucursal,
            categoria: req.body.categoria,
            ayuda: req.body.ayuda,
            estado: estado,
        };
        productModel_1.default.findById(id, (err, productoDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!productoDB) {
                return res.json({
                    ok: false,
                    mensaje: `No se encontró un producto con ese ID en la base de datos`,
                });
            }
            if (!query.nombre) {
                query.nombre = productoDB.nombre;
            }
            if (!query.precio) {
                query.precio = productoDB.precio;
            }
            if (!query.descripcion) {
                query.descripcion = productoDB.descripcion;
            }
            // if (!query.sucursal) {
            //     query.sucursal = productoDB.sucursal;
            // }
            if (!query.categoria) {
                query.categoria = productoDB.categoria;
            }
            if (!query.estado) {
                query.estado = productoDB.estado;
            }
            if (!query.estado) {
                query.estado = productoDB.estado;
            }
            productModel_1.default.findByIdAndUpdate(id, query, { new: true }, (err, productoDBActualizado) => {
                if (err) {
                    return res.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err,
                    });
                }
                if (!productoDBActualizado) {
                    return res.json({
                        ok: false,
                        mensaje: `No se encontró un producto con ese ID en la base de datos`,
                    });
                }
                return res.json({
                    ok: true,
                    mensaje: `Producto actualizado`,
                    productoDBActualizado,
                });
            });
        });
    }
    // Obtener producto por ID
    obtenerProductoID(req, res) {
        const id = req.get("id") || "";
        productModel_1.default
            .findById(id)
            // .populate('sucursal')
            .populate("categoria")
            .exec((err, productoDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error al búscar producto o no existe`,
                    err,
                });
            }
            if (!productoDB) {
                return res.json({
                    ok: false,
                    mensaje: `No existe el producto en la base de datos`,
                });
            }
            return res.json({
                ok: true,
                productoDB,
            });
        });
    }
    // Obtener usuario por ID Referencia
    obtenerProductoIDRef(req, res) {
        const idReferencia = req.get("idReferencia");
        productModel_1.default.findOne({ idReferencia: idReferencia }, (err, productoDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error al búscar producto o no existe`,
                    err,
                });
            }
            if (!productoDB) {
                return res.json({
                    ok: false,
                    mensaje: `No existe el producto en la base de datos`,
                });
            }
            return res.json({
                ok: true,
                productoDB,
            });
        });
    }
    // Obtener productos por criterio nombre en busqueda
    obtenerProductoCriterioNombre(req, res) {
        // const estadoHeader: string = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);
        const criterio = req.get("criterio");
        const regExpCrit = new RegExp(criterio, "i");
        // /^[a-zA-ZáéíóúÁÉÍÓU]+$/
        // , estado: true
        productModel_1.default.find({ nombre: regExpCrit }, (err, productosDB) => {
            //  estado: estado
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!productosDB || productosDB.length === 0) {
                return res.json({
                    ok: false,
                    mensaje: `No existen productos con ese criterio de búsqueda`,
                    productosDB,
                });
            }
            return res.json({
                ok: true,
                productosDB,
            });
        });
    }
    // Obtener productos por criterio nombre en producto del pedido
    obtenerProductoCriterioNombrePedido(req, res) {
        // const estadoHeader: string = req.get('estado');
        // const estado: boolean = castEstado(estadoHeader);
        const criterio = req.get("criterio");
        const regExpCrit = new RegExp(criterio, "i");
        // /^[a-zA-ZáéíóúÁÉÍÓU]+$/
        // , estado: true
        productModel_1.default.find({ nombre: regExpCrit, estado: true }, (err, productosDB) => {
            //  estado: estado
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!productosDB || productosDB.length === 0) {
                return res.json({
                    ok: false,
                    mensaje: `No existen productos con ese criterio de búsqueda`,
                    productosDB,
                });
            }
            return res.json({
                ok: true,
                productosDB,
            });
        });
    }
    // Obtener productos
    obtenerProductos(req, res) {
        productModel_1.default
            .find({})
            // .populate('sucursal')
            .populate("categoria")
            .exec((err, productosDB) => {
            // estado: estado
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            // if (!productosDB || productosDB.length === 0) {
            //     return res.json({
            //         ok: false,
            //         mensaje: `No existen productos con ese criterio de búsqueda`,
            //         productosDB
            //     })
            // }
            return res.json({
                ok: true,
                productosDB,
            });
        });
    }
    // Obtener productos por sucursal
    obtenerProductosSucursal(req, res) {
        const estado = req.get("estado");
        // const estado: boolean = castEstado(estadoHeader);
        const sucursal = req.get("sucursal");
        productModel_1.default.find({ sucursal: sucursal, estado: estado }, (err, productosDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!productosDB || productosDB.length === 0) {
                return res.json({
                    ok: false,
                    mensaje: `No existen productos con ese criterio de búsqueda`,
                    productosDB,
                });
            }
            return res.json({
                ok: true,
                productosDB,
            });
        });
    }
    // Eliminar un producto
    eliminarProducto(req, res) {
        const id = req.get("id") || "";
        productModel_1.default.findByIdAndDelete(id, {}, (err, productoEliminadoDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: "Erro interno",
                    err,
                });
            }
            if (!productoEliminadoDB) {
                return res.json({
                    ok: false,
                    mensaje: `No se encontró producto con este ID`,
                });
            }
            return res.json({
                ok: true,
                mensaje: `Producto eliminado`,
                productoEliminadoDB,
            });
        });
    }
}
exports.Product = Product;
