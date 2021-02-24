const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into agente(agenteid,nombres,apellidos,concesionarioid) 
    select ifnull(max(agenteid),0)+1, '${obj.nombres}','${obj.apellidos}',${obj.concesionarioid} from agente`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async(obj) => {
    let sql = `select agenteid,nombres,apellidos,concesionarioid, 
        (select nombre from concesionario where concesionarioid = a.concesionarioid) as concesionario
        from agente as a`
    let filter = ''
    if(obj.agenteid) {
        filter = `${filter} agenteid = ${obj.agenteid} and`
    }
    if(obj.nombres) {
        filter = `${filter} nombres = '${obj.nombres}' and`
    }
    if(obj.apellidos) {
        filter = `${filter} apellidos = '${obj.apellidos}' and`
    }
    if(obj.concesionarioid) {
        filter = `${filter} concesionarioid = ${obj.concesionarioid} and`
    }
    filter !== '' ? sql = `${sql} where ${filter.substring(0, filter.length-4)}` : null
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update agente 
    set nombres='${obj.nombres}',
        apellidos='${obj.apellidos}',
        concesionarioid=${obj.concesionarioid}
     where agenteid=${obj.agenteid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from agente where agenteid=${obj.agenteid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from cotizacion where agenteid=${obj.agenteid}`
    const result = await query(sql)
    return result
}

module.exports = {
    insertar,
    listado,
    actualiza,
    elimina,
    validaIntegridad
}
