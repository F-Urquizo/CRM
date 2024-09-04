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
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  telefono: String,
  email: String,
  rol: String,
  usuario: String,
  password: String,
});

const donacionSchema = new mongoose.Schema({
  cliente: String,
  formaDePago: String,
  cantidad: Number,
  fecha: String,
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");
const Donacion = mongoose.model("Donacion", donacionSchema, "donaciones");

// Rutas
app.get("/", (req, res) => {
  res.send("API para CRM de Fundación Sanders - Equipo 3");
});

// GET usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET usuarios por id
app.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).send("Usuario not found");
    res.json(usuario);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST usuario
app.post("/usuarios", async (req, res) => {
  try {
    const newUsuario = new Usuario(req.body);
    await newUsuario.save();
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT para actualizar un usuario
app.put("/usuarios/:id", async (req, res) => {
  try {
    const updatedUsuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUsuario) return res.status(404).send("Usuario not found");
    res.json(updatedUsuario);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE usuario
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!deletedUsuario) return res.status(404).send("Usuario not found");
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

// Endpoint de auth

app.post("/auth", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Si el usuario existe y la contraseña coincide, devolver rol junto con la respuesta
    return res.status(200).json({
      success: true,
      message: "Access granted",
      rol: user.rol, // Incluir el rol del usuario en la respuesta
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


// Inicialización del servidor
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
