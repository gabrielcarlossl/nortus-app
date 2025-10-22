const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova funcionalidade
        'fix',      // Correção de bug
        'docs',     // Documentação
        'style',    // Formatação, ponto e vírgula, etc
        'refactor', // Refatoração de código
        'perf',     // Melhoria de performance
        'test',     // Adição de testes
        'chore',    // Tarefas de manutenção
        'ci',       // Integração contínua
        'build',    // Sistema de build
        'revert',   // Reverter commit anterior
      ],
    ],
    'subject-case': [0], // Permite qualquer case no subject
  },
};

export default config;
