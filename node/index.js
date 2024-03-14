const express = require('express')
const app = express()
const port = 3000 // Porta apontada pelo Nginx  
 
/// Add connection to MySql 

const config ={
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const { JSON } = require('mysql/lib/protocol/constants/types');
const connection = mysql.createConnection(config)
const sql_insert = `INSERT INTO people(name) values('Wesley')`
 

//connection.end() // manter a conexão ativa para as queries seguintes. 
var query_result ;

app.get('/',(req,res)=>{
    
     connection.query(sql_insert,  function (err, result) {
        if (err) throw err; 
        console.log('insert result:',result)
        connection.query("SELECT name, id FROM people;", function (err, result)  {
            if (err) throw err;
            query_result = result.map(v => Object.assign({}, v));
            console.log('query_result' );
            console.log(typeof(query_result) );
            console.log(query_result );
            const tableData = query_result.map(value => {
                return (
                  `<tr>
                     <td>${value.name}</td>
                     <td>${value.id}</td>
                  </tr>`
                );
              }).join('');


            res.send('<h1> Full Cycle Node_nginx_proxy_MySql </h1> \
            <table border="2">      \
            <thead class="thead-dark">\
              <tr> \
                <th scope="col">Name</th> \
                <th scope="col">Id</th> '+tableData+' </tr> \
            </thead>\
            <tbody id="tableBody"> </tbody> </table> <br> <br> <br>  fim query')  
    
       });
          });
          
 

 
})

app.listen(port,()=>{
    console.log('listening to port ' + port)
})
