# Consulta CNPJ Avançada

<<<<<<< HEAD
<!-- Adicione aqui uma breve descrição do seu projeto -->

## ✨ Funcionalidades

<!-- Liste as principais funcionalidades da aplicação -->
- Consulta de dados de CNPJ em tempo real.
- Interface limpa e responsiva.
- Validação de formato de CNPJ.
- Exibição detalhada dos dados da empresa.
- Tema claro e escuro.

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para temas)
- JavaScript (Vanilla)
- API da Receita Federal (via BrasilAPI ou similar - *especificar qual API está sendo usada*)

## ⚙️ Instalação e Uso

### Pré-requisitos

<!-- Liste quaisquer pré-requisitos, como Node.js, se aplicável -->
- Navegador web moderno.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ScParis/cnpj-search-app.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd cnpj-search-app
   ```
3. Abra o arquivo `index.html` no seu navegador.

<!-- Adicione quaisquer outras etapas de instalação ou build, se houver -->

### Uso

1. Abra a aplicação no seu navegador.
2. Digite o CNPJ desejado no campo de busca.
3. Clique no botão "Buscar Informações".
4. Os dados da empresa serão exibidos abaixo do formulário.

## 🎨 Temas

A aplicação possui um tema escuro (padrão) e um tema claro. Você pode alternar entre eles usando o botão no canto inferior direito da tela.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

<!-- Adicione instruções específicas para contribuição, se houver -->

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🐛 Reportando Problemas

Se encontrar algum problema ou bug, por favor, crie uma [issue](https://github.com/ScParis/cnpj-search-app/issues) detalhando o ocorrido.

## 👤 Autor

- **ScParis**
  - GitHub: [@ScParis](https://github.com/ScParis)

---

*Lembre-se de atualizar este README com informações mais precisas sobre a API utilizada e quaisquer outras especificidades do seu projeto.*
=======
Uma aplicação web simples para consulta de dados de CNPJ (Cadastro Nacional da Pessoa Jurídica) utilizando a API pública da ReceitaWS. O projeto foi desenvolvido com foco em um frontend moderno, responsivo e com otimizações de performance.

## Funcionalidades

- Consulta de informações de CNPJ em tempo real.
- Máscara automática de CNPJ (formato 00.000.000/0000-00).
- Validação completa do CNPJ (formato e dígitos verificadores).
- Interface limpa e responsiva, construída com Tailwind CSS v4.
- Exibição organizada dos dados da empresa.
- Feedback visual para carregamento e erros.
- Funcionalidade de copiar valor do campo ao clicar.
- Melhorias de acessibilidade (ARIA live regions).
- Código JavaScript otimizado e minificado para melhor performance.

## Tecnologias Utilizadas

- HTML5
- CSS3 (com Tailwind CSS v4 e PostCSS para otimização)
- JavaScript (Vanilla) com minificação via Terser
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

3.  **Compile os arquivos:**
    Para gerar o CSS otimizado pelo Tailwind CSS e minificar o JavaScript, execute o script de build:
    ```bash
    npm run build
    ```
    Isso irá:
    - Processar `src/input.css` e gerar `dist/output.css`.
    - Minificar `script.js` e gerar `dist/script.min.js`.

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
>>>>>>> 09ca1ff343f4b0d368e7f2ecb402c7160f5fed5a
