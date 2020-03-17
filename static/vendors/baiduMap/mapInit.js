var mapLists = (function () {
  var mapList = {};
  var map;
  // 初始化地图
  mapList.initialize = (id, centerLng, centerLat, zoom) => {
    map = new BMap.Map(id, {
      minZoom: 9
    }); // 创建地图实例
    var point = new BMap.Point(centerLng, centerLat) // 创建中心点坐标
    map.centerAndZoom(point, zoom) // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
    return map;
  }
  // 多边形以及边框样式
  mapList.style = (strokeColor, fillColor, strokeWeight, strokeOpacity, fillOpacity, strokeStyle) => {
    return {
      strokeColor: strokeColor || 'purple', //边线颜色。
      fillColor: fillColor || 'none', //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: strokeWeight || '1', //边线的宽度，以像素为单位。
      strokeOpacity: strokeOpacity || '.8', //边线透明度，取值范围0 - 1。
      fillOpacity: fillOpacity || '.3', //填充的透明度，取值范围0 - 1。
      strokeStyle: strokeStyle || 'solid' //边线的样式，solid或dashed。
    }
  }
  // 地图信息展示,参数（坐标，x偏移，y偏移）
  mapList.opts = (point, x, y) => {
    return {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(x, y) //设置文本偏移量
    }
  }
  // div+canvas+div
  mapList.divMove = (areaWarningInfo, i, num, areaName, areaColor, scoreTotal) => {
    console.log('divMove', {
      areaWarningInfo,
      i,
      num,
      areaName,
      areaColor,
      scoreTotal
    });
    // var cDiv = document.getElementById('c' + i);
    var cDiv = document.createElement('div'); //1
    cDiv.setAttribute('class', 'c' + i) //2
    var score = document.createElement('div'); //div1
    var radius = document.createElement('div'); //div2
    var canvas = document.createElement('canvas'); //canvas3
    var rect = document.createElement('div'); //div3
    radius.setAttribute('style', 'background: #' + areaColor)
    rect.setAttribute('class', 'rect')
    // 第一个div显示积分
    score.innerHTML = scoreTotal + '分';
    score.setAttribute('style', 'color: #' + areaColor + ';border:1px solid #' + areaColor)
    score.setAttribute('class', 'score')
    // 第2个div显示名称和人数
    radius.innerHTML = areaName + '(' + num + ')';
    radius.setAttribute('class', 'drawSpan')
    // 第3个是canvas
    canvas.setAttribute("id", 'canvas' + i)
    var ctx = canvas.getContext('2d');
    // 设置画布宽高
    canvas.width = 40;
    canvas.height = 40;
    //定义起始角度
    var tempAngle = -90;
    //定圆心位置
    var x0 = 20,
      y0 = 20;
    //定半径长度
    var r = 20;
    // 绘制扇形和小方块
    for (let x = 0; x < areaWarningInfo.length; x++) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      //当前扇形角度
      const angle = areaWarningInfo[x].count / num * 360;
      //当前扇形起始绘制弧度
      const startAngle = tempAngle * Math.PI / 180;
      //当前扇形借结束绘制弧度
      const endAngle = (tempAngle + angle) * Math.PI / 180;
      //绘制扇形
      ctx.arc(x0, y0, r, startAngle, endAngle);
      ctx.strokeStyle = "transparent"; //canvas边界透明
      ctx.stroke();
      //填充扇形
      ctx.fillStyle = '#' + areaWarningInfo[x].color;
      ctx.fill();
      tempAngle += angle;

      // 小方块
      var div = document.createElement('div')
      div.setAttribute('style', 'background: #' + areaWarningInfo[x].color)
      div.setAttribute('class', 'tag-rect');
      div.innerHTML = areaWarningInfo[x].count + '人';
      // console.log('div',{div,rect})  
      rect.appendChild(div)
    }

    /* cDiv.appendChild(score)
    cDiv.appendChild(radius)
    cDiv.appendChild(canvas)
    cDiv.appendChild(rect) */
    console.log('cDiv', cDiv.innerHTML)
    var cropStr = canvas.toDataURL("image/png")
    var img = document.createElement('img'); //img
    img.setAttribute("src", cropStr)
    var html = score.outerHTML + radius.outerHTML + img.outerHTML + rect.outerHTML
    return html
  }
  // 0807直接用divdiv
  mapList.divDraw = (areaWarningInfo, i, num, areaName, areaColor) => {
    var cDiv = document.getElementById('c' + i);
    var rect = document.createElement('div');
    var span = document.createElement('span');
    rect.setAttribute("class", 'rect')
    span.setAttribute("class", 'drawSpan')
    span.setAttribute('style', 'background: #' + areaColor)
    cDiv.appendChild(rect)
    cDiv.appendChild(span)
    span.innerHTML = areaName + '(' + num + ')'
    for (let x = 0; x < areaWarningInfo.length; x++) {
      var div = document.createElement('div')
      div.setAttribute('style', 'background: #' + areaWarningInfo[x].color)
      div.setAttribute('class', 'tag-rect');
      div.innerHTML = areaWarningInfo[x].count;
      rect.appendChild(div)
    }

  }
  // 0806canvas画圆//画矩形  hong

  mapList.circle = (areaWarningInfo, i, num, areaName, areaColor) => {
    var he = num;
    var data = [];
    var color = [];
    areaWarningInfo.forEach(element => {
      data.push(element.count)
      color.push('#' + element.color)
    });

    // var color = ['#ef271d ','#ed8f21','#e4d52b','#184af0'];
    var can = document.getElementById('c' + i);
    var ctx = can.getContext('2d');
    can.width = 120;
    can.height = 120;
    //定义起始角度
    var tempAngle = -90;
    //定圆心位置
    var x0 = 60,
      y0 = 40;
    //定半径长度
    var radius = 40;
    // 绘制胶囊
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 26;
    ctx.moveTo(13, 100);
    ctx.lineTo(107, 100);
    ctx.strokeStyle = '#' + areaColor;
    ctx.stroke();


    canvas_text(ctx, areaName + '(' + num + ')', "16px bold 黑体", "#fff", 103);
    // Canvas居中写字，参数（context对象，要写的字，字体，颜色，绘制的高度）
    function canvas_text(_paint, _text, _fontSzie, _color, _height) {
      _paint.font = _fontSzie;
      _paint.fillStyle = _color;
      _paint.textAlign = "center";
      _paint.textBaseline = "middle";
      _paint.fillText(_text, can.width / 2, _height);
    }
    // 绘制扇形
    for (i = 0; i < data.length; i++) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      //当前扇形角度
      const angle = data[i] / he * 360;
      //当前扇形起始绘制弧度
      const startAngle = tempAngle * Math.PI / 180;
      //当前扇形借结束绘制弧度
      const endAngle = (tempAngle + angle) * Math.PI / 180;
      //绘制扇形
      ctx.arc(x0, y0, radius, startAngle, endAngle);
      ctx.strokeStyle = "transparent";
      ctx.stroke();
      //填充扇形
      ctx.fillStyle = color[i];
      ctx.fill();
      tempAngle += angle;
    }
    // 绘制文字
    for (i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px Arial";
      //当前扇形角度
      const angle = data[i] / he * 360;

      //绘制文字
      //提取要绘制的文字内容
      var txt = data[i];
      //计算文字要放的角度
      var txtAngle = tempAngle + 1 / 2 * angle;
      //计算文字要放的坐标位置
      var x, y;
      x = x0 + Math.cos(txtAngle * Math.PI / 180) * (20);
      y = y0 + Math.sin(txtAngle * Math.PI / 180) * (20);
      //如果文字在圆形的左侧，那么让文字 对齐方式为 文字结尾对齐当前坐标。
      /*if(txtAngle>90 && txtAngle<270){
        can.textAlign = 'end';
      }*/
      ctx.stroke();
      //文字绘制到扇形旁边
      ctx.fillText(txt, x, y);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      //当前扇形结束绘制角度，即下一个扇形开始绘制角度
      tempAngle += angle;
    }

  }
  // color:
  mapList.color = (colorName) => {
    switch (colorName) {
      case "红":
        return 'red'
        break;
      case "橙":
        return 'orange'
        break;
      case "黄":
        return 'yellow'
        break;
      case "蓝":
        return 'blue'
        break;
    }
  }

  mapList.request = function (url) {

  }
  return mapList;
})()

export default mapLists;
