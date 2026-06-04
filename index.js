//Instalamos express
import express from 'express';
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


