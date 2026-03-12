export async function exportElementToPdf(opts: {
  element: HTMLElement;
  filename: string;
}) {
  const { element, filename } = opts;

  const mod: any = await import("html2pdf.js");
  const html2pdf: any = mod?.default ?? mod;
  if (typeof html2pdf !== "function") {
    throw new Error("导出组件加载失败：html2pdf.js 未正确导出函数。");
  }

  const worker = html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: { mode: ["css", "legacy"] }
    })
    .from(element);

  await worker.save();
}

