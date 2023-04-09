import express from 'express'; // Importa o express da biblioteca
import cors from 'cors';

const app = express(); // Cria uma instância do servidor
app.use(cors());
app.use(express.json()); // Identifica que receberá no formato JSON

const porta = 5000;

const usuarios = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar){
        return res.status(422).send("Todos os campos são obrigatórios");
    }
    const novoUsuario = {username, avatar};

    usuarios.push(novoUsuario);
    console.log(usuarios);
    res.send("OK");
});


app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;

    const usuarioExistente = usuarios.find((user)=>user.username === username);
    
    if (usuarioExistente === undefined){
        return res.send("UNAUTHORIZED");
    }
    const novoTweet = {username, avatar: usuarioExistente.avatar, tweet};

    tweets.push(novoTweet);
    console.log(tweets);
    res.send("OK");
});


app.get("/tweets", (req, res) => {
    if (tweets.length === 0){
        return res.send(tweets);
    }

    const tenTweets = tweets.slice(-10);

    res.send(tenTweets);
});



// Configura o servidor para rodar na porta desejada
app.listen(porta, () => console.log(`Running server on port ${porta}`));