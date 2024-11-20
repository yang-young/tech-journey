---
sidebar_position: 7
---

# Java发送邮件

```java showLineNumbers
private static void sendGmail(String toEmail, String title, String content) {
        if (StringUtil.isEmpty(toEmail) || StringUtil.isEmpty(fromEmail) || StringUtil.isEmpty(password)) {
            return;
        }

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(fromEmail, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(toEmail)
            );
            message.setSubject(title);
            message.setContent(content, "text/html;charset=utf-8");

            Transport.send(message);

            log.debug("邮件发送成功，收件人：{}", toEmail);

        } catch (MessagingException e) {
            log.error(e, "邮件发送失败，收件人：{}, 错误信息：{}", toEmail, e.getMessage());
        }
    }
```



```java 
message.setContent(content, "text/html;charset=UTF-8");
```

字符集类型设置为 `UTF-8` 报错:

```
<详情>: javax.mail.MessagingException: IOException while sending message;
  nested exception is:
	java.io.UnsupportedEncodingException: UFT-8
	at com.sun.mail.smtp.SMTPTransport.sendMessage(SMTPTransport.java:1365)
	at javax.mail.Transport.send0(Transport.java:255)
	at javax.mail.Transport.send(Transport.java:124)
	at com.chushou.video.service.util.SendEmailUtil.sendGmail(SendEmailUtil.java:104)
	at com.chushou.video.service.util.SendEmailUtil.sendBindingGmail(SendEmailUtil.java:52)
	at com.chushou.video.service.mq.consumer.AsyncHandleConsumer.process(AsyncHandleConsumer.java:202)
	at com.chushou.video.service.mq.consumer.MqBaseConsumer.consume(MqBaseConsumer.java:37)
	at com.chushou.video.mq.consumer.AbstractConsumer.onMessage(AbstractConsumer.java:189)
	at org.apache.rocketmq.client.impl.consumer.ConsumeMessageConcurrentlyService$ConsumeRequest.run(ConsumeMessageConcurrentlyService.java:392)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:853)


```



## 参考

[发送Email](https://www.liaoxuefeng.com/wiki/1252599548343744/1319099923693601)