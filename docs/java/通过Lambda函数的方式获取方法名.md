---
sidebar_position: 6
---


# 通过Lambda函数的方式获取方法名

1. 定义一个函数式接口

```java
import java.io.Serializable;

public interface SFunction <T> extends Serializable {
    Object apply(T t);
}
```

2. 定义工具类获取方法名称

```java showLineNumbers
import java.lang.invoke.SerializedLambda;
import java.lang.reflect.Method;
import java.util.Map;

public class BeanOperateUtil {
    public static <T> String getMethodName(SFunction<T> function) {
        SerializedLambda serializedLambda = getSerializedLambda(function);
        return serializedLambda.getImplMethodName();
    }

    private static <T> SerializedLambda getSerializedLambda(SFunction<T> function) {
        try {
            Method method = function.getClass().getDeclaredMethod("writeReplace");
            method.setAccessible(Boolean.TRUE);
            return (SerializedLambda) method.invoke(function);
        }
        catch (Exception e) {
            throw new RuntimeException("get SerializedLambda exception.", e);
        }
    }
}
```



## 参考链接：

[通过Lambda函数的方式获取属性名称](https://www.cnblogs.com/ludangxin/p/17775334.html)


