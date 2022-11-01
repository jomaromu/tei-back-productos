import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { ProductModelInterface } from "../interfaces/product";

// crear esquema
const Schema = mongoose.Schema;

const productSchema = new Schema({
  idReferencia: {
    type: String,
    required: [true, `Es necesario un ID referencia`],
  },
  idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
  nombre: {
    type: String,
    required: [true, "Debe ingresar un nombre"],
  },
  precio: { type: Number, required: [true, "Debe ingresar un precio"] },
  descripcion: { type: String },
  fecha_alta: { type: String },
  categoria: {
    type: mongoose.Types.ObjectId,
    ref: "categoria",
    required: [true, "Categoría es necesaria"],
  },
  estado: { type: Boolean, default: true },
  foranea: { type: Schema.Types.ObjectId, ref: "userWorker" },
});

// validacion para único elemento
productSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<ProductModelInterface>("products", productSchema);
