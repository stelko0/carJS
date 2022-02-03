const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  name: { type: String, minlength: 3 },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: 'noImage.jpg' },
  price: { type: Number, required: true, min: 0 },
});

const Car = model('Car', carSchema);

module.exports = Car;
