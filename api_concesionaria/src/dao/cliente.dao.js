const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into cliente(clienteid,nombres,apellidos,telefono,direccion,nacimiento,creado) 
    select ifnull(max(clienteid),0)+1, '${obj.nombres}','${obj.apellidos}','${obj.telefono}',
    '${obj.direccion}','${obj.nacimiento}',now() from cliente`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async(obj) => {
    let sql = `select clienteid,nombres,apellidos,telefono,direccion,nacimiento,creado from cliente`
    let filter = ''
    if(obj.clienteid) {
        filter = `${filter} clienteid = ${obj.clienteid} and`
    }
    if(obj.nombres) {
        filter = `${filter} nombres = '${obj.nombres}' and`
    }
    if(obj.apellidos) {
        filter = `${filter} apellidos = '${obj.apellidos}' and`
    }
    if(obj.telefono) {
        filter = `${filter} telefono = '${obj.telefono}' and`
    }
    if(obj.direccion) {
        filter = `${filter} direccion = '${obj.direccion}' and`
    }
    if(obj.nacimiento) {
        filter = `${filter} nacimiento = '${obj.nacimiento}' and`
    }
    if(obj.creado) {
        filter = `${filter} creado = '${obj.creado}' and`
    }
    filter !== '' ? sql = `${sql} where ${filter.substring(0, filter.length-4)}` : null
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update cliente 
    set nombres='${obj.nombres}',
        apellidos='${obj.apellidos}',
        telefono='${obj.telefono}',
        direccion='${obj.direccion}',
        nacimiento='${obj.nacimiento}'
     where clienteid=${obj.clienteid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from cliente where clienteid=${obj.clienteid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from cotizacion where clienteid=${obj.clienteid}`
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
