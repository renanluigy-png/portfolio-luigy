# Portfólio — Luigy Renan

Portfólio pessoal criado para apresentar meu perfil, habilidades e projetos de desenvolvimento. O site reúne projetos pessoais e demonstrações, com navegação por seções e layout adaptável a diferentes tamanhos de tela.

## Autor

**Luigy Renan**  
GitHub: [@renanluigy-png](https://github.com/renanluigy-png)

## Acesse o site

Após ativar o GitHub Pages, o portfólio ficará disponível em:

**https://renanluigy-png.github.io/portfolio-luigy/**

Repositório: https://github.com/renanluigy-png/portfolio-luigy

## Descrição e funcionamento

O portfólio apresenta as seguintes seções:

- **Perfil:** apresentação pessoal e área de interesse.
- **Projetos:** cards com descrições, tecnologias e links para repositórios ou demonstrações.
- **Habilidades:** tecnologias presentes nos projetos.
- **Contato:** acesso ao GitHub e ao Linktree.
- **Menu de navegação:** atalhos para as seções do site.

O arquivo `index.html` organiza o conteúdo. O `style.css` define identidade visual, layout responsivo, transições e animações. O `script.js` controla o filtro dos projetos, as animações de entrada, o menu mobile e a atualização automática do ano no rodapé.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Bootstrap Icons
- Git e GitHub

O Bootstrap e os ícones são carregados por CDN, portanto precisam de conexão com a internet para serem exibidos.

## Recurso novo adicionado

**Filtro interativo de projetos e animações de entrada ao rolar a página.**

O visitante pode filtrar os projetos pelas categorias **Todos**, **Web**, **Aplicações** e **Profissional**, sem recarregar a página. Além disso, os elementos aparecem com uma transição suave quando entram na área visível da tela.

### Como o recurso foi implementado

1. Cada card recebeu o atributo `data-category`, que identifica suas categorias.
2. Os botões possuem o atributo `data-filter`. Um evento de clique em JavaScript compara a categoria selecionada com as categorias de cada card e mostra ou oculta os projetos.
3. A classe `is-active` e o atributo `aria-pressed` indicam o filtro selecionado, inclusive para tecnologias assistivas.
4. Para as animações, o JavaScript utiliza a API `IntersectionObserver` para detectar quando um elemento com a classe `reveal` entra na área visível e adiciona a classe `is-visible`, que ativa a transição definida no CSS.
5. A folha de estilos respeita a preferência de redução de movimento do sistema (`prefers-reduced-motion`).

## Estrutura de arquivos

```text
portfolio-luigy/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Publicação no GitHub Pages

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch **main** e a pasta **/(root)**.
4. Clique em **Save**.
5. Aguarde a publicação e acesse o endereço indicado na seção **Acesse o site**.
