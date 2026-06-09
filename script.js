document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SISTEMA DE ACESSIBILIDADE FLUTUANTE
    // ==========================================================================
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    const btnTtsStart = document.getElementById('btn-tts-start');
    const btnTtsStop = document.getElementById('btn-tts-stop');

    let currentFontPercent = 100;

    // Aumento de Fonte
    btnIncreaseFont.addEventListener('click', () => {
        if (currentFontPercent < 130) {
            currentFontPercent += 7;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontPercent}%`);
        }
    });

    // Diminuição de Fonte
    btnDecreaseFont.addEventListener('click', () => {
        if (currentFontPercent > 85) {
            currentFontPercent -= 7;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontPercent}%`);
        }
    });

    // Alternar Tema Escuro / Claro
    btnToggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // ==========================================================================
    // 2. LEITURA POR VOZ (SpeechSynthesis API) REQUISITO EXCLUSIVO
    // ==========================================================================
    let synthUtterance = null;

    btnTtsStart.addEventListener('click', () => {
        // Cancela leituras anteriores ativas
        window.speechSynthesis.cancel();

        // Pega exclusivamente o texto estruturado do conteúdo principal
        const contentArea = document.getElementById('conteudo-principal');
        if (!contentArea) return;

        // Limpa leituras internas de botões ou elementos interativos para ler só o texto didático
        const textToRead = contentArea.innerText;

        synthUtterance = new SpeechSynthesisUtterance(textToRead);
        synthUtterance.lang = 'pt-BR';
        synthUtterance.rate = 1.0;

        window.speechSynthesis.speak(synthUtterance);
    });

    btnTtsStop.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });


    // ==========================================================================
    // 3. SEÇÕES EXPANSÍVEIS (ACCORDION INTERATIVO)
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isOpen = currentItem.classList.contains('active');

            // Fecha todos antes de abrir o atual (comportamento harmônico)
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                currentItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });


    // ==========================================================================
    // 4. CALCULADORA AGRONÔMICA DE GRÃOS
    // ==========================================================================
    const btnCalculate = document.getElementById('btn-calculate');
    const inputArea = document.getElementById('calc-area');
    const inputYield = document.getElementById('calc-yield');
    const displayResult = document.getElementById('calc-result');

    btnCalculate.addEventListener('click', () => {
        const area = parseFloat(inputArea.value) || 0;
        const yieldValue = parseFloat(inputYield.value) || 0;

        if (area <= 0 || yieldValue <= 0) {
            displayResult.textContent = "Erro: Digite valores maiores que zero.";
            return;
        }

        const totalSacas = area * yieldValue;
        // Formata número com separador de milhar nativo do Brasil
        const formattedResult = totalSacas.toLocaleString('pt-BR');
        displayResult.textContent = `Resultado: ${formattedResult} sacas estimadas totais.`;
    });


    // ==========================================================================
    // 5. DESAFIOS INTERATIVOS (QUIZ TECH)
    // ==========================================================================
    const quizOptions = document.querySelectorAll('.quiz-opt');
    const quizFeedback = document.getElementById('quiz-feedback');

    quizOptions.forEach(button => {
        button.addEventListener('click', () => {
            const isCorrect = button.getAttribute('data-correct') === 'true';

            // Desabilita opções após a escolha do leitor
            quizOptions.forEach(opt => opt.disabled = true);

            if (isCorrect) {
                button.style.backgroundColor = "#546959";
                button.style.color = "#FFFFFF";
                quizFeedback.textContent = "Excelente! Resposta correta baseada nos dados oficiais de 2024 da CNA.";
                quizFeedback.style.color = "var(--color-primary-green)";
            } else {
                button.style.backgroundColor = "var(--color-accent-orange)";
                button.style.color = "#FFFFFF";
                quizFeedback.textContent = "Resposta incorreta. A taxa registrada em 2024 foi de 23,2%.";
                quizFeedback.style.color = "var(--color-accent-orange)";
            }
        });
    });


    // ==========================================================================
    // 6. MURAL DE COMENTÁRIOS E FRASES DO AGRO
    // ==========================================================================
    const btnSendComment = document.getElementById('btn-send-comment');
    const txtComment = document.getElementById('txt-comment');
    const muralComments = document.getElementById('mural-comments');

    btnSendComment.addEventListener('click', () => {
        const commentContent = txtComment.value.trim();

        if (commentContent === "") {
            alert("Por favor, digite alguma frase antes de enviar!");
            return;
        }

        // Criando elemento dinâmico de comentário com segurança básica contra injeções
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        
        const userStrong = document.createElement('strong');
        userStrong.textContent = "Leitor_Conectado: ";
        
        const textSpan = document.createElement('span');
        textSpan.textContent = commentContent;

        newComment.appendChild(userStrong);
        newComment.appendChild(textSpan);
        
        // Adiciona no topo do mural para melhor feedback visual
        muralComments.insertBefore(newComment, muralComments.firstChild);
        
        // Limpa o campo
        txtComment.value = "";
    });


    // ==========================================================================
    // 7. FORMULÁRIO DE INSCRIÇÃO PREMIUM
    // ==========================================================================
    const registerForm = document.getElementById('agro-register-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita o reload clássico de página
        
        const name = document.getElementById('reg-name').value;
        const city = document.getElementById('reg-city').value;
        
        alert(`Inscrição de ${name} realizada com pleno sucesso! Bem-vindo ao ecossistema digital de ${city}.`);
    });

    // Ação simples no CTA secundário do curso inferior
    const btnCourseCta = document.getElementById('btn-course-cta');
    btnCourseCta.addEventListener('click', () => {
        document.getElementById('reg-name').focus();
        alert("Utilize o painel de cadastro ao lado para garantir sua pré-inscrição gratuita.");
    });
});