import { Response, Request } from "express";
import moment from "moment";
const mongoose = require('mongoose');
import { CallbackError } from "mongoose";
import { nanoid } from "nanoid";

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
    const idCreador: string = req.usuario._id;
    const nombre: string = req.body.nombre;

    const precio: number = Number(parseFloat(req.body.precio).toFixed(2));

    const descripcion: string = req.body.descripcion;
    // const sucursal: string = req.get('sucursal');
    const fecha = moment().format("MMM Do YY");
    const categoria = new mongoose.Types.ObjectId(req.body.categoria);

    const nuevoProducto = new productModel({
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
      } else {
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

    productModel.findById(
      id,
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

        productModel.findByIdAndUpdate(
          id,
          query,
          { new: true },
          (err: CallbackError, productoDBActualizado: any) => {
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
          }
        );
      }
    );
  }

  // Obtener producto por ID
  obtenerProductoID(req: Request, res: Response): void {
    const id = req.get("id") || "";

    productModel
      .findById(id)
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

  // Obtener usuario por ID Referencia
  obtenerProductoIDRef(req: Request, res: Response): void {
    const idReferencia = req.get("idReferencia");

    productModel.findOne(
      { idReferencia: idReferencia },
      (err: CallbackError, productoDB: Document) => {
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
      }
    );
  }

  // Obtener productos por criterio nombre en busqueda
  obtenerProductoCriterioNombre(req: any, res: Response): void {
    // const estadoHeader: string = req.get('estado');
    // const estado: boolean = castEstado(estadoHeader);

    const criterio = req.get("criterio");
    const regExpCrit = new RegExp(criterio, "i");
    // /^[a-zA-ZáéíóúÁÉÍÓU]+$/

    // , estado: true
    productModel.find(
      { nombre: regExpCrit },
      (err: CallbackError, productosDB: Array<ProductModelInterface>) => {
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
      }
    );
  }

  // Obtener productos por criterio nombre en producto del pedido
  obtenerProductoCriterioNombrePedido(req: any, res: Response): void {
    // const estadoHeader: string = req.get('estado');
    // const estado: boolean = castEstado(estadoHeader);

    const criterio = req.get("criterio");
    const regExpCrit = new RegExp(criterio, "i");
    // /^[a-zA-ZáéíóúÁÉÍÓU]+$/

    // , estado: true
    productModel.find(
      { nombre: regExpCrit, estado: true },
      (err: CallbackError, productosDB: Array<ProductModelInterface>) => {
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
      }
    );
  }

  // Obtener productos
  obtenerProductos(req: any, res: Response): void {
    productModel
      .find({})
      // .populate('sucursal')
      .populate("categoria")
      .exec((err: any, productosDB: Array<any>) => {
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
  obtenerProductosSucursal(req: any, res: Response): void {
    const estado: boolean = req.get("estado");
    // const estado: boolean = castEstado(estadoHeader);

    const sucursal = req.get("sucursal");

    productModel.find(
      { sucursal: sucursal, estado: estado },
      (err: CallbackError, productosDB: Array<ProductModelInterface>) => {
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
      }
    );
  }

  // Eliminar un producto
  eliminarProducto(req: Request, res: Response): void {
    const id = req.get("id") || "";

    productModel.findByIdAndDelete(
      id,
      {},
      (err: CallbackError, productoEliminadoDB: any) => {
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
      }
    );
  }
}

// Interfaz para manejar los datos del archivo idSucursal.json
interface Archivo {
  ids: Array<string>;
}

interface RespPromise {
  ok: boolean;
  data: string;
}
