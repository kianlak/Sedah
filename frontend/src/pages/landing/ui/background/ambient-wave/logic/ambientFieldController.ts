import type { AmbientFieldConfig } from "../interfaces/ambientField";
import { AMBIENT_FIELD_PROFILE } from "../constants/ambientFieldProfile";
import {
  AMBIENT_FIELD_DOT_COLOR_CSS_VARIABLE,
  AMBIENT_FIELD_OPACITY_CSS_VARIABLE
} from "../constants/ambientFieldVariables";

export function bindAmbientField(host: HTMLElement, canvas: HTMLCanvasElement): () => void {
  const context = canvas.getContext("2d");

  if (!context) {
    return () => undefined;
  }

  let frameHandle = 0;
  let lastWidth = 0;
  let lastHeight = 0;
  let disposed = false;

  const syncCanvasSize = (): void => {
    const bounds = host.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));

    if (width === lastWidth && height === lastHeight) {
      return;
    }

    lastWidth = width;
    lastHeight = height;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const drawFrame = (timestampMs: number): void => {
    if (disposed) {
      return;
    }

    syncCanvasSize();
    const width = lastWidth || Math.max(1, Math.round(host.getBoundingClientRect().width));
    const height = lastHeight || Math.max(1, Math.round(host.getBoundingClientRect().height));
    const config = readFieldConfig(host);

    context.clearRect(0, 0, width, height);
    drawField(context, width, height, timestampMs / 1000, config);
    frameHandle = window.requestAnimationFrame(drawFrame);
  };

  const resizeObserver = new ResizeObserver(() => {
    syncCanvasSize();
  });

  resizeObserver.observe(host);
  window.addEventListener("resize", syncCanvasSize);
  syncCanvasSize();
  window.requestAnimationFrame(() => {
    syncCanvasSize();
    window.requestAnimationFrame(() => {
      syncCanvasSize();
    });
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    drawFrame(0);
  } else {
    frameHandle = window.requestAnimationFrame(drawFrame);
  }

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frameHandle);
    resizeObserver.disconnect();
    window.removeEventListener("resize", syncCanvasSize);
  };
}

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  timeSeconds: number,
  config: AmbientFieldConfig
): void {
  const rowSpacingPx = Math.max(10, AMBIENT_FIELD_PROFILE.spacingPx * 0.54);
  const screenOverscanXPx = AMBIENT_FIELD_PROFILE.spacingPx * 3;
  const overscanYPx = rowSpacingPx * 5;
  const rows = Math.max(28, Math.ceil((height + overscanYPx * 2) / rowSpacingPx) + 3);
  const centerX = width / 2;
  const speedFactor = (Math.PI * 2) / Math.max(8, AMBIENT_FIELD_PROFILE.speedSeconds);
  const horizonShiftPx = height * 0.08;

  context.save();
  context.globalCompositeOperation = "screen";
  context.fillStyle = config.dotColor;
  context.globalAlpha = config.opacity;

  for (let row = 0; row < rows; row += 1) {
    const depth = row / Math.max(1, rows - 1);
    const verticalProgress = (row + 0.5) / rows;
    const rowTaper = 1 - Math.abs(verticalProgress - 0.5) * 0.24;
    const perspectiveScale = 0.56 + depth * (AMBIENT_FIELD_PROFILE.perspective * 0.94);
    const rowY = verticalProgress * (height + overscanYPx * 2) - overscanYPx + horizonShiftPx;
    const rowAmplitude = AMBIENT_FIELD_PROFILE.amplitudePx * (0.14 + depth * 0.82) * rowTaper;
    const rowDotRadius = AMBIENT_FIELD_PROFILE.dotSizePx * (0.52 + depth * 0.92);
    const rowOffsetPx = row % 2 === 0 ? 0 : AMBIENT_FIELD_PROFILE.spacingPx * 0.5;
    const projectedLeftEdge = -screenOverscanXPx;
    const projectedRightEdge = width + screenOverscanXPx;
    const minWorldX = centerX + (projectedLeftEdge - centerX) / perspectiveScale;
    const maxWorldX = centerX + (projectedRightEdge - centerX) / perspectiveScale;
    const firstColumn = Math.floor((minWorldX - rowOffsetPx) / AMBIENT_FIELD_PROFILE.spacingPx) - 1;
    const lastColumn = Math.ceil((maxWorldX - rowOffsetPx) / AMBIENT_FIELD_PROFILE.spacingPx) + 1;

    for (let column = firstColumn; column <= lastColumn; column += 1) {
      const x = column * AMBIENT_FIELD_PROFILE.spacingPx + rowOffsetPx;
      const progress = x / Math.max(1, width);
      const xOffset = x - centerX;
      const wavePhase =
        (progress * Math.PI * 5.2) +
        (depth * Math.PI * 2.2) +
        timeSeconds * speedFactor;
      const surfaceY =
        rowY +
        Math.sin(wavePhase) * rowAmplitude +
        Math.sin(wavePhase * 1.7 - depth * 3.6) * rowAmplitude * 0.18 +
        Math.sin(wavePhase * 0.55 - depth * 3.2) * rowAmplitude * 0.16;
      const projectedX = centerX + xOffset * perspectiveScale;
      const projectedY = surfaceY - Math.abs(xOffset) * 0.013 * (1 - depth);
      const alpha = config.opacity * (0.18 + depth * 0.82) * rowTaper;

      context.beginPath();
      context.globalAlpha = alpha;
      context.arc(projectedX, projectedY, rowDotRadius, 0, Math.PI * 2);
      context.fill();
    }
  }

  context.restore();
}

function readFieldConfig(host: HTMLElement): AmbientFieldConfig {
  const styles = getComputedStyle(host);

  return {
    dotColor: styles.getPropertyValue(AMBIENT_FIELD_DOT_COLOR_CSS_VARIABLE).trim() || "rgba(255, 255, 255, 0.92)",
    opacity: parseNumberValue(styles.getPropertyValue(AMBIENT_FIELD_OPACITY_CSS_VARIABLE), 0.5)
  };
}

function parseNumberValue(value: string, fallback: number): number {
  const numericValue = Number.parseFloat(value.trim());
  return Number.isFinite(numericValue) ? numericValue : fallback;
}
