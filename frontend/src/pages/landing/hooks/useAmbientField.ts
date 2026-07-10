import { useEffect, type RefObject } from "react";
import { bindAmbientField } from "../ui/background/ambient-wave/logic/ambientFieldController";

export function useAmbientField(
  hostRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>
): void {
  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) {
      return;
    }

    return bindAmbientField(host, canvas);
  }, [canvasRef, hostRef]);
}
