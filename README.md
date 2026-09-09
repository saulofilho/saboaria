# 🌿 Ateliê Botânico — Saboaria Artesanal, Cursos & Gestão CMS

Uma aplicação web completa e imersiva para um ateliê de saboaria botânica artesanal, unindo comércio eletrônico com fórmulas naturais, personalizador sob medida de barras, guias fitoterápicos, escola de saboaria com tutoriais em vídeo e um **Painel Administrativo (CMS)** equipado com visualizações de estoque e vendas via **Recharts**.

---

## ✨ Funcionalidades Principais

### 🛍️ 1. Vitrine & Catálogo Botânico Interativo
- **Filtros Fitoterápicos:** Navegação por categorias (*Fitoterápico*, *Aromaterapia*, *Esfoliante*, *Cabelos*, *Argilas & Minerais*, *Hidratação Profunda*).
- **Filtro por Tipo de Pele & Processo:** Seleção por necessidade dérmica (pele sensível, seca, oleosa, mista, etc.) e técnica de cura (*Cold Process*, *Hot Process*, *Glicerina Vegetal*).
- **Ficha Técnica Detalhada:** Composição botânica completa, semanas de cura, notas olfativas, benefícios medicinais e modo de uso.
- **Carrinho de Compras Integrado:** Cálculo de subtotal, controle de quantidade e checkout intuitivo.

### 🧼 2. Personalizador de Barras Sob Medida (*Soap Builder*)
- Ferramenta exclusiva que permite ao cliente desenhar sua própria barra de sabão natural em 6 etapas:
  1. Seleção de óleos e manteigas vegetais base (Oliva, Coco, Karité, Rícino, Amêndoas doces).
  2. Essência e perfil de aroma com regulagem de intensidade.
  3. Corantes botânicos e argilas minerais puras.
  4. Aditivos e botânicos esfoliantes (flores de calêndula, sementes de papoula, café moído, aveia coloidal).
  5. Formato físico e gravação de carimbo personalizado.
  6. Embalagem sustentável (papel kraft, tecido cru ou juta com ráfia).
- Cálculo dinâmico de peso e preço em tempo real com envio direto para o carrinho.

### 📊 3. Painel Administrativo CMS & Visão Geral de Vendas (*Sales Overview*)
Acesso restrito para mestres saboeiros e gestores do ateliê para controle do catálogo:
- **Autenticação Administrativa:** Login seguro com persistência de sessão e feedback visual no cabeçalho.
- **Visão Geral de Vendas & Estoque (Gráficos com Recharts):**
  - **Níveis de Estoque por Produto:** Gráfico de barras responsivo com linha de referência de segurança (10 un.), identificação de produtos zerados e alternância dinâmica entre unidades em estoque e valor bruto potencial em reais (R$).
  - **Distribuição do Catálogo:** Gráfico de rosca (*donut chart*) interativo com proporções do mix de produtos por categoria botânica e por processo de saponificação (*Cold Process* vs. *Hot Process* vs. *Glicerina*).
  - **Métricas de Faturamento Potencial:** Cálculo do valor total estimado do lote atual em estoque (R$), ticket médio por barra, taxa de saúde do estoque e contagem de itens em atenção.
- **Gestão de Produtos (CRUD Completo):**
  - Criação de novas formulações com suporte a badges (*Bestseller*, *Lançamento*, *Edição Limitada*).
  - Edição de preços, descrições, estoques e propriedades dermatológicas.
  - Duplicação instantânea de produtos existentes para rápida variação de fórmulas.
  - Ajuste rápido de estoque (+ / -) direto na tabela.
  - Exclusão segura com diálogo de confirmação.
- **Backup & Portabilidade de Dados:**
  - Exportação do catálogo completo em arquivo JSON.
  - Importação de catálogos via upload de arquivo JSON.
  - Botão de restauração aos dados originais de fábrica do ateliê.

### 🔬 4. Guia Botânico & Calculadora de Saponificação (SAP)
- Consulta do valor de saponificação (KOH e NaOH) para óleos nobres.
- Dicionário com propriedades cosméticas de manteigas amazônicas, óleos essenciais puros e argilas terapêuticas.
- Modal com calculadora SAP interativa para formular lotes equilibrados de sabão artesanal.

### 🎓 5. Escola de Saboaria & Tutoriais em Vídeo
- Trilhas de aprendizado para iniciantes: segurança com soda cáustica, controle de traço (*trace*), tempo de cura e corte artesanal.
- Galeria de tutoriais com vídeos passo a passo catalogados por categoria e nível de experiência.

---

## 🔑 Credenciais de Acesso ao Painel CMS

Para acessar o painel administrativo, clique no botão **"Admin CMS"** na barra de navegação superior (ou no rodapé):

| Campo | Valor |
| :--- | :--- |
| **E-mail / Usuário** | `admin@ateliebotanico.com.br` |
| **Senha** | `admin123` |

*Também é possível clicar no botão de demonstração rápida no próprio modal de login.*

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com paleta rústica botânica (`#2C2723`, `#5C6B47`, `#D4A373`, `#FAF7F2`)
- **Visualização de Dados:** [Recharts](https://recharts.org/) (Gráficos de barras, rosca/donut, tooltips customizadas e linhas de referência)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Animações & Efeitos:** [Motion](https://motion.dev/) e [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Persistência:** LocalStorage com sincronização reativa de catálogo e sessão administrativa

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm`

### Passo a passo
1. **Clonar o repositório ou abrir o projeto:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd atelie-botanico
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:3000`.

4. **Compilar para produção:**
   ```bash
   npm run build
   ```

5. **Executar verificação de tipos e lint:**
   ```bash
   npm run lint
   ```

---

## 📁 Estrutura do Projeto

```text
├── index.html                   # Ponto de entrada HTML com metadados SEO
├── metadata.json                # Metadados e permissões da aplicação
├── package.json                 # Dependências e scripts de execução
├── vite.config.ts               # Configuração do Vite e plugins
└── src/
    ├── main.tsx                 # Entrada React
    ├── App.tsx                  # Componente raiz, estados globais e rotas de abas
    ├── types.ts                 # Tipagens completas (SoapProduct, CustomOrder, etc.)
    ├── components/
    │   ├── Navbar.tsx           # Navegação principal com gatilho do CMS e carrinho
    │   ├── HeroSection.tsx      # Seção de destaque e chamada para ação
    │   ├── ProductCatalog.tsx   # Vitrine com filtros botânicos e busca
    │   ├── ProductCard.tsx      # Cartão de produto com badges e preço
    │   ├── ProductDetailModal.tsx # Ficha técnica e benefícios botânicos
    │   ├── CustomSoapBuilder.tsx# Personalizador de barras sob medida
    │   ├── IngredientsGuide.tsx # Guia fitoterápico de matérias-primas
    │   ├── SoapCalculatorModal.tsx # Calculadora de índice de saponificação (SAP)
    │   ├── OnlineClasses.tsx    # Cursos e workshops de saboaria
    │   ├── VideoTutorials.tsx   # Aulas práticas em vídeo
    │   ├── ReviewsSection.tsx   # Depoimentos e avaliações de clientes
    │   ├── CartDrawer.tsx       # Gaveta lateral do carrinho e checkout
    │   ├── BotanicalTipOfDay.tsx# Dica diária botânica com atalhos
    │   ├── Footer.tsx           # Rodapé institucional e links rápidos
    │   ├── AdminLoginModal.tsx  # Autenticação do gestor do ateliê
    │   ├── AdminCmsDashboard.tsx# Painel CMS completo de gestão e métricas
    │   ├── SalesOverviewSection.tsx # Seção Recharts (gráficos de estoque e vendas)
    │   └── ProductFormModal.tsx # Formulário de cadastro/edição de produtos
    ├── data/
    │   └── mockData.ts          # Catálogo inicial padrão de fórmulas botânicas
    └── utils/
        ├── authStorage.ts       # Gerenciamento de credenciais e sessão admin
        └── productStorage.ts    # Persistência e backup JSON de produtos
```

---

## 🌿 Licença & Créditos

Desenvolvido para o **Ateliê Botânico — Saboaria Artesanal**. Todos os direitos reservados.
Fórmulas e conteúdos botânicos inspirados em técnicas tradicionais de saboaria natural a frio (*Cold Process*) e fitoterapia.
