---
sidebar_position: 9
---

# Spring 常用注解

## Web
1. `@Controller`：标注控制层组件
2. `@RestController`： 是@RestController和@Controller的组合注解，并且返回json数据（返回格式的具体类型通常由客户端的 Accept 请求头和 Spring 的消息转换器（HttpMessageConverter）决定）
3. `@RequestMapping`： 路径映射到具体方法
    * `@GetMapping`： 只能用于处理GET请求，获取资源
    * `@PostMapping` ：只能用于处理POST请求，创建资源
    * `@PutMapping`： 只能用于处理PUT请求，替换整个资源
    * `@DeleteMapping`：只能用于处理DELETE请求，删除资源
    * `@PatchMapping`：只能用于处理PATCH请求，部分资源更新
4. `@ResponseBody`：将方法返回的对象转换为json格式，并返回给客户端
5. `@RequestBody`：将请求体中的json数据转换为对象
6. `@PathVariable`：将请求路径中的占位符替换为方法参数的值

## 容器
1. `@Component`：标注一个普通的POJO(Plain Old Java Object) 实例化到Spring容器，使其能够被Spring容器管理
2. `@Service`：标注服务层组件
3. `@Repository`：标注数据访问层组件（持久层）
4. `@Autowired`：自动注入，根据类型注入，如果找不到，根据名称注入
    `@Autowired`和`@Resource`都可以实现自动注入，但是`@Autowired`和`@Resource`来源不同，`@Autowired`是Spring框架中定义的注解，而`@Resource`是JSR-250规范中定义的注解。
    `@Autowired` 默认根据类型注入，支持构造方法注入，属性注入，Setter方法注入
    `@Resource` 默认根据名称注入，支持属性注入，Setter方法注入

    ```java
    public class UserServiceImpl implements UserService {
        // 属性注入
        @Autowired
        private final UserDao userDao;

        // 构造方法注入
        @Autowired
        public UserServiceImpl(UserDao userDao) {
            this.userDao = userDao;
        }

        // Setter方法注入
        @Autowired
        public void setUserDao(UserDao userDao) {
            this.userDao = userDao;
        }

    }

    ```

5. `@Qualifier`：明确指定依赖注入目标
    ```java
    @Autowired
    @Qualifier("creditCardPaymentService")
    private PaymentService paymentService;
    ```
6. `@Configuration`：定义一个配置类
7. `@Value`：用于向 Spring 管理的 Bean 中的字段注入值，可在字段或构造函数/方法上注解
    ```java
    @Value("${value.from.file}")
    private String valueFromFile;
    ```
8. `@Bean`：注解方法，产生一个Bean，并交给Spring容器管理
9. `@Scope`：定义了 Bean 存在的边界、与之绑定的上下文以及存活时间[<sup>[1]</sup>](#reference-anchor-1)

## AOP
1. `@Aspect`：用于声明一个切面
    * `@PointCut`：定义切点，指定需要拦截的方法。
    * `@Before`：在方法执行之前执行。
    * `@After`：在方法执行之后执行。
    * `@Around`：方法前后均执行。

## 事务
1. `@Transactional`：用于声明一个方法需要事务支持。
声明式事务失效的情况：
    * `@Transactional` 应用在非 `public` 修饰的方法上
    * `@Transactional` 注解属性 `propagation` 设置错误
    * `@Transactional` 注解属性 `rollbackFor` 设置错误
    * 同一个类中方法调用，导致`@Transactional` 失效


## 参考

<div id="reference-anchor-1"></div>

[1] [Spring Bean Scope 指南](https://springdoc.cn/spring-bean-scope-guides/)