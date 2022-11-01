import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { CategoriaModelInterface } from "../interfaces/categoria";

// crear esquema
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
  nombre: {
    type: String,
    required: [true, "Debe ingresar un nombre"],
  },
  estado: { type: Boolean, default: true },
  foranea: { type: Schema.Types.ObjectId, ref: "userWorker" },
});

// validacion para único elemento
categoriaSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<CategoriaModelInterface>("categoria", categoriaSchema);
