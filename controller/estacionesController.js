import { Long } from 'mongodb'
import ApiEstaciones from '../api/apiEstaciones.js'

class ControladorEstaciones {

    constructor() {
        this.apiEstaciones = new ApiEstaciones()
    }

    getEstaciones = async (req, res) => {
        const { id } = req.params
        const response = await this.apiEstaciones.getDatosEstaciones(id)
        res.status(response.status).json(response.message)
    }

    getEstacionesCiudad = async (req, res) => {
        const response = await this.apiEstaciones.getEstacionesCiudad()
        res.status(response.status).json(response.message)
    }

    postEstacion = async (req, res) => {
        let form = req.body
        let { name, coordinates, addStreet, addLocaly, addRegion, external } = form
        let response = {}
        if (!!name && name.trim() != "") {
            if (!!coordinates && coordinates.length === 2) {
                if (!!addStreet && addStreet.trim() != "") {
                    if (!!addLocaly && addLocaly.trim() != "") {
                        if (!!addRegion && addRegion.trim() != "") {
                            if (external != undefined && typeof external === "boolean") {
                                response = await this.apiEstaciones.postEstacion(form)
                            } else {
                                response.status = 404
                                response.message = "El parametro external vacio o no corresponde el tipo"
                            }
                        } else {
                            response.status = 404
                            response.message = "El parametro region se encuentra vacio o nulo"
                        }
                    } else {
                        response.status = 404
                        response.message = "El parametro localidad se encuentra vacio o nulo"
                    }
                } else {
                    response.status = 404
                    response.message = "El parametro calle se encuentra vacio o nulo"
                }
            } else {
                response.status = 404
                response.message = "Faltan coordenadas"
            }
        } else {
            response.status = 404
            response.message = "El parametro nombre de usuario se encuentra vacio o nulo"

        }
        res.status(response.status).json(response.message)
    }

    getDatosEstacion = async (req, res) => {
        res.json({})
    }

    suspenderEstacion = async (req, res) => {
        let { id } = req.params
        const response = await this.apiEstaciones.suspenderEstacion(id)
        res.status(response.status).json(response.message)
    }

    habilitarEstacion = async (req, res) => {
        let { id } = req.params
        const response = await this.apiEstaciones.habilitarEstacion(id)
        res.status(response.status).json(response.message)
    }
    getEstacionesPorUsuario = async (req, res) => {
        let { user } = req.params
        const response = await this.apiEstaciones.getEstacionesPorUsuario(user)
        res.status(response.status).json(response.message)
    }

    postDatosEstacion = async (req, res) => {
        let {k, i} = req.query
        let data = req.body
        const response = await this.apiEstaciones.postDatosEstacion(k, i, data)
        res.status(response.status).json(response.message)
    }
}

export default ControladorEstaciones