let employees = [
  { id: 1, name: "John Doe", email: "john@example.com", designation: "Developer" }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(employees);
  } 
  else if (req.method === "POST") {
    const body = req.body;
    const newEmployee = { 
      id: employees.length + 1, 
      name: body.name, 
      email: body.email, 
      designation: body.designation 
    };
    employees.push(newEmployee);
    return res.status(201).json(newEmployee);
  } 
  else if (req.method === "DELETE") {
    const id = Number(req.query.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    employees = employees.filter(emp => emp.id !== id);
    return res.status(200).json({ message: "Deleted" });
  } 
  else if (req.method === "PUT") {
    const id = Number(req.query.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    const body = req.body;
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return res.status(404).json({ message: "Not found" });

    employee.name = body.name || employee.name;
    employee.email = body.email || employee.email;
    employee.designation = body.designation || employee.designation;

    return res.status(200).json(employee);
  } 
  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
