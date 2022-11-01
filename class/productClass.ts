import { Response, Request } from "express";
import moment from "moment";
const mongoose = require("mongoose");
import { CallbackError } from "mongoose";
import { nanoid } from "nanoid";
import Server from "./server";
// Modelo
import productModel from "../models/productModel";

// Interfaces
import { ProductModelInterface } from "../interfaces/product";

export class Product {
  public idRef: string;

  constructor() {
    this.idRef = nanoid(10);
  }

  // Crear producto
  nuevoProducto(req: any, resp: Response): any {
    const idCreador: any = new mongoose.Types.ObjectId(req.usuario._id);
    const foranea: any = new mongoose.Types.ObjectId(req.body.foranea);
    const categoria = new mongoose.Types.ObjectId(req.body.categoria);
    const descripcion: string = req.body.observacion;
    const nombre: string = req.body.nombre;
    const precio: number = Number(parseFloat(req.body.precio).toFixed(2));
    const fecha_alta = moment().format("DD-MM-YYYY");
    const estado: boolean = req.body.estado;

    const nuevoProducto = new productModel({
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
      } else {
        const server = Server.instance;
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
  editarProducto(req: any, res: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const estado: boolean = req.body.estado;

    const query = {
      categoria: new mongoose.Types.ObjectId(req.body.categoria),
      nombre: req.body.nombre,
      descripcion: req.body.observacion,
      precio: Number(parseFloat(req.body.precio).toFixed(2)),
      estado: estado,
    };

    productModel.findOne(
      { _id, foranea },
      (err: CallbackError, productoDB: ProductModelInterface) => {
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

        productModel.findOneAndUpdate(
          { _id, foranea },
          query,
          { new: true },
          (err: CallbackError, productoDB: any) => {
            if (err) {
              return res.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            } else {
              const server = Server.instance;
              server.io.emit("cargar-productos", {
                ok: true,
              });

              return res.json({
                ok: true,
                mensaje: `Producto actualizado`,
                productoDB,
              });
            }
          }
        );
      }
    );
  }

  // Obtener producto por ID
  obtenerProductoID(req: Request, res: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    productModel
      .findOne({ _id, foranea })
      // .populate('sucursal')
      .populate("categoria")
      .exec((err: any, productoDB: any) => {
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
  obtenerProductos(req: any, res: Response): void {
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    productModel
      .find({ foranea })
      .populate("categoria")
      .populate("idCreador")
      .exec((err: any, productosDB: Array<any>) => {
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
  eliminarProducto(req: Request, res: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    productModel.findOneAndUpdate(
      { _id, foranea },
      {},
      (err: CallbackError, productoDB: any) => {
        if (err) {
          return res.json({
            ok: false,
            mensaje: "Erro interno",
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-productos", {
            ok: true,
          });
          return res.json({
            ok: true,
            mensaje: `Producto eliminado`,
            productoDB,
          });
        }
      }
    );
  }

  obtenerProductoCriterio(req: Request, resp: Response): void {
    const value: string = req.get("criterio") || "";
    const criterio = new RegExp(value, "i");
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    productModel.find(
      { $and: [{ $or: [{ nombre: criterio }] }, { foranea }] },
      (err: CallbackError, productosDB: Array<ProductModelInterface>) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al obtener el producto",
            err,
          });
        } else {
          return resp.json({
            ok: true,
            productosDB,
          });
        }
      }
    );
  }
}
