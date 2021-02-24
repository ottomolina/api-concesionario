const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into marca(marcaid,marca) 
    select ifnull(max(marcaid),0)+1, '${obj.marca}' from marca`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async() => {
    const sql = 'select marcaid,marca from marca'
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update marca set marca='${obj.marca}' where marcaid=${obj.marcaid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from marca where marcaid=${obj.marcaid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from linea where marcaid=${obj.marcaid}`
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
