"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express")); // import du package express
const User_1 = __importDefault(require("./models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const saveUser_1 = __importDefault(require("./utils/saveUser"));
const app = (0, express_1.default)(); // création du serveur
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_URI);
app.get("/", (req, res) => {
    // route en GET dont le chemin est /
    res.json({ message: "Hi" }); // réponse du serveur : {message : "Hi"}
});
app.get("/hello", (req, res) => {
    // route en GET dont le chemin est /hello
    res.json({ message: "Hello" });
});
app.post("/users", async (req, res) => {
    try {
        // Récupération du body
        const { name, email } = req.body;
        //  S'il manque le name ou l'email ===> error 400
        if (!name || !email) {
            res.status(400).json({ message: "Name and email are required" });
            // On sort de la fonction
            return;
        }
        // Création de l'utilisateur
        const newUser = new User_1.default({ name, email });
        await (0, saveUser_1.default)(newUser);
        // On renvoie l'utilisateur créé
        res
            .status(201)
            .json({ message: "User created successfully", data: newUser });
    }
    catch (error) {
        console.log(error);
        // Si une erreur non prévue survient ===> error 500
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
app.listen(process.env.PORT, () => {
    // Mon serveur va écouter le port 3000
    console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});
