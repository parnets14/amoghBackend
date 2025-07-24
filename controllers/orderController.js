
// // // // import Order from '../models/Order.js';
// // // // import generateOrderNumber from '../utils/generateOrderNumber.js';
// // // // import { validateOrder } from '../utils/validation.js';

// // // // // @desc    Create new order
// // // // // @route   POST /api/orders
// // // // // @access  Private
// // // // // export const createOrder = async (req, res) => {
// // // // //   try {
// // // // //     const {
// // // // //       shippingInfo,
// // // // //       items,
// // // // //       paymentMethod,
// // // // //       paymentDetails,
// // // // //       subtotal,
// // // // //       shipping,
// // // // //       tax,
// // // // //       total
// // // // //     } = req.body;

// // // // //     const order = new Order({
// // // // //       orderNumber: generateOrderNumber(),
// // // // //       user: {
// // // // //         _id: req.user._id,
// // // // //         name: req.user.name,
// // // // //         email: req.user.email
// // // // //       },
// // // // //       shippingInfo,
// // // // //       items: items.map(item => ({
// // // // //         product: {
// // // // //           _id: item.product._id,
// // // // //           name: item.product.name,
// // // // //           price: item.product.price,
// // // // //           quantity: item.product.quantity
// // // // //         },
// // // // //         quantity: item.quantity,
// // // // //         price: item.price
// // // // //       })),
// // // // //       paymentMethod,
// // // // //       paymentDetails: paymentMethod === "credit-card" ? {
// // // // //         cardLastFour: paymentDetails.cardLastFour,
// // // // //         cardBrand: paymentDetails.cardBrand,
// // // // //         cardholderName: paymentDetails.cardholderName
// // // // //       } : undefined,
// // // // //       subtotal,
// // // // //       shipping,
// // // // //       tax,
// // // // //       total,
// // // // //       status: "processing"
// // // // //     });

// // // // //     const createdOrder = await order.save();
// // // // //     res.status(201).json(createdOrder);
// // // // //   } catch (error) {
// // // // //     console.error("Error creating order:", error);
// // // // //     res.status(500).json({ error: "Server error while creating order" });
// // // // //   }
// // // // // };
// // // // export const createOrder = async (req, res) => {
// // // //   try {
// // // //     const { items, shippingAddress, paymentMethod, subtotal, tax, total } = req.body;

// // // //     if (!items || !Array.isArray(items)) {
// // // //       return res.status(400).json({ error: "Invalid or missing 'items' in request body" });
// // // //     }

// // // //     const orderItems = items.map(item => ({
// // // //       product: item.productId,
// // // //       quantity: item.quantity,
// // // //       price: item.price,
// // // //     }));

// // // //     const newOrder = new Order({
// // // //       user: req.user._id,
// // // //       items: orderItems,
// // // //       shippingAddress,
// // // //       paymentMethod,
// // // //       subtotal,
// // // //       tax,
// // // //       total,
// // // //       status: 'processing',
// // // //     });

// // // //     const savedOrder = await newOrder.save();

// // // //     res.status(201).json(savedOrder);
// // // //   } catch (error) {
// // // //     console.error("Error creating order:", error);
// // // //     res.status(500).json({ error: "Failed to create order" });
// // // //   }
// // // // };


// // // // // @desc    Get order by ID
// // // // // @route   GET /api/orders/:id
// // // // // @access  Private
// // // // export const getOrderById = async (req, res) => {
// // // //   try {
// // // //     const order = await Order.findById(req.params.id)
// // // //       .populate('user._id', 'name email')
// // // //       .populate('items.product._id', 'name price');

// // // //     if (!order) {
// // // //       return res.status(404).json({ error: 'Order not found' });
// // // //     }

// // // //     if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
// // // //       return res.status(401).json({ error: 'Not authorized to view this order' });
// // // //     }

// // // //     res.json(order);
// // // //   } catch (error) {
// // // //     console.error('Error fetching order:', error);
// // // //     res.status(500).json({ error: 'Server error while fetching order' });
// // // //   }
// // // // };

// // // // // @desc    Get logged in user orders
// // // // // @route   GET /api/orders/myorders
// // // // // @access  Private
// // // // export const getMyOrders = async (req, res) => {
// // // //   try {
// // // //     const orders = await Order.find({ 'user._id': req.user._id })
// // // //       .sort({ createdAt: -1 })
// // // //       .populate('items.product._id', 'name price image');

// // // //     res.json(orders);
// // // //   } catch (error) {
// // // //     console.error('Error fetching user orders:', error);
// // // //     res.status(500).json({ error: 'Server error while fetching user orders' });
// // // //   }
// // // // };

// // // // // @desc    Get all orders (admin)
// // // // // @route   GET /api/orders
// // // // // @access  Private/Admin
// // // // export const getOrders = async (req, res) => {
// // // //   try {
// // // //     const orders = await Order.find({})
// // // //       .sort({ createdAt: -1 })
// // // //       .populate('user._id', 'name email')
// // // //       .populate('items.product._id', 'name price');

// // // //     res.json(orders);
// // // //   } catch (error) {
// // // //     console.error('Error fetching all orders:', error);
// // // //     res.status(500).json({ error: 'Server error while fetching all orders' });
// // // //   }
// // // // };

// // // // // @desc    Update order to delivered
// // // // // @route   PUT /api/orders/:id/deliver
// // // // // @access  Private/Admin
// // // // export const updateOrderToDelivered = async (req, res) => {
// // // //   try {
// // // //     const order = await Order.findById(req.params.id);

// // // //     if (!order) {
// // // //       return res.status(404).json({ error: 'Order not found' });
// // // //     }

// // // //     order.status = 'delivered';
// // // //     order.deliveredAt = Date.now();

// // // //     const updatedOrder = await order.save();
// // // //     res.json(updatedOrder);
// // // //   } catch (error) {
// // // //     console.error('Error updating order:', error);
// // // //     res.status(500).json({ error: 'Server error while updating order' });
// // // //   }
// // // // };

// // // // // controllers/orderController.js
// // // // export const updateOrderStatus = async (req, res) => {
// // // //   try {
// // // //     const { status } = req.body; // Receive status from frontend
// // // //     const order = await Order.findById(req.params.id);

// // // //     if (!order) {
// // // //       return res.status(404).json({ error: 'Order not found' });
// // // //     }

// // // //     order.status = status;

// // // //     if (status === 'delivered') {
// // // //       order.deliveredAt = Date.now();
// // // //     }

// // // //     const updatedOrder = await order.save();
// // // //     res.json(updatedOrder);
// // // //   } catch (error) {
// // // //     console.error('Error updating order:', error);
// // // //     res.status(500).json({ error: 'Server error while updating order' });
// // // //   }
// // // // };


// // // import Order from '../models/Order.js';
// // // import generateOrderNumber from '../utils/generateOrderNumber.js';

// // // // @desc    Create new order
// // // // @route   POST /api/orders
// // // // @access  Private
// // // export const createOrder = async (req, res) => {
// // //   try {
// // //     const {
// // //       shippingInfo,
// // //       orderItems,
// // //       paymentMethod,
// // //       paymentDetails,
// // //       subtotal,
// // //       shippingPrice,
// // //       taxPrice,
// // //       totalPrice
// // //     } = req.body;

// // //     console.log('Received order data:', req.body);

// // //     // Validate required fields
// // //     if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
// // //       return res.status(400).json({ 
// // //         success: false,
// // //         message: "Order items are required and must be a non-empty array" 
// // //       });
// // //     }

// // //     if (!shippingInfo) {
// // //       return res.status(400).json({ 
// // //         success: false,
// // //         message: "Shipping information is required" 
// // //       });
// // //     }

// // //     // Generate order number
// // //     const orderNumber = generateOrderNumber();

// // //     // Create order object
// // //     const orderData = {
// // //       orderNumber,
// // //       user: req.user._id,
// // //       shippingInfo: {
// // //         fullName: shippingInfo.fullName,
// // //         address: shippingInfo.address,
// // //         city: shippingInfo.city,
// // //         postalCode: shippingInfo.postalCode,
// // //         country: shippingInfo.country,
// // //         email: shippingInfo.email,
// // //         phone: shippingInfo.phone,
// // //       },
// // //       orderItems: orderItems.map(item => ({
// // //         product: item.product,
// // //         name: item.name,
// // //         quantity: item.quantity,
// // //         price: item.price,
// // //         image: item.image,
// // //       })),
// // //       paymentMethod,
// // //       paymentDetails: paymentMethod === "credit-card" ? {
// // //         cardLastFour: paymentDetails?.cardLastFour,
// // //         cardBrand: paymentDetails?.cardBrand,
// // //         cardholderName: paymentDetails?.cardholderName
// // //       } : paymentMethod === "cod" ? {
// // //         codAmount: totalPrice
// // //       } : undefined,
// // //       subtotal: subtotal || 0,
// // //       shippingPrice: shippingPrice || 0,
// // //       taxPrice: taxPrice || 0,
// // //       totalPrice: totalPrice || 0,
// // //       status: "pending"
// // //     };

// // //     console.log('Creating order with data:', orderData);

// // //     const order = new Order(orderData);
// // //     const savedOrder = await order.save();

// // //     console.log('Order created successfully:', savedOrder._id);

// // //     res.status(201).json({
// // //       success: true,
// // //       message: "Order created successfully",
// // //       order: savedOrder,
// // //       orderNumber: savedOrder.orderNumber,
// // //       _id: savedOrder._id
// // //     });

// // //   } catch (error) {
// // //     console.error("Error creating order:", error);
// // //     res.status(500).json({ 
// // //       success: false,
// // //       message: "Server error while creating order",
// // //       error: error.message 
// // //     });
// // //   }
// // // };

// // // // @desc    Get order by ID
// // // // @route   GET /api/orders/:id
// // // // @access  Private
// // // export const getOrderById = async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id)
// // //       .populate('user', 'name email')
// // //       .populate('orderItems.product', 'name price images');

// // //     if (!order) {
// // //       return res.status(404).json({ 
// // //         success: false,
// // //         message: 'Order not found' 
// // //       });
// // //     }

// // //     // Check if user owns this order or is admin
// // //     if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
// // //       return res.status(401).json({ 
// // //         success: false,
// // //         message: 'Not authorized to view this order' 
// // //       });
// // //     }

// // //     res.json({
// // //       success: true,
// // //       data: order
// // //     });
// // //   } catch (error) {
// // //     console.error('Error fetching order:', error);
// // //     res.status(500).json({ 
// // //       success: false,
// // //       message: 'Server error while fetching order' 
// // //     });
// // //   }
// // // };

// // // // @desc    Get logged in user orders
// // // // @route   GET /api/orders/myorders
// // // // @access  Private
// // // export const getMyOrders = async (req, res) => {
// // //   try {
// // //     const orders = await Order.find({ user: req.user._id })
// // //       .sort({ createdAt: -1 })
// // //       .populate('orderItems.product', 'name price images');

// // //     res.json({
// // //       success: true,
// // //       data: orders
// // //     });
// // //   } catch (error) {
// // //     console.error('Error fetching user orders:', error);
// // //     res.status(500).json({ 
// // //       success: false,
// // //       message: 'Server error while fetching user orders' 
// // //     });
// // //   }
// // // };

// // // // @desc    Get all orders (admin)
// // // // @route   GET /api/orders
// // // // @access  Private/Admin
// // // export const getOrders = async (req, res) => {
// // //   try {
// // //     const orders = await Order.find({})
// // //       .sort({ createdAt: -1 })
// // //       .populate('user', 'name email')
// // //       .populate('orderItems.product', 'name price images');

// // //     res.json({
// // //       success: true,
// // //       data: orders
// // //     });
// // //   } catch (error) {
// // //     console.error('Error fetching all orders:', error);
// // //     res.status(500).json({ 
// // //       success: false,
// // //       message: 'Server error while fetching all orders' 
// // //     });
// // //   }
// // // };

// // // // @desc    Update order status
// // // // @route   PUT /api/orders/:id/status
// // // // @access  Private/Admin
// // // export const updateOrderStatus = async (req, res) => {
// // //   try {
// // //     const { status } = req.body;
    
// // //     const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
// // //     if (!validStatuses.includes(status)) {
// // //       return res.status(400).json({ 
// // //         success: false,
// // //         message: 'Invalid status' 
// // //       });
// // //     }

// // //     const order = await Order.findById(req.params.id);
    
// // //     if (!order) {
// // //       return res.status(404).json({ 
// // //         success: false,
// // //         message: 'Order not found' 
// // //       });
// // //     }

// // //     order.status = status;
    
// // //     if (status === 'delivered') {
// // //       order.deliveredAt = Date.now();
// // //     }

// // //     const updatedOrder = await order.save();

// // //     res.json({
// // //       success: true,
// // //       message: 'Order status updated successfully',
// // //       data: updatedOrder
// // //     });
// // //   } catch (error) {
// // //     console.error('Error updating order:', error);
// // //     res.status(500).json({ 
// // //       success: false,
// // //       message: 'Server error while updating order' 
// // //     });
// // //   }
// // // };

// // // // @desc    Update order to delivered
// // // // @route   PUT /api/orders/:id/deliver
// // // // @access  Private/Admin
// // // export const updateOrderToDelivered = async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id);
    
// // //     if (!order) {
// // //       return res.status(404).json({ 
// // //         success: false,
// // //         message: 'Order not found' 
// // //       });
// // //     }

// // //     order.status = 'delivered';
// // //     order.deliveredAt = Date.now();
    
// // //     const updatedOrder = await order.save();

// // //     res.json({
// // //       success: true,
// // //       message: 'Order marked as delivered',
// // //       data: updatedOrder
// // //     });
// // //   } catch (error) {
// // //     console.error('Error updating order:', error);
// // //     res.status(500).json({ 
// // //       success: false,
// // //       message: 'Server error while updating order' 
// // //     });
// // //   }
// // // };
// // import Order from "../models/Order.js"
// // import generateOrderNumber from "../utils/generateOrderNumber.js"

// // // @desc    Create new order
// // // @route   POST /api/orders
// // // @access  Private
// // export const createOrder = async (req, res) => {
// //   try {
// //     const { shippingInfo, orderItems, paymentMethod, paymentDetails, subtotal, shippingPrice, taxPrice, totalPrice } =
// //       req.body

// //     console.log("Received order data:", req.body)
// //     console.log("User data:", req.user)

// //     // Validate required fields
// //     if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Order items are required and must be a non-empty array",
// //       })
// //     }

// //     if (!shippingInfo) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Shipping information is required",
// //       })
// //     }

// //     // Generate order number
// //     const orderNumber = generateOrderNumber()

// //     // Create order object matching your existing schema
// //     const orderData = {
// //       orderNumber,
// //       user: {
// //         _id: req.user._id,
// //         name: req.user.name,
// //         email: req.user.email,
// //       },
// //       shippingInfo: {
// //         fullName: shippingInfo.fullName,
// //         address: shippingInfo.address,
// //         city: shippingInfo.city,
// //         postalCode: shippingInfo.postalCode,
// //         country: shippingInfo.country,
// //         email: shippingInfo.email,
// //         phone: shippingInfo.phone,
// //       },
// //       orderItems: orderItems.map((item) => ({
// //         product: {
// //           _id: item.product,
// //           name: item.name,
// //           price: item.price,
// //           quantity: item.quantity,
// //         },
// //         quantity: item.quantity,
// //         price: item.price,
// //         image: item.image,
// //       })),
// //       paymentMethod: paymentMethod === "cod" ? "cash-on-delivery" : paymentMethod,
// //       paymentDetails:
// //         paymentMethod === "credit-card"
// //           ? {
// //               cardLastFour: paymentDetails?.cardLastFour,
// //               cardBrand: paymentDetails?.cardBrand,
// //               cardholderName: paymentDetails?.cardholderName,
// //             }
// //           : paymentMethod === "cod"
// //             ? {
// //                 codAmount: totalPrice,
// //               }
// //             : undefined,
// //       subtotal: subtotal || 0,
// //       shipping: shippingPrice || 0,
// //       tax: taxPrice || 0,
// //       total: totalPrice || 0,
// //       status: "processing", // Use "processing" instead of "pending"
// //     }

// //     console.log("Creating order with data:", orderData)

// //     const order = new Order(orderData)
// //     const savedOrder = await order.save()

// //     console.log("Order created successfully:", savedOrder._id)

// //     res.status(201).json({
// //       success: true,
// //       message: "Order created successfully",
// //       order: savedOrder,
// //       orderNumber: savedOrder.orderNumber,
// //       _id: savedOrder._id,
// //     })
// //   } catch (error) {
// //     console.error("Error creating order:", error)
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while creating order",
// //       error: error.message,
// //     })
// //   }
// // }

// // // @desc    Get order by ID
// // // @route   GET /api/orders/:id
// // // @access  Private
// // export const getOrderById = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id)
// //       .populate("user", "name email")
// //       .populate("orderItems.product", "name price images")

// //     if (!order) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Order not found",
// //       })
// //     }

// //     // Check if user owns this order or is admin
// //     if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Not authorized to view this order",
// //       })
// //     }

// //     res.json({
// //       success: true,
// //       data: order,
// //     })
// //   } catch (error) {
// //     console.error("Error fetching order:", error)
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching order",
// //     })
// //   }
// // }

// // // @desc    Get logged in user orders
// // // @route   GET /api/orders/myorders
// // // @access  Private
// // export const getMyOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ "user._id": req.user._id })
// //       .sort({ createdAt: -1 })
// //       .populate("orderItems.product._id", "name price images")

// //     res.json({
// //       success: true,
// //       data: orders,
// //     })
// //   } catch (error) {
// //     console.error("Error fetching user orders:", error)
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching user orders",
// //     })
// //   }
// // }

// // // @desc    Get all orders (admin)
// // // @route   GET /api/orders
// // // @access  Private/Admin
// // export const getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({})
// //       .sort({ createdAt: -1 })
// //       .populate("user", "name email")
// //       .populate("orderItems.product", "name price images")

// //     res.json({
// //       success: true,
// //       data: orders,
// //     })
// //   } catch (error) {
// //     console.error("Error fetching all orders:", error)
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching all orders",
// //     })
// //   }
// // }

// // // @desc    Update order status
// // // @route   PUT /api/orders/:id/status
// // // @access  Private/Admin
// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body

// //     const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid status",
// //       })
// //     }

// //     const order = await Order.findById(req.params.id)

// //     if (!order) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Order not found",
// //       })
// //     }

// //     order.status = status

// //     if (status === "delivered") {
// //       order.deliveredAt = Date.now()
// //     }

// //     const updatedOrder = await order.save()

// //     res.json({
// //       success: true,
// //       message: "Order status updated successfully",
// //       data: updatedOrder,
// //     })
// //   } catch (error) {
// //     console.error("Error updating order:", error)
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while updating order",
// //     })
// //   }
// // }

// // // @desc    Update order to delivered
// // // @route   PUT /api/orders/:id/deliver
// // // @access  Private/Admin
// // export const updateOrderToDelivered = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id)

// //     if (!order) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Order not found",
// //       })
// //     }

// //     order.status = "delivered"
// //     order.deliveredAt = Date.now()

// //     const updatedOrder = await order.save()

// //     res.json({
// //       success: true,
// //       message: "Order marked as delivered",
// //       data: updatedOrder,
// //     })
// //   } catch (error) {
// //     console.error("Error updating order:", error)
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while updating order",
// //     })
// //   }
// // }
// import Order from "../models/Order.js"
// import generateOrderNumber from "../utils/generateOrderNumber.js"

// // @desc    Create new order
// // @route   POST /api/orders
// // @access  Private
// export const createOrder = async (req, res) => {
//   try {
//     const { shippingInfo, orderItems, paymentMethod, paymentDetails, subtotal, shippingPrice, taxPrice, totalPrice } =
//       req.body

//     console.log("Received order data:", req.body)
//     console.log("User data:", req.user)

//     // Validate required fields
//     if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Order items are required and must be a non-empty array",
//       })
//     }

//     if (!shippingInfo) {
//       return res.status(400).json({
//         success: false,
//         message: "Shipping information is required",
//       })
//     }

//     // Generate order number
//     const orderNumber = generateOrderNumber()

//     // Create order object matching your exact schema
//     const orderData = {
//       orderNumber,
//       user: {
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//       },
//       shippingInfo: {
//         fullName: shippingInfo.fullName,
//         address: shippingInfo.address,
//         city: shippingInfo.city,
//         postalCode: shippingInfo.postalCode,
//         country: shippingInfo.country,
//         email: shippingInfo.email,
//         phone: shippingInfo.phone,
//       },
//       items: orderItems.map((item) => ({
//         product: {
//           _id: item.product,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         },
//         quantity: item.quantity,
//         price: item.price,
//         image: item.image,
//       })),
//       paymentMethod: paymentMethod, // Keep original value since we added 'cod' to enum
//       paymentDetails:
//         paymentMethod === "credit-card"
//           ? {
//               cardLastFour: paymentDetails?.cardLastFour,
//               cardBrand: paymentDetails?.cardBrand,
//               cardholderName: paymentDetails?.cardholderName,
//             }
//           : paymentMethod === "cod"
//             ? {
//                 codAmount: totalPrice,
//               }
//             : paymentDetails,
//       subtotal: subtotal || 0,
//       shipping: shippingPrice || 0,
//       tax: taxPrice || 0,
//       total: totalPrice || 0,
//       status: "processing",
//     }

//     console.log("Creating order with data:", orderData)

//     const order = new Order(orderData)
//     const savedOrder = await order.save()

//     console.log("Order created successfully:", savedOrder._id)

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: savedOrder,
//       orderNumber: savedOrder.orderNumber,
//       _id: savedOrder._id,
//     })
//   } catch (error) {
//     console.error("Error creating order:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating order",
//       error: error.message,
//     })
//   }
// }

// // @desc    Get order by ID
// // @route   GET /api/orders/:id
// // @access  Private
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("user", "name email")
//       .populate("orderItems.product", "name price images")

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       })
//     }

//     // Check if user owns this order or is admin
//     if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized to view this order",
//       })
//     }

//     res.json({
//       success: true,
//       data: order,
//     })
//   } catch (error) {
//     console.error("Error fetching order:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching order",
//     })
//   }
// }

// // @desc    Get logged in user orders
// // @route   GET /api/orders/myorders
// // @access  Private
// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ "user._id": req.user._id }).sort({ createdAt: -1 })

//     res.json({
//       success: true,
//       data: orders,
//     })
//   } catch (error) {
//     console.error("Error fetching user orders:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching user orders",
//     })
//   }
// }

// // @desc    Get all orders (admin)
// // @route   GET /api/orders
// // @access  Private/Admin
// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({})
//       .sort({ createdAt: -1 })
//       .populate("user", "name email")
//       .populate("orderItems.product", "name price images")

//     res.json({
//       success: true,
//       data: orders,
//     })
//   } catch (error) {
//     console.error("Error fetching all orders:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching all orders",
//     })
//   }
// }

// // @desc    Update order status
// // @route   PUT /api/orders/:id/status
// // @access  Private/Admin
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body

//     const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       })
//     }

//     const order = await Order.findById(req.params.id)

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       })
//     }

//     order.status = status

//     if (status === "delivered") {
//       order.deliveredAt = Date.now()
//     }

//     const updatedOrder = await order.save()

//     res.json({
//       success: true,
//       message: "Order status updated successfully",
//       data: updatedOrder,
//     })
//   } catch (error) {
//     console.error("Error updating order:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating order",
//     })
//   }
// }

// // @desc    Update order to delivered
// // @route   PUT /api/orders/:id/deliver
// // @access  Private/Admin
// export const updateOrderToDelivered = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       })
//     }

//     order.status = "delivered"
//     order.deliveredAt = Date.now()

//     const updatedOrder = await order.save()

//     res.json({
//       success: true,
//       message: "Order marked as delivered",
//       data: updatedOrder,
//     })
//   } catch (error) {
//     console.error("Error updating order:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating order",
//     })
//   }
// }
import Order from "../models/Order.js"
import generateOrderNumber from "../utils/generateOrderNumber.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { shippingInfo, orderItems, paymentMethod, paymentDetails, subtotal, shippingPrice, taxPrice, totalPrice } =
      req.body

    console.log("Received order data:", req.body)
    console.log("User data:", req.user)

    // Validate required fields
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required and must be a non-empty array",
      })
    }

    if (!shippingInfo) {
      return res.status(400).json({
        success: false,
        message: "Shipping information is required",
      })
    }

    // Generate order number
    const orderNumber = generateOrderNumber()

    // Create order object matching your exact schema
    const orderData = {
      orderNumber,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      shippingInfo: {
        fullName: shippingInfo.fullName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
      },
      items: orderItems.map((item) => ({
        product: {
          _id: item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        },
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      paymentMethod: paymentMethod, // Keep original value since we added 'cod' to enum
      paymentDetails:
        paymentMethod === "credit-card"
          ? {
              cardLastFour: paymentDetails?.cardLastFour,
              cardBrand: paymentDetails?.cardBrand,
              cardholderName: paymentDetails?.cardholderName,
            }
          : paymentMethod === "cod"
            ? {
                codAmount: totalPrice,
              }
            : paymentDetails,
      subtotal: subtotal || 0,
      shipping: shippingPrice || 0,
      tax: taxPrice || 0,
      total: totalPrice || 0,
      status: "processing",
    }

    console.log("Creating order with data:", orderData)

    const order = new Order(orderData)
    const savedOrder = await order.save()

    console.log("Order created successfully:", savedOrder._id)

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
      orderNumber: savedOrder.orderNumber,
      _id: savedOrder._id,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({
      success: false,
      message: "Server error while creating order",
      error: error.message,
    })
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to view this order",
      })
    }

    res.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching order",
    })
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.user._id }).sort({ createdAt: -1 })

    res.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    console.error("Error fetching user orders:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching user orders",
    })
  }
}

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 })

    res.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    console.error("Error fetching all orders:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching all orders",
    })
  }
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      })
    }

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    order.status = status

    if (status === "delivered") {
      order.deliveredAt = Date.now()
    }

    const updatedOrder = await order.save()

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    })
  } catch (error) {
    console.error("Error updating order:", error)
    res.status(500).json({
      success: false,
      message: "Server error while updating order",
    })
  }
}

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    order.status = "delivered"
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json({
      success: true,
      message: "Order marked as delivered",
      data: updatedOrder,
    })
  } catch (error) {
    console.error("Error updating order:", error)
    res.status(500).json({
      success: false,
      message: "Server error while updating order",
    })
  }
}
