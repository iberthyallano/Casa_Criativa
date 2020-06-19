//usando express
const express = require("express");
const server = express();

const db = require("./db");

//config arquivos estáticos
server.use(express.static("public"));

//habilitar uso do req.body
server.use(express.urlencoded({extended: true}));

//congurando o nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
           console.log(err);
           return res.render("Erro no banco de dados");
        }
        
        let reversedIdeas = [...rows].reverse();

        let lastideas = [];
    
        for(let idea of reversedIdeas){
            if(lastideas.length < 3){
                lastideas.push(idea);
            }else{
                break;
            }
        }
    
        return res.render("index.html", {ideas: lastideas});
    });
    
});

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err);
            return res.render("Erro no banco de dados");
        }
        
        let reversedIdeas = [...rows].reverse();

        return res.render("ideias.html", {ideas: reversedIdeas});
    });

});

server.post("/", function(req, res){
    
    const query =  `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        )VALUES(?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err);
            return res.render("Erro no banco de dados");
        }
       
        return res.redirect("/ideias");
    });  
});


//lingando server na porta 3333
server.listen(3333);