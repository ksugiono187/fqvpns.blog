# 航线观察 · fqvpns.blog

中文机场 / VPN 资料与选择指南。Astro 静态生成，Tailwind，TypeScript，Content Collections。

## 使用

需要 Node 22.12+（建议 Node 24）。

```sh
npm ci
npm run check
npm test
npm run build
npm run audit
npm run dev
```

生产输出：`dist/`。Cloudflare Pages 构建：`npm run build`。

## 内容与数据

- 唯一品牌数据源：`src/data/airports.ts`
- 文章：`src/content/articles/*.md`
- 内容校验：`src/content.config.ts`
- 评测模板：`docs/review-template.md`；缺少实测不得发布。
- 关键词地图：`docs/keyword-map.csv`
- 更新记录：`docs/page-history.json`（真实输出变化才更新 lastmod）
- 部署说明：`docs/deployment.md`
- Bing 操作：`docs/bing-webmaster.md`
- 最终验收：`docs/final-audit.md`

## IndexNow

已经生成公开验证 Key（非私密凭据），见 `src/data/indexnow.json`，对应文件位于 `public/`。
更换 Key 可设置 `INDEXNOW_KEY` 并重新构建；旧公开 Key 文件可由维护者另行移除。

```sh
npm run indexnow -- --dry-run /blog/selection-checklist/
npm run indexnow -- /blog/selection-checklist/
npm run indexnow -- --file changed-urls.json
npm run indexnow -- --changed
```

首次 `--changed` 会将全部当前可索引页面识别为新增；后续根据本地成功提交记录仅提交通知后变化的页面。状态位于 `.cache/indexnow-submitted.json`，运行环境更换前应保留该状态。构建不执行提交。提交前校验正式域名上的 Key 文件；未上线时不提交。HTTP 200/202 只表示通知被接受，不表示收录。

## 依赖兼容

当前 Windows 环境验证组合：Astro 6.4.8、Tailwind 4.2.1、Node 24。尝试 Astro 7.3.8 时内容加载器在此环境出现 CommonJS 问题；Tailwind 4.3.3 与当前 Vite 组合出现原生绑定错误。交付使用已构建通过的锁定版本，`package-lock.json` 纳入 Git。升级后重新运行完整验收。

## 数据边界

五个品牌均为 VPN，不作为已核实代理机场。价格与少量字段来自 2026-10-12 核验的官方网页；无测速、稳定性、AI 或流媒体实测，无联盟推广链接。付费定量套餐不足，不发布每 GB 排名。综合资料榜仅衡量资料字段覆盖。详见编辑政策和来源日志。
