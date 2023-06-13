# suafrota

Repositório para o desenvolvimento de um aplicativo web na disciplina Projeto Aplicado 1,
no curso de Análise e Desenvolvimento de Sistemas do UNISENAI/SC em 2023-1.

O projeto é apresentar o MVP de um sistema para monitoramento de uma frota de veículos.

A idéia é que um aplicativo rodando no navegador de um smartphone seja capaz de monitorar
a geolocalização de um veículo enviando estes dados para um serviço de backend que com o
auxílio de um banco de dados é capaz de disponibilizar estes dados para que uma página
web estilo dashboard seja capaz de apresentar relatórios sobre os veículos.

Temos 3 sub-sistemas a serem desenvolvidos:

1. página web para coleta da geolocalização com o smartphone
2. servidor para gerenciar armazenamento e recuperação dos dados de geolocalização
3. página web para apresentação de relatórios

---

updates em 13/06/2023

1. adicionado o uso de uma api_key para limitar o acesso do backend
2. separando o frontend entre pag de login e pag de rastreio
3. adicionado o envio e o recebimento de dados para/de uma API
