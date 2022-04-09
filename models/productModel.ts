import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Interface
import { ProductModelInterface } from '../interfaces/product';

// crear esquema
const Schema = mongoose.Schema;

const productSchema = new Schema({

    idReferencia: { type: String, required: [true, `Es necesario un ID referencia`], unique: true },
    idCreador: { type: String },
    nombre: { type: String, required: [true, 'Debe ingresar un nombre'], unique: true },
    precio: { type: Number, required: [true, 'Debe ingresar un precio'] },
    descripcion: { type: String },
    // seguimiento_disenio: { type: String },
    // seguimiento_produccion: { type: String },
    // sucursal: { type: mongoose.Types.ObjectId, ref: 'sucursales' },
    fecha_alta: { type: String },
    categoria: { type: mongoose.Types.ObjectId, ref: 'categoria', required: [true, 'Categoría es necesaria'] },
    estado: { type: Boolean, default: true },
});

// validacion para único elemento
productSchema.plugin(uniqueValidator, { message: '{PATH}, ya existe!!' });

export = mongoose.model<ProductModelInterface>('products', productSchema);