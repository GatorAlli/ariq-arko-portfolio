from pathlib import Path
import json
import pypdfium2 as pdfium

root = Path(__file__).resolve().parent.parent
pdf = pdfium.PdfDocument(root / "public/documents/ariq-arko-resume.pdf")
output = root / "public/documents/resume-pages"
output.mkdir(parents=True, exist_ok=True)
pages = []
for index, page in enumerate(pdf):
    bitmap = page.render(scale=2.5)
    image = bitmap.to_pil()
    filename = f"page-{index + 1}.webp"
    image.save(output / filename, "WEBP", quality=96, method=6)
    pages.append({"src": f"/documents/resume-pages/{filename}", "width": image.width, "height": image.height})
    bitmap.close()
    page.close()
(root / "lib/resume-pages.json").write_text(json.dumps(pages, indent=2) + "\n", encoding="utf-8")
print(json.dumps(pages))
