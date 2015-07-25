window.Brush = function(){
  return {
    getVertices: function(start, end, color, size){
      // couldn't think out strightforward names for these vectors, sorry for that
      var dir = scale(size/2, normalize(subtract(end, start)));
      var normal = vec2(dir[1], -dir[0]);

      var temp = [
        add(start, normal), add(end, normal),
        add(start, negate(normal)), add(end, negate(normal))
      ];

      var points = [
        temp[0], temp[2], add(start, negate(dir)),
        start, temp[0], temp[1],
        start, temp[1], end,
        start, temp[3], end,
        start, temp[2], temp[3],
        temp[1], temp[3], add(end, dir)
      ];

      var colors = [
        color, color, color,
        color, color, color,
        color, color, color,
        color, color, color,
        color, color, color,
        color, color, color
      ];

      return [points, colors];
    }
  }
}