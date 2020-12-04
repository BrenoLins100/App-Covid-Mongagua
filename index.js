const puppeteer = require('puppeteer');
const fs = require ('fs');

async function robo () {
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const acessaUrl = 'https://www.mongagua.sp.gov.br/';
    await page.goto(acessaUrl);
    //await page.screenshot({path: 'imagem.png'});

    //const resultado = await page.evaluate(()=>{
        //return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
    //})
    
    const listaInput = await page.evaluate(()=>{
        const nodeList = document.querySelectorAll('.banner-covid-label');
        const nodeList2 = document.querySelectorAll('.banner-covid-value');

        const nodeArray = [...nodeList,...nodeList2];

        const inputList = nodeArray.map( ({innerHTML}) => ({
            innerHTML
        }))
    
        return inputList
        
    });

    fs.writeFile('infoCovid.json', JSON.stringify(listaInput, null, 2), err=>{
        if(err) throw new Error('Algo deu errado')

        console.log('Sucesso!')
    })

    await browser.close();


}

robo();
