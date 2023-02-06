let ctnIconDuvida = document.querySelectorAll('.duvida')
let ctnDuvida = document.querySelector('#textoDuvida')
let ctnMensagemDuvida = document.querySelector('#ctnMensagemDuvida')

ctnIconDuvida.forEach((element,index)=>{
    element.addEventListener('click',(event)=>{
        if(index == 0){ctnDuvida.innerHTML = "O vão compreende a distância entre o centro do apoio esquerdo até o centro do apoio direito"}
        if(index == 1){ctnDuvida.innerHTML = "'g<sub>1</sub>' corresponde ao peso próprio da viga, calculada com base na área definida na Tela: Propriedades Geométricas da Seção, para selecionar um valor é necessário escolher uma das figuras salvas"}
        if(index == 2){ctnDuvida.innerHTML = "'g<sub>2</sub>' corresponde ao somatório dos demais pesos próprios que não sejam da viga"}
        if(index == 3){ctnDuvida.innerHTML = "'q' corresponde a ação variável"}
        if(index == 4){ctnDuvida.innerHTML = "'&#936<sub>1</sub>' é o fator de redução de combinação frequente para ELS, para saber mais verificar a Tabela 11.4 da NBR 6118-2013"}
        if(index == 5){ctnDuvida.innerHTML = "'&#936<sub>2</sub>' é o fator de redução de combinação quase-permanente para ELS, para saber mais verificar a Tabela 11.4 da NBR 6118-2013"}
        if(index == 6){ctnDuvida.innerHTML = "'&#947<sub>g<sub>1</sub></sub>' é o coeficiente de ponderação da ação permanente 1 no estado-limite último, para saber mais verificar a Tabela 11.1 da NBR 6118-2013"}
        if(index == 7){ctnDuvida.innerHTML = "'&#947<sub>g<sub>2</sub></sub>' é o coeficiente de ponderação da ação permanente 2 no estado-limite último, para saber mais verificar a Tabela 11.1 da NBR 6118-2013"}
        if(index == 8){ctnDuvida.innerHTML = "'&#947<sub>q</sub>' é o coeficiente de ponderação da ação variável no estado-limite último, para saber mais verificar a Tabela 11.1 da NBR 6118-2013"}

        ctnMensagemDuvida.style.top = (event.screenY-80) + 'px'
        ctnMensagemDuvida.style.left = (event.screenX-380) + 'px'
        ctnMensagemDuvida.style.border = '1px solid black'
        
        setTimeout(() => {
            ctnDuvida.innerHTML = ""
        ctnMensagemDuvida.style.border = 'none'
        }, 8000);
       
    })
})