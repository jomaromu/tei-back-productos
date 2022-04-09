import { Router, Request, Response } from "express";
import {
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  verificaToken,
} from "../auth/auth";
import { Product } from "../class/productClass";

// instanciar el Router
const productRouter = Router();

// ==================================================================== //
// Crear un producto
// ==================================================================== //
productRouter.post(
  "/nuevoProducto",
  [verificaToken, crearUsuario],
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
  [verificaToken, editarUsuario],
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
// Obtener un producto por ID Referencia
// ==================================================================== //
productRouter.get(
  "/obtenerProductoIDRef",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductoIDRef = new Product();
    obtenerProductoIDRef.obtenerProductoIDRef(req, resp);
  }
);

// ==================================================================== //
// Obtener un productos por criterio nombre
// ==================================================================== //
productRouter.get(
  "/obtenerProductoCriterioNombre",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductoCriterioNombre = new Product();
    obtenerProductoCriterioNombre.obtenerProductoCriterioNombre(req, resp);
  }
);

// ==================================================================== //
// Obtener un productos por criterio nombre en producto del pedido
// ==================================================================== //
productRouter.get(
  "/obtenerProductoCriterioNombrePedido",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductoCriterioNombrePedido = new Product();
    obtenerProductoCriterioNombrePedido.obtenerProductoCriterioNombrePedido(
      req,
      resp
    );
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
// Obtener un productos por sucursal
// ==================================================================== //
productRouter.get(
  "/obtenerProductosSucursal",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductosSucursal = new Product();
    obtenerProductosSucursal.obtenerProductosSucursal(req, resp);
  }
);

// ==================================================================== //
// Eliminar un producto
// ==================================================================== //
productRouter.delete(
  "/eliminarProducto",
  [verificaToken, eliminarUsuario],
  (req: Request, resp: Response) => {
    const eliminarProducto = new Product();
    eliminarProducto.eliminarProducto(req, resp);
  }
);

export default productRouter;
