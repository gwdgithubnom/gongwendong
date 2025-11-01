import { createContentLoader } from "vitepress";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function formatDateToString(dateOrString) {
    let date = dateOrString;

    // 如果传入的是字符串，尝试将其解析为 Date 对象
    if (typeof dateOrString === 'string') {
        date = new Date(dateOrString);
    }
    
    // 校验：确保它是一个有效的 Date 实例
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return ''; // 解析失败或传入的不是有效 Date 对象，返回空字符串
    }

    // --- 格式化逻辑 ---
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 扩展路径匹配模式并添加更多调试信息
export default createContentLoader(["**/*.md", "**/*.mdx"], {
  includeSrc: true,
  render: false,
  excerpt: false,
  transform(rawData) {
    try {
      console.log("处理前文档数:", rawData.length);

      // 改进：从当前文件路径向上查找包含.vitepress的目录
      let docsDir = process.cwd(); // 默认使用当前工作目录作为初始值
      let currentPath = "";

      // 尝试多种方式获取当前文件的绝对路径
      try {
        // 优先使用import.meta.url (ES模块环境)
        if (typeof import.meta !== "undefined" && import.meta.url) {
          currentPath = import.meta.url.replace("file://", "");
          // console.log("通过import.meta.url获取当前路径:", currentPath);
        }
        // 其次使用__filename (CommonJS环境)
        else if (typeof __filename !== "undefined") {
          currentPath = __filename;
          // console.log("通过__filename获取当前路径:", currentPath);
        }
        // 再次使用process.argv[1] (Node.js环境)
        else if (process && process.argv && process.argv[1]) {
          currentPath = process.argv[1];
          // console.log("通过process.argv[1]获取当前路径:", currentPath);
        }
        // console.log("当前文件路径:", currentPath);
      } catch (error) {
        console.log("获取当前文件路径失败:", error.message);
      }
      let validUrl = null;
      if (currentPath.startsWith("file://")) {
        validUrl = currentPath;
      } else {
        if (currentPath.match(/^[a-zA-Z]:/)) {
          validUrl = `file:///${currentPath}`;
        } else if (currentPath.match(/^\/[a-zA-Z]:/)) {
          validUrl = `file:///${currentPath.slice(1)}`;
        } else{
          validUrl = `file://${currentPath}`;
        }
      }
      // 如果获取到了当前文件路径，则向上查找docs目录
      if (validUrl) {
        const fileCurrentPath = fileURLToPath(validUrl);
        let currentDir = path.dirname(path.resolve(fileCurrentPath)); // 2. 逐级向上查找
        let previousDir = null;

        // 循环条件：当前目录不等于上一次检查的目录（避免无限循环，直到到达根目录）
        while (currentDir !== previousDir) {
          // 检查当前目录中是否存在 .vitepress 文件夹
          const vitepressConfigPath = path.join(currentDir, ".vitepress");
          if (
            fs.existsSync(vitepressConfigPath) &&
            fs.lstatSync(vitepressConfigPath).isDirectory()
          ) {
            docsDir = currentDir; // 找到了包含 .vitepress 的父目录
            break;
          }
          // 向上移动到父目录
          previousDir = currentDir;
          currentDir = path.dirname(currentDir);
          // 如果 currentDir 已经指向根目录且没有找到，path.dirname 可能会返回相同的值，循环将停止
        }

        // 如果找到了docs目录，则使用它
        if (docsDir) {
          console.log("从",validUrl,"找到的docs目录路径:", docsDir);
        } else {
          docsDir = process.cwd();
        }
      }else{
        console.warn("无法确定当前文件路径，使用默认工作目录作为docs目录:", docsDir,validUrl);
      }

      // 验证docs目录是否存在且包含.vitepress子目录
      // const vitepressPath = path.join(docsDir, ".vitepress");
      // if (
      //   fs.existsSync(vitepressPath) &&
      //   fs.lstatSync(vitepressPath).isDirectory()
      // ) {
      //   console.log("docs目录验证成功，包含.vitepress子目录", vitepressPath);
      // } else {
      //   console.warn(
      //     "警告: docs目录中未找到.vitepress子目录，可能路径计算错误", vitepressPath
      //   );
      // }

        const timeZone = 'Asia/Shanghai'; // 北京时间 (CST) 对应 UTC+8
        const locale = 'en-US'; // 或 'zh-CN'，这决定了日期格式的习惯

        // 定义输出格式选项
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 使用 24 小时制
            timeZone: timeZone // 强制使用 UTC-8 对应的时区
        };
      // 简化处理逻辑，确保获取所有可能的页面
      const pages = rawData
        .filter((page) => {
          // 放宽过滤条件，只确保基本结构有效
          const isValid = page && page.url && typeof page.url === "string";
          if (!isValid) {
            console.log("过滤掉无效页面:", page);
          }
          return isValid;
        })
        .map((page) => {
          try {
            // 提取标题
            const title =
              page.frontmatter?.title ||
              page.src?.match(/#\s+([^\n]+)/)?.[1] ||
              "" ||
              "undefined";

            // 获取时间 - 提供多种兜底方案和北京时间转换
            let lastUpdated = 0;
            
            // 北京时间选项（UTC+8）
            const locale = 'zh-CN';
            const options = {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'Asia/Shanghai'
            };
            
            // 从frontmatter获取时间并校验
            let frontmatterTime = null;
            if (page.frontmatter?.date || page.frontmatter?.lastUpdated || page.frontmatter?.lastUpdatedTime) {
              const timeStr = page.frontmatter?.date || page.frontmatter?.lastUpdated || page.frontmatter?.lastUpdatedTime;
              const parsedDate = new Date(timeStr);
              // 时间有效性校验
              if (timeStr && !isNaN(parsedDate.getTime()) && parsedDate.getFullYear() > 1970) {
                frontmatterTime = timeStr;
                // console.log(`页面${page.url}的frontmatter时间有效:`, timeStr, parsedDate);
              } else {
                // console.log(`页面${page.url}的frontmatter时间无效:`, timeStr);
              }
            }
            // 设置最终的lastUpdated值 - 优先使用frontmatter时间，其次使用文件修改时间，最后使用当前时间
            if (frontmatterTime) {
              // 将frontmatter时间转换为北京时间
              lastUpdated = frontmatterTime.toLocaleString(locale, options);
              // console.log(`页面${page.url}使用frontmatter时间作为最后更新时间:`, formatDateToString(lastUpdated), title);
            } else {
              // 构建文件路径的逻辑
              let filePath = page.url === "/" ? "index.md" : page.url;
              // 移除URL末尾的斜杠
              if (filePath.endsWith("/")) {
                filePath = filePath.slice(0, -1);
              }
              // 如果路径没有文件扩展名，添加.md
              if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) {
                filePath = filePath + ".md";
              }
              // 移除开头的斜杠
              if (filePath.startsWith("/")) {
                filePath = filePath.slice(1);
              }

              // 构建完整的文件路径
              const fullPath = path.join(docsDir, filePath);
              // console.log('完整文件路径:', fullPath)

              // 检查文件是否存在，如果存在，尝试获取文件的修改时间
              let fileMtime = null;
              if (fs.existsSync(fullPath)) {
                try {
                  const stats = fs.statSync(fullPath);
                  fileMtime = stats.mtime;
                  // console.log(`文件${fullPath}的修改时间:`, fileMtime);
                } catch (error) {
                  console.log('获取文件状态失败:', error.message)
                }
              } else {
                // 尝试其他可能的文件路径格式
                const alternativePaths = [
                  path.join(docsDir, page.url + ".md"),
                  path.join(docsDir, page.url + ".mdx"),
                  path.join(docsDir, page.url, "index.md"),
                  path.join(docsDir, page.url, "index.mdx"),
                ];

                for (const altPath of alternativePaths) {
                  if (fs.existsSync(altPath)) {
                    try {
                      const stats = fs.statSync(altPath);
                      fileMtime = stats.mtime;
                      // console.log(`找到替代文件路径: ${altPath}, 修改时间: ${fileMtime}`);
                      break;
                    } catch (error) {
                      console.log("获取替代文件状态失败:", error.message);
                    }
                  }
                }
              }
              if (fileMtime) {
                // 将文件修改时间转换为北京时间
                lastUpdated = fileMtime.toLocaleString(locale, options);
              } else {
                // 如果都没有，使用当前时间（北京时间）
                // console.log(`页面${page.url}没有找到有效时间，使用当前北京时间:`, lastUpdated);
              }
            } 

            // 确保path是有效的字符串
            const pathPath = typeof page.url === "string" ? page.url : "";

            // console.log('处理页面:', { path: pathPath, title, lastUpdated })

            return {
              path: pathPath,
              title,
              lastUpdated: formatDateToString(new Date(lastUpdated)),
            };
          } catch (error) {
            console.error("处理页面时出错:", error, page);
            return null;
          }
        })
        .filter(Boolean); // 移除处理失败的页面

      console.log("处理后文档数:", pages.length);

      // 如果没有数据，提供默认的测试数据
      if (pages.length === 0) {
        console.log("没有找到页面，使用测试数据");
        return [
          {
            path: "https://gwdgithubnom.github.io",
            title: "个人文档",
            lastUpdated: new Date().getTime(),
          },
          {
            path: "https://gongwendong.github.io",
            title: "个人主页",
            lastUpdated: new Date(Date.now() - 86400000).getTime(),
          },
        ];
      }

      // 按更新时间降序排序
      const sortedPages = pages.filter(p => p.title!='undefined').sort((a, b) => b.lastUpdated > a.lastUpdated ? 1 : -1);
      // console.log("排序后的条数据:", sortedPages.length);
      return sortedPages.slice(0, 17);
    } catch (error) {
      console.error("处理页面数据时发生严重错误:", error);
      // 返回默认测试数据作为最后的兜底
      return [
      ];
    }
  },
});