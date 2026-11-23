import { access, readFile } from 'node:fs/promises';
import { profile, projects } from '../content/site.js';

// 检查案例跳转依赖的数据和静态页面，避免更新内容后产生无效链接。
const slugs = new Set();
if (!profile.name || !Array.isArray(profile.headline)) throw new Error('个人信息不完整');
for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.slug) || slugs.has(project.slug)) throw new Error(`项目 slug 无效或重复：${project.slug}`);
  slugs.add(project.slug);
  const ids = new Set();
  for (const section of project.sections) {
    if (!/^[a-z0-9-]+$/.test(section.id) || ids.has(section.id)) throw new Error(`案例目录 id 无效或重复：${section.id}`);
    ids.add(section.id);
  }
  if (project.cover && !/^https?:\/\//.test(project.cover)) await access(new URL(`../${project.cover}`, import.meta.url));
}
if (profile.resumeUrl && !/^https?:\/\//.test(profile.resumeUrl)) await access(new URL(`../${profile.resumeUrl}`, import.meta.url));
for (const page of ['index.html', 'about.html', 'project.html', 'resume.html']) {
  const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
  for (const path of [...html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)].map(m => m[1])) await access(new URL(`../${path}`, import.meta.url));
}
console.log(`检查通过：4 个页面、${projects.length} 个案例，静态资源与案例目录有效。`);
