import { useRef, type ReactElement } from "react";
import { useAmbientField } from "../../../../hooks/useAmbientField";
import type { AmbientWaveViewProps } from "./interfaces/ambientWaveViewProps";
import "../css/ambient-wave.css";

export function AmbientWaveView({ hostRef }: AmbientWaveViewProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useAmbientField(hostRef, canvasRef);

  return (
    <div
      aria-hidden="true"
      className="ambient-wave"
    >
      <canvas
        className="ambient-wave__canvas"
        ref={canvasRef}
      />
    </div>
  );
}
