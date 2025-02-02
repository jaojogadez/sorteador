/* HTML ELEMENTS */
const $items = document.querySelector(".order-2");
const $title = document.querySelector("#title");
const $form = document.querySelector("form");
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
