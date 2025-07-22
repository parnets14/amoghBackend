// // // // // import mongoose from 'mongoose';

// // // // // const orderSchema = new mongoose.Schema({
// // // // //   user: {
// // // // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // // // //     name: String,
// // // // //     email: String,
// // // // //   },
// // // // //   shippingInfo: {
// // // // //     fullName: { type: String, required: true },
// // // // //     address: { type: String, required: true },
// // // // //     city: String,
// // // // //     postalCode: String,
// // // // //     country: String,
// // // // //     email: { type: String, required: true },
// // // // //     phone: String,
// // // // //   },
// // // // //   paymentMethod: {
// // // // //     type: String,
// // // // //     enum: ['credit-card', 'bank-transfer'],
// // // // //     required: true,
// // // // //   },
// // // // //   product: {
// // // // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// // // // //     name: String,
// // // // //     price: Number,
// // // // //     quantity: Number,
// // // // //     images: [{ url: String }]
// // // // //   },
// // // // //   subtotal: Number,
// // // // //   shipping: Number,
// // // // //   tax: Number,
// // // // //   total: Number,
// // // // //   orderNumber: String,
// // // // //   createdAt: {
// // // // //     type: Date,
// // // // //     default: Date.now,
// // // // //   },
// // // // // });

// // // // // export const Order = mongoose.model('Order', orderSchema);
// // // // import mongoose from 'mongoose';

// // // // const orderSchema = new mongoose.Schema({
// // // //   user: {
// // // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // // //     name: String,
// // // //     email: String,
// // // //   },
// // // //   shippingInfo: {
// // // //     fullName: { type: String, required: true },
// // // //     address: { type: String, required: true },
// // // //     city: String,
// // // //     postalCode: String,
// // // //     country: String,
// // // //     email: { type: String, required: true },
// // // //     phone: String,
// // // //   },
// // // //   paymentMethod: {
// // // //     type: String,
// // // //     enum: ['credit-card', 'bank-transfer'],
// // // //     required: true,
// // // //   },
// // // //   product: {
// // // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// // // //     name: String,
// // // //     price: Number,
// // // //     quantity: Number,
// // // //     images: [{ url: String }]
// // // //   },
// // // //   subtotal: Number,
// // // //   shipping: Number,
// // // //   tax: Number,
// // // //   total: Number,
// // // //   orderNumber: String,
// // // //   status: {
// // // //     type: String,
// // // //     enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
// // // //     default: 'pending'
// // // //   },
// // // //   createdAt: {
// // // //     type: Date,
// // // //     default: Date.now,
// // // //   },
// // // // }, {
// // // //   timestamps: true
// // // // });

// // // // const Order = mongoose.model("Order", userSchema);
// // // // export default Order;
// // // import mongoose from 'mongoose';

// // // const orderSchema = new mongoose.Schema({
// // //   user: {
// // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // //     name: String,
// // //     email: String,
// // //   },
// // //   shippingInfo: {
// // //     fullName: { type: String, required: true },
// // //     address: { type: String, required: true },
// // //     city: String,
// // //     postalCode: String,
// // //     country: String,
// // //     email: { type: String, required: true },
// // //     phone: String,
// // //   },
// // //   paymentMethod: {
// // //     type: String,
// // //     enum: ['credit-card', 'bank-transfer'],
// // //     required: true,
// // //   },
// // //   product: {
// // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// // //     name: String,
// // //     price: Number,
// // //     quantity: Number,
// // //     images: [{ url: String }]
// // //   },
// // //   subtotal: Number,
// // //   shipping: Number,
// // //   tax: Number,
// // //   total: Number,
// // //   orderNumber: String,
// // //   status: {
// // //     type: String,
// // //     enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
// // //     default: 'pending'
// // //   },
// // //   createdAt: {
// // //     type: Date,
// // //     default: Date.now,
// // //   },
// // // }, {
// // //   timestamps: true
// // // });

// // // const Order = mongoose.model("Order", orderSchema);
// // // export default Order;
// // import mongoose from 'mongoose';

// // const orderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //       name: { type: String, required: true },
// //       email: { type: String, required: true },
// //     },
// //     shippingInfo: {
// //       fullName: { type: String, required: true },
// //       address: { type: String, required: true },
// //       city: { type: String, required: true },
// //       postalCode: { type: String, required: true },
// //       country: { type: String, required: true },
// //       email: { type: String, required: true },
// //       phone: { type: String, required: true },
// //     },
// //     paymentMethod: {
// //       type: String,
// //       enum: ['credit-card', 'bank-transfer'],
// //       required: true,
// //     },
// //     product: {
// //       _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
// //       name: { type: String, required: true },
// //       price: { type: Number, required: true },
// //       quantity: { type: Number, required: true },
// //       images: [{ url: { type: String, required: true } }],
// //     },
// //     subtotal: { type: Number, required: true },
// //     shipping: { type: Number, required: true },
// //     tax: { type: Number, required: true },
// //     total: { type: Number, required: true },
// //     orderNumber: { type: String, required: true, unique: true },
// //     status: {
// //       type: String,
// //       enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
// //       default: 'pending',
// //     },
// //     createdAt: {
// //       type: Date,
// //       default: Date.now,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // const Order = mongoose.model('Order', orderSchema);
// // export default Order;
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   orderNumber: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   user: {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     }
//   },
//   shippingInfo: {
//     fullName: {
//       type: String,
//       required: true
//     },
//     address: {
//       type: String,
//       required: true
//     },
//     city: {
//       type: String,
//       required: true
//     },
//     postalCode: {
//       type: String,
//       required: true
//     },
//     country: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     }
//   },
//   items: [{
//     product: {
//       _id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       },
//       name: {
//         type: String,
//         required: true
//       },
//       price: {
//         type: Number,
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true
//       }
//     },
//     quantity: {
//       type: Number,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     }
//   }],
//   paymentMethod: {
//     type: String,
//     required: true,
//     enum: ['credit-card', 'bank-transfer']
//   },
//   paymentDetails: {
//     cardLastFour: String,
//     cardBrand: String,
//     cardholderName: String
//   },
//   subtotal: {
//     type: Number,
//     required: true
//   },
//   shipping: {
//     type: Number,
//     required: true,
//     default: 0
//   },
//   tax: {
//     type: Number,
//     required: true
//   },
//   total: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ['processing', 'shipped', 'delivered', 'cancelled'],
//     default: 'processing'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  shippingInfo: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  items: [{
    product: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalHardwares',
        required: true
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit-card', 'bank-transfer']
  },
  paymentDetails: {
    cardLastFour: String,
    cardBrand: String,
    cardholderName: String
  },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true, default: 0 },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
