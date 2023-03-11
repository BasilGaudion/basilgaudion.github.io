
function init() {

    const clipboard = document.querySelector('.copy-icon');
    clipboard.addEventListener('click', handleCopy);

    // Boutton de generation 
    const generateButton = document.querySelector('.generate');
    generateButton.addEventListener('click', handleGenerate);

    // curseur de longueur
    const lenghtCursor = document.querySelector('.length');
    lenghtCursor.addEventListener('mousemove', handleLengthValue);
}

function handleGenerate() {
    // possibilités d'options 
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!?,;:./§%*-+$&#{}()[]|^@=';

    // Ecran du mot de passe généré
    const inputText = document.querySelector('.password-text');

    // Récupération des checkbox
    const lowercaseCheckbox = document.querySelector('#lowercase');
    const uppercaseCheckbox = document.querySelector('#uppercase');
    const numbersCheckbox = document.querySelector('#numbers');
    const symbolsCheckbox = document.querySelector('#symbols');
    const lengthValue = document.querySelector('.length').value;

    // s'il y a un message alerte alors on l'enleve 
    const alerte = document.querySelector('.copied-alert');
    alerte.style.display = 'none';

    let passwordCharacters = '';

    // Si une checkbox est cochée, on ajoute tout le contenu dans passwordCharacters
    if (lowercaseCheckbox.checked) {
        passwordCharacters += lowercase;
    }

    if (uppercaseCheckbox.checked) {
        passwordCharacters += uppercase;
    }

    if (numbersCheckbox.checked) {
        passwordCharacters += numbers;
    }

    if (symbolsCheckbox.checked) {
        passwordCharacters += symbols;
    }

    let generatedPassword = '';

    // Pour chaque chiffre entre 0 et la longueur de mot de passe voulue, on boucle
    for (let i = 0; i < lengthValue; i++) {
        // Génèration d'un nombre aléatoire entre 0 et le nombre de caractères dans passwordCharacters
        let randomNumber = Math.floor(Math.random() * passwordCharacters.length);
        
        // Sélection d'un caractère aléatoire compris dans passwordCharacters à partir du nombre généré
        let randomChar = passwordCharacters.charAt(randomNumber);
    
        // Ajoute le caractère généré à la fin de la chaîne de caractères générée
        generatedPassword += randomChar;
    }

    // Ajout du mot de passe à l'ecran
    inputText.value = generatedPassword;
}


// Permet l'affichage dynamique à l'écran de la longueur de mot de passe souhaité 
function handleLengthValue() {
    const lenghtValue = document.querySelector('.length').value;
    const lengthNumber = document.querySelector('.length-number');
    lengthNumber.textContent = lenghtValue;
}

// Fonction de copie duu mot de passe et alertes à l'ecran
function  handleCopy() {
    const clipboard = document.querySelector('.copy-icon');
    const inputTextValue = document.querySelector('.password-text').value;
    const copyAlert = document.querySelector('.copied-alert');
    const copyAlertText = document.querySelector('.copied-alert p');

    copyAlert.classList.remove('fade-out');
    
    // gestion d'alerte si rien à copier
    if(!inputTextValue) {
        copyAlert.style.display = 'flex';
        copyAlert.style.backgroundColor = '#b80c09';
        copyAlertText.textContent = "You must generate a password";
        return
    }

    // Copie dans le presse papier
    navigator.clipboard.writeText(inputTextValue);

    // Retirer la classe 'copy-icon'
    clipboard.classList.remove('copy-icon'); 

     // Ajouter la classe 'validate-icon'
    clipboard.classList.add('validate-icon');
    setTimeout(() => {
        clipboard.classList.remove('validate-icon');
        clipboard.classList.add('copy-icon');
    }, 2200);

    copyAlert.style.display = 'flex';
    setTimeout(() => {
        copyAlert.classList.add('fade-out');
      }, 2000);
}


addEventListener('DOMContentLoaded', init);