import mongoose from 'mongoose'
const CartItemSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  quantity: Number,
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
  status: {type: String,
    default: 'Не обработано',
    enum: ['Не обработано' , 'Обрабатывается', 'Отправлено', 'Доставлено', 'Отменено']}
})
const CartItem = mongoose.model('CartItem', CartItemSchema)
const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  customer_name: {
    type: String,
    trim: true,
    required: 'Требуется ввести имя'
  },
  customer_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Пожалуйста, заполните поле email правильно'],
    required: 'Требуется ввести email'
  },
  delivery_address: {
    street: {type: String, required: 'Требуется ввести улицу'},
    city: {type: String, required: 'Требуется ввести город'},
    state: {type: String},
    zipcode: {type: String, required: 'Требуется ввести почтовый индекс'},
    country: {type: String, required: 'Требуется ввести страну'}
  },
  payment_id: {},
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const Order = mongoose.model('Order', OrderSchema)

export {Order, CartItem}
