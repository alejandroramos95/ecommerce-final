export default function validarAdmin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("Acceso solo para Administradores.");
  }
}
