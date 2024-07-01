// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';  
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import skaterRoutes from './routes/skaters.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurar Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para el manejo de datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(skaterRoutes);

// Middleware para el manejo de cookies
app.use(cookieParser());

// Usar las rutas de autenticación
app.use(authRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', {
        participantes: [
            { nombre: 'Tony Hawk', anos_experiencia: 12, especialidad: 'Kickflip', estado: 'Aprobado', foto: 'tony.jpg' },
            { nombre: 'Evelien Bouilliart', anos_experiencia: 10, especialidad: 'Heelflip', estado: 'Aprobado', foto: 'Evelien.jpg' },
            { nombre: 'Danny Way', anos_experiencia: 8, especialidad: 'Ollie', estado: 'En revisión', foto: 'Danny.jpg' }
        ]
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
