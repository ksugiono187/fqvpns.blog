# GitHub 与 Cloudflare Pages 部署

指定仓库：https://github.com/ksugiono187/fqvpns.blog
正式域名：https://fqvpns.blog

## 1. GitHub

本地已从指定远程克隆；开发前 `ls-remote` 确认远程为空。未覆盖任何未知代码。
检查 `git remote -v`，创建提交后使用 `git push -u origin main`。若权限不足，维护者需要授权该仓库写入或在本机完成 Git 凭据登录；不要把令牌放进源码。

## 2. 创建 Pages 项目（需要用户登录 Cloudflare）

在 Cloudflare 的 Workers & Pages 创建 Pages 项目并连接上述 GitHub 仓库。此步骤需授权 Cloudflare 读取该仓库。

配置：

| 项目 | 值 |
|---|---|
| 生产分支 | main |
| 框架 | Astro |
| 构建命令 | npm run build |
| 输出目录 | dist |
| 根目录 | 仓库根目录 |
| Node | NODE_VERSION=24 |

Pages 对静态站无需 Astro Cloudflare SSR Adapter。依赖安装使用锁文件，保持 Node 版本一致。官方说明：https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

## 3. 自定义域名与预览索引

构建成功后添加 `fqvpns.blog` 自定义域名，按 Pages 提示设置 DNS。确认 HTTPS、首页、随机内容页、`robots.txt`、`sitemap-index.xml` 和 Key 文件可访问。将 Pages 项目提供的 pages.dev 主机重定向到正式域名，并使用 Cloudflare Access 限制预览部署，避免预览域名产生重复索引。

未知路径必须返回 404 状态并显示 `404.html`，不要启用将所有路径重写到首页的 SPA fallback。

## 4. 环境变量

`BING_SITE_VERIFICATION`：Bing 提供的验证码；源码仅在变量实际存在时输出验证 meta。
`INDEXNOW_KEY`：可选覆盖公开 Key。Key 是公开验证文本，不是账户访问令牌。

## 5. 上线后验证

按 `docs/bing-webmaster.md` 完成网站验证、Sitemap 提交、URL Inspection 与 IndexNow Key 验证。再手动运行明确的新增/更新 URL 提交。不要在每次构建中无差别提交通知。

## 6. 运营准备

补充运营联系渠道；逐条审查内容与价格。取得真实机场官网/套餐、测试记录后再发布对应推荐与独立评测。当前没有代理机场实测资料，不能作为完整实测机场推荐站宣传。
