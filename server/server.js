const express = require('express');
const hbs = require('hbs');
const path = require('path');
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
    }

    routers(){
        this.app.use('/',require('../routers/home.js'))
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
