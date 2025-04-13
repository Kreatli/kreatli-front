import simplify from 'simplify-js';

export const simplifyLine = (points: number[]) => {
  const formattedPoints = [];

  for (let i = 0; i < points.length; i += 2) {
    formattedPoints.push({ x: points[i], y: points[i + 1] });
  }

  const simplified = simplify(formattedPoints, 2, true);
  return simplified.flatMap((p) => [p.x, p.y]);
};
