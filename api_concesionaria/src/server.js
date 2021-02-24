const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.middlewares()

        this.routes()
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( process.env.AGENTEPATH, require('./routes/agente.route'));
        this.app.use( process.env.CLIENTEPATH, require('./routes/cliente.route'));
        this.app.use( process.env.CONCESIONARIOPATH, require('./routes/concesionario.route'));
        this.app.use( process.env.COTIZACIONPATH, require('./routes/cotizacion.route'));

        this.app.use( process.env.LINEAPATH, require('./routes/linea.route'));
        this.app.use( process.env.MARCAPATH, require('./routes/marca.route'));
        this.app.use( process.env.TIPOPATH, require('./routes/tipo.route'));
        this.app.use( process.env.VEHICULOPATH, require('./routes/vehiculo.route'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Servidor levantado', this.port)
        })
    }
}

module.exports = Server