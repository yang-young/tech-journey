# MySQL 高级教程

## SQL分类

* DDL (Data Definition Laguage) 用于定义和管理数据库结构和对象
* DML (Data Manipulation Language) 数据库中进行增删改操作
* DQL (Data Query Language) 数据库中查询操作
* DCL (Data Control Language)  定义数据库用户权限和控制事务
  * 数据库用户权限信息 user 表

## 字段约束

* 唯一约束 (UNIQUE)
* 非空约束 (NOT NULL)
* 默认约束 (DEFAUTL)
* 检查约束 (CHECK)
* 主键约束 (PRIMARY KEY)
* 外键约束 (FOREIGN KEY)

## 事务

```sql
select @@autocommit;
set @@autocommit = 0;  # 手动提交
```

* 原子性
* 一致性
* 隔离性
* 持久性

## 存储引擎

存储数据,建立索引,更新/查询数据的方式

* InnoDB 支持事务,支持行锁,支持外键
* MyISAM (MongoDB)
* MEMORY (Redis替代)

## 索引

索引是一种数据结构, 索引是帮助MySQL高效获取数据的数据结构

索引, 优点: 提高查询/排序效率

#### 索引类型

* B+Tree(多路平衡查找树) 所有的元素都会出现在叶子结点
* Hash 只有Memory引擎支持      采用hash算法映射到对应槽位,然后存储到hash表中
* R-Tree   空间索引是MyISAM引擎的一个特殊索引类型
* Full-text 通过建立倒排索引,快速匹配文档

## SQL性能分析

* SQL执行频率

  ```sql
  SHOW GLOBAL STATUS LIKE 'Com________';
  ```

* 慢查询日志

  ```sql
  show variable like 'slow_query_log';
  ```

  ```sql
  # 了解耗时情况
  show profiles
  # 查询指定sql的各个阶段的耗时情况
  show profile for query query_id;
  # 查询指定sql的cpu的使用情况
  show profile cpu for query query_id;
  ```

* explain 查看sql 的执行计划

  ```sql
  explain SQL
  ```

### 索引的使用原则

* 联合索引 (最左前缀法则)

  * 联合索引中,范围查询尽量使用 >=, 否则查询右侧的列索引失效

#### 索引失效

  * 索引列上计算操作
  * 字符串类型使用时,不加引号,索引失效
  * 模糊查询 (头部模糊匹配 索引失效,尾部模糊匹配 所以不会失效)
  * or连接的条件 (前面有索引,后面没有索引  索引失效)
  * 数据分布影响 (MySQL 评估使用索引比全表更慢,则不使用索引)

#### 索引使用

SQL使用指定索引

```sql
# 指定索引
select * from table use index()
# 忽视索引
select * from table ignore index()
# 强制使用索引
select * from table force index()
```

* 注意覆盖索引/回表查询

* 前缀索引

  ```sql
  create index idx_xxxxx on table_name(column(n));
  # 评估前缀重复项
  select count(distinct substring(email, 1, 9)) / count(*) from table_name;
  ```

  

## SQL优化策略

### 插入优化

* 批量插入

* 手动事物提交

* 主键顺序插入

* 大批量插入数据

  ```sql
  load data local infile '文件路径' into table table_name fields terminated by ',' lines terminated by '\n'; 
  ```

### 主键优化

* 满足业务需求的情况下尽量降低主键的长度
* 插入时,尽量选择顺序插入,选择使用自增主键
* 尽量不要使用UUID做主键
* 避免对主键的修改

### order by 优化

* 执行计划最好是使用using index
* 排序字段建立合适的索引,多字段排序时,遵从最左前缀法则
* 尽量使用覆盖索引
* 多字段排序,一个升序一个降序,注意索引创建时的规则
* 如果不可避免出现filesort.可以适当增加排序缓存区

### group by优化

* 建立适当的索引 (满足最左前缀法则)

### limit优化

* 覆盖索引和子查询的方法优化

### count优化

* 通过缓存计数

  ```sql
    count(*);  不取值直接类加
    count(主键);
    count(字段); # 统计多少个字段不为NULL
    count(1);  
    ```

### update优化

* 更新的条件有索引更新时会进行行锁, 没有索引的时候行锁会升级为表锁

## 存储过程

## 存储函数

## 触发器

## 锁

### 全局锁 (锁定数据库中所有表)

```sql
# 加锁
flush tables with read lock;
```

```bash
# 数据备份 (系统终端执行)
mysqldump --single-transaction -uroot -p1234 数据库名 > 数据库名.sql;
```
```sql
# 释放锁
unlock tables;
```

### 表级锁 (每次操作锁住整张表)

* 表锁

```sql
# 加锁
lock tables 表名 read/write;
# 释放锁
unlock tables 表名;
```

* 元数据锁
* 意向锁

### 行级锁 (每次操作锁住对应的行)

* InnoDB的数据是基于索引组织的

## InnoDB引擎

### 事务

* 原子性(atomicity)
* 一致性(consistency)
* 隔离性(isolation)
* 持久性(durability)

## 运维相关

### 日志

### 主从库 (读写分离,数据备份)

### 分库分表

* IO瓶颈
* CPU瓶颈

#### 垂直拆分

##### 垂直分库

将不同的表查分到不同的库

##### 垂直分表

以字段属性为依据将不同字段拆分到不同的表中

#### 水平拆分

##### 水平分库

以字段为依据,按照一定的策略,将一个库的数据拆分到多个库

##### 水平分表

以字段为依据,按照一定的策略,将一个表的数据拆分到多个表中

#### 支持的中间件

* shardingJDBC
* MyCat

### 读写分离

基于主从复制


## 参考链接
[视频](https://www.bilibili.com/video/BV1Kr4y1i7ru/?p=148&vd_source=ffa7fe4a0264832cdf55d922ca134cf1)
















