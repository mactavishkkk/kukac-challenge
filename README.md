# Projeto

Este é um projeto construído com ReactJS 18, Axios, Tailwind 3.4.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)
- Ferramenta de versionamento: [Instalação do Git](https://git-scm.com/)

### OBS:

Além dos requisitos acima, você precisará da **API** para este aplicativo rodando em sua estação. Você poderá encontrar isto facilmente aqui: [kukac-challeng-api](https://github.com/mactavishkkk/kukac-challenge-api).

## Como executar

1. Clone o repositório:

```bash
git clone git@github.com:mactavishkkk/kukac-challenge.git
```

2. Navegue até o diretório dos arquivos de construção:

```bash
cd kukac-challenge
```

3. Construa as imagens para os ambientes com docker, no terminal use:

```bash
docker compose build
```

4. Agora basta subir elas com:

```bash
docker compose up -d
```

5. Pronto, agora você já poderá acessar a rota de boas vindas em seu navegador:

```bash
https://localhost:3002/
```

---