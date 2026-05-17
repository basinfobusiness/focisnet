document.addEventListener('DOMContentLoaded', () => {
    function computeScore() {
        const correctIndices = {
            question1: 2,
            question2: 0,
            question3: 1,
            question4: 2,
            question5: 3,
            question6: 0
        };
        let score = 0;
        const radioInputs = Array.from(document.querySelectorAll('input[type="radio"]'));
        const questionNames = Array.from(new Set(radioInputs.map(i => i.name))).filter(n => n && n.startsWith('question'));
        questionNames.forEach(q => {
            const inputs = Array.from(document.querySelectorAll(`input[name="${q}"]`));
            const checkedIndex = inputs.findIndex(i => i.checked);
            if (checkedIndex !== -1 && correctIndices[q] !== undefined) {
                if (checkedIndex === correctIndices[q]) score++;
            }
        });
        return { score, total: questionNames.length };
    }

    const finishButton = document.getElementById('finishBtn');
    function updateFinishButtonState() {
        const collapse = document.getElementById('questionNextCollapse');
        if (finishButton) {
            finishButton.disabled = !(collapse && collapse.classList.contains('show'));
        }
    }

    updateFinishButtonState();

    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const { score, total } = computeScore();
            alert(`Your score is: ${score}/${total}`);
        });
    } else {
        const nextBtn = document.querySelector('.btn-primary');
        function updateNextButtonLabel() {
            const collapse = document.getElementById('questionNextCollapse');
            if (nextBtn && collapse) {
                nextBtn.textContent = collapse.classList.contains('show') ? 'Submit' : 'Next';
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const { score, total } = computeScore();
                alert(`Your score is: ${score}/${total}`);
                const collapse = document.getElementById('questionNextCollapse');
                if (collapse && !collapse.classList.contains('show')) {
                    collapse.classList.add('show');
                }
                if (finishButton) {
                    finishButton.disabled = false;
                }
                updateFinishButtonState();
                updateNextButtonLabel();
            });
        }

        const prevBtn = document.querySelector('.btn-outline-primary');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const collapse = document.getElementById('questionNextCollapse');
                if (collapse && collapse.classList.contains('show')) {
                    collapse.classList.remove('show');
                }
                updateFinishButtonState();
                updateNextButtonLabel();
            });
        }
    }

    function renumberQuestions() {
        const cards = Array.from(document.querySelectorAll('#questionsContainer .card'));
        cards.forEach((card, index) => {
            const title = card.querySelector('.card-title');
            if (!title) return;
            title.textContent = title.textContent.replace(/^Question\s*\d+:/, `Question ${index + 1}:`);
        });
    }

    if (finishButton) {
        finishButton.addEventListener('click', () => {
            const container = document.getElementById('questionsContainer');
            if (!container) return;
            const cards = Array.from(container.querySelectorAll('.card'));
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
            cards.forEach(c => container.appendChild(c));
            renumberQuestions();
            // Reset all radio selections after finishing
            const radios = Array.from(container.querySelectorAll('input[type="radio"]'));
            radios.forEach(r => { r.checked = false; });
        });
    }
});