// // // // import express from 'express';
// // // // import { createOrder, getAllOrders } from '../controllers/orderController.js';

// // // // const router = express.Router();

// // // // router.post('/', createOrder);
// // // // router.get('/', getAllOrders); // optional for admin

// // // // export default router;
// // // import express from 'express';
// // // import Order from '../models/Order.js';
// // // // import { Product } from '../models/productModel.js';
// // // // import { User } from '../models/userModel.js';
// // // import { protect, admin } from '../middleware/be.js';

// // // const router = express.Router();

// // // // @desc    Create new order
// // // // @route   POST /api/orders
// // // // @access  Private
// // // router.post('/', protect, async (req, res) => {
// // //   try {
// // //     const { 
// // //       shippingInfo, 
// // //       paymentMethod, 
// // //       orderItems, 
// // //       itemsPrice, 
// // //       taxPrice, 
// // //       shippingPrice, 
// // //       totalPrice 
// // //     } = req.body;

// // //     if (!orderItems || orderItems.length === 0) {
// // //       return res.status(400).json({ message: 'No order items' });
// // //     }

// // //     const order = new Order({
// // //       user: {
// // //         _id: req.user._id,
// // //         name: req.user.name,
// // //         email: req.user.email,
// // //       },
// // //       shippingInfo,
// // //       paymentMethod,
// // //       orderItems,
// // //       itemsPrice,
// // //       taxPrice,
// // //       shippingPrice,
// // //       totalPrice,
// // //     });

// // //     const createdOrder = await order.save();
// // //     res.status(201).json(createdOrder);
// // //   } catch (error) {
// // //     console.error('Error creating order:', error);
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // // // @desc    Get all orders
// // // // @route   GET /api/orders
// // // // @access  Private/Admin
// // // router.get('/', protect, admin, async (req, res) => {
// // //   try {
// // //     const orders = await Order.find({})
// // //       .populate('user', 'id name')
// // //       .sort({ createdAt: -1 });
// // //     res.json(orders);
// // //   } catch (error) {
// // //     console.error('Error fetching orders:', error);
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // // // @desc    Get order by ID
// // // // @route   GET /api/orders/:id
// // // // @access  Private
// // // router.get('/:id', protect, async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id).populate(
// // //       'user',
// // //       'name email'
// // //     );

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     // Check if the order belongs to the user or if user is admin
// // //     if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
// // //       return res.status(401).json({ message: 'Not authorized' });
// // //     }

// // //     res.json(order);
// // //   } catch (error) {
// // //     console.error('Error fetching order:', error);
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // // // @desc    Update order to paid
// // // // @route   PUT /api/orders/:id/pay
// // // // @access  Private
// // // router.put('/:id/pay', protect, async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id);

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     // Check if the order belongs to the user
// // //     if (order.user._id.toString() !== req.user._id.toString()) {
// // //       return res.status(401).json({ message: 'Not authorized' });
// // //     }

// // //     order.isPaid = true;
// // //     order.paidAt = Date.now();
// // //     order.paymentResult = {
// // //       id: req.body.id,
// // //       status: req.body.status,
// // //       update_time: req.body.update_time,
// // //       email_address: req.body.payer.email_address,
// // //     };

// // //     const updatedOrder = await order.save();
// // //     res.json(updatedOrder);
// // //   } catch (error) {
// // //     console.error('Error updating order:', error);
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // // // @desc    Update order to delivered
// // // // @route   PUT /api/orders/:id/deliver
// // // // @access  Private/Admin
// // // router.put('/:id/deliver', protect, admin, async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id);

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     order.isDelivered = true;
// // //     order.deliveredAt = Date.now();

// // //     const updatedOrder = await order.save();
// // //     res.json(updatedOrder);
// // //   } catch (error) {
// // //     console.error('Error updating order:', error);
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // // // @desc    Update order status
// // // // @route   PATCH /api/orders/:id
// // // // @access  Private/Admin
// // // router.patch('/:id', protect, admin, async (req, res) => {
// // //   try {
// // //     const { status } = req.body;
    
// // //     if (!status) {
// // //       return res.status(400).json({ message: 'Status is required' });
// // //     }

// // //     const order = await Order.findByIdAndUpdate(
// // //       req.params.id,
// // //       { status },
// // //       { new: true }
// // //     );

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     res.json(order);
// // //   } catch (error) {
// // //     console.error('Error updating order:', error);
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // // export default router;
// // import express from 'express';
// // import { createOrder, getAllOrders, getOrderById } from '../controllers/orderController.js';
// // import { protect, authorize } from '../middleware/authMiddleware.js';

// // const router = express.Router();

// // router.post('/', protect, createOrder);
// // router.get('/', protect, authorize('admin'), getAllOrders);
// // router.get('/:id', protect, getOrderById);

// // export default router;
// import express from 'express';
// import {
//   createOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus,
//   deleteOrder
// } from '../controllers/orderController.js';

// const router = express.Router();

// router.post('/', createOrder);
// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);
// router.put('/:id', updateOrderStatus);
// router.delete('/:id', deleteOrder);

// export default router;
import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id').put(protect, updateOrderToDelivered);

export default router;
