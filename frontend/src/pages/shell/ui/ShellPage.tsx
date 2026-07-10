import type { PropsWithChildren, ReactElement } from "react";
import { TitleBar } from "../../../features/title-bar/ui/TitleBar";
import "../css/shell.css";

export function ShellPage({ children }: PropsWithChildren): ReactElement {
  return (
    <section
      className="shell-screen"
      aria-label="Sedah application shell"
    >
      <TitleBar />
      <div className="shell-content">{children}</div>
    </section>
  );
}
