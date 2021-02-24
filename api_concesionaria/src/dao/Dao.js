const mysql = require('mysql');

const credencial = {
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PWDDB,
    database: process.env.NAMEDB
}

const connection = () => {
    const conn= mysql.createConnection(credencial);
    conn.connect( err => {
        if (err) {
            console.log('Ocurrió un problema con la conexión')
        } else {
            console.log('se inició la conexion');
        }
    });
    return conn;
}

const close = (conn) => {
    try{
        conn.end();
    }catch(err) {
        console.log(err);
    }
}

const query = (sql = String) => {
    return new Promise((resolve, reject) => {
        let conn = connection()
        conn.query(sql, (err, result) => {
            close(conn)
            err ? reject(err) : resolve(result)
        })
    })
}

module.exports = query
