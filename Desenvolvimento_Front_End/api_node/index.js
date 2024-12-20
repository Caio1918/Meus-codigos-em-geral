const express = require ("express")
const cors = require ("cors")
const mongoose = require ('mongoose')
const app = express()

app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema ({
  titulo: {type: String},
  sinopse: {type: String},
  ano: {type: String},
  classificacao: {type: String}
}))

async function conectarAoMongoDB() {
  await 
  mongoose.connect("mongodb+srv://caioonha:<caioonha>@cluster0.wak6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

let filmes = [
    {
      titulo: "Forrest Gump - Contador de Histórias",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções." ,
      ano: 1994,
      classificacao: "A"  
    },
    {
      titulo: "Um Sonho de Liberdade",
      sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime quenunca cometeu, o homicídio de sua esposa e do amante dela",
      ano: 1994,
      classificacao: "A"
    }
    
]

app.get("/filmes", (req, res) => {
  res.json(filmes)
})

app.post("/filmes", async (req, res) => {
  //Obtém os dados enviados pelo cliente
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  const ano = req.body.ano
  const classificacao = req.body.classificacao

  //Monta um objeto agrupando os dados. Ele representa um novo filme
  const filme = new Filme ({titulo: titulo, sinopse: sinopse, ano: ano, classificacao: classificacao})

  //Adiciona o novo filme à base
  await filme.save()
  const filmes = await Filme.find()
  //Responde ao cliente. Aqui, optamos por devolver a base interira ao clientne.
  res.json(filmes)
})

//GET http://localhost:3000/hey
app.get("/hey", (req, res) => {
    res.send("hey")
})

// app.get('/filmes', async (req, res) => {
//   const filmes = await Filme.find()
//   res.json(filmes)     
//  })

app.listen(3000, () => {
  try{
    conectarAoMongoDB()
    console.log("Up And Running")
  }
  catch(e){
    console.log("Erro", e)
  }
})

