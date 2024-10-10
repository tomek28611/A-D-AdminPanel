import { mongooseConnect } from '@/lib/mongoose';
import SupportRequest from '@/models/SupportRequest';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      try {
        const supportRequest = await SupportRequest.findById(id);
        if (!supportRequest) {
          return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(supportRequest);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching message', error: error.message });
      }
    } else {
      try {
        const supportRequests = await SupportRequest.find().sort({ createdAt: -1 });
        res.status(200).json(supportRequests);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
      }
    }
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
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
