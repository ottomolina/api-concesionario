const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into concesionario(concesionarioid,nombre,direccion,creado) 
    select ifnull(max(concesionarioid),0)+1, '${obj.nombre}','${obj.direccion}',now() from concesionario`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async(obj) => {
    let sql = 'select concesionarioid,nombre,direccion,creado from concesionario'
    let filter = ''
    if(obj.concesionarioid) {
        filter = `${filter} concesionarioid = ${obj.concesionarioid} and `
    }
    if(obj.nombre) {
        filter = `${filter} nombre = '${obj.nombre}' and`
    }
    if(obj.direccion) {
        filter = `${filter} direccion = '${obj.direccion}' and`
    }
    if(obj.creado) {
        filter = `${filter} creado = '${obj.creado}' and`
    }
    filter !== '' ? sql = `${sql} where ${filter.substring(0, filter.length-4)}` : null
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update concesionario 
    set nombre='${obj.nombre}',
        direccion='${obj.direccion}'
     where concesionarioid=${obj.concesionarioid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from concesionario where concesionarioid=${obj.concesionarioid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from agente where concesionarioid=${obj.concesionarioid}`
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
