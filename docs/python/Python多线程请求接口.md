# Python 多线程请求接口


```python
import requests
import queue
import threading

url = ""

body = {
    "userId":"xxxxxxxxxxx",
    "title":"Web",
}

myfile = open('/Users/mac/Downloads/user.txt')
line = myfile.readline()

queue = queue.Queue()

while line:
    current_line = line.strip()
    queue.put(current_line)
    line = myfile.readline()
myfile.close()

def print_numbers(queue, stop_event):
    while not stop_event.is_set():
        try:
            num = queue.get(timeout=1)
            body["userId"] = num
            x = requests.post(url, json = body)
            if x.status_code == 200:
                print("完成==>" + " 用户ID:" + num)
            else:
                print("失败：" + num)
        except Exception:
            stop_event.set()
            break
# 设置线程数量        
num_threads = 20
stop_event = threading.Event()
threads = [threading.Thread(target=print_numbers, args=(queue, stop_event)) for _ in range(num_threads)]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print("send Done!!!!!")

```


