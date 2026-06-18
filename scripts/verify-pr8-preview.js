const fs = require("fs");
const path = require("path");

const target = path.join(__dirname, "..", "assets", "previews", "factory_dashboard_preview.html");
const html = fs.readFileSync(target, "utf8");

const requiredSnippets = [
  "ERP 조회를 완료했습니다. 메일 처리 결과 3건을 확인해 주세요.",
  "협력사 회신 현황",
  "당일 결품 판정 결과",
  "상세 창 열기",
  "R600W0871-C2390",
  "금일 10:00",
  'id="open-erp"',
  'id="toggle-auto-refresh"',
  'id="refresh-now"',
  'id="export-shortage-csv"',
  'id="export-mail-history-csv"',
  'id="history-search-input"',
  'id="history-date-input"',
  "window.open(ERP_URL",
  'downloadCsv(',
];

const missing = requiredSnippets.filter((snippet) => !html.includes(snippet));

if (missing.length > 0) {
  console.error("PR #8 preview is missing required EXE-aligned content:");
  for (const snippet of missing) {
    console.error(`- ${snippet}`);
  }
  process.exit(1);
}

console.log("PR #8 preview contains the expected EXE-aligned content.");
