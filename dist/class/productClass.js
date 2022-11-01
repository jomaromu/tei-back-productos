"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose = require("mongoose");
const nanoid_1 = require("nanoid");
const server_1 = __importDefault(require("./server"));
// Modelo
const productModel_1 = __importDefault(require("../models/productModel"));
class Product {
    constructor() {
        this.idRef = (0, nanoid_1.nanoid)(10);
    }
    // Crear producto
    nuevoProducto(req, resp) {
        const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const categoria = new mongoose.Types.ObjectId(req.body.categoria);
        const descripcion = req.body.observacion;
        const nombre = req.body.nombre;
        const precio = Number(parseFloat(req.body.precio).toFixed(2));
        const fecha_alta = (0, moment_1.default)().format("DD-MM-YYYY");
        const estado = req.body.estado;
        const nuevoProducto = new productModel_1.default({
            idReferencia: this.idRef,
            idCreador,
            foranea,
            nombre,
            precio,
            descripcion,
            categoria,
            fecha_alta,
            estado,
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
                const server = server_1.default.instance;
                server.io.emit("cargar-productos", {
                    ok: true,
                });
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
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const estado = req.body.estado;
        const query = {
            categoria: new mongoose.Types.ObjectId(req.body.categoria),
            nombre: req.body.nombre,
            descripcion: req.body.observacion,
            precio: Number(parseFloat(req.body.precio).toFixed(2)),
            estado: estado,
        };
        productModel_1.default.findOne({ _id, foranea }, (err, productoDB) => {
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
            if (!query.categoria) {
                query.categoria = productoDB.categoria;
            }
            productModel_1.default.findOneAndUpdate({ _id, foranea }, query, { new: true }, (err, productoDB) => {
                if (err) {
                    return res.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err,
                    });
                }
                else {
                    const server = server_1.default.instance;
                    server.io.emit("cargar-productos", {
                        ok: true,
                    });
                    return res.json({
                        ok: true,
                        mensaje: `Producto actualizado`,
                        productoDB,
                    });
                }
            });
        });
    }
    // Obtener producto por ID
    obtenerProductoID(req, res) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        productModel_1.default
            .findOne({ _id, foranea })
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
    // Obtener productos
    obtenerProductos(req, res) {
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        productModel_1.default
            .find({ foranea })
            .populate("categoria")
            .populate("idCreador")
            .exec((err, productosDB) => {
            // estado: estado
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
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
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        productModel_1.default.findOneAndUpdate({ _id, foranea }, {}, (err, productoDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: "Erro interno",
                    err,
                });
            }
            else {
                const server = server_1.default.instance;
                server.io.emit("cargar-productos", {
                    ok: true,
                });
                return res.json({
                    ok: true,
                    mensaje: `Producto eliminado`,
                    productoDB,
                });
            }
        });
    }
    obtenerProductoCriterio(req, resp) {
        const value = req.get("criterio") || "";
        const criterio = new RegExp(value, "i");
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        productModel_1.default.find({ $and: [{ $or: [{ nombre: criterio }] }, { foranea }] }, (err, productosDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al obtener el producto",
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    productosDB,
                });
            }
        });
    }
}
exports.Product = Product;
