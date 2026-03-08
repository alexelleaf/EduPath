// Flash Card Page Turn
function turnPage(card) {
    card.classList.toggle('turned');
}

// Text Input Exercise Validation
function checkTextAnswer(button, correctAnswers) {
    const exerciseItem = button.closest('.exercise-item');
    const input = exerciseItem.querySelector('.answer-input');
    const showAnswerBtn = exerciseItem.querySelector('.show-answer-btn');
    const correctAnswerDiv = exerciseItem.querySelector('.correct-answer');
    
    const userAnswer = input.value.trim().toLowerCase();
    const isCorrect = correctAnswers.some(answer => answer.toLowerCase() === userAnswer);
    
    if (isCorrect) {
        input.classList.remove('incorrect');
        input.classList.add('correct');
        showAnswerBtn.classList.remove('visible');
        correctAnswerDiv.classList.remove('visible');
    } else {
        input.classList.remove('correct');
        input.classList.add('incorrect');
        showAnswerBtn.classList.add('visible');
    }
}

function showCorrectAnswer(button) {
    const exerciseItem = button.closest('.exercise-item');
    const correctAnswerDiv = exerciseItem.querySelector('.correct-answer');
    correctAnswerDiv.classList.toggle('visible');
}

// Multiple Choice Exercise
function selectOption(option) {
    const container = option.closest('.multiple-choice-options');
    const allOptions = container.querySelectorAll('.choice-option');
    
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    option.classList.add('selected');
}

function validateMultipleChoice(button) {
    const exerciseItem = button.closest('.exercise-item');
    const selectedOption = exerciseItem.querySelector('.choice-option.selected');
    
    if (!selectedOption) {
        alert('Пожалуйста, выберите вариант ответа');
        return;
    }
    
    const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
    
    if (isCorrect) {
        selectedOption.classList.remove('incorrect');
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.remove('correct');
        selectedOption.classList.add('incorrect');
    }
}

// Donate Modal
function showDonateModal() {
    document.getElementById('donateModal').style.display = 'block';
}

function closeDonateModal() {
    document.getElementById('donateModal').style.display = 'none';
}

function selectDonate(amount) {
    alert(`Спасибо! Вы выбрали сумму ${amount} ₽. Здесь будет интеграция с платёжной системой.`);
    closeDonateModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('donateModal');
    if (event.target === modal) {
        closeDonateModal();
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
