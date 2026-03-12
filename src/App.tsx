import { useEffect, useMemo, useState } from "react";
import { Editor } from "./components/Editor";
import { ResumePreview } from "./components/ResumePreview";
import { Suggestions } from "./components/Suggestions";
import { exportElementToPdf } from "./pdf";
import { loadResumeData, saveResumeData } from "./storage";
import { DEFAULT_RESUME_DATA, type ResumeData } from "./types";

function buildFilename(data: ResumeData) {
  const name = data.basics.name?.trim() || "简历";
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${name}-推荐面简历-${y}${m}${d}.pdf`;
}

export function App() {
  const [data, setData] = useState<ResumeData>(() => loadResumeData() ?? DEFAULT_RESUME_DATA);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => saveResumeData(data), 250);
    return () => window.clearTimeout(t);
  }, [data]);

  const filename = useMemo(() => buildFilename(data), [data]);

  const onExport = async () => {
    const el = document.getElementById("resume");
    if (!el) return;
    try {
      setExporting(true);
      await exportElementToPdf({ element: el, filename });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      alert(`导出失败：${msg}\n\n你也可以先用“打印/另存为 PDF”作为备选方案。`);
    } finally {
      setExporting(false);
    }
  };

  const onReset = () => {
    setData(DEFAULT_RESUME_DATA);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-title">推荐面简历生成器</div>
          <div className="brand-sub">左侧编辑，右侧实时预览；一键导出 PDF</div>
        </div>
        <div className="topbar-actions">
          <button className="btn secondary" type="button" onClick={() => window.print()}>
            打印/另存为 PDF
          </button>
          <button className="btn" type="button" onClick={onExport} disabled={exporting}>
            {exporting ? "正在导出..." : "一键导出 PDF"}
          </button>
          <button className="btn danger" type="button" onClick={onReset} title="恢复为示例内容">
            重置示例
          </button>
        </div>
      </header>

      <main className="main">
        <aside className="left">
          <Editor data={data} onChange={setData} />
          <Suggestions data={data} />
        </aside>

        <section className="right">
          <div className="preview-wrap">
            <ResumePreview data={data} />
          </div>
        </section>
      </main>
    </div>
  );
}

