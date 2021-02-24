const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into linea(marcaid,lineaid,linea) 
    select ${obj.marcaid}, ifnull(max(lineaid),0)+1, '${obj.linea}' from linea where marcaid=${obj.marcaid}`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async(obj) => {
    let sql = 'select marcaid,lineaid,linea from linea'
    if(obj.marcaid) {
        sql = `${sql} where marcaid = ${obj.marcaid}`
    }
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update linea set linea='${obj.linea}' where lineaid=${obj.lineaid} and marcaid=${obj.marcaid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from linea where lineaid=${obj.lineaid} and marcaid=${obj.marcaid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from vehiculo where lineaid=${obj.lineaid} and marcaid=${obj.marcaid}`
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
