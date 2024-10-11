import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Missing ID' });
    }

    try {
      await SupportRequest.findByIdAndDelete(id);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedOrder);
  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
