---
sidebar_position: 8
---

# Java列表，集合分页

# java

```java showLineNumbers
public static <T> List<T> getPage(List<T> list, int page, int pageSize) {
    int fromIndex = (page - 1) * pageSize;
    if (fromIndex >= list.size()) {
        return Collections.emptyList();
    }
    int toIndex = Math.min(fromIndex + pageSize, list.size());
    return list.subList(fromIndex, toIndex);
}
public static <T> List<T> getPage(Set<T> set, int page, int pageSize) {
    List<T> list = new ArrayList<>(set);
    int fromIndex = (page - 1) * pageSize;
    if (fromIndex >= list.size()) {
        return Collections.emptyList();
    }
    int toIndex = Math.min(fromIndex + pageSize, list.size());
    return list.subList(fromIndex, toIndex);
}

```

