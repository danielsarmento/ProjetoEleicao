const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

    const {data} = await axios('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json');
    console.log(data)

    res.json({
        Data: data.dt,
        Hora: data.ht,
        SecoesTotalizadas: data.pst + '%',
        Abstencao: data.pa + '%',
        LULA: data.cand[0].pvap +'%',
        Votos1: data.cand[0].vap,
        BOLSONARO: data.cand[1].pvap +'%',
        Votos2: data.cand[1].vap,
    })
});

app.listen(3030, () => {
    console.log(`servidor disponível na porta 3030`)
})