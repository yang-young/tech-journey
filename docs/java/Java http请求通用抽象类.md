---
sidebar_position: 5
---

# Java http请求通用抽象类

## http 请求响应参数类
```java
public class ResponseParam<T> {
        /**
         * 状态
         * @see ResponseCodeEnum
         */
        private String code;
        /**
         * 消息
         */
        private String msg;
        /**
         * 数据体
         */
        private T data;

    }
```
## http 请求抽象类

请求参数类继承该抽象类实现对应方法

```java showLineNumbers
public abstract class PostRequest<REST> {
        public ResponseParam<REST> post() {
            Map<String, String> headerMap = new HashMap<>(10);
            headerMap.put("Content-Type", "application/json");
          
            String apiUrl = BASE_URL + this.pathUrl();
            CsLog.debug("post请求路径：{}, 请求头：{}, 请求参数：{}", apiUrl, headerMap, JSONObject.toJSONString(this));
            String responseJson = HttpClientUtil.sendPostJson(apiUrl, headerMap, JSONObject.toJSONString(this));
            ResponseParam<REST> response = JSONObject.parseObject(responseJson, ResponseParam.class);
            CsLog.debug("post 响应结果：{}", JSONObject.toJSONString(response));
            if (Objects.nonNull(response) && ResponseCodeEnum.SUCCESS.code.equals(response.getCode())) {
                return JSON.parseObject(responseJson, new TypeReference<ResponseParam<REST>>(new Type[]{((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0]}) {}, new Feature[0]);
            } else {
                String codeDesc = ResponseCodeEnum.getCodeDesc(response.getCode());
                throw new RuntimeException("post 响应结果异常,响应描述：" + codeDesc + ",响应结果：" + responseJson);
            }
        }

        /**
         * 请求路径
         * @return
         */
        abstract String pathUrl();
    }
```

## 响应code码枚举

```java
public enum ResponseCodeEnum {
        /**
         * 响应码
         */
        SUCCESS("0", "Success"),
        FAIL("999", "Fail");
        private final String code;
        private final String desc;

        ResponseCodeEnum(String code, String desc) {
            this.code = code;
            this.desc = desc;
        }

        public static String getCodeDesc(String code) {
            for (ResponseCodeEnum responseCodeEnum : ResponseCodeEnum.values()) {
                if (code.equals(responseCodeEnum.code)) {
                    return responseCodeEnum.desc;
                }
            }
            return "响应码" + code + "，未知类型响应码" ;
        }
    }
```




