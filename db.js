const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./CASA_CRIATIVA.db');

db.serialize(function(){
    //criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TET,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);

    //inserir dados na tabela
    // const query =  `
    //     INSERT INTO ideas(
    //         image,
    //         title,
    //         category,
    //         description,
    //         link
    //     )VALUES(?,?,?,?,?);
    // `;
    // const values = [
    //     'https://image.flaticon.com/icons/svg/2729/2729007.svg',
    //     'Cursos de Programação',
    //     'Estudo',
    //     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde porro consequatur aperiam sunt. Nulla facere, ab aut, suscipit necessitatibus distinctio tempore consequuntur dolor impedit numquam animi perspiciatis architecto, pariatur ad!',
    //     'https://rocketseat.com.br'
    // ]

    // db.run(query, values, function(err){
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(this);
    // });

    //consultar dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(rows);
    // });

     //deletar um dado na tabela
    //  db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("DELETEI", this);
    // });

});

module.exports = db;