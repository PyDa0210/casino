// src/models/bet.model.js
import mongoose from 'mongoose';

const betSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchId: { type: Number, required: true }, // ID del partido (de la API)
    league: { type: String, required: true }, // Liga del partido
    homeTeam: { type: String, required: true }, // Nombre del equipo local
    awayTeam: { type: String, required: true }, // Nombre del equipo visitante
    betType: { type: String, enum: ['ganar', 'perder', 'perderempatar'], required: true },
    amount: { type: Number, required: true, min: 1 },
    odds: { type: Number, required: true, default: 2.0 }, // Cuota aplicada
    result: { type: String, enum: ['pendiente', 'ganada', 'perdida'], default: 'pendiente' },
    status: { type: String, enum: ['activa', 'cancelada', 'resuelta'], default: 'activa' },
  },
  {
    timestamps: true, // Para registrar automáticamente las fechas de creación y actualización
  }
);

const Bet = mongoose.model('Bet', betSchema);

export default Bet;