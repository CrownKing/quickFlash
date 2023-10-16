const express = require('express')
const app = express ()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database:"mydb"
})

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) =>{
debugger
    const sqlInsert = "SELECT * FROM usuario"
    db.query(sqlInsert, [] , (err,result)=>{
        if(err) {
            console.log(err);
            res.send(err.toString()); 
         }
         res.send("change done");
    })
})

app.post("/user", (req, res) =>{
    const usuarioNome = req.body.usuarioNome
    const usuarioEmail = req.body.usuarioEmail
    const usuarioSenha = req.body.usuarioSenha
    const sqlInsert = "INSERT INTO usuario(admin,monitor,nome,email,senha,pontos) VALUES (0,0,?,?,?,0);"
    db.query(sqlInsert, [  usuarioNome, usuarioEmail, usuarioSenha] , (err,result)=>{
        console.log(result)
    })
})
app.get("/api/user/email",(req,res)=>{
    const sqlGet="SELECT * FROM usuario;"
    db.query(sqlGet,(err, result)=>{
        res.send(result)
    })
})


app.listen(3001, () =>{

    console.log('Running')
})