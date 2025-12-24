// // tools/gen-stack-item.js
// const fs = require('fs');
// const path = require('path');

// const csvPath = path.resolve(__dirname, '../data/StackItem.csv');
// const outPath = path.resolve(__dirname, '../src/config/StackItemTemplate.ts');

// // 简单 CSV 解析（不引第三方）
// function parseCSV(text) {
//     const lines = text.trim().split('\n');
//     const headers = lines.shift().split(',');

//     return lines.map(line => {
//         const values = line.split(',');
//         const row = {};
//         headers.forEach((h, i) => {
//             row[h.trim()] = values[i]?.trim();
//         });
//         return row;
//     });
// }

// const csvText = fs.readFileSync(csvPath, 'utf-8');
// const rows = parseCSV(csvText);

// // 构建模板对象
// const template = {};
// rows.forEach(row => {
//     if (!row.id) return;

//     template[row.id] = {
//         id: row.id,
//         name: row.name,
//         info: row.info,
//         level: row.level
//     };
// });

// // 生成 TS 文件内容
// const output =
// `// ⚠️ 自动生成文件，请勿手改
// export const StackItemTemplate = ${JSON.stringify(template, null, 4)} as const;
// `;

// fs.writeFileSync(outPath, output, 'utf-8');

// console.log('✅ StackItemTemplate.ts 生成完成');
