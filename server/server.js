const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydb",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/api/baralhos", (req, res) => {
  const criadorId = req.body.criadorId;
  const sqlSelectBaralho = "SELECT * FROM baralho WHERE criadorId = ?;";
  db.query(sqlSelectBaralho, criadorId, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
    res.send(result);
  });
});

app.post("/api/baralhos/curtidos", (req, res) => {
  const usuarioId = req.body.usuarioId;
  const sqlSelecLikedBaralhos =
    "SELECT baralhoId FROM usuariobaralho WHERE usuarioId = ?";
  db.query(sqlSelecLikedBaralhos, usuarioId, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
    res.send(result);
  });
});

app.post("/api/baralhos/curtidos/getBaralho", (req, res) => {
  const baralhoId = req.body.baralhoId;
  const searchTerm = req.body.baralhoId;
  const searchValue = "%" + searchTerm + "%";
  const sqlSelectBaralho =
    "SELECT * FROM baralho WHERE baralhoId = ? OR baralhoNome LIKE ?;";
  db.query(sqlSelectBaralho, [baralhoId, searchValue], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
    res.send(result);
  });
});

app.get("/api/baralhos/getBaralhos", (req, res) => {
  const sqlGetAllBaralhos = "SELECT * FROM baralho";
  db.query(sqlGetAllBaralhos, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
      return;
    }
    res.send(result);
  });
});

app.post("/api/baralhos/criarBaralho", (req, res) => {
  const baralhoNome = req.body.baralhoNome;
  const criadorId = req.body.usuarioId;
  const sqlInsert =
    "INSERT INTO baralho (baralhoNome, criadorId,baralhoBom) VALUES (?,?,0)";
  db.query(sqlInsert, [baralhoNome, criadorId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
      return;
    }
    res.send("Criado!");
  });
});

app.post("/api/baralhos/mudarNome", (req, res) => {
  const baralhoId = req.body.baralhoId;
  const nome = req.body.novoNome;
  const changeNome = "UPDATE baralho set baralhoNome = ? where baralhoId = ?";
  db.query(changeNome, [nome, baralhoId], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
  });
});

app.post("/api/baralhos/criarNovo", (req, res) => {
  const criadorId = req.body.usuarioId;
  const nome = req.body.novoNome;
  const insertBaralho =
    "INSERT INTO baralho (baralhoNome, criadorId) VALUES(?,?);";
  db.query(insertBaralho, [nome, criadorId], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
  });
});

app.post("/api/baralhos/curtirBaralho", (req, res) => {
  // quando eu curtir um baralho, ele deve ser inserido na tabela usuarioflashcard, e nessa tabela que eu controlo quais cartões serão puxados para exibição
  const usuarioId = req.body.usuarioId;
  const baralhoId = req.body.baralhoId;
  const curtir =
    "INSERT INTO usuariobaralho (usuarioId, baralhoId) VALUES (?,?);";
  db.query(curtir, [usuarioId, baralhoId], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
    const sqlSelectCards = "SELECT cardId FROM flashcard where baralhoId = ? ";
    db.query(sqlSelectCards, [baralhoId], (error, resultado) => {
      const valoresCardId = resultado.map((row) => row.cardId); // buscar um id especifico em um select de id

      if (valoresCardId.length === 0) {
        // Se não houver cardId disponível, enviar uma resposta vazia
        res.send([]);
        return;
      }
      const insertCardUsuarioCard =
        "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId, ) VALUES (?,?,?)"; // nao pode ser insert, visto que agora ja existe a chave quando se curte o baralho, tem q ser um update
      for (let i = 0; i < valoresCardId.length; i++) {
        // faz um insert para cada id de card contido no baralho criado
        db.query(
          insertCardUsuarioCard,
          [baralhoId, usuarioId, valoresCardId[i]],
          (eror, resultInsert2) => {
            if (eror) {
              console.log(eror);
              res.send(eror.toString());
            }
          }
        );
      }
    });
    res.send(result);
  });
});

app.post("/api/baralhos/getCurtido", (req, res) => {
  const usuarioId = req.body.usuarioId;
  const baralhoIds = req.body.baralhoIds;
  const getCurtir =
    "SELECT * FROM usuariobaralho WHERE usuarioId = ? AND baralhoId IN (?);";
  console.log(usuarioId);
  console.log(baralhoIds);
  db.query(getCurtir, [usuarioId, baralhoIds], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
    res.send(result);
  });
});

app.post("/api/baralhos/deslikeBaralho", (req, res) => {
  const usuarioId = req.body.usuarioId;
  const baralhoId = req.body.baralhoId;
  const deslike =
    "DELETE FROM usuariobaralho where usuarioId=? AND baralhoId=?;";
  db.query(deslike, [usuarioId, baralhoId], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
    }
    res.send(result);
  });
});

app.post("/api/baralhos/buscarBaralhoCompartilhado", (req, res) => {
  if (req.body.baralhosId.length === 1) {
    const baralhosId = req.body.baralhosId[0];
    const getBaralho = "SELECT * from baralho WHERE baralhoId = '?';";
    db.query(getBaralho, [baralhosId], (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.toString());
      }
      res.send(result);
    });
  } else if (req.body.baralhosId.length === 2) {
    const baralhosId = req.body.baralhosId[0];
    const baralhosId2 = req.body.baralhosId[1];
    const getBaralho = "SELECT * from baralho WHERE baralhoId IN ('?','?');";
    db.query(getBaralho, [baralhosId, baralhosId2], (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.toString());
      }
      res.send(result);
    });
  } else {
    const getBaralho = "SELECT * from baralho WHERE baralhoId IN (?,?,?);";
    const baralhosId = req.body.baralhosId[0];
    const baralhosId2 = req.body.baralhosId[1];
    const baralhosId3 = req.body.baralhosId[3];
    db.query(
      getBaralho,
      [baralhosId, baralhosId2, baralhosId3],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err.toString());
        }
        res.send(result);
      }
    );
  }
});

app.post("/user", (req, res) => {
  const usuarioNome = req.body.usuarioNome;
  const usuarioEmail = req.body.usuarioEmail;
  const usuarioSenha = req.body.usuarioSenha;
  const sqlInsert =
    "INSERT INTO usuario(admin,monitor,nome,email,senha,pontos) VALUES (0,0,?,?,?,0);";
  db.query(
    sqlInsert,
    [usuarioNome, usuarioEmail, usuarioSenha],
    (err, result) => {
      console.log(result);
    }
  );
});

app.get("/api/user/email", (req, res) => {
  const sqlGet = "SELECT * FROM usuario;";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/cards", (req, res) => {
  const baralhoId = req.body.baralhoId;
  const usuarioId = req.body.usuarioId;
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const sqlSelectCardIdByBoxDay =
    "SELECT cardId FROM usuarioflashcard where usuarioId = ? AND (dataProximaResposta IS NULL OR dataProximaResposta <= ?)";

  db.query(sqlSelectCardIdByBoxDay, [usuarioId, todayString], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
      return;
    }
    const valoresCardId = result.map((row) => row.cardId);

    if (valoresCardId.length === 0) {
      res.send([]);
      return;
    }

    const sqlSelectCards =
      "SELECT * FROM flashcard where baralhoId = ? AND cardId IN (?)";

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

app.post("/api/cards/selecionaCardsParaAvaliacao", (req, res) => {
  const cardIdsArray = req.body.cardIdsArray;
  console.log(cardIdsArray);
  const placeholders = cardIdsArray.map(() => "?").join(",");
  console.log(placeholders);
  const sqlSelectCards = `SELECT * FROM flashcard WHERE cardId IN (${placeholders})`;
  const queryParams = [...cardIdsArray];
  db.query(sqlSelectCards, queryParams, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
      return;
    }
    res.send(result);
  });
});

app.post("/api/cards/setAvaliacao", (req, res) => {
  const cardId = req.body.cardId;
  const avaliacao = req.body.avaliacao;
  const nota = req.body.nota;
  const sqlSetAvaliacao = `UPDATE usuarioavaliaflashcard SET avaliacao = ? WHERE cardId = ?`;
  const sqlSetNota = "UPDATE flashcard SET cardBom = ? WHERE cardId = ?";
  db.query(sqlSetAvaliacao, [avaliacao, cardId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
      return;
    }
  });
  db.query(sqlSetNota, [nota, cardId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
      return;
    }
    res.send(result);
  });
});

app.post("/api/cards/criar", (req, res) => {
  const baralhoId = req.body.baralhoId;
  const pergunta = req.body.pergunta;
  const resposta = req.body.resposta;
  const usuarioId = req.body.usuarioId;
  const disciplinaId = req.body.disciplinaId;

  const inserCard =
    "INSERT INTO flashcard (pergunta, resposta, baralhoId, disciplinaId) VALUES (?,?,?,?);";

  db.query(
    inserCard,
    [pergunta, resposta, baralhoId, disciplinaId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
        return;
      }

      var cardId = result.insertId;

      const insertCardUsuarioCard =
        "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId) VALUES (?,?,?)";

      db.query(
        insertCardUsuarioCard,
        [1, usuarioId, cardId],
        (error, result2) => {
          if (error) {
            console.log(error);
            res.status(500).send(error.toString());
            return;
          }
          res.status(200).json({ cardId }); // Envie o ID do cartão no corpo da resposta
        }
      );
    }
  );
});

// app.post("/api/flashcard/respondeCard", (req, res) => {
//   const nota = req.body.resposta; // A nota varia de 1 a 4, nota 1 significa erro, logo, a caixa deve ser a 1 pois significa que o card sera repetido todos os dias
//   const usuarioId = req.body.usuarioId;
//   const cardId = req.body.cardId;
//   const dataResposta = req.body.dataResposta;
//   // ERROR GRAVE, TENHO QUE ANALISAR SE O CARTAO JA EXISTE ANTES DE TENTAR INSERIR NO CARD
//   const responde =
//     "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId, dataProximaResposta) VALUES (?,?,?,?);";
//   let pontuacao = 0;

//   switch (nota) {
//     case 1:
//       pontuacao = 0;
//       dataResposta.setDate(dataResposta.getDate() + 1);
//       break;
//     case 2:
//       pontuacao = 0;
//       dataResposta.setDate(dataResposta.getDate() + 3);
//       break;
//     case 3:
//       pontuacao = 1;
//       dataResposta.setDate(dataResposta.getDate() + 7);
//       break;
//     case 4:
//       pontuacao = 2;
//       dataResposta.setDate(dataResposta.getDate() + 14);
//       break;
//   }
//   db.query(responde, [nota, usuarioId, cardId, dataResposta], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send(err.toString());
//     }
//     const atualizaPts =
//       "UPDATE usuario SET pontos = pontos + ? WHERE usuarioId = ?;";
//     db.query(atualizaPts, [pontuacao, usuarioId], (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err.toString());
//       }
//       res.send(result);
//     });
//     res.send(result);
//   });
// });

app.post("/api/flashcard/respondeCard", (req, res) => {
  const nota = req.body.resposta;
  const usuarioId = req.body.usuarioId;
  const cardId = req.body.cardId;
  const dataResposta = new Date(req.body.dataResposta);
  console.log(dataResposta);
  const selectQuery =
    "SELECT * FROM usuarioflashcard WHERE usuarioId = ? AND cardId = ?;";
  const insertQuery =
    "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId, dataProximaResposta) VALUES (?,?,?,?);";
  const updateQuery =
    "UPDATE usuarioflashcard SET dataProximaResposta = ?,caixaId = ? WHERE usuarioId = ? AND cardId = ?;";

  let pontuacao = 0;
  let varDataAux;

  switch (nota) {
    case "1":
      console.log("entrei 1");
      pontuacao = 0;
      varDataAux = dataResposta.getDate();
      dataResposta.setDate(dataResposta.getDate() + 1);
      break;
    case "2":
      console.log("entrei 2");
      pontuacao = 0;
      varDataAux = dataResposta.getDate();
      dataResposta.setDate(dataResposta.getDate() + 3);
      break;
    case "3":
      console.log("entrei 3");
      pontuacao = 1;
      varDataAux = dataResposta.getDate();
      dataResposta.setDate(dataResposta.getDate() + 7);
      break;
    case "4":
      console.log("entrei 4");
      pontuacao = 2;
      varDataAux = dataResposta.getDate();
      dataResposta.setDate(dataResposta.getDate() + 14);
      break;
  }
  console.log(varDataAux);
  db.query(selectQuery, [usuarioId, cardId], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
      return;
    }
    if (rows && rows.length > 0) {
      // Se a combinação de caixaId, usuarioId e cardId já existe, execute o UPDATE
      db.query(
        updateQuery,
        [dataResposta, nota, usuarioId, cardId],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send(err.toString());
            return;
          }
          res.send(result);
        }
      );
    } else {
      console.log("rows");
      console.log(rows);
      // Se a combinação de caixaId, usuarioId e cardId não existe, execute o INSERT
      db.query(
        insertQuery,
        [nota, usuarioId, cardId, dataResposta],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send(err.toString());
            return;
          }
          res.send(result);
        }
      );
    }
  });
});

app.get("/api/login/monitor/getCardsSolicitados/:id", (req, res) => {
  // requisição que busca todos os cards enviados para avaliação
  const usuarioId = req.params.id; // metodo de pegar um parametro pelo link da requisição
  const sqlGet = "SELECT * FROM usuarioavaliaflashcard WHERE avaliadorId = ?";
  db.query(sqlGet, [usuarioId], (err, result) => {
    if (err) {
      console.error("Erro ao executar a consulta SQL:", err);
      res.status(500).send("Erro interno do servidor");
      return;
    }
    res.send(result);
  });
});

app.get("/api/login/monitor/getCardsSolicitados/Aluno/:id", (req, res) => {
  // requisição que busca todos os cards a serem avaliados quando um monitor acessar o app
  const usuarioId = req.params.id; // metodo de pegar um parametro pelo link da requisição
  const sqlGet = "SELECT * FROM usuarioavaliaflashcard WHERE usuarioId = ?";
  db.query(sqlGet, [usuarioId], (err, result) => {
    if (err) {
      console.error("Erro ao executar a consulta SQL:", err);
      res.status(500).send("Erro interno do servidor");
      return;
    }
    res.send(result);
  });
});

app.get("/api/disciplinas", (req, res) => {
  const sqlGet = "SELECT * from disciplina";
  db.query(sqlGet, (err, result) => {
    if (err) {
      console.error("Erro ao executar a consulta SQL:", err);
      res.status(500).send("Erro interno do servidor");
      return;
    }
    res.send(result);
  });
});

app.post("/api/login/monitor/solicitaAvaliacao", (req, res) => {
  // Requisição para solicitar avaliação de um card
  const usuarioId = req.body.usuarioId;
  const cardId = req.body.cardId;
  const disciplinaId = req.body.disciplinaId;
  console.log("CARDID A SEGUIR");
  console.log(cardId);
  console.log(disciplinaId);
  const sqlSelect =
    "SELECT usuarioId from usuariodisciplina where disciplinaId = ?";
  db.query(sqlSelect, [disciplinaId], (err, result) => {
    if (err) {
      console.error("Erro ao executar a consulta SQL:", err);
      res.status(500).send("Erro interno do servidor");
      return;
    }

    // Verifica se há resultados
    if (result.length === 0) {
      res.status(404).send("Nenhum usuário encontrado para esta disciplina");
      return;
    }
    const avaliadorId = result[0].usuarioId; // Obtém o usuário da primeira linha do resultado
    console.log(usuarioId);
    const sqlInsert =
      "INSERT INTO usuarioavaliaflashcard (usuarioId,cardId, avaliadorId, avaliacao) VALUES (?,?,?,'')";
    db.query(sqlInsert, [usuarioId, cardId, avaliadorId], (error, result) => {
      if (error) {
        console.error("Erro ao executar a consulta SQL:", error);
        res.status(500).send("Erro interno do servidor");
        return;
      }
      res.send(result); // Retorna o resultado da segunda consulta, se necessário
    });
  });
});

app.listen(3001, () => {
  console.log("Running");
});
