import ApiEstaciones from '../api/ApiEstaciones.js'

class ControladorEstaciones {

    constructor() {
        this.apiEstaciones = new ApiEstaciones()
    }

    getEstaciones = async (req, res) => {
        const { id } = req.params
        const response = await this.apiEstaciones.getDatosEstaciones(id)
        res.status(response.status).json(response.mensaje)
    }

    postEstacion = async (req, res) => {
        let formulario = req.body
        let { name, coordinates, addStreet, addLocaly, addRegion, external } = formulario
        let response={}
        if (!!name && name.trim() != "") {
            if (!!coordinates && coordinates.length === 2) {
                if (!!addStreet && addStreet.trim() != "") {
                    if (!!addLocaly && addLocaly.trim() != "") {
                        if (!!addRegion && addRegion.trim() != "") {
                            if (external != undefined && typeof external === "boolean") {
                                response = await this.apiEstaciones.postEstacion(formulario)
                            } else {
                                response.status = 404
                                response.mensaje = "external vacio o no corresponde el tipo"
                            }
                        } else {
                            response.status = 404
                            response.mensaje = "addRegion vacio o nulo"
                        }
                    } else {
                        response.status = 404
                        response.mensaje = "addLocaly vacio o nulo"
                    }
                } else {
                    response.status = 404
                    response.mensaje = "addStreet vacio o nulo"
                }
            } else {
                response.status = 404
                response.mensaje = "Faltan coordenadas"
            }
        } else {
            response.status = 404
            response.mensaje = "name vacio o nulo"
        }
        res.status(response.status).json(response.mensaje)
    }

    getDatosEstacion = async (req, res) => {
        res.json({})
    }

    suspenderEstacion = async (req, res) => {
        let {id} = req.params
        const response = await this.apiEstaciones.suspenderEstacion(id)
        res.status(response.status).json(response.mensaje)
    }

    habilitarEstacion = async (req, res) => {
        let {id} = req.params
        const response = await this.apiEstaciones.habilitarEstacion(id)
        res.status(response.status).json(response.mensaje)
    }
    getEstacionesPropias = async(req, res) => {
        let {user} = req.params
        const response = await this.apiEstaciones.getEstacionesPropias(user)
        res.status(response.status).json(response.mensaje)
    }

    getDatosConexion = async (req, res) => {
        res.json({})
    }

    putDatosConexion = async (req, res) => {
        res.json({})
    }
}

export default ControladorEstaciones