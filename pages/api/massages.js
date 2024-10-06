import { Massage } from "@/models/Massage";
import { mongooseConnect } from "@/lib/mongoose";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Massage.findOne({ _id: req.query.id }));
    } else {
      res.json(await Massage.find());
    }
  }

  if (method === 'POST') {
    const { title, description, price, images, category, properties, practice, country, region, city,height,weight,brest,visible,  } = req.body;
    const massageDoc = await Massage.create({
      title, description, price, images, category, properties, practice, country, region, city,height,weight,brest,visible, 
    })
    res.json(massageDoc);
  }

  if (method === 'PUT') {
    const { title, description, price, images, category, properties, _id, practice, country, region, city, height,weight,brest,visible,  } = req.body;
    await Massage.updateOne({ _id }, {
      title, description, price, images, category, properties, practice, country, region, city, height,weight,brest,visible, 
    });
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Massage.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}