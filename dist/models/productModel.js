"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// crear esquema
const Schema = mongoose_1.default.Schema;
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
        type: mongoose_1.default.Types.ObjectId,
        ref: "categoria",
        required: [true, "Categoría es necesaria"],
    },
    estado: { type: Boolean, default: true },
    foranea: { type: Schema.Types.ObjectId, ref: "userWorker" },
});
// validacion para único elemento
productSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH}, ya existe!!" });
module.exports = mongoose_1.default.model("products", productSchema);
