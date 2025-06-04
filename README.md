# Consulta CNPJ Avançada

Uma aplicação web simples para consulta de dados de CNPJ (Cadastro Nacional da Pessoa Jurídica) utilizando a API pública da ReceitaWS. O projeto foi desenvolvido com foco em um frontend moderno, responsivo e com otimizações de performance.

## Funcionalidades

- Consulta de informações de CNPJ em tempo real.
- Validação de formato do CNPJ no lado do cliente antes da consulta.
- Interface limpa e responsiva, construída com Tailwind CSS v4.
- Exibição organizada dos dados da empresa.
- Feedback visual para carregamento e erros.
- Funcionalidade de copiar valor do campo ao clicar.
- Melhorias de acessibilidade (ARIA live regions).

## Tecnologias Utilizadas

- HTML5
- CSS3 (com Tailwind CSS v4 e PostCSS para otimização)
- JavaScript (Vanilla)
- API: [ReceitaWS](https://receitaws.com.br/) (acessada via proxy CORS [corsproxy.io](https://corsproxy.io/))
- Node.js e npm para gerenciamento de dependências e build do CSS.
- Git e GitHub para versionamento.

## Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ScParis/cnpj-search-app.git
    cd cnpj-search-app
    ```

2.  **Instale as dependências do projeto:**
    Este projeto utiliza Node.js e npm para gerenciar as dependências de desenvolvimento (principalmente para o Tailwind CSS).
    ```bash
    npm install
    ```
    *Observação: Se você estiver em um sistema de arquivos que não suporta links simbólicos (como algumas configurações de drives externos ou WSL1), pode ser necessário usar `npm install --no-bin-links` como fizemos durante o desenvolvimento.*

3.  **Compile o CSS:**
    Para gerar o arquivo CSS otimizado pelo Tailwind CSS, execute o script de build:
    ```bash
    npm run build:css
    ```
    Isso irá processar `src/input.css` e gerar `dist/output.css`.

## Como Usar

Após a instalação e compilação do CSS:

1.  Abra o arquivo `index.html` diretamente no seu navegador de preferência.
2.  Digite um CNPJ válido no campo de busca.
3.  Clique no botão "Buscar Informações".
4.  Os dados da empresa serão exibidos abaixo do formulário.

## API

Este projeto utiliza a API pública [ReceitaWS](https://receitaws.com.br/) para obter os dados do CNPJ. Para contornar restrições de CORS (Cross-Origin Resource Sharing) em requisições diretas do navegador, as chamadas à API são feitas através do proxy público [corsproxy.io](https://corsproxy.io/).

## Estrutura do Projeto

```
.
├── dist/                # Arquivos de build (CSS otimizado)
│   └── output.css
├── src/                 # Arquivos fonte
│   └── input.css        # Arquivo CSS principal com Tailwind e estilos customizados
├── .gitignore           # Arquivos e pastas ignorados pelo Git
├── index.html           # Arquivo HTML principal da aplicação
├── package-lock.json    # Lockfile de dependências npm
├── package.json         # Definições do projeto e dependências npm
├── postcss.config.js    # Configuração do PostCSS
├── README.md            # Este arquivo
└── script.js            # Lógica JavaScript da aplicação
```

## Próximos Passos (Sugestões)

- Implementar um backend próprio para proxy da API, aumentando a segurança e confiabilidade.
- Adicionar mais testes unitários e de integração.
- Configurar CI/CD para automação de build e deploy.
