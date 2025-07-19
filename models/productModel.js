// import mongoose from 'mongoose';

// const specificationSchema = new mongoose.Schema({
//   key: { type: String, required: true },
//   value: { type: String, required: true }
// });

// const productSchema = new mongoose.Schema({
//   // Basic Information
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,
//     maxlength: [120, 'Product name cannot exceed 120 characters']
//   },
//   sku: {
//     type: String,
//     required: true,
//     unique: true,
//     uppercase: true,
//     match: [/^MED[0-9]{6}$/, 'Please use valid SKU format (MED123456)']
//   },
  
//   // Medical Specific Details
//   category: {
//     type: String,
//     required: true,
//     enum: [
//       'Diagnostic Equipment',
//       'Surgical Instruments',
//       'Patient Monitoring',
//       'Therapeutic Equipment',
//       'Medical Furniture',
//       'Disposable Supplies',
//       'Dental Equipment',
//       'Laboratory Equipment',
//       'Emergency & ICU'
//     ]
//   },
//   medicalClass: {
//     type: String,
//     enum: ['Class I', 'Class II', 'Class III', 'Class IV'],
//     required: true
//   },
//   certifications: [{
//     type: String,
//     enum: ['FDA', 'CE', 'ISO 13485', 'WHO-GMP', 'Other']
//   }],
  
//   // Technical Specifications
//   specifications: [specificationSchema],
//   dimensions: {
//     length: Number,
//     width: Number,
//     height: Number,
//     unit: { type: String, default: 'cm' }
//   },
//   weight: {
//     value: Number,
//     unit: { type: String, default: 'kg' }
//   },
  
//   // Inventory & Pricing
//   price: {
//     base: { type: Number, required: true },
//     currency: { type: String, default: 'USD' },
//     discount: { type: Number, default: 0 }
//   },
//   stock: {
//     type: Number,
//     required: true,
//     min: [0, 'Stock cannot be negative']
//   },
//   reorderLevel: { type: Number, default: 5 },
  
//   // Media
//   images: [{
//     url: String,
//     altText: String,
//     isPrimary: Boolean
//   }],
//   manuals: [{
//     name: String,
//     url: String,
//     language: String
//   }],
  
//   // Compliance
//   isPrescriptionRequired: { type: Boolean, default: false },
//   fdaApprovalDate: Date,
//   expiryDate: Date,
  
//   // Reviews & Ratings
//   ratings: {
//     average: { type: Number, default: 0, min: 0, max: 5 },
//     count: { type: Number, default: 0 }
//   },
  
//   // Audit Trail
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   updatedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // Indexes for better performance
// productSchema.index({ name: 'text', category: 1, medicalClass: 1 });
// productSchema.index({ sku: 1 }, { unique: true });

// // Virtual for discounted price
// productSchema.virtual('price.final').get(function() {
//   return this.price.base * (1 - this.price.discount / 100);
// });

// export default mongoose.model('Product', productSchema);



import mongoose from "mongoose";

const medicalHardwareSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Device name is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
  category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
    model: {
      type: String,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discount: {
      type: Number,
      default: 0, // percentage (e.g., 10 for 10% off)
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    warranty: {
      type: String,
      default: "No warranty", // Example: "1 year", "6 months"
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      type: Object, // e.g., { power: "220V", dimensions: "12x8x5 in" }
      default: {},
    },
    usage: {
      type: String,
      default: "",
    },
    images: [
      {
        url: String,
        public_id: String, // for Cloudinary or S3
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }

);
                             
export default mongoose.model("MedicalHardwares", medicalHardwareSchema);

