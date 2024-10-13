import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import https from "https";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
/*
const donacionSchema = new mongoose.Schema({
  nombre: String,
  formaDePago: String,
  cantidad: Number,
  fecha: { type: Date, default: Date.now },
});*/

const donacionSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // Reference to the Usuario model
  formaDePago: String,
  cantidad: Number,
  fecha: { type: Date, default: Date.now },
});


/*
const donacionSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // Reference to the Usuarios collection
  formaDePago: String,
  cantidad: Number,
  fecha: { type: Date, default: Date.now },
});
*/

const gastoSchema = new mongoose.Schema({
  descripcion: String,
  cantidad: Number,
  fecha: { type: Date, default: Date.now },
  categoria: String,
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");
const Donacion = mongoose.model("Donacion", donacionSchema, "donaciones");
const Gasto = mongoose.model("Gasto", gastoSchema, "gastos");

// Rutas
app.get("/", (req, res) => {
  res.send("API para CRM de Fundación Sanders - Equipo 3");
});

// GET gastos
app.get("/gastos", async (req, res) => {
  try {
    const gastos = await Gasto.find();
    res.json(gastos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST gastos
app.post("/gastos", async (req, res) => {
  try {
    const newGasto = new Gasto(req.body);
    await newGasto.save();
    res.status(201).json(newGasto);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT para actualizar un gasto
app.put("/gastos/:id", async (req, res) => {
  try {
    const updatedGasto = await Gasto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGasto) return res.status(404).send("Gasto not found");
    res.json(updatedGasto);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE gasto
app.delete("/gastos/:id", async (req, res) => {
  try {
    const deletedGasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!deletedGasto) return res.status(404).send("Gasto not found");
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
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
/*
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
*/

// POST usuario
app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, apellido, edad, telefono, email, rol, usuario, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUsuario = new Usuario({
      nombre,
      apellido,
      edad,
      telefono,
      email,
      rol,
      usuario,
      password: hashedPassword,
    }); // Create a new Usuario instance with the hashed password
    await newUsuario.save(); // Save the new user
    res.status(201).json(newUsuario); // Return the new user in the response
  } catch (err) {
    res.status(500).send(err.message);
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

// DELETE MANY
app.delete("/usuarios", async (req, res) => {
  try {
    const { ids } = req.body;
    const deletedUsuarios = await Usuario.deleteMany({ _id: { $in: ids } });
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

/*
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
*/
app.get("/donaciones/:id", async (req, res) => {
  try {
    const donacion = await Donacion.findById(req.params.id).populate('usuarioId', 'nombre');
    if (!donacion) return res.status(404).send("Donacion not found");
    res.json(donacion);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


/*
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
*/
app.post("/donaciones", async (req, res) => {
  try {
    const { usuarioId, formaDePago, cantidad } = req.body; // usuarioId is passed here
    const newDonacion = new Donacion({ usuarioId, formaDePago, cantidad });
    await newDonacion.save();
    res.status(201).json(newDonacion);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/*
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
*/
app.put("/donaciones/:id", async (req, res) => {
  try {
    const updatedDonacion = await Donacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('usuarioId', 'nombre');
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


/*
// GET donaciones with populated usuarioId
app.get("/donaciones", async (req, res) => {
  try {
    const donaciones = await Donacion.find().populate('usuarioId', 'nombre'); // Populate the usuarioId field
    res.json(donaciones);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET donación by id with populated usuarioId
app.get("/donaciones/:id", async (req, res) => {
  try {
    const donacion = await Donacion.findById(req.params.id).populate('usuarioId', 'nombre'); // Populate the usuarioId field
    if (!donacion) return res.status(404).send("Donacion not found");
    res.json(donacion);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST donación with usuarioId
app.post("/donaciones", async (req, res) => {
  try {
    const { usuarioId, formaDePago, cantidad } = req.body; // Expect usuarioId to be passed in the request
    const newDonacion = new Donacion({ usuarioId, formaDePago, cantidad }); // Create a new Donacion with the usuarioId
    await newDonacion.save();
    res.status(201).json(newDonacion);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT para actualizar una donacion
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

*/
// Endpoints Gráficas
// Top 5 donaciones
app.get("/dashboard/top-donaciones", async (req, res) => {
  try {
    const topDonaciones = await Donacion.find().sort({ cantidad: -1 }).limit(5);
    res.json(topDonaciones);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Total de donaciones
app.get("/dashboard/total-donaciones", async (req, res) => {
  try {
    const totalDonaciones = await Donacion.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$cantidad" },
        },
      },
    ]);
    res.json({ total: totalDonaciones[0]?.total || 0 });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Total Gastos
app.get("/dashboard/total-gastos", async (req, res) => {
  try {
    const totalGastos = await Gasto.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$cantidad" },
        },
      },
    ]);
    res.json({ total: totalGastos[0]?.total || 0 });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Promedio de donaciones
app.get("/dashboard/promedio-donaciones", async (req, res) => {
  try {
    const promedioDonaciones = await Donacion.aggregate([
      {
        $group: {
          _id: null,
          promedio: { $avg: "$cantidad" },
        },
      },
    ]);
    res.json({ promedio: promedioDonaciones[0]?.promedio || 0 });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Cant de donaciones
app.get("/dashboard/cantidad-donaciones", async (req, res) => {
  try {
    const cantidadDonaciones = await Donacion.countDocuments();
    res.json({ total: cantidadDonaciones });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Donaciones por tipo de pago
app.get("/dashboard/tipo-pago", async (req, res) => {
  try {
    const tipoPago = await Donacion.aggregate([
      {
        $group: {
          _id: "$formaDePago",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(tipoPago);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Donaciones por mes
app.get("/dashboard/donaciones-por-mes", async (req, res) => {
  try {
    const donacionesPorMes = await Donacion.aggregate([
      {
        $group: {
          _id: { $month: { $toDate: "$fecha" } },
          totalDonaciones: { $sum: "$cantidad" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(donacionesPorMes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Gastos por mes
app.get("/dashboard/gastos-por-mes", async (req, res) => {
  try {
    const gastosPorMes = await Gasto.aggregate([
      {
        $group: {
          _id: { $month: { $toDate: "$fecha" } },
          totalGastos: { $sum: "$cantidad" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(gastosPorMes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Progreso del proyecto
app.get("/dashboard/progreso-proyecto", async (req, res) => {
  try {
    const totalDonaciones = await Donacion.aggregate([
      { $group: { _id: null, total: { $sum: "$cantidad" } } },
    ]);
    const meta = 300000; // Meta fija
    const recaudado = totalDonaciones[0]?.total || 0;
    const porcentaje = (recaudado / meta) * 100;

    res.json({ recaudado, faltante: meta - recaudado, porcentaje });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET usuario por nombre de usuario
app.get("/usuarios/username/:username", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ usuario: req.params.username });
    if (!usuario) return res.status(404).send("Usuario not found");
    res.json(usuario);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/*
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
*/

// Endpoint de auth
app.post("/auth", async (req, res) => {
  const { usuario, password } = req.body;

  console.log("Received login request:", { usuario, password });

  try {
    const user = await Usuario.findOne({ usuario });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Token generated:", token);

    res.json({ success: true, token, rol: user.rol });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

const privateKey = fs.readFileSync("../HTTPS/server.key", "utf8");
const certificate = fs.readFileSync("../HTTPS/server.crt", "utf8");
const ca = fs.readFileSync("../HTTPS/ca.crt", "utf8");
const credentials = { key: privateKey, cert: certificate, ca: ca };

//Servidor HTTPS
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () =>
  console.log(`Server running on port ${port} with HTTPS`)
);

// Inicialización del servidor
//app.listen(port, () => {
//  console.log(`Listening on port ${port}`);
//});
