document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do botão e do ícone
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Função para atualizar o ícone dependendo da classe presente no body
    function syncIcon() {
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️'; // Mostra o sol se estiver no modo escuro
        } else {
            themeIcon.textContent = '🌙'; // Mostra a lua se estiver no modo claro
        }
    }

    // Ajusta o ícone inicial correto sem rodar animação
    syncIcon();

    // Evento acionado ao clicar no botão de tema
    themeToggleBtn.addEventListener('click', () => {
        // 1. Inicia a animação de rotação/encolhimento do ícone
        themeIcon.classList.add('rotate');

        // 2. Troca o tema e o ícone na metade do tempo da animação (200ms)
        setTimeout(() => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            // Salva a escolha do usuário no navegador
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            syncIcon();
        }, 200);

        // 3. Remove a classe de animação após a rotação completa (400ms)
        setTimeout(() => {
            themeIcon.classList.remove('rotate');
        }, 400);
    });

    // Escuta mudanças de tema do sistema operacional em tempo real
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Altera automaticamente apenas se o usuário não escolheu um tema manualmente
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            syncIcon();
        }
    });
});