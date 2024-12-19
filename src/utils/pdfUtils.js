import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const exportToPDF = async (title, content) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    page.drawText(title || "Untitled Document", {
      x: 50,
      y: height - 50,
      size: 20,
      font: boldFont,
    });

    // Process the Draft.js content
    const blocks = content.getBlocksAsArray();
    let yPosition = height - 100;

    for (const block of blocks) {
      const text = block.getText();
      const type = block.getType();
      const characterList = block.getCharacterList();
      let fontSize = 12;
      let currentFont = font;
      let indent = 50;

      switch (type) {
        case "header-one":
          fontSize = 18;
          currentFont = boldFont;
          break;
        case "header-two":
          fontSize = 16;
          currentFont = boldFont;
          break;
        case "header-three":
          fontSize = 14;
          currentFont = boldFont;
          break;
        case "blockquote":
          indent = 70;
          break;
        case "code-block":
          indent = 70;
          break;
        default:
          break;
      }
      if (text.length > 0) {
        page.drawText(text, {
          x: indent,
          y: yPosition,
          size: fontSize,
          font: currentFont,
          maxWidth: width - 100,
        });
        yPosition -= fontSize * 1.5;
      }
      if (yPosition < 50) {
        page = pdfDoc.addPage();
        yPosition = height - 50;
      }
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "document"}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
