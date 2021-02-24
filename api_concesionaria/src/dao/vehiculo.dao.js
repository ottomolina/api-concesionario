const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into vehiculo(vehiculoid,tipoid,marcaid,lineaid,cc,color,modelo,precio) 
    select ifnull(max(vehiculoid),0)+1,${obj.tipoid},${obj.marcaid},${obj.lineaid},${obj.cc},
    '${obj.color}',${obj.modelo},${obj.precio} from vehiculo`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async(obj) => {
    let sql = `select vehiculoid,
    tipoid, (select tipo from tipo where tipoid = v.tipoid) as tipo,
    marcaid, (select marca from marca where marcaid = v.marcaid) as marca,
    lineaid, (select linea from linea where lineaid = v.lineaid and marcaid = v.marcaid) as linea,
    cc,color,modelo,precio
    from vehiculo as v `
    let filter = ''
    if(obj.vehiculoid) {
        filter = `${filter} vehiculoid = ${obj.vehiculoid} and`
    }
    if(obj.tipoid) {
        filter = `${filter} tipoid = ${obj.tipoid} and`
    }
    if(obj.marcaid) {
        filter = `${filter} marcaid = ${obj.marcaid} and`
    }
    if(obj.lineaid) {
        filter = `${filter} lineaid = ${obj.lineaid} and`
    }
    if(obj.cc) {
        filter = `${filter} cc = ${obj.cc} and`
    }
    if(obj.color) {
        filter = `${filter} color = '${obj.color}' and`
    }
    if(obj.modelo) {
        filter = `${filter} modelo = '${obj.modelo}' and`
    }
    if(obj.precio) {
        filter = `${filter} precio = ${obj.precio} and`
    }
    filter !== '' ? sql = `${sql} where ${filter.substring(0, filter.length-4)}` : null
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update vehiculo 
    set tipoid=${obj.tipoid},
        marcaid=${obj.marcaid},
        lineaid=${obj.lineaid},
        cc=${obj.cc},
        color='${obj.color}',
        modelo='${obj.modelo}',
        precio=${obj.precio}
     where vehiculoid=${obj.vehiculoid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from vehiculo where vehiculoid=${obj.vehiculoid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(obj) => {
    const sql = `select count(1) as conteo from cotizacion where vehiculoid=${obj.vehiculoid}`
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
