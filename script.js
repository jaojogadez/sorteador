/* HTML ELEMENTS */
const $items = document.querySelector(".order-2");
const $title = document.querySelector("#title");
const $form = document.querySelector("form");
const $result = document.getElementById("result")
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

/* FORM's INPUTS */
const $inputs = document.getElementsByName("numbers");
const inputs = Array.from($inputs);
const $totalNumbers = document.getElementById("numbers");
const $startNumbers = document.getElementById("numbers-start");
const $endNumbers = document.getElementById("numbers-end");
const $btnReloadRandomNumber = document.querySelector("#result button")

/* RESULTADO DO SORTEIO */
const $resultOne = document.querySelector("#numberOne");
const $resultTwo = document.querySelector("#numberTwo");

const $switchButton = document.querySelector(".switch");
$switchButton.onclick = () => toggleMode();
let toggleMode = () => {
  $switchButton.classList.toggle("toggleMode");
};

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
  event.preventDefault() 
  const totalNumbers = $totalNumbers.value
  const startNumbers = $startNumbers.value
  const endNumbers = $endNumbers.value
  try {
    const isValidInputs = inputs.every((input) => input.value != "")
    if(isValidInputs){

      $form.classList.add("d-none")
      $result.classList.remove("d-none")

      let numberOne = randomNumberInterval(startNumbers, endNumbers)
      
      $resultOne.innerHTML = numberOne
      

    } else{
      alert("Por Favor, preencha todos os campos.")
    }
  } catch (error) {
    console.log(error)
  }
}


inputs.map((input) => {
  input.addEventListener("input", () => {
    input.value = onlyNumbersFormat(input)
  })
})

let onlyNumbersFormat = (input) => {
  return input.value.replace(/\D/g, "").slice(0, 3)
}

let randomNumberInterval = (startNumber, endNumber) => {
  startNumber = Math.ceil(startNumber)
  endNumber = Math.floor(endNumber)
  return Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber
}
