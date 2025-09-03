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
  } 
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
