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
    const criadorId = req.body.criadorId
    const sqlSelectBaralho = "SELECT * FROM baralho WHERE criadorId = ?;"
    db.query(sqlSelectBaralho, criadorId , (err,result)=>{
        if(err) {
            console.log(err);
            res.send(err.toString()); 
         }
         res.send(result);
    })
})

app.post("/api/baralhos/curtidos", (req,res)=>{
    const usuarioId = req.body.usuarioId
    const sqlSelecLikedBaralhos = "SELECT baralhoId FROM usuariobaralho WHERE usuarioId = ?"
    db.query(sqlSelecLikedBaralhos,usuarioId, (err,result)=>{
        if(err){
            console.log(err);
            res.send(err.toString());
        }
        res.send(result);
    })
})

app.post("/api/baralhos/curtidos/getBaralho",(req,res)=>{
    const baralhosId = req.body.baralhosId
    const sqlSelectBaralho = "SELECT * FROM baralho WHERE baralhoId IN ?;"
    db.query(sqlSelectBaralho,baralhosId,(err,result)=>{
        if(err){
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

 app.post("/api/cards/criar",(req,res)=>{
     const baralhoId = req.body.baralhoId
     const pergunta = req.body.pergunta
     const resposta = req.body.resposta
     const disciplinaId = req.body.disciplinaId
     const inserCard = "INSERT INTO flashcard (pergunta, resposta, baralhoId, disciplinaId) VALUES (?,?,?,?);"
     db.query(inserCard,[pergunta,resposta,baralhoId,disciplinaId],(err, result)=>{
         if(err) {
             console.log(err);
             res.send(err.toString()); 
          }
         res.send()
     })
 }) 

 app.post("/api/baralhos/mudarNome", (req,res)=>{
    const baralhoId = req.body.baralhoId
    const nome = req.body.novoNome
    const changeNome = "UPDATE baralho set baralhoNome = ? where baralhoId = ?"
    db.query(changeNome,[nome, baralhoId], (err,result)=>{
        if(err){
            console.log(err)
            res.send(err.toString())
        }
    })
 })

 app.post("/api/baralhos/criarNovo",(req,res)=>{
    const criadorId = req.body.usuarioId
    const nome = req.body.novoNome
    const insertBaralho = "INSERT INTO baralho (baralhoNome, criadorId) VALUES(?,?);"
    db.query(insertBaralho,[nome, criadorId], (err,result)=>{
        if(err){
            console.log(err)
            res.send(err.toString())
        }
    })
 })

 app.post("/api/baralhos/buscarBaralhoCompartilhado", (req,res)=>{
    if(req.body.baralhosId.length===1){
        const baralhosId = req.body.baralhosId[0]
        const getBaralho = "SELECT * from baralho WHERE baralhoId = '?';"
        db.query(getBaralho,[baralhosId],(err,result)=>{
            if(err) {
                console.log(err);
                res.send(err.toString()); 
             }
            res.send(result)
        })
    }
    else if(req.body.baralhosId.length===2){
        const baralhosId = req.body.baralhosId[0]
        const baralhosId2 = req.body.baralhosId[1]
        const getBaralho = "SELECT * from baralho WHERE baralhoId IN ('?','?');"
        db.query(getBaralho,[baralhosId,baralhosId2],(err,result)=>{
            if(err) {
                console.log(err);
                res.send(err.toString()); 
             }
            res.send(result)
        })
    }
    else{
        const getBaralho = "SELECT * from baralho WHERE baralhoId IN (?,?,?);"
        const baralhosId = req.body.baralhosId[0]
        const baralhosId2 = req.body.baralhosId[1]
        const baralhosId3 = req.body.baralhosId[3]
        db.query(getBaralho,[baralhosId,baralhosId2,baralhosId3],(err,result)=>{
            if(err) {
                console.log(err);
                res.send(err.toString()); 
             }
            res.send(result)
        })
    }
 })

app.listen(3001, () =>{

    console.log('Running')
})