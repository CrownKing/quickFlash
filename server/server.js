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
    const baralhoId = req.body.baralhoId
    const sqlSelectBaralho = "SELECT * FROM baralho WHERE baralhoId = ?;"
    db.query(sqlSelectBaralho,[baralhoId],(err,result)=>{
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

app.post("/api/cards", (req, res) => {
    const baralhoId = req.body.baralhoId;
    const usuarioId = req.body.usuarioId;
    const today = new Date();
    const todayString = today.toLocaleString();

    const sqlSelectCardIdByBoxDay = "SELECT cardId FROM usuarioflashcard where usuarioId = ? AND (dataProximaResposta IS NULL OR dataProximaResposta <= ?)";

    db.query(sqlSelectCardIdByBoxDay, [usuarioId, todayString], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
            return;
        }

        const valoresCardId = result.map(row => row.cardId);

        if (valoresCardId.length === 0) {
            // Se não houver cardId disponível, enviar uma resposta vazia
            res.send([]);
            return;
        }

        const sqlSelectCards = "SELECT * FROM flashcard where baralhoId = ? AND cardId IN (?)";

        db.query(sqlSelectCards, [baralhoId, valoresCardId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro no servidor");
                return;
            }

            res.send(result);
        });
    });
});

 app.post("/api/cards/criar",(req,res)=>{
     const baralhoId = req.body.baralhoId
     const pergunta = req.body.pergunta
     const resposta = req.body.resposta
     const usuarioId = req.body.usuarioId
     const disciplinaId = req.body.disciplinaId
     const inserCard = "INSERT INTO flashcard (pergunta, resposta, baralhoId, disciplinaId) VALUES (?,?,?,?);"
     db.query(inserCard,[pergunta,resposta,baralhoId,disciplinaId],(err, result)=>{
         if(err) {
             console.log(err);
             res.send(err.toString()); 
          }
          var cardId = result.insertId
         res.send()
         const insertCardUsuarioCard = "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId) VALUES (?,?,?)"
         db.query(insertCardUsuarioCard, [1,usuarioId, cardId], (error, res)=>{
            if(err) {
                console.log(err);
                res.send(err.toString()); 
             }
            res.send()
         })
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

 app.post("/api/baralhos/curtirBaralho",(req,res)=>{ // quando eu curtir um baralho, ele deve ser inserido na tabela usuarioflashcard, e nessa tabela que eu controlo quais cartões serão puxados para exibição
    const usuarioId = req.body.usuarioId
    const baralhoId = req.body.baralhoId
    const curtir = "INSERT INTO usuariobaralho (usuarioId, baralhoId) VALUES (?,?);"
    db.query(curtir,[usuarioId,baralhoId], (err,result)=>{
        if(err){
            console.log(err)
            res.send(err.toString())
        }
        const sqlSelectCards = "SELECT cardId FROM flashcard where baralhoId = ? "
        db.query(sqlSelectCards, [baralhoId], (error, resultado)=>{
            const valoresCardId = resultado.map(row => row.cardId);

            if (valoresCardId.length === 0) {
                // Se não houver cardId disponível, enviar uma resposta vazia
                res.send([]);
                return;
            }
            const insertCardUsuarioCard = "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId) VALUES (?,?,?)"
            for(let i = 0; i<valoresCardId.length;i++){  // faz um insert para cada id de card contido no baralho criado
                db.query(insertCardUsuarioCard, [baralhoId, usuarioId, valoresCardId[i]], (eror, resultInsert2)=>{
                    if(eror){
                        console.log(eror)
                        res.send(eror.toString())
                    }
                })
            }
        })
        res.send(result)
    })
 })

 app.post("/api/baralhos/getCurtido",(req,res)=>{
    const usuarioId = req.body.usuarioId
    const baralhoId = req.body.baralhoId
    const getCurtir = "SELECT * FROM usuariobaralho WHERE usuarioId =? AND baralhoId =?;"
    console.log(usuarioId)
    console.log(baralhoId)
    db.query(getCurtir,[usuarioId,baralhoId], (err,result)=>{
        if(err){
            console.log(err)
            res.send(err.toString())
        }
        res.send(result)
    })
 })

 app.post("/api/baralhos/deslikeBaralho",(req,res)=>{
    const usuarioId = req.body.usuarioId
    const baralhoId = req.body.baralhoId
    const deslike = "DELETE FROM usuariobaralho where usuarioId=? AND baralhoId=?;"
    db.query(deslike,[usuarioId,baralhoId], (err,result)=>{
        if(err){
            console.log(err)
            res.send(err.toString())
        }
        res.send(result)
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

 app.post("/api/flashcard/respondeCard",(req,res)=>{
    const nota = req.body.resposta // A nota varia de 1 a 4, nota 1 significa erro, logo, a caixa deve ser a 1 pois significa que o card sera repetido todos os dias
    const usuarioId = req.body.usuarioId
    const cardId = req.body.cardId
    const dataResposta = req.body.dataResposta
    const responde = "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId, dataProximaResposta) VALUES (?,?,?,?);"
    let pontuacao = 0;

    switch (nota) {
        case 1:
            pontuacao = 0;
            dataResposta.setDate(dataResposta.getDate() + 1);
            break;
        case 2:
            pontuacao = 0;
            dataResposta.setDate(dataResposta.getDate() + 3);
            break;
        case 3:
            pontuacao = 1;
            dataResposta.setDate(dataResposta.getDate() + 7);
            break;
        case 4:
            pontuacao = 2;
            dataResposta.setDate(dataResposta.getDate() + 14);
            break;
    }
    db.query(responde,[nota,usuarioId, cardId, dataResposta], (err,result)=>{
        if(err){
            console.log(err)
            res.send(err.toString())
        }
        const atualizaPts = "UPDATE usuario SET pontos = pontos + ? WHERE usuarioId = ?;"
        db.query(atualizaPts,[pontuacao,usuarioId], (err,result)=>{
            if(err){
                console.log(err)
                res.send(err.toString())
            }
            res.send(result)
        })
        res.send(result)
    })
 })

app.listen(3001, () =>{

    console.log('Running')
})