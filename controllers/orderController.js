// import Order from '../models/Order.js';

// // Create order
// export const createOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     const saved = await order.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all orders
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get order by ID
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ error: 'Order not found' });
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update order status
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!order) return res.status(404).json({ error: 'Order not found' });
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete order
// export const deleteOrder = async (req, res) => {
//   try {
//     const deleted = await Order.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Order not found' });
//     res.status(200).json({ message: 'Order deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
import Order from '../models/Order.js';
import generateOrderNumber from '../utils/generateOrderNumber.js';
import { validateOrder } from '../utils/validation.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      items,
      paymentMethod,
      paymentDetails,
      subtotal,
      shipping,
      tax,
      total
    } = req.body;

    const order = new Order({
      orderNumber: generateOrderNumber(),
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
      },
      shippingInfo,
      items: items.map(item => ({
        product: {
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.product.quantity
        },
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod,
      paymentDetails: paymentMethod === "credit-card" ? {
        cardLastFour: paymentDetails.cardLastFour,
        cardBrand: paymentDetails.cardBrand,
        cardholderName: paymentDetails.cardholderName
      } : undefined,
      subtotal,
      shipping,
      tax,
      total,
      status: "processing"
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Server error while creating order" });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user._id', 'name email')
      .populate('items.product._id', 'name price');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ error: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error while fetching order' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'user._id': req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product._id', 'name price image');

    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Server error while fetching user orders' });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user._id', 'name email')
      .populate('items.product._id', 'name price');

    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Server error while fetching all orders' });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'delivered';
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Server error while updating order' });
  }
};

