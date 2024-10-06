import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: String,
  make: String,
  model: String,
  description: String,
  price: {type: Number},
  images: [{type:String}],

}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);