let items = [{ id: 1, name: "Item One" }];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(items);
  } 
  else if (req.method === "POST") {
    const body = req.body;
    const newItem = { id: items.length + 1, name: body.name };
    items.push(newItem);
    res.status(201).json(newItem);
  } 
  else if (req.method === "DELETE") {
    const id = parseInt(req.query.id);
    items = items.filter(i => i.id !== id);
    res.status(200).json({ message: "Deleted" });
  }else if (req.method === "PUT") {
  const id = parseInt(req.query.id);
  const body = req.body;
  const item = items.find(i => i.id === id);
  if (item) {
    item.name = body.name;
    res.status(200).json(item);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
