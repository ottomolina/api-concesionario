const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into tipo(tipoid,tipo) 
    select ifnull(max(tipoid),0)+1, '${obj.tipo}' from tipo`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async() => {
    const sql = 'select tipoid,tipo from tipo'
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update tipo set tipo='${obj.tipo}' where tipoid=${obj.tipoid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from tipo where tipoid=${obj.tipoid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from vehiculo where tipoid=${obj.tipoid}`
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
