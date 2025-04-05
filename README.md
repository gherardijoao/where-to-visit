# Diwo Frontend - ChallengeLugares Que Quero Conhecer

Um aplicativo React para gerenciar lugares que você deseja conhecer ao redor do mundo.

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio frontend. Ele permite que o usuário crie, leia, atualize e exclua lugares que deseja conhecer ao redor do mundo, com um simples e intuitivo sistema de CRUD.

### Funcionalidades

- **Adicionar** novos lugares com país, local e meta de data (mês/ano)
- **Visualizar** lugares em um layout de cards
- **Editar** informações de lugares já adicionados
- **Excluir** lugares da lista
- **Pesquisar** países pelo nome

### Tecnologias Utilizadas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON%20Server-000000?style=for-the-badge&logo=json&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Input Mask](https://img.shields.io/badge/React%20Input%20Mask-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vitest](https://img.shields.io/badge/Vitest-6E4C85?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/-Testing%20Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

- **React** com **TypeScript** para construção da interface
- **Framer Motion** responsável pelas animações fluidas
- **JSON Server** como API REST simulada para persistência de dados
- **React Icons** para integração de ícones
- **React Input Mask** para validação de campos de data
- **Vitest** e **React Testing Library** para cobertura de testes

````markdown
## Como Executar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. **Obtenha o projeto** usando um destes métodos:
   ```bash
   # Via Git
   git clone https://github.com/gherardijoao/diwo
   cd diwo
   ```
````

- _Ou faça o download do ZIP_:  
  Clique no botão "Code" no repositório > "Download ZIP" e extraia o arquivo

2. Instale as dependências

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o JSON Server (em um terminal separado)

   ```bash
   npm run server
   # ou
   yarn server
   ```

4. Inicie a aplicação

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse `http://localhost:5173` no seu navegador

## Testes

A parte de testes cobre componentes críticos e funcionalidades principais:

### Execução de Testes

```bash
npm test
# ou
yarn test
```

### Monitoramento de Testes

Para acompanhamento interativo durante o desenvolvimento:

```bash
npx vitest --ui
```

## Layout Responsivo

O design segue rigorosamente o projeto original no Figma com adaptações fluidas para:

- Telas grandes (desktop)
- Tablets
- Dispositivos móveis

## Decisões Técnicas

1. **Arquitetura de Componentes**: Componentização atômica para melhor reuso e manutenção
2. **Gestão de Estado**: Uso estratégico de `useState` e `useContext` para compartilhamento eficiente de dados
3. **Persistência de Dados**: Integração com JSON Server para operações CRUD reais
4. **Validação Avançada**: Implementação de máscaras e validações customizadas nos formulários
5. **Animações Contextuais**: Transições suaves com Framer Motion para melhor UX
