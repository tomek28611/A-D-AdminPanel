import mongoose, {model, Schema, models} from "mongoose";

const MassageSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  price: {type: Number},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
  practice: [{type:String}],
  country: String,
  region: String,
  city: String,
  height: String,
  weight: String,
  brest: String,
  visible: String,
 


}, {
  timestamps: true,
});

export const Massage = models.Massage || model('Massage', MassageSchema);