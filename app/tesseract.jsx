"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const HYPERRECTANGLES = {
  3: {
    axisLengths: [1.2, 0.85, 1.1],
    rotations: [
      { axisA: 0, axisB: 2, speed: 0.12, xFactor: 1, yFactor: 0 },
      { axisA: 1, axisB: 2, speed: 0.09, xFactor: 0, yFactor: 1 },
      { axisA: 0, axisB: 1, speed: 0.045, xFactor: -0.55, yFactor: 0.4 }
    ]
  },
  4: {
    axisLengths: [1.15, 0.82, 1.08, 0.9],
    rotations: [
      { axisA: 0, axisB: 3, speed: 0.12, xFactor: 1, yFactor: 0 },
      { axisA: 1, axisB: 2, speed: 0.09, xFactor: 0, yFactor: 1 },
      { axisA: 2, axisB: 3, speed: 0.065, xFactor: -0.7, yFactor: 0 },
      { axisA: 0, axisB: 2, speed: 0.045, xFactor: 0, yFactor: 0.5 }
    ]
  },
  5: {
    axisLengths: [1.15, 0.82, 1.08, 0.9, 1],
    rotations: [
      { axisA: 0, axisB: 4, speed: 0.12, xFactor: 1, yFactor: 0 },
      { axisA: 1, axisB: 3, speed: 0.09, xFactor: 0, yFactor: 1 },
      { axisA: 2, axisB: 4, speed: 0.065, xFactor: -0.7, yFactor: 0 },
      { axisA: 0, axisB: 2, speed: 0.045, xFactor: 0, yFactor: 0.5 },
      { axisA: 1, axisB: 4, speed: 0.03, xFactor: 0.3, yFactor: 0 }
    ]
  }
};

function createVertices(axisLengths) {
  return Array.from({ length: 2 ** axisLengths.length }, (_, index) =>
    axisLengths.map((length, axis) =>
      (index >> axis) & 1 ? length : -length
    )
  );
}

function createEdges(vertexCount, dimensions) {
  return Array.from({ length: vertexCount }, (_, index) =>
    Array.from({ length: dimensions }, (_, axis) => [index, index ^ (1 << axis)])
  )
    .flat()
    .filter(([start, end]) => start < end);
}

function rotatePlane(point, axisA, axisB, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const next = [...point];

  next[axisA] = point[axisA] * cosine - point[axisB] * sine;
  next[axisB] = point[axisA] * sine + point[axisB] * cosine;

  return next;
}

function project(point) {
  let coordinates = [...point];

  for (let dimensions = coordinates.length; dimensions > 3; dimensions -= 1) {
    const distance = dimensions + 1.25;
    const scale = distance / (distance - coordinates[dimensions - 1]);
    coordinates = coordinates
      .slice(0, dimensions - 1)
      .map((coordinate) => coordinate * scale);
  }

  const [x, y, z] = coordinates;
  const threeDimensionalDistance = 5.25;
  const threeDimensionalScale = threeDimensionalDistance /
    (threeDimensionalDistance - z);

  return {
    depth: z,
    x: x * threeDimensionalScale,
    y: y * threeDimensionalScale
  };
}

function distanceToSegment(point, start, end) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const segmentLengthSquared = segmentX ** 2 + segmentY ** 2;

  if (segmentLengthSquared === 0) {
    return Math.hypot(point.x - start.x, point.y - start.y);
  }

  const position = Math.max(
    0,
    Math.min(
      1,
      ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) /
        segmentLengthSquared
    )
  );
  const closestX = start.x + segmentX * position;
  const closestY = start.y + segmentY * position;

  return Math.hypot(point.x - closestX, point.y - closestY);
}

export default function Hyperrectangle() {
  const [dimensions] = useState(() => 3 + Math.floor(Math.random() * 3));
  const canvasRef = useRef(null);
  const fittedVerticesRef = useRef([]);
  const interactionRef = useRef({
    angleX: 0,
    angleY: 0,
    dragging: false,
    pointerX: 0,
    pointerY: 0,
    velocityX: 0,
    velocityY: 0
  });
  const configuration = HYPERRECTANGLES[dimensions];
  const vertices = useMemo(
    () => createVertices(configuration.axisLengths),
    [configuration]
  );
  const edges = useMemo(
    () => createEdges(vertices.length, dimensions),
    [dimensions, vertices]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    function resizeCanvas() {
      const bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function draw(timestamp = 0) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const edgeColor = isDark ? "rgba(237, 237, 237, 0.38)" : "rgba(23, 23, 23, 0.32)";
      const pointColor = isDark ? "rgba(237, 237, 237, 0.72)" : "rgba(23, 23, 23, 0.65)";
      const time = reducedMotion.matches ? 0 : timestamp / 1000;
      const interaction = interactionRef.current;

      if (!reducedMotion.matches && !interaction.dragging) {
        interaction.angleX += interaction.velocityX;
        interaction.angleY += interaction.velocityY;
        interaction.velocityX *= 0.996;
        interaction.velocityY *= 0.996;
      }

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const projectedVertices = vertices.map((vertex) => {
        const rotatedVertex = configuration.rotations.reduce(
          (rotatedPoint, rotation) =>
            rotatePlane(
              rotatedPoint,
              rotation.axisA,
              rotation.axisB,
              time * rotation.speed +
                interaction.angleX * rotation.xFactor +
                interaction.angleY * rotation.yFactor
            ),
          vertex
        );

        return project(rotatedVertex);
      });

      // Fit every perspective projection inside the canvas with a stable margin.
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      projectedVertices.forEach((point) => {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      });

      const margin = Math.min(width, height) * 0.1;
      const projectedWidth = Math.max(maxX - minX, 1);
      const projectedHeight = Math.max(maxY - minY, 1);
      const scale = Math.min(
        (width - margin * 2) / projectedWidth,
        (height - margin * 2) / projectedHeight
      );
      const projectionCenterX = (minX + maxX) * 0.5;
      const projectionCenterY = (minY + maxY) * 0.5;
      const fittedVertices = projectedVertices.map((point) => ({
        ...point,
        x: centerX + (point.x - projectionCenterX) * scale,
        y: centerY + (point.y - projectionCenterY) * scale
      }));
      fittedVerticesRef.current = fittedVertices;

      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      edges.forEach(([startIndex, endIndex]) => {
        const start = fittedVertices[startIndex];
        const end = fittedVertices[endIndex];
        const depth = (start.depth + end.depth) / 2;

        context.beginPath();
        context.strokeStyle = edgeColor;
        context.globalAlpha = 0.5 + (depth + 2) * 0.11;
        context.lineWidth = 0.8 + (depth + 2) * 0.12;
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
      });

      context.globalAlpha = 1;
      context.fillStyle = pointColor;
      fittedVertices.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, 1.55, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion.matches) {
        frameId = window.requestAnimationFrame(draw);
      }
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();
    draw();

    function pointerPosition(event) {
      const bounds = canvas.getBoundingClientRect();

      return {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
      };
    }

    function isNearEdge(point) {
      const fittedVertices = fittedVerticesRef.current;

      return edges.some(([startIndex, endIndex]) => {
        const start = fittedVertices[startIndex];
        const end = fittedVertices[endIndex];

        return start && end && distanceToSegment(point, start, end) < 12;
      });
    }

    function handlePointerDown(event) {
      const point = pointerPosition(event);

      if (!isNearEdge(point)) {
        return;
      }

      const interaction = interactionRef.current;
      interaction.dragging = true;
      interaction.pointerX = point.x;
      interaction.pointerY = point.y;
      interaction.velocityX = 0;
      interaction.velocityY = 0;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
      event.preventDefault();
    }

    function handlePointerMove(event) {
      const interaction = interactionRef.current;

      if (!interaction.dragging) {
        return;
      }

      const point = pointerPosition(event);
      const rotationX = ((point.x - interaction.pointerX) / width) * 5;
      const rotationY = ((point.y - interaction.pointerY) / height) * 5;
      interaction.angleX += rotationX;
      interaction.angleY += rotationY;
      interaction.velocityX = rotationX * 0.18;
      interaction.velocityY = rotationY * 0.18;
      interaction.pointerX = point.x;
      interaction.pointerY = point.y;

      if (reducedMotion.matches) {
        draw();
      }

      event.preventDefault();
    }

    function handlePointerEnd(event) {
      const interaction = interactionRef.current;

      if (!interaction.dragging) {
        return;
      }

      interaction.dragging = false;
      canvas.classList.remove("is-dragging");

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerEnd);
    canvas.addEventListener("pointercancel", handlePointerEnd);

    function handleMotionPreferenceChange() {
      window.cancelAnimationFrame(frameId);
      draw();
    }

    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerEnd);
      canvas.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [configuration, edges, vertices]);

  return (
    <canvas ref={canvasRef} className="hyperrectangle" aria-hidden="true" />
  );
}
