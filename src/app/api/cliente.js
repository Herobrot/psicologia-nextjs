import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
   if(req.method === 'GET') {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db();
      const posts = await db.collection('Clientes').find({}).toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'No fue posible conectarse a la base de datos' });
    } finally {
      await client.close();
    }
  } 
  else if(req.method === 'POST'){
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      try {
        await client.connect();
        const db = client.db();
        const item = res.body;
        const result = await db.collection('Clientes').insertOne(item);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'No fue posible conectarse a la base de datos' });
      } finally {
        await client.close();
      }
  }
  else if(req.method === 'PUT'){
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      try {
        await client.connect();
        const db = client.db();
        const {id, ...data} = req.body;
        const result = await db.collection('Clientes').updateOne(
            {_id: new ObjectId(id) },
            { $set: data } );
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: 'No fue posible conectarse a la base de datos' });
      } finally {
        await client.close();
      }
  }
  
  else {
    res.status(405).json({ error: 'Unsupported HTTP method' });
  }
}