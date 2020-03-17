import * as d3 from 'd3v4';
var hydraCircle = (function () {
  var graph = {},
    opt = {
      selector: '#hydraCircle',
      width: 960,
      height: 600,
      initScale: 1,
      lineColor: "#9A9A9A",
      empliseColor: "#009AED",
      icon: 'M841.1 531.3L511.9 284.5 182.8 531.3V858H75.9v101.8h874.9V858H841.1V531.3zM512 64.1L73.1 404.8v138.9l438.8-340.6 438.9 340.6 0.1-138.9L512 64.1z',
      paths: {
        '户': 'M116.9,971l-67.8-62C122.7,803.5,160.4,667,161.4,500.4V183.8h310.8c-15.5-36.8-32.9-71.7-52.3-103.6l98.8-15.5c16.5,35.8,32,75.5,47.4,119.1h306.9v344.7H251.4C245.6,698.9,201.1,847.1,116.9,971z M252.4,273.9v164.6h527.7V273.9H252.4z',
        '案': 'M460.6,642.8v-69.7h93v69.7h369.9v79.4H631c68.7,58.1,171.4,105.5,306.9,140.4l-39.7,80.4c-156.9-54.2-271.1-123-344.7-208.2v228.5h-93V732.8c-65.8,83.3-178.2,154.9-338.9,216.9l-50.3-81.3c147.2-44.5,250.8-93,310.8-146.2H87.8v-79.4H460.6z M518.7,253.5c-14.5,18.4-28.1,35.8-41.6,51.3h416.3v73.6H734.6c-30,38.7-62,70.7-94.9,95.9c80.4,20.3,162.7,43.6,246.9,70.7l-53.3,69.7c-93.9-32.9-188.8-62.9-283.7-88.1c-101.7,46.5-233.3,70.7-394.1,73.6l-50.3-75.5c135.6,0,243-10.7,320.5-30c-61-14.5-122-27.1-182-38.7c24.2-26.1,47.4-52.3,70.7-77.5H118.8v-73.6h257.6c20.3-25.2,39.7-50.3,59.1-75.5L518.7,253.5z M899.2,288.4H814v-68.7H196.3v68.7H111V143.2h347.6c-11.6-21.3-24.2-41.6-37.8-61l95.9-15.5c11.6,23.2,22.3,48.4,33.9,76.5h348.6V288.4z M632,378.4H415.1l-36.8,39.7c52.3,8.7,105.5,19.4,159.8,32C574.8,428.8,606.8,404.6,632,378.4z',
        '朝': 'M255.3,150.9V69.6h91v81.3h173.3v83.3H346.3v68.7h145.2v359.2H349.2v66.8h157.8v86.2H349.2v150.1h-92V815.1H67.5v-86.2h189.8v-66.8H111V302.9h144.3v-68.7H80.1v-83.3H255.3z M408.3,444.3v-62.9H197.2v62.9H408.3z M408.3,517.9H197.2v64.9h211.1V517.9z M540,972.9l-70.7-64.9C535.1,818,569,703.8,570,564.3V104.4h343.7v759.1c0,62-32,93.9-94.9,93.9H718.1l-25.2-90c34.9,1.9,66.8,3.9,95.9,3.9c21.3,0,32-13.6,32-39.7V655.4H656.2C641.6,782.2,602.9,887.7,540,972.9z M662,557.6c0,3.9-1,8.7-1,13.6h159.8V423H662V557.6z M820.8,190.6H662v148.1h158.8V190.6z',
        '境': 'M355,741.5C269.8,784.1,178.8,820,82,849L57.8,748.3c32-6.8,63.9-14.5,95.9-23.2v-335h-93V301h93V77.3h92V301h76.5v89.1h-76.5v305c36.8-13.6,72.6-29,109.4-46.5V741.5z M876.9,422v319.5H758.8v105.5c0,18.4,6.8,28.1,21.3,28.1h65.8c8.7,0,15.5-4.8,20.3-12.6c5.8-9.7,9.7-37.8,11.6-86.2l81.3,26.1c-5.8,72.6-16.5,116.2-31,130.7c-15.5,13.6-37.8,20.3-66.8,20.3H754.9c-58.1,0-86.2-30-86.2-89.1v-123h-82.3c-11.6,55.2-35.8,100.7-70.7,136.5c-40.7,37.8-108.4,67.8-203.3,91l-34.9-82.3c77.5-14.5,133.6-35.8,168.5-62.9c26.1-21.3,44.5-49.4,55.2-82.3h-95.9V422H876.9z M588.4,140.2c-7.7-22.3-16.5-42.6-25.2-61L661,62.8c7.7,23.2,15.5,49.4,22.3,77.5h226.6v75.5h-97.8c-7.7,29-18.4,58.1-30,85.2h155.9v76.5H351.2V301h141.4c-9.7-31-19.4-59.1-31-85.2h-81.3v-75.5H588.4z M792.7,548.8v-54.2H489.6v54.2H792.7z M792.7,612.8H489.6V667h303.1V612.8zM727.8,215.8H553.5c8.7,27.1,17.4,55.2,26.1,85.2H693C708.5,272.9,720.1,244.8,727.8,215.8z',
        '社': 'M87.8,687.3l-29-96.8c126.8-103.6,213-204.3,257.6-303.1H82v-88.1h136.5c-14.5-36.8-30-71.6-46.5-106.5l87.1-24.2c19.4,47.4,35.8,91,47.4,130.7h102.6v77.5c-24.2,67.8-62,135.6-114.3,203.3c54.2,31,105.5,65.8,152,106.5L394.7,666c-34.9-35.8-69.7-65.8-103.6-91v389.2h-90V585.6C166.2,620.5,128.5,654.4,87.8,687.3z M712.3,79.2v276.9h214v90h-214v397h236.3v90H377.3v-90h242.1v-397H411.2v-90h208.2V79.2H712.3z',
        '危': 'M930.8,305.8H666.4c29-25.8,62.3-60,99.7-102.6v-65.8H404c12.3-18.1,25.2-37.8,38.7-59.1l-94.9-20.3c-78.1,119.4-172.3,213-282.7,280.8l62,74.6c27.7-18.7,49.4-34.5,64.9-47.4V542c-3.9,154.3-45.2,273.7-123.9,358.3l74.6,65.8C233,859.6,280.4,718.2,284.9,542V394.8h645.8V305.8z M548.3,305.8H261.7c30.3-29,58.4-59.4,84.2-91h300.2C606.7,254.1,574.1,284.5,548.3,305.8z M870.7,735.7c-5.8,52.9-12.9,87.8-21.3,104.6c-9.7,15.5-33.9,23.2-72.6,23.2H526c-32.3,0-48.4-12.9-48.4-38.7V567.2H711v70.7c0,27.8-11.3,41.6-33.9,41.6c-31,0-67.8-1.9-110.4-5.8l22.3,86.2c40,1.9,81.7,2.9,124.9,2.9c60-3.9,90.4-35.2,91-93.9v-183H383.7v372.8c0,60,33.6,90,100.7,90h319.5c54.2,0,91.3-8.4,111.3-25.2c19.4-17.4,33.9-70.7,43.6-159.8L870.7,735.7z',
        '宗': 'M362.8,709.6c-55.2,85.2-123,158.8-203.3,222.7l-55.2-72.6c76.5-59.1,141.4-128.8,193.6-208.2L362.8,709.6zM357,960.4l-20.3-87.1c32.9,3.9,64.9,6.8,93.9,6.8c32.9,0,49.4-13.6,49.4-39.7V606H109.1v-88.1H906V606H570v256.6c0,64.9-36.8,97.8-108.4,97.8H357z M893.4,367.8h-91V248.7H213.7v121h-90V161.6h342.8c-6.8-27.1-14.5-51.3-22.3-74.6l92-15.5c8.7,27.1,17.4,57.1,25.2,90h332.1V367.8z M771.4,345.5v87.1H246.6v-87.1H771.4z M918.6,863.5l-65.8,65.8C806.2,859.7,742.3,786.1,661,706.7l62-60C800.4,718.3,866.3,790.9,918.6,863.5z',
        '暴': 'M333.9,358l-154-0.5l0.8-280.8l669.1,2L849,359.5L694.1,359l-0.1,43.6l206.2,0.6l-0.2,69.7l-206.2-0.6   l-0.1,44.5l253.7,0.8l-0.2,76.5l-215.9-0.7c52.2,44.7,128.5,80.8,229.1,108.2l-38,79.3c-73.5-26.7-134.4-56.9-182.7-90.6   c-31.1,22.5-66.3,43.1-105.7,61.7l-45.3-59.2c33.6-15.4,63.3-32.4,89.2-51c-16.7-14.9-31.2-31.1-43.4-48.5l-230.4-0.7   c-18.1,20.6-35,37.7-50.5,51.2c33.5,22.1,58,39.2,73.4,51.5l-51.5,51.2c-21.2-18.8-48.3-38.2-81.2-58.3   c-52.4,33.4-113.5,63.2-183.3,89.5l-47.2-77.6c102.1-28.1,180.9-64,236.6-107.7l-222.7-0.7l0.2-76.5l255.6,0.8l0.1-44.5l-208.2-0.6   l0.2-69.7l208.2,0.6L333.9,358z M439,815.3c-77,43.7-173.2,83.1-288.9,118.2L116.5,854c118.9-29.3,220-64.5,303.4-105.6L439,815.3z    M760.1,292.4l0.1-42.6l-490.9-1.5l-0.1,42.6L760.1,292.4z M269.5,187.4l490.9,1.5l0.1-42.6l-490.9-1.5L269.5,187.4z M366,944.8   l-17.2-78.5c32.9,4,65.2,6,96.8,6.1c18.7,0.1,28.1-8.3,28.2-25.1l0.7-228.5l89.1,0.3l-0.7,248.8c-0.2,51.6-30.2,77.4-90.3,77.2   L366,944.8z M421.5,516l184,0.6l0.1-44.5l-184-0.6L421.5,516z M421.9,401.8l184,0.6l0.1-43.6l-184-0.6L421.9,401.8z M626.1,763.6   c106.4,30.7,203.8,67.1,292.1,109.3l-48.6,74.4c-93.4-52.6-188.5-93.5-285.3-122.9L626.1,763.6z',
        '打': 'M449.1,534.3c-42.6,18.1-85.2,35.5-127.8,52.3v272.1c0,62.6-32.3,93.9-96.8,93.9h-99.7l-21.3-89.1   c34.2,3.2,63.9,4.8,89.1,4.8c23.9,0,35.8-11.3,35.8-33.9v-215c-47.1,14.9-93,28.4-137.5,40.7L68.5,573   c57.4-12.3,110.7-26.1,159.8-41.6V326.1H84V238h144.3V71.4h93V238h118.1v88.1H321.3v172.3c42.6-16.8,85.2-35.2,127.8-55.2V534.3z    M463.6,135.4h491.9v89.1H806.3v626.5c0,66.5-31.3,99.7-93.9,99.7H550.7l-20.3-89.1c58.1,3.2,108.1,4.8,150.1,4.8   c21.9,0,32.9-12.9,32.9-38.7V224.4H463.6V135.4z',
        '族': 'M83.6,194.9h141.4c-16.8-41.3-34.5-78.4-53.3-111.3l92-16.5c15.5,32.3,31.6,74.9,48.4,127.8h114.3V282H246.2   v117.2h175.3c0,250.5-4.8,404.7-14.5,462.8c-7.7,58.7-49.7,88.1-125.9,88.1c-7.7,0-24.5-1.6-50.3-4.8l-18.4-75.5   c28.4,2.6,46.8,3.9,55.2,3.9c32.9,0,52.3-16.5,58.1-49.4c5.2-31,8.4-144.6,9.7-340.8h-90c-5.8,215.6-44.9,375-117.2,478.3l-68.7-60   c63.9-96.8,96.8-252.4,98.8-466.7V282H83.6V194.9z M555.1,252C526.7,316.6,497,370.8,466,414.7l-57.1-68.7   c47.8-68.4,88.1-163,121-283.7l85.2,19.4c-7.7,25.8-16.5,53.3-26.1,82.3h336V252H555.1z M603.5,449.5   c-20.7,44.5-45.2,84.2-73.6,119.1l-52.3-64.9C517,451.5,551.2,378.2,580.3,284l75.5,15.5c-3.9,15.5-10.3,37.4-19.4,65.8H894v84.2   H744.9c-1.9,43.3-4.8,83.9-8.7,122h205.3v88.1H751.6c47.1,107.2,118.1,181.1,213,221.7l-49.4,78.4c-91-46.5-161.7-125.9-212-238.2   c-31.6,94.9-97.5,174.3-197.5,238.2l-57.1-70.7c89.1-57.4,148.1-127.5,177.2-210.1l5.8-19.4H460.2v-88.1H649   c3.9-38.1,6.8-78.7,8.7-122H603.5z',
      },
      tagList: [],
      topTagColors: {
        '户': '#4298c7',
        '案': '#eb4826',
        '朝': '#6668c6',
        '境': '#8d3b65',
        '社': '#bc4166',
        '危': '#f19d38',
        '宗': '#bf6b27',
        '打': '#bc4166',
        '族': '#f19d38',
        '暴': '#8d3b65',
        '族': '#f19d38',
      },
      tagClick: function () { },
      linkMouseOver: function () { },
      linkMouseLeave: function () { },
      linkDbClick: function () { },
      nodeClick: function () { },
      completed: function () { },
    },
    svg,
    simulation,
    container,
    link,
    node,
    textGroup,
    linkTexts,
    nodeGroup,
    tickCount = 0,
    nodeData,
    linkData,
    isSettled;
  function initialize(data) {
    isSettled = false;
    nodeData = data.nodes;
    linkData = data.links;

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

    initRadrawBox();

    render();

    graph.force_layout();
  }

  function initRadrawBox() {
    link = container.append("g")
      .attr("class", "links")
      .selectAll("line");

    textGroup = container.append("g")
      .attr("class", "link-texts");

    nodeGroup = container.append("g")
      .attr("class", "nodes");
  }

  function render() {
    if (nodeData.length == 0 && linkData.length == 0) return;

    drawLink();
    drawNode();
  }

  function drawLink() {
    // 添加连线

    link = link.data(linkData);
    link.exit().remove();

    link = link.enter().append("line")
      .attr("class", "link")
      .style('cursor', 'pointer')
      .attr('stroke', opt.lineColor)
      .attr('id', link => 'link-' + link.id)
      .on('mouseover', function (d) {
        lineToggle(this, d, true);
        opt.linkMouseOver(d, d3.event);
      })
      .on('mouseleave', function (d) {
        lineToggle(this, d, false);
        opt.linkMouseLeave(d, d3.event);
      })
      .on('dblclick', function (d) {
        opt.linkDbClick(d, d3.event);
      }).merge(link);


    linkTexts = textGroup.selectAll('g').attr('class', 'link-text').data(linkData);
    linkTexts.exit().remove();
    linkTexts = linkTexts.enter().append('g')
      .attr('id', function (d) { return 'link-gtext-' + d.id; })
      .on('mouseover', function (d) {
        lineToggle(this, d, true);
        opt.linkMouseOver(d, d3.event);
      })
      .on('mouseleave', function (d) {
        lineToggle(this, d, false);
        opt.linkMouseLeave(d, d3.event);
      })
      .on('dblclick', function (d) {
        opt.linkDbClick(d, d3.event);
      }).merge(linkTexts)

    var texts = linkTexts.append('rect')
      .attr('class', 'link-rect')
      .attr('fill', '#ffffff')
      .attr('id', function (d) { return 'link-rect-' + d.id; })
      .attr('width', function (d) {
        return d.label.length * 14 + 0;
      })
      .attr('height', function (d) {
        return 14 + 0;
      })
      .attr('x', function (d) {
        return -(d.label.length * 14 + 0) / 2;
      })
      .attr('y', function (d) {
        return -(1 * 14 + 0) / 2 - 4;
      })
      .attr('rx', 10)
      .attr('ry', 10)
      .style('cursor', 'pointer');

    linkTexts.append("text")
      .attr('id', function (d) { return 'link-text-' + d.id; })
      .text(function (d) {
        return d.label;
      })
      .style('cursor', 'pointer')
      .attr('fill', opt.lineColor);
  }

  function drawNode() {
    // 添加节点
    node = nodeGroup.selectAll('g.node').attr('class', 'node').data(nodeData);
    node.exit().remove();
    node = node.enter().append('g')
      .attr("class", "node")
      .attr('id', node => 'node-' + node.id)
      .on('click', function (d) {
        // console.log('nodeCLick')
        opt.nodeClick(d, d3.event);
      })
      .merge(node)
      .call(d3.drag()
        .filter(filter)
        .subject(subject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    var nodeCircle = node.append('circle')
      .style('fill', '#ffffff')
      .style('cursor', 'pointer')
      .style('stroke', node => node.color)
      .style('stroke-width', 4)
      .attr("r", 36);

    nodeCircle.append("title")
      .text(function (d) { return d.name; });

    var nodeIcon = node.append("path")
      .style('cursor', 'pointer')
      .attr('transform', 'translate(-15, -15),scale(0.03)')  //卡片缩小
      .attr('d', function (d) {
        return d.icon ? d.icon : opt.icon
      })
      .attr('fill', node => node.color);

    nodeIcon.append("title")
      .text(node => node.name);

    node.append('text')
      .style("font-size", "14px")
      .attr('transform', function (d) {
        var length = (d.name.length) * 14 - 2
        return 'translate(-' + length / 2 + ', 60)';
      })
      .text(node => node.name)
      .attr('fill', '#9A9A9A');

    // 添加顶部标签
    var tagsGroup = node.append('g')
      .attr('class', 'node-tags')
      .attr('transform', function (d) {
        var nums = d.tags.length;
        if (nums) return 'translate(-' + nums * 10 + ', -60)';
      })

    var tags = tagsGroup.selectAll('g')
      .data(function (d) {
        return d.tags.map(tg => {
          return {
            type: tg.mapLabel,
            key: tg.mapType,
            color: !tg.disabled ? opt.topTagColors[tg.mapLabel] : '#9A9A9A',
            nodeId: d.id,
            disabled: tg.disabled
          }
        })
      })
      .enter()
      .append('g')
      .style('cursor', 'pointer')
      .attr('class', 'node-tag')
      .attr('transform', function (d, i) {
        return 'translate(' + i * 20 + ', 0)';
      }).on('click', function (d) {
        // console.log('tagclick')
        if (!d.disabled) {
          this.querySelector('.node-tag-rect').setAttribute('fill', '#9A9A9A')
        } else {
          this.querySelector('.node-tag-rect').setAttribute('fill', opt.topTagColors[d.type])
        }
        d.disabled = !d.disabled;
        nodeData.forEach(k => {
          if (d.nodeId == k.id) {
            k.tags.forEach(t => {
              if (t.mapType == d.key) {
                t.disabled = d.disabled
              }
            })
          }
        })
        opt.tagClick(d, d3.event, nodeData);
      })
    tags.append('rect')
      .attr('class', 'node-tag-rect')
      .attr('width', 17)
      .attr('height', 17)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('fill', function (d) {
        return d.color;
      })
      .attr('transform', function (d, i) {
        return 'translate(0, 0)';
      });
    tags.append('path')
      .attr('class', 'node-tag-path')
      .attr('fill', '#ffffff')
      .attr('transform', 'translate(2, 1),scale(0.015)')  //卡片缩小
      .attr('d', function (d, i) {
        return opt.paths[d.type];
      });
  }

  function zoomed() {
    container
      .attr('transform', d3.event.transform);
  }

  function settled() {
    isSettled = true;
    node.data().forEach(function (d) {
      d.fx = d.x;
      d.fy = d.y;
    });
    graph.displayAutoCenter();
    opt.completed();
  }

  function filter(d) {
    let tag = d3.event.target;
    if (tag.className.baseVal.indexOf('node-tag') != -1) {
      let parentNode = tag.nodeName == 'g' ? tag : tag.parentNode
      if (!tag.__data__.disabled) {
        parentNode.querySelector('.node-tag-rect').setAttribute('fill', '#9A9A9A')
      } else {
        parentNode.querySelector('.node-tag-rect').setAttribute('fill', opt.topTagColors[tag.__data__.type])
      }
      tag.__data__.disabled = !tag.__data__.disabled;
      nodeData.forEach(k => {
        if (tag.__data__.nodeId == k.id) {
          k.tags.forEach(t => {
            if (t.mapType == tag.__data__.key) {
              t.disabled = tag.__data__.disabled
            }
          })
        }
      })
      opt.tagClick(tag.__data__, d3.event, nodeData);
      return false;
    } else {
      return true;
    }

    // return !d3.event.button;
  }
  function subject(d) {
    return d;
  }

  function ticked() {
    tickCount++;
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    node
      .attr('transform', function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      }).attr("x", function (d) {
        return d.x;
      }).attr("y", function (d) {
        return d.y;
      })
      .classed("fixed", function (d) {
        return (d.vx < 0.01) && (d.vy < 0.01);
      });

    linkTexts
      .attr('text-anchor', 'middle')
      .attr("transform", function (d) {
        var x = (d.source.x + d.target.x) / 2;
        var y = (d.source.y + d.target.y) / 2;
        var rotate = 0;
        return "translate(" + x + "," + y + ") rotate(" + rotate + ")";
      });
  }

  function dragstarted(d) {
    // console.log('dragstarted',d,d3.event)
    d3.event.sourceEvent.stopPropagation();
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    // d.fx = null;
    // d.fy = null;
  }

  function lineToggle(obj, d, isHover) {
    if (isHover) {
      link
        .filter(link => {
          return link.id == d.id
        })
        .classed('link-active', true)
      linkTexts
        .filter(link => {
          return link.id == d.id
        })
        .classed('link-active', true)
      let textNode = document.querySelector('#link-gtext-' + d.id);
      if (textNode) {
        textNode.remove();
        document.querySelector('.link-texts').appendChild(textNode);
      }
    } else {
      link
        .filter(link => {
          return link.id == d.id
        })
        .classed('link-active', false)
      linkTexts
        .filter(link => {
          return link.id == d.id
        })
        .classed('link-active', false)
    }
  }

  function setTransform(x, y, k, delay = 0) {
    container
      .transition()
      .duration(delay)
      .attr('transform', 'translate(' + x + ',' + y + ')scale(' + k + ')');
  }

  function AreaSelfAdaption(a1, a2, sc) {
    var rx, ry, rc = sc;
    rc = (a2.width / a1.width) > rc ? rc : (a2.width / a1.width);
    rc = (a2.height / a1.height) > rc ? rc : (a2.height / a1.height);
    rc = rc * 0.9;
    rx = a2.width / 2 - (a1.width / 2 + a1.x) * rc
    ry = a2.height / 2 - (a1.height / 2 + a1.y) * rc
    return { x: rx, y: ry, k: rc };
  }

  graph.force_layout = function () {
    simulation = d3.forceSimulation(nodeData)
      .force("link", d3.forceLink(linkData).id(function (d) { return d.id; }).distance(240))
      .force("charge", d3.forceManyBody().strength(-1000).distanceMax(500))
      .force("center", d3.forceCenter(opt.width / 2, opt.height / 2))
      .force('collision', d3.forceCollide(1).strength(0.5))
      .alphaMin(0.01)
      .alphaTarget(0)
      .alphaDecay(0.05)
      .velocityDecay(0.2);

    simulation.on("tick", ticked);

    simulation
      .on("end", settled);
  }

  // 窗口自适应居中显示
  graph.displayAutoCenter = function () {
    var va = document.querySelector('.container').getBBox();
    va.height += 100;
    va.width += 100;
    var sc = AreaSelfAdaption(
      va, { width: opt.width, height: opt.height }, 1
    );
    setTransform(sc.x, sc.y, sc.k, 500);
  }

  graph.init = function (data) {
    initialize(data);
  }
  graph.setOptions = function (option) {
    return Object.assign(opt, option)
  }
  graph.isSettled = function () {
    return isSettled;
  }
  // 添加元素
  graph.addElement = function (nodes, links) {

  }
  graph.restart = function () {
    console.log("restart")
    if (nodeData) {
      // simulation.stop();
      nodeData.forEach(function (ele) {
        ele.fx = null;
        ele.fy = null;
      });
      // render();

      // debugger;
      simulation.nodes(nodeData);
      simulation.force("link").links(linkData);
      simulation.alpha(1).restart();

      // graph.force_layout()
    }
  }
  graph.getData = function () {
    return {
      links: linkData,
      nodes: nodeData
    }
  }
  graph.setSize = function (size) {
    d3.select('svg')
      .attr('width', size.width)
      .attr('height', size.height);
  }
  return graph;
})();
export default hydraCircle;