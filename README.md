# My Technical Note

This is my technical note, It's powered by [Docusaurus](https://docusaurus.io/), The documentation website can be found [here](https://img.carrothub.xyz/docs/intro).

## 拉取代码

```bash
# 将远程仓库复制到本地
git clone https://github.com/yang-young/tech-journey.git
# 从仓库拉去更新
git pull https://github.com/yang-young/tech-journey.git
```

## 使用Docker部署该项目

```bash
# 本地环境
docker build --target dev -t mynote:latest .
docker run -d -v /Users/mac/Documents/tech-journey:/opt/docusaurus mynote:latest

npm install && npm run start -- --host 0.0.0.0

# 开发环境
docker build --target dev -t mynote:latest .
docker run  --rm -d -v /root/notebook/tech-journey:/opt/docusaurus mynote:latest

# 生产环境
docker build -t mynote:latest .
docker run --rm -d mynote:latest
```

如果要将容器内端口映射到主机，请使用请映射端口，例如：

```bash
# docker run --rm -d -p 3000:3000 <tag>
docker run --rm -d -p 3000:3000 mynote:latest
```

----

如果你要初始化一个自己的项目

[Docusaurus中文文档](https://www.docusaurus.cn/docs)

关键命令：

```sh
npx create-docusaurus@latest tech-journey classic
```

## 参考链接：

[实例说明如何使用Docusaurus](https://blog.csdn.net/weixin_44026962/article/details/135520958)