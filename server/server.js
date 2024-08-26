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

app.get("/check-mysql-version", (req, res) => {
  db.query("SELECT VERSION() as version", (error, results, fields) => {
    if (error) {
      console.log("deu erro");
      res.status(500).json({ error: error.message });
    } else {
      const mysqlVersion = results[0].version;
      res.json({ mysqlVersion });
    }
  });
});

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
    "SELECT * FROM baralho WHERE baralhoId = ? OR baralhoNome LIKE ? AND baralhoBom = 1;";
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

app.get("/api/baralhos/getBaralhosCompartilhados", (req, res) => {
  const sqlGetAllBaralhos = "SELECT * FROM baralho WHERE baralhoBom = 1";
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
      const checkExists =
        "SELECT 1 FROM usuarioflashcard WHERE caixaId = ? AND usuarioId = ? AND cardId = ?";
      const insertCardUsuarioCard =
        "INSERT INTO usuarioflashcard (caixaId, usuarioId, cardId) VALUES (?, ?, ?)";
      const updateCardUsuarioCard =
        "UPDATE usuarioflashcard SET caixaId = ? WHERE usuarioId = ? AND cardId = ?";
      valoresCardId.forEach((cardId) => {
        db.query(
          checkExists,
          [baralhoId, usuarioId, cardId],
          (checkError, checkResult) => {
            if (checkError) {
              console.log(checkError);
              res.send(checkError.toString());
              return;
            }
            console.log("query executada");
            console.log(checkResult);
            if (checkResult.length > 0) {
              // Registro já existe, realizar UPDATE
              db.query(
                updateCardUsuarioCard,
                [baralhoId, usuarioId, cardId],
                (updateError, updateResult) => {
                  if (updateError) {
                    console.log(updateError);
                    res.send(updateError.toString());
                    return;
                  }
                }
              );
            } else {
              // Registro não existe, realizar INSERT
              db.query(
                insertCardUsuarioCard,
                [1, usuarioId, cardId],
                (insertError, insertResult) => {
                  if (insertError) {
                    console.log(insertError);
                    res.send(insertError.toString());
                    return;
                  }
                }
              );
            }
          }
        );
      });
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
  const sqlSelectCards = "SELECT cardId FROM flashcard WHERE baralhoId = ?";
  const deleteAllUsuarioLikeFlashcard =
    "DELETE FROM usuarioflashcard WHERE cardId IN (?) AND usuarioId = ?";
  const deslike =
    "DELETE FROM usuariobaralho WHERE usuarioId = ? AND baralhoId = ?";

  db.query(sqlSelectCards, [baralhoId], (error, resultado) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.toString());
    }

    const valoresCardId = resultado.map((row) => row.cardId);
    console.log("IDs dos cartões:", valoresCardId);

    // Verifique se há cartões para excluir
    if (valoresCardId.length > 0) {
      db.query(deslike, [usuarioId, baralhoId], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err.toString());
        }

        db.query(
          deleteAllUsuarioLikeFlashcard,
          [valoresCardId, usuarioId],
          (errorUsuarioFlashcard) => {
            if (errorUsuarioFlashcard) {
              console.log(errorUsuarioFlashcard);
              return res.status(500).send(errorUsuarioFlashcard.toString());
            } else {
              return res.send("Deslike concluído");
            }
          }
        );
      });
    } else {
      return res.send("Nenhum baralho para descurtir");
    }
  });
});

app.delete("/api/baralhos/deleteBaralho/:baralhoId", (req, res) => {
  const baralhoId = req.params.baralhoId;
  const deleteAllUsuarioBaralho =
    " DELETE FROM usuariobaralho WHERE baralhoId = ?;";
  const deleteAllUsuarioLikeFlashcard =
    "DELETE FROM usuarioflashcard WHERE cardId IN (?)";
  const deleteAllUsuarioAvaliaFlashcard =
    "DELETE FROM usuarioavaliaflashcard where cardId IN (?)";
  const deleteBaralho = "DELETE from baralho where baralhoId = ?";
  const deleteAllCards = "DELETE FROM flashcard WHERE baralhoId = ?;";
  const sqlSelectCards = "SELECT cardId FROM flashcard WHERE baralhoId = ?";

  db.query(sqlSelectCards, [baralhoId], (error, resultado) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.toString());
    }

    const valoresCardId = resultado.map((row) => row.cardId);
    console.log("IDs dos cartões:", valoresCardId);

    // Verifique se há cartões para excluir
    if (valoresCardId.length > 0) {
      const cardsId = valoresCardId.join(",");

      db.query(
        deleteAllUsuarioLikeFlashcard,
        [cardsId],
        (errorUsuarioFlashcard) => {
          console.log(cardsId);
          if (errorUsuarioFlashcard) {
            console.log(errorUsuarioFlashcard);
            return res.status(500).send(errorUsuarioFlashcard.toString());
          }

          db.query(deleteAllUsuarioBaralho, [baralhoId], (errorDeleteAll) => {
            if (errorDeleteAll) {
              console.log(errorDeleteAll);
              return res.status(500).send(errorDeleteAll.toString());
            }
            db.query(
              deleteAllCards,
              [baralhoId],
              (errorDeleteAllUsuarioBaralho) => {
                if (errorDeleteAllUsuarioBaralho) {
                  console.log(errorDeleteAllUsuarioBaralho);
                  return res
                    .status(500)
                    .send(errorDeleteAllUsuarioBaralho.toString());
                }
                db.query(
                  deleteAllUsuarioAvaliaFlashcard,
                  [cardsId],
                  (errorDeleteAllUsuarioAvaliaFlashcard) => {
                    if (errorDeleteAllUsuarioAvaliaFlashcard) {
                      console.log(errorDeleteAllUsuarioAvaliaFlashcard);
                      return res
                        .status(500)
                        .send(errorDeleteAllUsuarioAvaliaFlashcard.toString());
                    }
                    db.query(
                      deleteBaralho,
                      [baralhoId],
                      (errorDeleteBaralho) => {
                        if (errorDeleteBaralho) {
                          console.log(errorDeleteBaralho);
                          return res
                            .status(500)
                            .send(errorDeleteBaralho.toString());
                        }
                        res.send("Baralho deletado com sucesso.");
                      }
                    );
                  }
                );
              }
            );
          });
        }
      );
    } else {
      // Se não há cartões para excluir, apenas execute a exclusão do baralho e usuários do baralho
      db.query(deleteAllCards, [baralhoId], (errorDeleteAll) => {
        if (errorDeleteAll) {
          console.log(errorDeleteAll);
          return res.status(500).send(errorDeleteAll.toString());
        }
        db.query(deleteBaralho, [baralhoId], (errorDeleteBaralho) => {
          if (errorDeleteBaralho) {
            console.log(errorDeleteBaralho);
            return res.status(500).send(errorDeleteBaralho.toString());
          }
          res.send("Baralho deletado com sucesso.");
        });
      });
    }
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

app.post("/api/cards/selecionaCardsAvaliados", (req, res) => {
  const usuarioId = req.body.usuarioId;
  const sqlSelectCards = `SELECT * FROM usuarioavaliaflashcard WHERE usuarioId = ? AND avaliacao IS NOT NULL AND avaliacao != ''`;
  db.query(sqlSelectCards, [usuarioId], (err, result) => {
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
  const sqlSelectCards = "SELECT * FROM flashcard where baralhoId = ?";
  const sqlSelectBaralhoId = "SELECT baralhoId FROM flashcard where cardId = ?";
  const sqlUpdateBaralhoBom = "UPDATE baralho SET baralhoBom = ? WHERE baralhoId = ?";
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
    db.query(sqlSelectBaralhoId, [cardId], (err, baralhoId) => {//selecionei o baralhoId do card q avaliei
      if (err) {
        console.error(err);
        res.status(500).send("Erro no servidor");
        return;
      }
      console.log(baralhoId[0].baralhoId)
      db.query(sqlSelectCards, [baralhoId[0].baralhoId], (err, allCards) => {//busquei todos os cards do baralho daquele card
        //se todos os cards forem bom, marcar o baralho como bom
        if(verificarTodosCardsBons(allCards[0])){
          db.query(sqlUpdateBaralhoBom, [1,baralhoId[0].baralhoId], (err, baralhoId) => {//mudo o baralho para bom
            if (err) {
              console.error(err);
              res.status(500).send("Erro no servidor");
              return;
            }
          
          })
        }
        else{
          db.query(sqlUpdateBaralhoBom, [0,baralhoId[0].baralhoId], (err, baralhoId) => {//mudo o baralho para ruim
            if (err) {
              console.error(err);
              res.status(500).send("Erro no servidor");
              return;
            }
          })
        }
        
      })
      res.send(result);
    });
  });
});

function verificarTodosCardsBons(cards) {
  // Itera sobre cada objeto no array
  for (let card of cards) {
    // Se encontrar algum card com cardBom diferente de 1, retorna false
    if (card.cardBom !== 1) {
      return false;
    }
  }
  // Se todos os cards tiverem cardBom igual a 1, retorna true
  return true;
}

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
  let caixaId = 0;
  db.query(selectQuery, [usuarioId, cardId], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err.toString());
      return;
    }
    if (rows && rows.length > 0) {
      // Se a combinação de caixaId, usuarioId e cardId já existe, execute o UPDATE
      console.log(nota);
      console.log(rows[0]);
      if (nota == 1 || nota == 2) {
        if (rows[0].caixaId === 1) {
          console.log("entrei erro 0");
          caixaId = rows[0].caixaId;
          varDataAux = dataResposta.getDate();
          dataResposta.setDate(dataResposta.getDate() + 1);
        } else {
          caixaId = rows[0].caixaId - 1;
          switch (caixaId) {
            case null:
              console.log("entrei erro 1");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 1);
              break;
            case 1:
              console.log("entrei erro 2");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 1);
              break;
            case 2:
              console.log("entrei erro 3");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 3);
              break;
            case 3:
              console.log("entrei erro 4");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 7);
              break;
          }
        }
      } else {
        //nota 3 ou 4
        if (rows[0].caixaId === 4) {
          console.log("entrei acerto 0");
          caixaId = rows[0].caixaId;
          varDataAux = dataResposta.getDate();
          dataResposta.setDate(dataResposta.getDate() + 14);
        } else {
          caixaId = rows[0].caixaId + 1;
          switch (caixaId) {
            case null:
              console.log("entrei acerto 1");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 3);
              break;
            case 2:
              console.log("entrei acerto 2");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 3);
              break;
            case 3:
              console.log("entrei acerto 3");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 7);
              break;
            case 4:
              console.log("entrei acerto 4");
              varDataAux = dataResposta.getDate();
              dataResposta.setDate(dataResposta.getDate() + 14);
              break;
          }
        }
      }
      console.log(varDataAux);
      console.log(dataResposta);
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
