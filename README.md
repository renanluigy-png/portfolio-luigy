# Portfólio — Luigy Renan

Portfólio pessoal para apresentar meu perfil, minha experiência, formação, competências técnicas e projetos em desenvolvimento web, sistemas e inteligência artificial.

## Acesso

- **Site:** https://renanluigy-png.github.io/portfolio-luigy/
- **Repositório:** https://github.com/renanluigy-png/portfolio-luigy
- **GitHub:** https://github.com/renanluigy-png

## Sobre o projeto

O site foi desenvolvido com HTML, CSS, JavaScript e Bootstrap. O conteúdo está organizado em seções:

- **Perfil:** apresentação e áreas de interesse.
- **Experiência:** atuação como Auxiliar de Escritório na Cortez Móveis em 2026 e atividades relacionadas a suporte de TI, sistemas internos, infraestrutura e rotinas administrativas.
- **Projetos:** seleção de projetos pessoais, com descrições, tecnologias e links disponíveis.
- **Competências:** ferramentas e conhecimentos técnicos.
- **Formação:** curso Técnico em Desenvolvimento de Sistemas (cursando), Ensino Médio e cursos complementares.
- **Contato:** e-mail, GitHub e Linktree.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Bootstrap Icons
- Google Fonts
- Git e GitHub

O Bootstrap, os ícones e as fontes são carregados por CDN.

## Identidade visual e efeitos

A interface utiliza uma paleta monocromática (preto, branco e tons de cinza), composição editorial, tipografia de alto contraste, textura sutil, navegação translúcida e cartões com profundidade. Os efeitos incluem barra de progresso de leitura, iluminação difusa que acompanha o cursor, perspectiva sutil nos cartões e animações de entrada. Os efeitos de ponteiro são limitados a dispositivos compatíveis e respeitam a preferência por movimento reduzido.

## Recurso adicional implementado

O portfólio possui **filtros interativos para os projetos**, **animações de entrada**, **interações 3D nos cartões**, **iluminação dinâmica**, **cursor personalizado para desktop**, **efeitos magnéticos nos botões** e uma **cortina de abertura animada**.

### Como funciona

- Cada cartão de projeto possui categorias definidas em `data-category`.
- Os botões de filtro usam `data-filter` para selecionar a categoria.
- O JavaScript compara a categoria escolhida com as categorias dos cartões e exibe somente os itens correspondentes, sem recarregar a página.
- A API `IntersectionObserver` identifica quando os elementos entram na área visível e adiciona a classe `is-visible`, que ativa as transições definidas no CSS. Nos computadores, o cursor cria uma lente de luz e os cartões respondem à posição do ponteiro com inclinação 3D, brilho localizado e reflexo animado. Os botões têm deslocamento magnético limitado, a navegação destaca a seção atual e a abertura usa uma cortina curta de apresentação. Esses efeitos são desativados ou reduzidos em dispositivos sem ponteiro preciso e quando o usuário prefere movimento reduzido.
- A preferência do navegador por movimento reduzido é respeitada por meio de `prefers-reduced-motion`.

## Estrutura de arquivos

```text
portfolio-luigy/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Funcionamento

O arquivo `index.html` contém a estrutura e o conteúdo das seções. O `style.css` define a identidade visual, os componentes, o layout responsivo e as transições. O `script.js` controla os filtros de projetos, as animações de entrada, a navegação compacta e a cópia do e-mail.

Os projetos possuem links para seus repositórios ou demonstrações quando disponíveis. O chatbot de atendimento com IA é apresentado conforme a descrição do currículo, sem atribuir a ele um repositório não identificado.

## Autor

**Luigy Renan**  
[GitHub](https://github.com/renanluigy-png) · [Linktree](https://linktr.ee/Luigy.Renan)
