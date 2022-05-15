/* Usa D3.js para criar um gráfico de barras da população brasileira por estado e por região */
// 1) Lendo dados ------------------------------------------------
// JSON
const regioes = d3.json("populacao_por_regiao.json");
// CSV
const estados = d3.csv("populacao_por_estado.csv"); 

// 2) medidas padronizadas -----------------------------------------
const margem = {
    superior:10, inferior:90,
    direita:0, esquerda:90
}
const altura = 500 - margem.superior - margem.inferior;
const largura = 960 - margem.esquerda - margem.direita;

// 3) adiciona um objeto svg -----------------------------------------
const svg = d3.select("#grafico")
  .append("svg")
    .attr("width", largura + margem.esquerda + margem.direita)
    .attr("height", altura + margem.superior + margem.inferior)
  .append("g")
    .attr("transform", `translate(${margem.esquerda},${margem.superior})`);

// 4) para cada valor -----------------------------------------
estados.then((data)=>{
    
// 5) Configura Eixo X -----------------------------------------
const x = d3.scaleBand()
  .range([ 0, largura ])
  .domain(data.map(d => d.nome))
  .padding(0.1);

// 6) Plota Eixo X -----------------------------------------
svg.append("g")
  .attr("transform", `translate(0, ${altura})`)
  .call(d3.axisBottom(x))
  .selectAll("text").attr('font-size','12px')
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// 7) Configura Eixo Y -----------------------------------------
const y = d3.scaleLinear()
  .domain([0, d3.max(data.map(d => +d.populacao))])
  .range([ altura, 0]);

// 8) Plota Eixo Y -----------------------------------------  
svg.append("g")
  .call(d3.axisLeft(y));

// 9) cria cada barra ----------------------------------------- 
svg.append('g')
  .attr('class','barras')
  .selectAll(".barra")
  .data(data)
  .join("rect")
    .attr('class','barra')
    .attr("x", d => x(d.nome))
    .attr("y", d => y(d.populacao))
    .attr("width", x.bandwidth())
    .attr("height", d => altura - y(d.populacao))
    .attr("fill", "orange")
})