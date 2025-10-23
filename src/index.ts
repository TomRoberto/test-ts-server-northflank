import "dotenv/config";
import express, { Request, Response } from "express"; // import du package express
import { TUser } from "./types";
import User from "./models/User";
import mongoose from "mongoose";
import saveUser from "./utils/saveUser";

const app = express(); // création du serveur
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string);

app.get("/", (req, res) => {
  // route en GET dont le chemin est /
  res.json({ message: "Hi" }); // réponse du serveur : {message : "Hi"}
});

app.get("/hello", (req, res) => {
  // route en GET dont le chemin est /hello
  res.json({ message: "Hello" });
});

app.post(
  "/users",
  async (
    req: Request<{}, {}, TUser>,
    res: Response<{ message: string; data?: TUser }>
  ) => {
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
      const newUser = new User({ name, email });

      await saveUser(newUser);

      // On renvoie l'utilisateur créé
      res
        .status(201)
        .json({ message: "User created successfully", data: newUser });
    } catch (error) {
      console.log(error);

      // Si une erreur non prévue survient ===> error 500
      if (error instanceof Error)
        res.status(500).json({ message: error.message });
    }
  }
);

app.listen(process.env.PORT as string, () => {
  // Mon serveur va écouter le port 3000
  console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});
