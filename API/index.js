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
const donadorSchema = new mongoose.Schema({
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

const Donador = mongoose.model("Donador", donadorSchema, "donadores");
const Donacion = mongoose.model("Donacion", donacionSchema, "donaciones");

// Rutas
app.get("/", (req, res) => {
  res.send("API para CRM de Fundación Sanders - Equipo 3");
});

// GET donadores
app.get("/donadores", async (req, res) => {
  try {
    const donadores = await Donador.find();
    res.json(donadores);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET donadores
app.get("/donadores/:id", async (req, res) => {
  try {
    const donador = await Donador.findById(req.params.id);
    if (!donador) return res.status(404).send("Donador not found");
    res.json(donador);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST donador
app.post("/donadores", async (req, res) => {
  try {
    const newDonador = new Donador(req.body);
    await newDonador.save();
    res.status(201).json(newDonador);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT para actualizar un donador
app.put("/donadores/:id", async (req, res) => {
  try {
    const updatedDonador = await Donador.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDonador) return res.status(404).send("Donador not found");
    res.json(updatedDonador);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE donador
app.delete("/donadores/:id", async (req, res) => {
  try {
    const deletedDonador = await Donador.findByIdAndDelete(req.params.id);
    if (!deletedDonador) return res.status(404).send("Donador not found");
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

// POST donación
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
