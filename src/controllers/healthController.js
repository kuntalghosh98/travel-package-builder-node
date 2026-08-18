import mongoose from 'mongoose';

export function getHealth(_req, res) {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  res.json({
    status: 'ok',
    db: dbStatus
  });
}
