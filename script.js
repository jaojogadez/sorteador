"use-strict";

/* HTML ELEMENTS */
const $items = document.querySelector(".order-2");
const $title = document.querySelector("#title");
const $form = document.querySelector("form");
const $result = document.getElementById("result");
const $spanContainer = document.getElementById("resultValues");
const $roundResult = document.querySelector("#result .text-uppercase");
const items = `
    <div class="order-2 mt-2 mb-4">
        <div class="container-sm mb-4">
            <img src="assets/icons/Frame.png" alt="icone" class="img-fluid" />
            <div class="col mx-4">
                <h3>Como funciona o sorteador de números?</h3>
                <p>
                  O sorteador utiliza um algoritmo de geração aleatória para
                  criar números dentro do intervalo especificado pelo usuário.
                </p>
            </div>
        </div>
        <div class="container-sm">
            <img src="assets/icons/Frame.png" alt="icone" class="img-fluid" />
            <div class="col mx-4">
                <h3>Posso escolher o intervalo dos números?</h3>
                <p>Sim, você pode definir os valores mínimo e máximo para o intervalo dos números sorteados.</p>            
            </div>
        </div>
    </div>
  `;
const $switchButton = document.querySelector(".switch");

/* FORM's INPUTS */
const $inputs = document.getElementsByName("numbers");
const inputs = Array.from($inputs);
const $totalNumbers = document.getElementById("numbers");
const $startNumbers = document.getElementById("numbers-start");
const $endNumbers = document.getElementById("numbers-end");
const $btnReloadRandomNumber = document.querySelector("#restartSorteio");

/* RESULTADO DO SORTEIO */
const $resultOne = document.querySelector("#numberOne");
const $resultTwo = document.querySelector("#numberTwo");


// ADD FUNÇÃO AO SWITCH
$switchButton.onclick = () => toggleMode();
let toggleMode = () => {
  $switchButton.classList.toggle("toggleMode");
};

// FAZER UM AJUSTE NA RESPONSIVIDADE
let responseWindow = () => {
  let width = window.innerWidth;

  if (width < 768) {
    $form.insertAdjacentHTML("afterend", items);
  } else {
    $title.insertAdjacentHTML("afterend", items);
  }

  const itemQuantity = document.querySelectorAll(".order-2");
  const arrayItems = Array.from(itemQuantity);
  arrayItems.forEach((item, index) => {
    if (width > 768) {
      if (index !== 0) {
        item.remove();
      }
    } else {
      if (index !== 1) {
        item.remove();
      }
    }
  });
};

window.addEventListener("resize", () => responseWindow());
window.addEventListener("DOMContentLoaded", () => responseWindow());

$form.onsubmit = (event) => {
  event.preventDefault();

  if (!validateInputs()) {
    return;
  } else {
    sortearRandomNumber();
  }
};

inputs.map((input) => {
  input.addEventListener("input", () => {
    input.value = onlyNumbersFormat(input);
  });
});

let onlyNumbersFormat = (input) => {
  return input.value.replace(/\D/g, "").slice(0, 3);
};

const results = [];
let round = 1;

let sortearRandomNumber = () => {
  // Pegar o total de resultados
  const totalNumbers = Number($totalNumbers.value);

  // Pegar o menor valor
  const startNumbers = Number($startNumbers.value);

  // Pegar o maior valor
  const endNumbers = Number($endNumbers.value);

  // Clear older results
  $spanContainer.innerHTML = "";
  results.length = 0;

  for (let index = 0; index < totalNumbers; index++) {
    let resultado = 0;
    // Gerar um número aleatório entre maior e menor valor
    if ($switchButton.classList.contains("toggleMode")) {
      resultado =
        Math.floor(Math.random() * (endNumbers - startNumbers + 1)) +
        startNumbers;
    } else {
      do {
        resultado =
          Math.floor(Math.random() * (endNumbers - startNumbers + 1)) +
          startNumbers;
      } while (results.includes(resultado));
    }

    // Add resultado no array
    results.push(resultado);
    console.log(results);
  }

  $roundResult.innerHTML = `${round++}º Resultado`;

  let i = 0;
  const interval = setInterval(() => {
    if (i < results.length) {
      $btnReloadRandomNumber.style.opacity = 0;
      // Gerar um elemento HTML para o resultado
      const newSpan = document.createElement("span");
      newSpan.classList.add("result-number");
      newSpan.textContent = results[i];
      
      // Add o elemento no DOM
      $spanContainer.append(newSpan);
      i++
    } else {
      clearInterval(interval)
      $btnReloadRandomNumber.style.opacity = 1;
    }
  }, 500);

  // Mudar para o container de resultado
  $form.classList.add("d-none");
  $result.classList.remove("d-none");
};

let validateInputs = () => {
  const isValidInputs = inputs.every((input) => input.value != "");
  if (isValidInputs) {
    return true;
  } else {
    alert("Por Favor, preencha todos os campos.");
    return false;
  }
};

document.querySelector("#button").addEventListener("click", () => back());

let back = () => {
  // Mudar para o container de formulário
  $form.classList.remove("d-none");
  $result.classList.add("d-none");
};
