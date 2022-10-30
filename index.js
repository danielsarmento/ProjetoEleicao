const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

    const {data} = await axios('https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json');
    const dataGov = await axios('https://resultados.tse.jus.br/oficial/ele2022/547/dados-simplificados/pb/pb-c0003-e000547-r.json');

    res.json({
        Data: data.dg,
        Hora: data.hg,
        SecoesTotalizadas: data.pst + '%',
        Abstencao: data.pa + '%',
        LULA: data.cand[0].pvap +'%',
        Votos1: data.cand[0].vap,
        BOLSONARO: data.cand[1].pvap +'%',
        Votos2: data.cand[1].vap,

        SecoesTotalizadasPB: dataGov.data.pst + '%',
        AbstencaoPB: dataGov.data.pa + '%',
        Joao: dataGov.data.cand[0].pvap +'%' + ' (Eleito)',
        Votos1PB: dataGov.data.cand[0].vap,
        Pedro: dataGov.data.cand[1].pvap +'%',
        Votos2PB: dataGov.data.cand[1].vap


    })
});


app.listen(3030, () => {
    console.log(`servidor disponível na porta 3030`)
})