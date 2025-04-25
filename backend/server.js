const express = require('express');
const cors = require('cors');
const apicache = require('apicache');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração avançada de cache
const cache = apicache.options({
  debug: false,
  headers: {
    'cache-control': 'no-cache'
  },
  statusCodes: {
    include: [200]
  }
}).middleware;

app.use(cors());
app.use(express.json());

// Middleware de cache personalizado
const cacheJogadores = cache('10 minutes');
const cacheAutocomplete = cache('2 minutes');

const jogadores = [
    { nome: 'Cristiano Ronaldo', dataNascimento: '1985-02-05', posicao: 'Atacante', clube: 'Al-Nassr', altura: 1.87, nacionalidade: 'Portugal' },
    { nome: 'Lionel Messi', dataNascimento: '1987-06-24', posicao: 'Atacante', clube: 'Inter Miami', altura: 1.70, nacionalidade: 'Argentina' },
    { nome: 'Neymar Jr', dataNascimento: '1992-02-05', posicao: 'Atacante', clube: 'Al-Hilal', altura: 1.75, nacionalidade: 'Brasil' },
    { nome: 'Kylian Mbappé', dataNascimento: '1998-12-20', posicao: 'Atacante', clube: 'Paris Saint-Germain', altura: 1.78, nacionalidade: 'França' },
    { nome: 'Kevin De Bruyne', dataNascimento: '1991-06-28', posicao: 'Meio-campista', clube: 'Manchester City', altura: 1.81, nacionalidade: 'Bélgica' },
    { nome: 'Virgil van Dijk', dataNascimento: '1991-07-08', posicao: 'Zagueiro', clube: 'Liverpool', altura: 1.93, nacionalidade: 'Holanda' },
    { nome: 'Erling Haaland', dataNascimento: '2000-07-21', posicao: 'Atacante', clube: 'Manchester City', altura: 1.94, nacionalidade: 'Noruega' },
    { nome: 'Luka Modrić', dataNascimento: '1985-09-09', posicao: 'Meio-campista', clube: 'Real Madrid', altura: 1.72, nacionalidade: 'Croácia' },
    { nome: 'Robert Lewandowski', dataNascimento: '1988-08-21', posicao: 'Atacante', clube: 'Barcelona', altura: 1.85, nacionalidade: 'Polônia' },
    { nome: 'Mohamed Salah', dataNascimento: '1992-06-15', posicao: 'Atacante', clube: 'Liverpool', altura: 1.75, nacionalidade: 'Egito' },
    { nome: 'Harry Kane', dataNascimento: '1993-07-28', posicao: 'Atacante', clube: 'Bayern Munich', altura: 1.88, nacionalidade: 'Inglaterra' },
    { nome: 'Manuel Neuer', dataNascimento: '1986-03-27', posicao: 'Goleiro', clube: 'Bayern Munich', altura: 1.93, nacionalidade: 'Alemanha' },
    { nome: 'Karim Benzema', dataNascimento: '1987-12-19', posicao: 'Atacante', clube: 'Al-Ittihad', altura: 1.85, nacionalidade: 'França' },
    { nome: 'Sadio Mané', dataNascimento: '1992-04-10', posicao: 'Atacante', clube: 'Al-Nassr', altura: 1.75, nacionalidade: 'Senegal' },
    { nome: 'Thibaut Courtois', dataNascimento: '1992-05-11', posicao: 'Goleiro', clube: 'Real Madrid', altura: 2.00, nacionalidade: 'Bélgica' },
    { nome: 'Bernardo Silva', dataNascimento: '1994-08-10', posicao: 'Meio-campista', clube: 'Manchester City', altura: 1.73, nacionalidade: 'Portugal' },
    { nome: 'Joshua Kimmich', dataNascimento: '1995-02-08', posicao: 'Meio-campista', clube: 'Bayern Munich', altura: 1.76, nacionalidade: 'Alemanha' },
    { nome: 'Antoine Griezmann', dataNascimento: '1991-03-21', posicao: 'Atacante', clube: 'Atlético Madrid', altura: 1.76, nacionalidade: 'França' },
    { nome: 'Toni Kroos', dataNascimento: '1990-01-04', posicao: 'Meio-campista', clube: 'Real Madrid', altura: 1.83, nacionalidade: 'Alemanha' },
    { nome: 'Ederson Moraes', dataNascimento: '1993-08-17', posicao: 'Goleiro', clube: 'Manchester City', altura: 1.88, nacionalidade: 'Brasil' },
    { nome: 'Alisson Becker', dataNascimento: '1992-10-02', posicao: 'Goleiro', clube: 'Liverpool', altura: 1.93, nacionalidade: 'Brasil' },
    { nome: 'Rúben Dias', dataNascimento: '1997-05-14', posicao: 'Zagueiro', clube: 'Manchester City', altura: 1.87, nacionalidade: 'Portugal' },
    { nome: 'Marcos Acuña', dataNascimento: '1991-10-28', posicao: 'Lateral', clube: 'Sevilla', altura: 1.72, nacionalidade: 'Argentina' },
    { nome: 'Federico Valverde', dataNascimento: '1998-07-22', posicao: 'Meio-campista', clube: 'Real Madrid', altura: 1.82, nacionalidade: 'Uruguai' },
    { nome: 'Rodri', dataNascimento: '1996-06-22', posicao: 'Meio-campista', clube: 'Manchester City', altura: 1.91, nacionalidade: 'Espanha' },
    { nome: 'Jude Bellingham', dataNascimento: '2003-06-29', posicao: 'Meio-campista', clube: 'Real Madrid', altura: 1.86, nacionalidade: 'Inglaterra' },
    { nome: 'Vinicius Junior', dataNascimento: '2000-07-12', posicao: 'Atacante', clube: 'Real Madrid', altura: 1.76, nacionalidade: 'Brasil' },
    { nome: 'Phil Foden', dataNascimento: '2000-05-28', posicao: 'Meio-campista', clube: 'Manchester City', altura: 1.71, nacionalidade: 'Inglaterra' },
    { nome: 'Bruno Fernandes', dataNascimento: '1994-09-08', posicao: 'Meio-campista', clube: 'Manchester United', altura: 1.79, nacionalidade: 'Portugal' },
    { nome: 'Rafael Leão', dataNascimento: '1999-06-10', posicao: 'Atacante', clube: 'AC Milan', altura: 1.88, nacionalidade: 'Portugal' },
    { nome: 'Lautaro Martínez', dataNascimento: '1997-08-22', posicao: 'Atacante', clube: 'Inter Milan', altura: 1.74, nacionalidade: 'Argentina' },
    { nome: 'Romelu Lukaku', dataNascimento: '1993-05-13', posicao: 'Atacante', clube: 'Roma', altura: 1.91, nacionalidade: 'Bélgica' },
    { nome: 'Serge Gnabry', dataNascimento: '1995-07-14', posicao: 'Atacante', clube: 'Bayern Munich', altura: 1.75, nacionalidade: 'Alemanha' },
    { nome: 'Jamal Musiala', dataNascimento: '2003-02-26', posicao: 'Meio-campista', clube: 'Bayern Munich', altura: 1.83, nacionalidade: 'Alemanha' },
    { nome: 'Achraf Hakimi', dataNascimento: '1998-11-04', posicao: 'Lateral', clube: 'Paris Saint-Germain', altura: 1.81, nacionalidade: 'Marrocos' },
    { nome: 'Marquinhos', dataNascimento: '1994-05-14', posicao: 'Zagueiro', clube: 'Paris Saint-Germain', altura: 1.83, nacionalidade: 'Brasil' },
    { nome: 'Nicolò Barella', dataNascimento: '1997-02-07', posicao: 'Meio-campista', clube: 'Inter Milan', altura: 1.72, nacionalidade: 'Itália' },
    { nome: 'Mike Maignan', dataNascimento: '1995-07-03', posicao: 'Goleiro', clube: 'AC Milan', altura: 1.91, nacionalidade: 'França' },
    { nome: 'Theo Hernández', dataNascimento: '1997-10-06', posicao: 'Lateral', clube: 'AC Milan', altura: 1.84, nacionalidade: 'França' },
    { nome: 'Martin Ødegaard', dataNascimento: '1998-12-17', posicao: 'Meio-campista', clube: 'Arsenal', altura: 1.78, nacionalidade: 'Noruega' },
    { nome: 'Bukayo Saka', dataNascimento: '2001-09-05', posicao: 'Atacante', clube: 'Arsenal', altura: 1.78, nacionalidade: 'Inglaterra' },
    { nome: 'Pedri', dataNascimento: '2002-11-25', posicao: 'Meio-campista', clube: 'Barcelona', altura: 1.74, nacionalidade: 'Espanha' },
    { nome: 'Gavi', dataNascimento: '2004-08-05', posicao: 'Meio-campista', clube: 'Barcelona', altura: 1.73, nacionalidade: 'Espanha' },
    { nome: 'Frenkie de Jong', dataNascimento: '1997-05-12', posicao: 'Meio-campista', clube: 'Barcelona', altura: 1.81, nacionalidade: 'Holanda' },
    { nome: 'Ronald Araújo', dataNascimento: '1999-03-07', posicao: 'Zagueiro', clube: 'Barcelona', altura: 1.88, nacionalidade: 'Uruguai' },
    { nome: 'João Cancelo', dataNascimento: '1994-05-27', posicao: 'Lateral', clube: 'Barcelona', altura: 1.82, nacionalidade: 'Portugal' },
    { nome: 'Victor Osimhen', dataNascimento: '1998-12-29', posicao: 'Atacante', clube: 'Napoli', altura: 1.85, nacionalidade: 'Nigéria' },
    { nome: 'Khvicha Kvaratskhelia', dataNascimento: '2001-02-12', posicao: 'Atacante', clube: 'Napoli', altura: 1.83, nacionalidade: 'Geórgia' },
    { nome: 'Kim Min-jae', dataNascimento: '1996-11-15', posicao: 'Zagueiro', clube: 'Bayern Munich', altura: 1.90, nacionalidade: 'Coreia do Sul' },
    { nome: 'Dušan Vlahović', dataNascimento: '2000-01-28', posicao: 'Atacante', clube: 'Juventus', altura: 1.90, nacionalidade: 'Sérvia' },
    { nome: 'Federico Chiesa', dataNascimento: '1997-10-25', posicao: 'Atacante', clube: 'Juventus', altura: 1.75, nacionalidade: 'Itália' },
    { nome: 'Sandro Tonali', dataNascimento: '2000-05-08', posicao: 'Meio-campista', clube: 'Newcastle', altura: 1.81, nacionalidade: 'Itália' },
    { nome: 'Declan Rice', dataNascimento: '1999-01-14', posicao: 'Meio-campista', clube: 'Arsenal', altura: 1.85, nacionalidade: 'Inglaterra' }
];

// Rotas com cache
app.get('/api/jogadores', cacheJogadores, (req, res) => {
    let resultado = [...jogadores];
    
    if (req.query.nome) {
        resultado = resultado.filter(j => 
            j.nome.toLowerCase().includes(req.query.nome.toLowerCase()));
    }
    
    if (req.query.posicao) {
        resultado = resultado.filter(j => 
            j.posicao.toLowerCase() === req.query.posicao.toLowerCase());
    }
    
    if (req.query.clube) {
        resultado = resultado.filter(j => 
            j.clube.toLowerCase().includes(req.query.clube.toLowerCase()));
    }

    if (req.query.nacionalidade) {
        resultado = resultado.filter(j => 
          j.nacionalidade.toLowerCase().includes(req.query.nacionalidade.toLowerCase()));
    }
  
    res.json(resultado);
});

app.get('/api/jogadores/nomes', cacheAutocomplete, (req, res) => {
    const termo = req.query.termo?.toLowerCase() || '';
    const nomes = jogadores
      .filter(j => j.nome.toLowerCase().includes(termo))
      .map(j => j.nome);
    res.json(nomes);
});

app.get('/api/jogadores/clubes', cacheAutocomplete, (req, res) => {
    const termo = req.query.termo?.toLowerCase() || '';
    const clubesUnicos = [...new Set(jogadores.map(j => j.clube))];
    const clubesFiltrados = clubesUnicos.filter(c => 
      c.toLowerCase().includes(termo));
    res.json(clubesFiltrados);
});

app.get('/api/jogadores/nacionalidades', cacheAutocomplete, (req, res) => {
    const termo = req.query.termo?.toLowerCase() || '';
    const nacionalidadesUnicas = [...new Set(jogadores.map(j => j.nacionalidade))];
    const nacionalidadesFiltradas = nacionalidadesUnicas.filter(n => 
      n.toLowerCase().includes(termo));
    res.json(nacionalidadesFiltradas);
});

// Health Check para Netlify
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});