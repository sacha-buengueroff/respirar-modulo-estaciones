import AgentUlHttp from '../httpMethods/agentUlHttp.js'
import CbHttp from '../httpMethods/cbHttp.js'
import Mailer from '../libraries/mailer.js'

class ApiEstaciones {

    constructor() {
        this.cbHttp = new CbHttp()
        this.AgentUlHttp = new AgentUlHttp()
        this.protocolo = "urn:ngsi-ld:"
        this.type = "AirQualityObserved"
    }

    getDatosEstaciones = async (id) => {
        return await this.cbHttp.getEstaciones(id)
    }

    postEstacion = async (formulario) => {
        // obtengo estaciones para saber la cantidad
        const estaciones = await this.cbHttp.getEstaciones()
        let numberId = (estaciones.mensaje.length + 1)

        // Concatenacion
        formulario.id = this.type + numberId
        formulario.entityName = this.protocolo + this.type + ":" + numberId
        formulario.name = this.protocolo + formulario.name

        var response = await this.AgentUlHttp.postEstacion(formulario)
        if (formulario.external) {
            await Mailer.enviarMail(formulario.email, response.mensaje.mailId)

        }

        return response
    }
}

export default ApiEstaciones