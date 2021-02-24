const query = require("./Dao")

const insertar = async(obj) => {
    const sql = `insert into cotizacion(cotizacionid,agenteid,clienteid,vehiculoid,fecha) 
    select ifnull(max(cotizacionid),0)+1, '${obj.agenteid}','${obj.clienteid}','${obj.vehiculoid}',now() from cotizacion`
    const result = await query(sql)
    return result.affectedRows
}

const listado = async(obj) => {
    let sql = `select cotizacionid,
    agenteid,(select concat(nombres, ' ', apellidos) from agente where agenteid = c.agenteid) as agente,
    clienteid ,(select concat(nombres, ' ', apellidos) from cliente where clienteid = c.clienteid) as cliente,
    c.vehiculoid,
    (select tipo from tipo where tipoid = v.tipoid) as tipo,
    (select marca from marca where marcaid = v.marcaid) as marca,
    (select linea from linea where lineaid = v.lineaid and marcaid = v.marcaid) as linea,
    v.cc,v.color,v.modelo,v.precio, fecha
    from cotizacion as c
    inner join vehiculo as v
    on c.vehiculoid = v.vehiculoid `
    let filter = ''
    if(obj.cotizacionid) {
        filter = `${filter} cotizacionid = ${obj.cotizacionid} and`
    }
    if(obj.agenteid) {
        filter = `${filter} agenteid = '${obj.agenteid}' and`
    }
    if(obj.clienteid) {
        filter = `${filter} clienteid = '${obj.clienteid}' and`
    }
    if(obj.vehiculoid) {
        filter = `${filter} c.vehiculoid = '${obj.vehiculoid}' and`
    }
    if(obj.fecha) {
        filter = `${filter} fecha = '${obj.fecha}' and`
    }
    if(obj.fechaInicial) {
        filter = `${filter} fecha >= '${obj.fechaInicial}' and`
    }
    if(obj.fechaFinal) {
        filter = `${filter} fecha <= '${obj.fechaFinal}' and`
    }
    filter !== '' ? sql = `${sql} where ${filter.substring(0, filter.length-4)}` : null
    const result = await query(sql)
    return result
}

const actualiza = async(obj) => {
    const sql = `update cotizacion 
    set agenteid='${obj.agenteid}',
        clienteid='${obj.clienteid}',
        vehiculoid='${obj.vehiculoid}'
     where cotizacionid=${obj.cotizacionid}`
    const result = await query(sql)
    return result.affectedRows
}

const elimina = async(obj) => {
    const sql = `delete from cotizacion where cotizacionid=${obj.cotizacionid}`
    const result = await query(sql)
    return result.affectedRows
}

module.exports = {
    insertar,
    listado,
    actualiza,
    elimina
}
