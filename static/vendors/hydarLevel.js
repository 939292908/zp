
import * as d3 from 'd3v4';
var hydraLevel = (function (module) {
  var graph = {},
    opt = {
      selector: '#hydraLevel',
      width: 960,
      height: 600,
      initScale: 1,
      tagClick: function () { },
      linkMouseOver: function () { },
      linkMouseLeave: function () { },
      linkDbClick: function () { },
      nodeClick: function () { },
      completed: function () { },
    },
    svg,
    container,
    node,
    nodeData;

  function init(data) {
    nodeData = data;
    var zoom = d3.zoom()
      .duration(150)
      .scaleExtent([.1, 2])
      .extent([[-1, -1], [opt.width + 1, opt.height + 1]])
      .on("zoom", zoomed);

    svg = d3.select(opt.selector)
      .append("svg")
      .attr('width', opt.width)
      .attr('height', opt.height)
      .append('g')
      .call(zoom)
      .on('dblclick.zoom', null);

    var thatZoom = svg._groups[0][0].__zoom;
    thatZoom.x = 0;
    thatZoom.y = 0;
    thatZoom.k = 1;

    var zoomOverlay = svg.append('rect')
      .attr('width', opt.width)
      .attr('height', opt.height)
      .style('fill', 'none')
      .style('pointer-events', 'all');

    container = svg.append('g')
      .attr('transform', 'scale(' + opt.initScale + ')')
      .attr('class', 'container');
  }
  function initRadrawBox() {
    nodeGroup = container.append("g")
      .attr("class", "nodes");
  }
  function render() {
    if (nodeData.length == 0) return;
    drawNode();
  }
  function drawNode() {
    node = nodeGroup.selectAll('g.node').attr('class', 'node').data(nodeData);
    node.exit().remove();
    node = node.enter().append('g')
      .attr("class", "node")
      .attr('id', node => 'node-' + node.id)
      .merge(node);
    var nodeType = node.append('rect')
      .attr('width', 17)
      .attr('height', 17)
      .attr('rx', 3)
      .attr('ry', 3)
    node.append('text')

  }
  // 初始化
  graph.init = function (data) {
    init(data)
  }

})();
export default hydraLevel;