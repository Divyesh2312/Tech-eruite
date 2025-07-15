const mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, 
  description :{
    type: String,
  },
  price:{
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,  
  },
    categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  },{
    timestamps: true,
  })

  productSchema.plugin(aggregatePaginate);
  productSchema.plugin(mongoosePaginate);
  module.exports = mongoose.model('Product', productSchema);