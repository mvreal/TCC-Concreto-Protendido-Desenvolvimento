import {sucess, erro, NotacaoCientifica} from "./functions.js"

function verificacaoVigaRet(resArea,resInerciaBaricentricaX, b, h){
    let area = b * h
    let perimetro = 2 * (b + h)
    resArea.innerText = NotacaoCientifica(area)

    let ixg = b* (h**3) / 12 
    resInerciaBaricentricaX.innerText = NotacaoCientifica(ixg)

    if(b == ""){erro("A largura da viga (b) não foi definida");return}
    if(h == ""){erro("A altura da viga (h) não foi definida");return}

    sucess(message)
    return {
        centroide: h/2,
        w1: - ixg/(h/2),
        w2: ixg/(h - (h/2)),
        tipo:'Retangular',
        slug:"&#9608",
        area: area,
        perimetro: perimetro,
        ixg: ixg,
        dados:{
            b: b,
            h: h
        }
    }
}

function verificacaoVigaT(resArea, resInerciaBaricentricaX,bf, hf, bw, h, bmis, hmis, message){
    if(bmis == ""){bmis = 0}
    if(hmis == ""){hmis = 0}

    if(bf == 0){erro("A largura da mesa (b<sub>f</sub>) não foi inserida"); return}
    if(hf == 0){erro("A altura da mesa (h<sub>f</sub>) não foi inserida"); return}
    if(bw == 0){erro("A largura da alma (b<sub>w</sub>) não foi inserida"); return}
    if(h == 0){erro("A altura total da viga (h) não foi inserida"); return}
    if(hf >= h){erro("A altura da mesa (h<sub>f</sub>) não deve ser maior ou igual que a altura da viga (h)"); return}
    if(bw >= bf){erro("A largura da alma (b<sub>w</sub>) não deve ser maior que a largura da mesa (b<sub>f</sub>) disponível"); return}
    if(bmis > ((bf-bw)/2)){erro("A largura da mísula (b<sub>mis</sub>) deve estar contida na largura da mesa (b<sub>f</sub>) disponível"); return}
    if(hmis > (h-hf)){erro("A altura da mísula (h<sub>mis</sub>) deve estar contida na altura disponível da alma"); return}
    sucess()

    let areaMesa = bf * hf
    let areaAlma = bw * (h - hf)
    let areaMisula = hmis * bmis /2

    let area = areaMesa + areaAlma + (2 * areaMisula)
    resArea.innerText = NotacaoCientifica(area)

    let centroideYMesa = (h - (hf/2))
    let centroideYAlma = ((h-hf)/2)
    let centroideYMisula = ((h - hf) - (hmis/3))

    let produtoCentroideYAreaMesa = centroideYMesa * areaMesa 
    let produtoCentroideYAreaAlma = centroideYAlma * areaAlma
    let produtoCentroideYAreaMisula = centroideYMisula * areaMisula

    let centroideY = (produtoCentroideYAreaMesa + produtoCentroideYAreaAlma + (2 * produtoCentroideYAreaMisula))/area

    let ixgMesa = ((bf * (hf**3))/12) + (areaMesa * ((centroideY - centroideYMesa)**2))
    let ixgAlma = ((bw * ((h-hf)**3))/12) + (areaAlma * ((centroideY - centroideYAlma)**2))
    let ixgMisula = ((bmis * (hmis**3))/36) + (areaMisula * ((centroideY - centroideYMisula)**2))
    let ixg = ixgMesa + ixgAlma + ixgMisula + ixgMisula

    const perimetroVigaT = calcularPerimetroVigaT(bf, hf, bw, h, bmis, hmis)

    resInerciaBaricentricaX.innerText = NotacaoCientifica(ixg)
    return {
        centroide:centroideY,
        tipo:"T",
        slug:"T",
        perimetro: perimetroVigaT,
        area: area,
        ixg: ixg,
        w1: -ixg/centroideY,
        w2: ixg/(h - centroideY),
        dados:{
            bf: bf,
            hf: hf,
            bw: bw,
            h: h,
            bmis: bmis,
            hmis: hmis
        }
    }
}

function verificacaoVigaI(resArea, resInerciaBaricentricaX,bf, hf, bw, h, bi, hi, bmissup, hmissup, bmisinf, hmisinf, message){

    if(bmissup == ""){
        bmissup = 0
    }
    if(hmissup == ""){
        hmissup = 0
    }

    if(bmisinf == ""){
        bmisinf = 0
    }
    if(hmisinf == ""){
        hmisinf = 0
    }
    if(bf == 0){erro("A largura da mesa (b<sub>f</sub>) não foi inserida"); return}
    if(hf == 0){erro("A altura da mesa superior (h<sub>f</sub>) não foi inserida"); return}
    if(bw == 0){erro("A largura da alma (b<sub>w</sub>) não foi inserida"); return}
    if(h == 0){erro("A altura total da viga (h) não foi inserida"); return}
    if(bi == 0){erro("A largura da mesa inferior (b<sub>i</sub>) não foi inserida"); return}
    if(hi == 0){erro("A altura da mesa inferior (h<sub>i</sub>) não foi inserida"); return}
    if(hf >= h-hi){erro("A altura da mesa superior (h<sub>f</sub>) não deve ser maior ou igual que a altura da viga menos a altura da mesa inferior (h - h<sub>i</sub>)"); return}
    if(hi >= h-hf){erro("A altura da mesa inferior (h<sub>i</sub>) não deve ser maior ou igual que a altura da viga menos a altura da mesa superior (h - h<sub>f</sub>)"); return}
    if(hi >= h){erro("A altura da mesa (h<sub>i</sub>) não deve ser maior ou igual que a altura da viga (h)");return}
    if(hi+hf >= h){erro("A altura das mesas (h<sub>i</sub> + h<sub>f</sub>) não deve ser maior ou igual que a altura da viga (h)");return}
    if(bmissup >(bf-bw)/2){erro("A largura da missula superior (b<sub>mis-sup</sub>) não deve ser maior que a largura disponível da mesa superior");return}
    if(bmisinf >(bi-bw)/2){erro("A largura da missula inferior (b<sub>mis-sup</sub>) não deve ser maior que a largura disponível da mesa inferior");return}
    if(hmissup > h - hf - hi - hmisinf){erro("A altura da missula superior (h<sub>mis-sup</sub>) não deve ser maior que a seção disponível da alma");return}
    if(hmisinf > h - hf - hi - hmissup){erro("A altura da missula inferior (h<sub>mis-sup</sub>) não deve ser maior que a seção disponível da alma");return}
    //Mensagem de sucesso após verificar que nenhum erro aconteceu
    
    sucess()

    //Rotina para calcular as propriedades Geométricas

    let areaMesaSuperior = bf * hf
    let areaAlma = bw * (h-hf-hi)
    let areaMesaInferior = bi * hi
    let areaMisulaSuperior = (bmissup * hmissup)/2
    let areaMisulaInferior = (bmisinf * hmisinf)/2

    let centroideYMesaSuperior = h-(hf/2)
    let centroideYAlma = hi + ((h-hi-hf)/2)
    let centroideYMesaInferior = hi/2
    let centroideYMisulaSuperior = h-hf-(hmissup/3)
    let centroideYMisulaInferior = hi + (hmisinf/3)

    let produtoCentroideYAreaMesaSuperior = centroideYMesaSuperior * areaMesaSuperior
    let produtoCentroideYAreaMesaInferior = centroideYMesaInferior * areaMesaInferior
    let produtoCentroideYAreaAlma = centroideYAlma * areaAlma
    let produtoCentroideYAreaMisulaSuperior = centroideYMisulaSuperior * areaMisulaSuperior
    let produtoCentroideYAreaMisulaInferior = centroideYMisulaInferior * areaMisulaInferior

    let area = areaMesaSuperior + areaMesaInferior + areaAlma + (2*areaMisulaSuperior) + (2*areaMisulaInferior)
    resArea.innerText = NotacaoCientifica(area)

    let centroideY = (produtoCentroideYAreaMesaSuperior + produtoCentroideYAreaMesaInferior + produtoCentroideYAreaAlma + (2*produtoCentroideYAreaMisulaSuperior) + (2*produtoCentroideYAreaMisulaInferior))/area

    let ixgMesaSuperior = ((bf * (hf**3))/12) + (areaMesaSuperior * ((centroideY - centroideYMesaSuperior)**2))
    let ixgAlma = (bw * ((h-hf-hi)**3)/12) + (areaAlma * ((centroideY - centroideYAlma)**2))
    let ixgMesaInferior = ((bi * (hi**3))/12)+ (areaMesaInferior * ((centroideY - centroideYMesaInferior)**2))
    let ixgMisulaSuperior = ((bmissup * (hmissup**3))/36) + (areaMisulaSuperior * ((centroideY - centroideYMisulaSuperior)**2))
    let ixgMisulainferior = ((bmisinf * (hmisinf**3))/36) + (areaMisulaInferior * ((centroideY - centroideYMisulaInferior)**2))

    let ixg = (ixgMesaSuperior + ixgMesaInferior + ixgAlma + (2 * ixgMisulaSuperior) + (2 * ixgMisulainferior))

    const perimetroVigaI = calcularPerimetroVigaI(bf, hf, bw, h, bi, hi, bmissup,hmissup, bmisinf, hmisinf)

    resInerciaBaricentricaX.innerText = NotacaoCientifica(ixg)
    return {
        centroide: centroideY,
        tipo:'I',
        slug:"&#9014",
        area: area,
        perimetro: perimetroVigaI,
        ixg: ixg,
        w1: -ixg/centroideY,
        w2: ixg/(h - centroideY),
        dados:{
            bf: bf,
            hf: hf,
            bw: bw,
            h: h,
            bi: bi,
            hi: hi,
            bmissup: bmissup,
            hmissup: hmissup,
            bmisinf: bmisinf,
            hmisinf: hmisinf
        }
    }
}

function calcularPerimetroVigaT(bf, hf, bw, h, bmis, hmis){
    let perimetroSemMisula = (2 * bf) + (2 * h)
    let correcaoMisula = -2 * (hmis + bmis) + 2 * Math.sqrt((hmis**2) + (bmis**2))
    perimetroSemMisula = Number(perimetroSemMisula)
    correcaoMisula = Number(correcaoMisula)

    return perimetroSemMisula + correcaoMisula
}

function calcularPerimetroVigaI(bf, hf, bw, h, bi, hi, bmissup,hmissup, bmisinf, hmisinf){
    console.log(bf, hf, bw, h, bi, hi, bmissup,hmissup, bmisinf, hmisinf)
    const perimetroMesaSuperiorSemMisula = (2 * bf) + (2 * hf) - bw
    const perimetroAlmaSemMisula = (2 * (h - hf - hi))
    const perimetroMesaInferiorSemMisula = (2 * bi) + (2 * hi) - bw
    hmissup = Number(hmissup)
    bmissup = Number(bmissup)
    bmisinf = Number(bmisinf)
    hmisinf = Number(hmisinf)
    const correcaoMisulaSuperior = -2 * (hmissup + bmissup) + 2 * Math.sqrt((hmissup**2) + (bmissup**2))
    const correcaoMisulaInferior = -2 * (hmisinf + bmisinf) + 2 * Math.sqrt((hmisinf**2) + (bmisinf**2))
    console.log(perimetroMesaSuperiorSemMisula, perimetroAlmaSemMisula, perimetroMesaInferiorSemMisula, correcaoMisulaSuperior, correcaoMisulaInferior)
    const perimetro = perimetroMesaSuperiorSemMisula + perimetroAlmaSemMisula + perimetroMesaInferiorSemMisula + correcaoMisulaSuperior + correcaoMisulaInferior
    return perimetro
}

export {verificacaoVigaRet, verificacaoVigaT, verificacaoVigaI}