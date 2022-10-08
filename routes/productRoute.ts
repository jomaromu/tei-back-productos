import { Router, Request, Response } from "express";
import { verificaToken } from "../auth/auth";
import { Product } from "../class/productClass";

// instanciar el Router
const productRouter = Router();

// ==================================================================== //
// Crear un producto
// ==================================================================== //
productRouter.post(
  "/nuevoProducto",
  [verificaToken],
  (req: Request, resp: Response) => {
    const nuevoProducto = new Product();
    nuevoProducto.nuevoProducto(req, resp);
  }
);

// ==================================================================== //
// Editar un producto
// ==================================================================== //
productRouter.put(
  "/editarProducto",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarProducto = new Product();
    editarProducto.editarProducto(req, resp);
  }
);

// ==================================================================== //
// Obtener un producto por ID
// ==================================================================== //
productRouter.get(
  "/obtenerProductoID",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductoID = new Product();
    obtenerProductoID.obtenerProductoID(req, resp);
  }
);

// ==================================================================== //
// Obtener todos los productos
// ==================================================================== //
productRouter.get(
  "/obtenerProductos",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductos = new Product();
    obtenerProductos.obtenerProductos(req, resp);
  }
);

// ==================================================================== //
// Eliminar un producto
// ==================================================================== //
productRouter.delete(
  "/eliminarProducto",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarProducto = new Product();
    eliminarProducto.eliminarProducto(req, resp);
  }
);

// ==================================================================== //
// Obtener por criterio
// ==================================================================== //
productRouter.get(
  "/obtenerProductoCriterio",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductoCriterio = new Product();
    obtenerProductoCriterio.obtenerProductoCriterio(req, resp);
  }
);

export default productRouter;
