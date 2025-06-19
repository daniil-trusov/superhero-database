export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong";

  console.error("ERROR:", err);
  console.error(`[${status}] ${message}`);

  res.status(status).json({ error: message });
}
