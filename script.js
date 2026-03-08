// Flash Card Flip - Universal for all card types
function flipCard(card) {
    card.classList.toggle('flipped');
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
        
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
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
    
    // Clear all selections (even after validation)
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.classList.remove('correct');
        opt.classList.remove('incorrect');
    });
    
    option.classList.add('selected');
    
    // Hide explanation text when selecting new option
    const exerciseItem = container.closest('.exercise-item');
    const explanationText = exerciseItem.querySelector('.explanation-text');
    if (explanationText) {
        explanationText.classList.remove('visible');
    }
}

function validateMultipleChoice(button) {
    const exerciseItem = button.closest('.exercise-item');
    const selectedOption = exerciseItem.querySelector('.choice-option.selected');
    const explanationText = exerciseItem.querySelector('.explanation-text');
    
    if (!selectedOption) {
        button.style.animation = 'shake 0.5s';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
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
    
    // Show explanation automatically
    if (explanationText) {
        const explanation = selectedOption.getAttribute('data-explanation');
        explanationText.textContent = explanation;
        explanationText.classList.add('visible');
    }
}

// Donate Modal
function showDonateModal() {
    const modal = document.getElementById('donateModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDonateModal() {
    const modal = document.getElementById('donateModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectDonate(amount) {
    const event = window.event;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
        alert(`Thank you! You selected ${amount} ₽.`);
        closeDonateModal();
    }, 600);
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDonateModal();
    }
});

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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all blocks
document.querySelectorAll('.content-block, .examples-block, .flashcard, .mini-flashcard, .inline-flashcard-right').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
