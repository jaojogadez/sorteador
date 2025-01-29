const $switchButton = document.querySelector(".switch")
$switchButton.onclick = () => toggleMode()
let toggleMode = () => {
    $switchButton.classList.toggle("toggleMode")
}