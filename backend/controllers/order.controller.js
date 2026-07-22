import Order from "../models/Order.model.js"
import sendEmail from "../utils/sendEmail.js"
import PDFDocument from "pdfkit";

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items?.length || !totalAmount || !address) {
            return res.status(400).json({
                message: "Invalid Order Data",
            });
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId,
        });
        const html = `
<div style="font-family:Arial,sans-serif;padding:20px">
    <h2 style="color:#ff6b00;">🎉 Order Confirmed</h2>

    <p>Hello <b>${req.user.name}</b>,</p>

    <p>Thank you for shopping with <b>Shoplix</b>.</p>

    <table border="1" cellpadding="10" cellspacing="0">
        <tr>
            <td><b>Order ID</b></td>
            <td>${order._id}</td>
        </tr>

        <tr>
            <td><b>Total Amount</b></td>
            <td>₹${order.totalAmount}</td>
        </tr>

        <tr>
            <td><b>Payment ID</b></td>
            <td>${paymentId || "N/A"}</td>
        </tr>
    </table>

    <br/>

    <p>Your order is being processed.</p>

    <h3>Thank you ❤️</h3>

    <p><b>Team Shoplix</b></p>
</div>
`;

        await sendEmail({
            to: req.user.email,
            subject: "🎉 Your Shoplix Order is Confirmed",
            text: `Hello ${req.user.name},

Your order has been placed successfully.

Order ID: ${order._id}

Amount: ₹${order.totalAmount}

Thank you for shopping with Shoplix.`,
            html,
        }); 

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.productId", "name price");
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error })
    }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // console.log("Orders:", orders);

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.productId", "name");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${order._id}.pdf`
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .fillColor("#f97316")
      .text("SHOPLIX", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fillColor("black")
      .fontSize(18)
      .text("Invoice");

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`Invoice ID : ${order._id}`);
    doc.text(`Customer : ${order.user.name}`);
    doc.text(`Email : ${order.user.email}`);
    doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString()}`);

    doc.moveDown();

    doc.fontSize(16).text("Products");

    doc.moveDown();

    order.items.forEach((item) => {
      doc.text(
        `${item.productId.name}
Qty : ${item.qty}
Price : ₹${item.price}
-------------------------------------`
      );
    });

    doc.moveDown();

    doc
      .fontSize(16)
      .text(`Total : ₹${order.totalAmount}`);

    doc.moveDown();

    doc.text(`Payment ID : ${order.paymentId}`);

    doc.moveDown();

    doc
      .fillColor("green")
      .fontSize(16)
      .text("Payment Status : PAID");

    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
export { createOrder, myOrders, getOrders, updateOrderStatus , downloadInvoice}