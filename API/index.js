import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Inicializar app Express
const app = express();
const port = 3000;

// Middleware para manejar JSONs
app.use(express.json());

app.use(cors());

// Conexión con MongoDB
mongoose
  .connect("mongodb://localhost:27017/CRM")
  .then(() => console.log("Connected to MongoDB CRM Database"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Schemas y Models de Mongoose
const clienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  telefono: String,
  email: String,
});

const donacionSchema = new mongoose.Schema({
  cliente: String,
  formaDePago: String,
  cantidad: Number,
  fecha: String,
});

const Cliente = mongoose.model("Cliente", clienteSchema);
const Donacion = mongoose.model("Donacion", donacionSchema, "donaciones");

// Rutas
app.get("/", (req, res) => {
  res.send("API para CRM de Fundación Sanders - Equipo 3");
});

// GET clientes
app.get("/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET cliente
app.get("/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send("Cliente not found");
    res.json(cliente);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST cliente
app.post("/clientes", async (req, res) => {
  try {
    const newCliente = new Cliente(req.body);
    await newCliente.save();
    res.status(201).json(newCliente);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT para actualizar un cliente
app.put("/clientes/:id", async (req, res) => {
  try {
    const updatedCliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCliente) return res.status(404).send("Cliente not found");
    res.json(updatedCliente);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE cliente
app.delete("/clientes/:id", async (req, res) => {
  try {
    const deletedCliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!deletedCliente) return res.status(404).send("Cliente not found");
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET donaciones
app.get("/donaciones", async (req, res) => {
  try {
    const donaciones = await Donacion.find();
    res.json(donaciones);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET donación
app.get("/donaciones/:id", async (req, res) => {
  try {
    const donacion = await Donacion.findById(req.params.id);
    if (!donacion) return res.status(404).send("Donacion not found");
    res.json(donacion);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST donacion
app.post("/donaciones", async (req, res) => {
  try {
    const newDonacion = new Donacion(req.body);
    await newDonacion.save();
    res.status(201).json(newDonacion);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT para actuallizar una donacion
app.put("/donaciones/:id", async (req, res) => {
  try {
    const updatedDonacion = await Donacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDonacion) return res.status(404).send("Donacion not found");
    res.json(updatedDonacion);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE donacion
app.delete("/donaciones/:id", async (req, res) => {
  try {
    const deletedDonacion = await Donacion.findByIdAndDelete(req.params.id);
    if (!deletedDonacion) return res.status(404).send("Donacion not found");
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Inicialización del servidor
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
