import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'; // Importamos la librería D3.js

@Component({
  selector: 'app-statics-list',
  templateUrl: './statics-list.component.html',
  styleUrls: ['./statics-list.component.scss']
})
export class StaticsListComponent implements OnInit {
  data: any[] = []; // Datos que vamos a cargar desde el JSON

  constructor() {}

  ngOnInit(): void {
    // Cargar los datos desde un archivo JSON
    this.loadData();
  }

  // Función para cargar los datos del archivo JSON
  loadData(): void {
    d3.json('./D3/data.json').then((data: any) => {
      this.data = data.foods;  // Almacenamos los datos de 'foods' en la propiedad
      this.createChart(); // Creamos el gráfico
    });
  }

  // Función para crear el gráfico de barras
  createChart(): void {
    const svg = d3.select('svg'); 
    const margin = { top: 20, right: 30, bottom: 80, left: 40 };  // Aumentamos el margen inferior
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const tooltip = d3.select('#tooltip');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Escalas para el gráfico
    const x = d3.scaleBand()
      .domain(this.data.map(d => d.name))  // Usamos 'name' para el eje X
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.popularity)])  // Usamos 'popularity' para el eje Y
      .nice()
      .range([height, 0]);

    // Añadir las barras al gráfico
    g.append('g')
      .selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name) || 0)  // Aseguramos que 'x' tenga un valor numérico válido
      .attr('y', d => y(d.popularity) || 0)  // Aseguramos que 'y' tenga un valor numérico válido
      .attr('width', x.bandwidth())  // Ancho de la barra
      .attr('height', d => height - (y(d.popularity) || 0))  // Aseguramos que 'height' tenga un valor numérico válido
      .attr('fill', 'steelblue')
      .on('mouseover', (event: MouseEvent, d) => {
        d3.select(event.currentTarget as SVGRectElement)
          .attr('fill', 'orange');
      
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
      
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          <em>${d.category}</em><br/>
          Origen: ${d.origin}<br/>
          Popularidad: ${d.popularity}<br/>
          <small>${d.description}</small>
        `);
      })
      .on('mousemove', (event: MouseEvent) => {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', (event: MouseEvent) => {
        d3.select(event.currentTarget as SVGRectElement)
          .attr('fill', 'steelblue');
      
        tooltip.transition()
          .duration(300)
          .style('opacity', 0);
      })
      
      .on('click', (event, d) => {
        alert(`You clicked on ${d.name}, popularity: ${d.popularity}`);
      });

    // Eje X
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')  // Seleccionamos todas las etiquetas de texto
      .style('text-anchor', 'middle')  // Centrar el texto
      .style('font-size', '12px')  // Ajustamos el tamaño de la fuente
      .attr('transform', 'rotate(-45)')  // Rotamos las etiquetas a -45 grados
      .attr('dx', '-0.8em')  // Desplazamos un poco el texto horizontalmente
      .attr('dy', '0.5em');  // Desplazamos un poco el texto verticalmente

    // Eje Y
    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    // Etiquetas de los ejes
    g.selectAll('.x-axis text')
      .style('text-anchor', 'middle')
      .style('font-size', '12px');

    g.selectAll('.y-axis text')
      .style('font-size', '12px');
  }
}
