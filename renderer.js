window.addEventListener('DOMContentLoaded', () => {

    const rotina1 = document.getElementById('rotina1')
    rotina1.addEventListener('click', () => {
      window.api.abrirJanela1();
    })
  
    const rotina2 = document.getElementById('rotina2')
    rotina2.addEventListener('click', () => {
      window.api.abrirJanela2();
    })

    const rotina3 = document.getElementById('rotina3')
    rotina3.addEventListener('click', () => {
      window.api.abrirJanela3();
    })

    const rotina4 = document.getElementById('rotina4')
    rotina4.addEventListener('click', () => {
      window.api.abrirJanela4();
    })
  
  });
  
  