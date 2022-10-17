const form = document.querySelector('#formulario'); //selecionando o formulário completo

form.addEventListener('submit', function (e) { // Capturar evento de submit (envio) do formulário
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso'); //pegando valores dos botões //e.target me informa qual elemento foi clicado
  const inputAltura = e.target.querySelector('#altura'); //pegando valores dos botões

  const peso = Number(inputPeso.value); //tranformando em um nunber e pegando somente o valor do input com o .value
  const altura = Number(inputAltura.value);  //tranformando em um nunber e pegando somente o valor do input com o .value

  if (!peso) { //se for diferente de peso...
    setResultado('Peso inválido', false);
    return;
  }

  if (!altura) { //se for diferente de altura...
    setResultado('Altura inválida', false); 
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);

  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true);
});

function getNivelImc (imc) {  
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3']; //array dentro de função com a estrutura de decisão

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

function getImc (peso, altura) { //função calculo imc //hoisting eleva a declaração de funções
  const imc = peso / altura ** 2;
  return imc.toFixed(2); //retorna o imc com duas casas decimais 
}

function criaP () { //função para criar paragráfos
  const p = document.createElement('p'); //criando um paragráfo
  return p;
}

function setResultado (msg, isValid) { //enviando mensagem para a div resultado
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = ''; //limpando a div 

  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado'); //está é uma classe feita para o css, onde muda a cor para verde se for positivo
  } else {
    p.classList.add('bad'); //e para vermelho se for negativo
  }

  p.innerHTML = msg;
  resultado.appendChild(p); //inserindo um filho (p) na div resultado
}