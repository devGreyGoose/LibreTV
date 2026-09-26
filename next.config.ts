import type { NextConfig } from 'next';
import fs from 'node:fs';
import path from 'node:path';

/** 版本号以 package.json 为单一来源 */
function readAppVersion(): string {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')) as {
      version?: string;
    };
    return pkg.version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

const nextConfig: NextConfig = {
  // 核心配置：启用静态导出
  output: 'export',
  reactStrictMode: true,
  env: { APP_VERSION: readAppVersion() },
  // 静态导出必须禁用图片优化，否则会报错
  images: { unoptimized: true },
};

export default nextConfig;
