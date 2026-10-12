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

- 站方29个品牌与11个优惠码：`src/data/supplied-brands.ts`
- 26个品牌的170个参考套餐：`src/data/reference-plans.json`；计算规则：`src/data/selection.ts`
- 29品牌公开证据记录：`src/data/research.ts`；说明：`docs/public-research.md`
- 文章：`src/content/articles/*.md`
- 博客150篇、教程6篇、百科6篇；博客10页分页与完整主题目录；RSS：`/rss.xml`
- 扩充清单：`docs/article-expansion.md`；发现入口检查：`scripts/check-expansion.ts`
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

仅保留站方提供的29个品牌；入口含推广参数，优惠码与邀请参数分开。套餐来自指定第三方来源，不作为当前官网售价。价格榜按明确月付、月容量与单位成本计算，争议或缺失字段排除。公开线路与测速检索记录说明来源、时间、环境和冲突，本站未登录服务或执行品牌测速，物理线路全部未独立核验，不发布跨品牌性能排名。详见编辑政策、public-research.md与各品牌证据区域。
