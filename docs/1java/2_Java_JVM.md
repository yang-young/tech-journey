---
sidebar_position: 2
---

# Java JVM

## 查看字节码工具

### Jclasslib

* 基础信息
* 常量池
* 字段
* 方法
* 属性

### Javap   JDK自带反编译工具

```sh
# 解压jar包
jar -xvf xxxx.jar
# 转换字节码文件
javap -v xxxx.class > abc.txt
```

### Idea 插件jclasslib

### arthas

* 监控面板
* 查看字节码信息
* 方法监控
* 类的热部署
* 内存监控
* 垃圾回收监控
* 应用热点定位

```sh
# 字节码文件
dump命令
dump -d /tmp/output java.lang.String

jad 包名.类型
反编译指定已加载类的源码


```

## 类

### 类的生命周期

* 加载(加载到元空间(方法区,堆区))

  > 本地文件
  >
  > 动态代理生成
  >
  > 通过网络传输的类

  JDK自带的hsdb

  ```sh
  # 查看内存
  hsdb
  # 查看java进程
  jps
  ```

* 连接

  * 验证

    * 文件格式
    * 元信息
    * 语义
    * 符号引用验证

  * 准备(堆区)

    静态变量赋初值

  * 解析

    符号引用转为直接引用

* 初始化

  执行静态代码块,为静态变量赋初值

  调用Class.forName

  new一个该类的对象时

  执行main方法的当前类

  > 类的生命周期:
  >
  > `static块 -> {} -> constructor -> 方法`

* 使用

  类加载器

  * Java 代码实现
  * Java底层虚拟机底层源码实现

  arthas 可以查看类加载器

  类加载器分类:

  * 启动类加载器

  * 扩展类加载器

    加载`jre/lib/ext`中的jar包, 可以指定扩展jar包目录,可以启动的时候指定扩展jar包文件夹

  * 应用程序类加载器

    当前项目中的类

    maven依赖包中的类

* 卸载

### 类的双亲委派机制

向上查找是否加载过,向下尝试查找目录加载

> 启动类加载器
>
> > 扩展类加载器
> >
> > > 应用程序类加载器
> > >
> > > > 自定义类加载器

## JVM 内存

### 栈内存   存方法调用

```sh
# 设置栈大小
-Xss 2M
```

### 堆内存   存对象  

```sh
# 设置堆大小
-Xmx -Xms
```

### 方法区 (元空间 )

* 类的元信息
* 运行时常量池
* 字符串常量池

### 直接内存  (元空间存在于直接内存)

```sh
-XX:MaxDirectMemorySize
```

## 垃圾回收(GC)

### 垃圾回收条件:

* 所有实例对象已经被回收
* 类加载器已经被回收
* 类对应的java.lang.Class对象没有在任何地方被引用

arthas heapdump 将对内存快照保存下来

### 为什么存在新生代/老年代

新生代(伊甸园,幸存区)存活时间短

老年代  存活时间长

## 内存调优

内存泄漏大部分为堆内存泄漏引起

VisualVM  可以监控内存使用情况

arthas tunnel 监控多个微服务内存

Prometheus + Grafana

### 内存泄漏

1. 没有正确重写 equals() 和 hashCode() 导致的内存泄漏
2. 内部类引用外部类 (使用静态内部类, 静态方法)
3. ThreadLocal的使用(使用完后调用remove方法回收)
4. String的intern方法(随机生产的字符串不要加入常量池)
5. 通过静态字段保存对象(减少对象保存在静态变量中,不再使用的对象及时删除; 使用单例模式时尽量使用懒加载; Spring Bean不要长期存放大对象)
6. 资源没有正常关闭
7. 并发请求问题导致的内存溢出(原因:并发请求量大,请求保存数据大,请求处理时间长)(tomcat 最大并发请求200个)   (Jmeter 测试工具)

### 内存泄漏快照 分析

导出内存快照

* JDK 自带的jamp命令导出

  ```sh
  jmap -dump:live,format=b,file= 文件路径和文件名 进程ID
  ```

* 通过arthas的headdump命令导出

  ```sh
  heapdump --live 文件名和文件路径
  ```

#### 分析内存快照工具: MAT ,  HeapHero

### 内存溢出情况

#### 1. Mybatis导致内存溢出

在使用foreach进行sql拼接时

解决办法:

限制参数中ID的个数; 将ID存到缓存中

#### 2. 导出大文件导出

导出大文件Excel

解决办法:

使用poi的SXSSFWorkbook

hutool提供的BigExcelWriter减少内存开销

使用easy excel, 对内存进行了大量优化

#### 3. 在线定位问题

```sh
jmap -histo:live 进程ID > 文件名
```

分析内存占用最多的对象

使用arthas 的stack 命令

## GC调优

* 通用JVM参数设置
* 特定垃圾回收器JVM参数的设置
* 解决由频繁的FULLGC引起的程序性能问题

### GC 调优核心指标( 使用  Gceasy 分析工具)

1. 吞吐量,  业务吞吐量和垃圾回收吞吐量
2. 延迟
3. 内存使用量

### 监控工具

#### 1. jstat 工具   (JDK自带的一款监控工具)

```sh
jstat -gc 进程ID 每次统计间隔(毫秒)  统计次数
```

#### 2. VisualVm ( 插件 Visual GC)

#### 3. 打印GC日志

JDK8 及以下

```sh
-XX:+PrintGCDetails -Xloggc:文件名
```

JDK9+ 

```
-Xlog:gc*:file=文件名
```

#### 4. 可视化GC分析工具

* GCView

* GCeasy

### 常见GC模式

* 缓存对象过多
* 内存泄漏
* 持续的FullGC
* 元空间不足导致的FullGC

### 解决方案

1. 优化基础的JVM参数 (官方文档查看JVM参数)
2. 减少对象的产生
3. 更换垃圾回收器
4. 优化垃圾回收器参数

## 解决问题

### JVM参数

```sh
-Xms1g 初始堆内存大小
-Xmx1g 最大堆内存大小
-Xss256k 栈内存大小
-XX:MaxMetaspaceSize=512m 最大元空间大小
-XX:+DisableExplicitGC System.gc() 方法失效
-XX:+HeapDumpOnOutOfMemaryError 内存泄漏时将内存快照保存下来
-XX:HeapDumpPath=快照路径 内存快照保存路径
-XX:+PrintGCDetails 打印垃圾回收的详细信息
-XX:+PrintGCDateStamps 打印垃圾回收的时间
-XX:Xloggc:文件路径 将垃圾回收保存在文件中
```

### 减少对象的产生

### 垃圾回收器的选择

对不同垃圾测试选择合适的垃圾回收器

### 垃圾回收参数调优

### 性能调优

* CPU占用率过高(JKD jstack, visualVM查看)

  ```sh
  # 查看进程ID
  jps
  # 线程转储文件
  jstack ID > xxx.tdump
  ```

  线程转储文件在线分析地址: https://jstack.review/

  fastthread

* 接口响应时间长

  使用arthas的`trace`命令进行方法耗时分析

  ```sh
  trace 类名 方法名
  --skipJDKMethod false 输出JDK核心包中的方法和耗时
  '#cost > 毫秒值' 显示大于该毫秒值的调用
  -n 显示的条数
  
  所有监控结束之后,输入stop结束监控
  
  ```

  使用`trace`定位到性能较低的方法之后,使用`watch`命令监控该方法

  ```sh
  watch 类名 方法名'{params, returnObj}' '#cost > 毫秒值' -x 2
  ```

* arhas火焰图分析

  ```sh
  profiler start 开始监控
  profiler stop 暂停监控
  ```

* 死锁问题

  ```sh
  jstack -l 进程ID > 文件名 将线程栈保存到本地
  ```

### 正确的测试代码性能

OpenJDK 中提供了一款JMH(Java Microbenchmark Harness) 的工具, GitHub 开源



## 参考
[视频](https://www.bilibili.com/video/BV1r94y1b7eS/?p=120&spm_id_from=pageDriver&vd_source=ffa7fe4a0264832cdf55d922ca134cf1)  


