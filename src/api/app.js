import mongoose from "mongoose";
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

const uri = "mongodb+srv://223208:Jaguares34.1@cluster0.swir3km.mongodb.net/Prueba";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

