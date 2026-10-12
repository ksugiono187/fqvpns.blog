# Bing Webmaster Tools 操作

以下步骤需要你登录并拥有 fqvpns.blog 的验证权限。账号凭据不写入项目。

1. 登录 https://www.bing.com/webmasters ，添加 `https://fqvpns.blog`。
2. 选择 DNS 验证、根目录 XML 文件或 meta 验证。XML 放进 `public/` 后重新部署；meta 将实际值设置为 `BING_SITE_VERIFICATION` 后重建；DNS 按工具指示操作。
3. 在 Sitemaps 提交 `https://fqvpns.blog/sitemap-index.xml`。查看子 Sitemap、读取状态和错误，确认正式 URL 数量与本地一致。文档：https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed
4. 查看项目 `src/data/indexnow.json` 的公开 Key，打开正式域名对应 `.txt` 文件，确认内容与 Key 完全相同。部署前不得提交。文档：https://www.indexnow.org/documentation
5. 使用 `npm run indexnow -- /blog/selection-checklist/` 提交单 URL；`--file` 支持 JSON 数组；`--changed` 根据当前输出与上次成功通知状态检测新增/修改。Key 验证失败停止，429/5xx/网络错误最多重试三次，日志在 `.cache/indexnow-http.jsonl`。
6. 在 URL Inspection 检查首页、资料页、文章页，查看抓取状态、索引状态、SEO 与 Markup，并用 Live URL 观察 Bingbot 获得的 HTML。文档：https://www.bing.com/toolbox/markup-validator
7. 在 Search Performance 查看查询词、曝光、点击和页面；以真实数据调整关键词，不虚构搜索量或排名。
8. 在 Sitemap 的 Index Coverage（若账号与站点提供该功能）和 Site Explorer 查看索引、未索引与抓取问题。小站点可能不提供同样的覆盖报告，应以当前控制台为准。文档：https://www.bing.com/webmasters/help/site-explorer-c680da37
9. 检查 Crawl Issues / Site Scan / robots 测试，排除 DNS、服务器错误、误封 CSS/JS 和不正确 noindex。名称可能随控制台更新变化。

本地 Schema 检查只验证 JSON 结构与部分可见内容，不代替 Bing Live 检查。IndexNow 200/202 不保证收录；Sitemap 成功读取不保证排名。禁止承诺 Bing 首页。
