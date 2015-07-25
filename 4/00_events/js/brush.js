window.Brush = function(){
  return {
    getVertices: function(start, end, color, size){
      var dir = normalize(subtract(end, start));
      var normal = scale(size/2, vec2(dir[1], -dir[0]));

      var temp = [
        add(start, normal), add(end, normal),
        add(start, negate(normal)), add(end, negate(normal))
      ];

      var points = [
        start, temp[0], temp[1],
        start, temp[1], end,
        start, temp[3], end,
        start, temp[2], temp[3]
      ];

      var colors = [
        color, color, color,
        color, color, color,
        color, color, color,
        color, color, color
      ];

      return [points, colors];
    }
  }
}