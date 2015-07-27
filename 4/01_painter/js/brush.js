window.Brush = function(){
  return {
    getVertices: function(prevPoints, newPoint, width){
      var segment1 = subtract(prevPoints[0], prevPoints[1]);
      var segment2 = subtract(newPoint, prevPoints[1]);

      var bisect = add(normalize(segment1), normalize(segment2));
      bisect = equal(bisect, vec2(0,0)) ? normalize([segment1[1], -segment1[0]]) : normalize(bisect);
      if(bisect[1]<0){bisect = negate(bisect)}

      var normal = normalize( vec2(segment2[1], -segment2[0]) );
      if(normal[1]<0){normal = negate(normal)}

      var add1 = scale(width/100, bisect);
      var add2 = scale(width/100, normal);

      pt1 = add(prevPoints[1], add1)
      pt2 = add(prevPoints[1], negate(add1))
      pt3 = add(newPoint, add2)
      pt4 = add(newPoint, negate(add2))

      var points = [ pt3,pt4 ];

      return points;
    }
  }
}