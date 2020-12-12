const puppeteer = require('puppeteer');
const fs = require ('fs');

async function robo () {
    
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const acessaUrl = 'https://www.mongagua.sp.gov.br/';
    await page.goto(acessaUrl);
    //await page.screenshot({path: 'imagem.png'});

    //const resultado = await page.evaluate(()=>{
        //return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
    //})
    
    const listaInput = await page.evaluate(()=>{
        const legenda = document.querySelectorAll('.banner-covid-label');
        const valores = document.querySelectorAll('.banner-covid-value');

        const arrayLegendas = [...legenda];
        const arrayValores = [...valores];

        const filtro = arrayLegendas.map((x)=>x.innerHTML);
        const filtro2 = arrayValores.map((x)=>x.innerHTML);

        const juntaFiltros = filtro.map((z,i)=> [z,filtro2[i]]);

    
        return juntaFiltros
        
    });

    fs.writeFile('infoCovid.json', JSON.stringify(listaInput,null,2), err=>{
        if(err) throw new Error('Algo deu errado')

        console.log('Sucesso!')
    })

    await browser.close();


}

robo();
