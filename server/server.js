const express = require('express');
const hbs = require('hbs');
const path = require('path');
const expressFileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
require('dotenv').config()

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routers();
    }

    middlewares(){
        this.app.set('view engine','hbs');
        this.app.use(express.json());
        hbs.registerPartials(path.join(__dirname,'../views/partials'));
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cookieParser());
        this.app.use(expressFileUpload({
            limits: { fileSize: 5000000 },
            abortOnLimit: true,
            responseOnLimit: 'Error, muy grande la foto'
        }));
    }

    routers(){
        this.app.use('/skaterpark',require('../routers/public.js'))
        this.app.use('/skaterpark/skaters',require('../routers/skater.js'))
        this.app.use('/skaterpark/auth/',require('../routers/auth.js'))
    }

    listen() {
        const reset = "\x1b[0m";         
        const Colorlog = "\x1b[42m"; 
    
        this.app.listen(this.port, () => {
            console.log(`✅${Colorlog} Servidor inicializado en el puerto ${this.port} ${reset}✅ `);
        });
    }
    
}
module.exports = Server;
