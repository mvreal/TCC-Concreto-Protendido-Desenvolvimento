
let dadosSalvosdaRotina1 = []
let dadosSalvosdaRotina2 = []
let dadosSalvosdaRotina3 = []
let dadosSalvosdaRotina4 = []

// window.api.enviarDados((data) => {
//     dadosSalvosdaRotina1 = data[0]
//     dadosSalvosdaRotina2 = data[1]
//     dadosSalvosdaRotina3 = data[2]
//     dadosSalvosdaRotina4 = data[3]

// })

dadosSalvosdaRotina3 = [
    {
        "tensaoCaracteristicaTracao": 2100,
        "id": 0,
        "areaArmaduraProtensao1cordoalha": 55,
        "tipoProtensao": "limitada",
        "pInfCalc": -1151.45111233576,
        "PInfProj": -1278.5849999999998,
        "pIniCalc": -1535.2681497810133,
        "pIniProj": -1704.78,
        "tipoArmadura": "CP 210 RB 09.5",
        "numCordoalhasArredondado": 5,
        "numCabos": "4",
        "secoes": [
            {
                "X": 0,
                "Vao": "15",
                "CaboY": 57.02239789196311,
                "ep": 0,
                "momentoQP": 0,
                "momentoFrequente": 0,
                "completa-ELS-D": 0,
                "completa-ELS-F": 923.7870661893681,
                "limitada-ELS-D": 0,
                "limitada-ELS-F": 923.7870661893681,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 1.5,
                "Vao": "15",
                "CaboY": 40.81433465085639,
                "ep": -0.1620806324110672,
                "momentoQP": 272.42325,
                "momentoFrequente": 292.67325,
                "completa-ELS-D": -793.0352011196856,
                "completa-ELS-F": -384.69494742825566,
                "limitada-ELS-D": -738.1652640049214,
                "limitada-ELS-F": -274.95507319872746,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 3,
                "Vao": "15",
                "CaboY": 28.208063241106714,
                "ep": -0.28814334650856394,
                "momentoQP": 484.308,
                "momentoFrequente": 520.308,
                "completa-ELS-D": -1050.8783207121849,
                "completa-ELS-F": -810.1276190744737,
                "limitada-ELS-D": -978.1682729219556,
                "limitada-ELS-F": -664.7075234940149,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 4.5,
                "Vao": "15",
                "CaboY": 19.203583662714095,
                "ep": -0.37818814229249015,
                "momentoQP": 635.65425,
                "momentoFrequente": 682.90425,
                "completa-ELS-D": -1167.0343922909315,
                "completa-ELS-F": -1001.7813189590167,
                "limitada-ELS-D": -1086.2875305811872,
                "limitada-ELS-F": -840.2875955395291,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 6,
                "Vao": "15",
                "CaboY": 13.800895915678517,
                "ep": -0.43221501976284593,
                "momentoQP": 726.462,
                "momentoFrequente": 780.462,
                "completa-ELS-D": -1221.01925313378,
                "completa-ELS-F": -1090.8545647881858,
                "limitada-ELS-D": -1136.5371903693865,
                "limitada-ELS-F": -921.8904392593987,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 7.5,
                "Vao": "15",
                "CaboY": 12,
                "ep": -0.4502239789196311,
                "momentoQP": 756.7312499999999,
                "momentoFrequente": 812.9812499999999,
                "completa-ELS-D": -1237.0417696118886,
                "completa-ELS-F": -1117.2911902934552,
                "limitada-ELS-D": -1151.45111233576,
                "limitada-ELS-F": -946.1098757411976,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 9,
                "Vao": "15",
                "CaboY": 13.80089591567851,
                "ep": -0.432215019762846,
                "momentoQP": 726.462,
                "momentoFrequente": 780.462,
                "completa-ELS-D": -1221.0192531337798,
                "completa-ELS-F": -1090.8545647881851,
                "limitada-ELS-D": -1136.5371903693863,
                "limitada-ELS-F": -921.8904392593985,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 10.5,
                "Vao": "15",
                "CaboY": 19.203583662714095,
                "ep": -0.37818814229249015,
                "momentoQP": 635.65425,
                "momentoFrequente": 682.90425,
                "completa-ELS-D": -1167.0343922909315,
                "completa-ELS-F": -1001.7813189590171,
                "limitada-ELS-D": -1086.2875305811872,
                "limitada-ELS-F": -840.2875955395291,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 12,
                "Vao": "15",
                "CaboY": 28.2080632411067,
                "ep": -0.2881433465085641,
                "momentoQP": 484.3080000000002,
                "momentoFrequente": 520.308,
                "completa-ELS-D": -1050.8783207121846,
                "completa-ELS-F": -810.1276190744734,
                "limitada-ELS-D": -978.1682729219557,
                "limitada-ELS-F": -664.7075234940147,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 13.5,
                "Vao": "15",
                "CaboY": 40.81433465085634,
                "ep": -0.1620806324110677,
                "momentoQP": 272.4232499999998,
                "momentoFrequente": 292.6732499999998,
                "completa-ELS-D": -793.0352011196838,
                "completa-ELS-F": -384.69494742825464,
                "limitada-ELS-D": -738.1652640049199,
                "limitada-ELS-F": -274.9550731987266,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            },
            {
                "X": 15,
                "Vao": "15",
                "CaboY": 57.02239789196311,
                "ep": 0,
                "momentoQP": 0,
                "momentoFrequente": 0,
                "completa-ELS-D": 0,
                "completa-ELS-F": 923.7870661893681,
                "limitada-ELS-D": 0,
                "limitada-ELS-F": 923.7870661893681,
                "protensao": "limitada",
                "posicaoCaboProtensao": {
                    "inicio": 57.02239789196311,
                    "meioVao": 12
                },
                "dadosCombinacoes": {
                    "vao": 15,
                    "carregamentos": {
                        "g1": 7.906,
                        "g2": 15,
                        "q": 10
                    },
                    "coeficientesServico": {
                        "qsi1": 0.6,
                        "qsi2": 0.4
                    },
                    "coeficientesUltimo": {
                        "gamag1": 1.4,
                        "gamag2": 1.4,
                        "gamaq": 1.4
                    }
                }
            }
        ],
        "Ap": 1100,
        "fck": "35",
        "rotina2": {
            "Figura": "1",
            "Vao": "15",
            "g<sub>1</sub>": 7.906,
            "g<sub>2</sub>": 15,
            "q": 10,
            "&#936<sub>1</sub>": 0.6,
            "&#936<sub>2</sub>": 0.4,
            "&#947<sub>g<sub>1</sub></sub>": "1.4",
            "&#947<sub>g<sub>2</sub></sub>": "1.4",
            "&#947<sub>q</sub>": "1.4",
            "combinacoes": {
                "quase-permanente": {
                    "cargaDistribuidaMaxima": 26.906,
                    "cargaDistribuidaMinima": 22.906,
                    "esforcoCortanteMaximo": 201.795,
                    "esforcoCortanteMinimo": 171.795
                },
                "frequente": {
                    "cargaDistribuidaMaxima": 28.906,
                    "cargaDistribuidaMinima": 22.906,
                    "esforcoCortanteMaximo": 216.795,
                    "esforcoCortanteMinimo": 171.795
                },
                "rara": {
                    "cargaDistribuidaMaxima": 32.906,
                    "cargaDistribuidaMinima": 22.906,
                    "esforcoCortanteMaximo": 246.795,
                    "esforcoCortanteMinimo": 171.795
                },
                "ultima": {
                    "cargaDistribuidaMaxima": 46.0684,
                    "cargaDistribuidaMinima": 32.0684,
                    "esforcoCortanteMaximo": 345.513,
                    "esforcoCortanteMinimo": 240.51299999999998
                }
            },
            "dados": {
                "vao": 15,
                "carregamentos": {
                    "g1": 7.906,
                    "g2": 15,
                    "q": 10
                },
                "coeficientesServico": {
                    "qsi1": 0.6,
                    "qsi2": 0.4
                },
                "coeficientesUltimo": {
                    "gamag1": 1.4,
                    "gamag2": 1.4,
                    "gamaq": 1.4
                }
            },
            "rotina1": {
                "centroide": 57.02239789196311,
                "tipo": "I",
                "slug": "&#9014",
                "area": 3162.5,
                "perimetro": 357.5747479331314,
                "ixg": 3732429.663482653,
                "w1": -65455.50172327481,
                "w2": 86845.92625945229,
                "dados": {
                    "bf": 70,
                    "hf": 15,
                    "bw": 15,
                    "h": 100,
                    "bi": 40,
                    "hi": 15,
                    "bmissup": 27.5,
                    "hmissup": 10,
                    "bmisinf": 12.5,
                    "hmisinf": 15
                }
            }
        }
    }
]