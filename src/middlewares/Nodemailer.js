import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let EMAIL_ADM = process.env.EMAIL_ADM;
let PASS_ADM = process.env.PASS_ADM;

let EMAIL_USER = process.env.EMAIL_USER;
let PASS_USER = process.env.PASS_USER;

export async function enviarEmailRegistro(newUser) {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: EMAIL_ADM,
      pass: PASS_ADM,
    },
  });

  const mailOptions = {
    from: "ECOMMERCE",
    to: EMAIL_ADM,
    subject: "NUEVO REGISTRO",
    html: `
    <h1 style="color: blue;">REGISTRO EXITOSO, NUEVO USUARIO EN 
    <span style="color: green;">ECOMMERCE</span>
    </h1>
    <p>DATOS DEL USUARIO</p>
    <p>EMAIL: ${newUser.email}</p>
    <p>NOMBRE: ${newUser.nombre}</p>
    <p>DIRECCION: ${newUser.direccion}</p>
    <p>EDAD: ${newUser.edad}</p>
    <p>CONTACTO: ${newUser.contacto}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(err);
  }
}

export async function enviarEmailCompra(orden) {
  let arrayOrden = [];
  for (let i = 0; i < orden.productos.length; i++) {
    const element = {
      ID: orden.productos[i]._id.toHexString(),
      Nombre: orden.productos[i].Nombre,
      Precio: orden.productos[i].Precio,
    };
    arrayOrden.push(element);
  }

  const arrayOrdenConCantidad = [];

  arrayOrden.map((item) => {
    if (
      arrayOrdenConCantidad.find((object) => {
        if (object.ID === item.ID && object.Precio === item.Precio) {
          object.Cantidad++;
          return true;
        } else {
          return false;
        }
      })
    ) {
    } else {
      item.Cantidad = 1;
      arrayOrdenConCantidad.push(item);
    }
  });

  const arrayOrdenPrecioTotal = [];
  for (let i = 0; i < arrayOrdenConCantidad.length; i++) {
    arrayOrdenPrecioTotal[i] = arrayOrdenConCantidad[i];
    arrayOrdenPrecioTotal[i].PrecioTotal =
      arrayOrdenConCantidad[i].Precio * arrayOrdenConCantidad[i].Cantidad;
  }

  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: EMAIL_USER,
      pass: PASS_USER,
    },
  });

  const mailOptions = {
    from: "ECOMMERCE",
    to: EMAIL_USER,
    subject: "COMPRA EXITOSA",
    html: `
    <h1 style="color: blue;">COMPRA EXITOSA DEL USUARIO: ${orden.email}
    </h1>
    <p>
    <span style="color: green;">DETALLE DE COMPRA:</span>
    </p>
    Nombre producto: ${JSON.stringify(arrayOrdenPrecioTotal)}
    <p>
    Fecha y hora: ${orden.createdAt.toLocaleString()}
    </p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(err);
  }
}
