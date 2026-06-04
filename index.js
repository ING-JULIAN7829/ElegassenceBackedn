//Instalamos express
import express from 'express';

//Base de datos provisional
import db from './db.json' with {type: 'json'};
//Definiciones iniciales
const PORT = process.env.PORT ?? '3000';
const app = express();
app.use(express.json());

app.listen(PORT , () => {
    console.log('Servidor andando');
})
/*SetUp inicial*/ 

app.get('/health' , (req, res) => {
    res.json({
        status: "ok" , 
        uptime: process.uptime()
    })
})


/*Routes*/
/*Catalogo*/ 
app.get('/catalogo' , (req , res) => { //Obtener todos
    res.json({db});
})
app.get('/catalogo/:id' , (req , res ) => {//Obtener uno
    const {id} = req.params;
    console.log(id);
    const resultado = db.find(perfume => perfume.id == id );
    res.json({resultado});
});
app.post('/catalogo' , (req,res) => { //Registrar
    const {id , nombre , precio , imagen} = req.body;
    
    const perfume = {
        id ,
        nombre ,
        precio , 
        imagen
    }
    
    db.push(perfume);
    res.json({message: "Registrado correctamente"});
})

app.put('/catalogo/:id' , (req, res) => {
    const {id} = req.params;
    const {nombre , precio , imagen } = req.body;

    const nuevoPerfume = {
        nombre ,
        precio ,
        imagen 
    }

    const indice = db.findIndex(perfume => perfume.id == id);
    db[indice] = nuevoPerfume;
    res.json({message: "Actualizado correctamente"})
})


app.delete('/catalogo/:id' , (req , res) => { //Eliminar por Id
    const {id} = req.params;
    const indice = db.findIndex((perfume , index) => perfume.id == id );

    db.splice(indice,1);
    res.json({message: "Eliminado con exito"})

})


