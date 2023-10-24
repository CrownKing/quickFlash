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

app.post("/api/baralhos", (req, res) =>{
    console.log(req.body)
    const criadorId = req.body.criadorId
    console.log(criadorId)
    const sqlSelectBaralho = "SELECT * FROM baralho WHERE criadorId = ?;"
    db.query(sqlSelectBaralho, criadorId , (err,result)=>{
        if(err) {
            console.log(err);
            res.send(err.toString()); 
         }
         res.send(result);
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

app.post("/api/cards", (req, res)=>{
    const baralhoId = req.body.baralhoId
    const sqlSelectCards = "SELECT * FROM flashcard where baralhoId = ?;"
    db.query(sqlSelectCards,[baralhoId],(err, result) =>{
        res.send(result)
    })

})

app.listen(3001, () =>{

    console.log('Running')
})