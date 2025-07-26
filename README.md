
# React Curriculum Render
Um serviço Server-Side Rendering (SSR) robusto e otimizado, construído com **React**, gerenciamento de estado via **Redux**, estilização com **SCSS** e focado na eficiência de dados através de uma **única requisição** à API.

-----

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias principais:

  * **React:** Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
  * **Redux:** Biblioteca para gerenciamento de estado global da aplicação, garantindo previsibilidade e facilidade de depuração.
  * **Server-Side Rendering (SSR):** Renderização inicial do React no servidor, proporcionando melhor performance de carregamento, SEO aprimorado e uma experiência de usuário mais rápida.
  * **Vite:** Otimiza o processo de desenvolvimento da aplicação como um todo.
  * **SCSS (Sass):** Pré-processador CSS que adiciona recursos como variáveis, mixins e aninhamento, tornando a estilização mais organizada e escalável.

-----

## Principais Características

  * **Performance Otimizada:** Graças ao SSR, as páginas carregam mais rapidamente e o conteúdo é visível quase instantaneamente.
  * **Gerenciamento de Estado Centralizado:** O Redux oferece uma arquitetura clara para lidar com o estado complexo da aplicação.
  * **Estilização Eficiente:** SCSS permite um desenvolvimento de estilos modular e de fácil manutenção.
  * **Economia de Largura de Banda:** A requisição única à API elimina o *overhead* de múltiplas chamadas HTTP, crucial para o plano gratuito do Vercel e para usuários com conexões limitadas.
  * **SEO Amigável:** Conteúdo já renderizado no HTML facilita a indexação por motores de busca.

-----

## Como Rodar o Projeto Localmente

Siga estes passos para configurar e executar o projeto em sua máquina:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

  * Node.js (versão LTS recomendada)
  * npm ou Yarn

### Instalação

1.  Clone este repositório:
    ```bash
    git clone https://github.com/blink992/react_curriculum_render.git
    cd react_curriculum_render
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000` (ou outra porta disponível).

-----

## 💡 Estrutura do Projeto

```
react-curriculum-render/
├── src/
│   ├── components/         # Componentes React reutilizáveis
│   ├── features/           # Componentes que interagem com o Redux, isto é, tem estado global
│   ├── static/             # Arquivos SCSS globais e de componentes
│   │   └── scss/
│   │       ├── partials/   # Partials do SCSS
│   │       └── main.scss   # Arquivo main do SCSS que importa todos os partials
│   ├── types/              # Tipos TypeScript, tipam os objetos retornados pela API de dados
│   ├── App.tsx             # Componente principal da aplicação
|   ├── custom.d.ts         # Arquivo de declaração de tipos
|   ├── store.ts            # Store do redux
│   └── main.tsx            # Ponto de entrada do cliente
├── package.json            # Dependências e scripts do projeto
└── README.md
```

-----

## 🤝 Contribuição

Contribuições são bem-vindas\! Se você tiver sugestões, encontrou um bug ou quer adicionar um recurso:

1.  Faça um fork do projeto.
2.  Crie uma nova branch (`git checkout -b feature/minha-feature`).
3.  Faça suas alterações e commit (`git commit -am 'feat: Adiciona nova funcionalidade X'`).
4.  Envie para a branch (`git push origin feature/minha-feature`).
5.  Abra um Pull Request.

-----

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE.md) para mais detalhes.

-----

## 📫 Contato

Pedro Arthur Gregório Abreu - pedro.agb2004@gmail.com

Link do Projeto: `https://react-curriculum-render-api.vercel.app/`

-----
