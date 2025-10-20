# Python语法糖

[[toc]]

## 列表/字典/集合 推导式（List/Dict/Set Comprehensions）
列表推导式是一种简洁的创建列表的方式。它允许你在一行代码中生成一个新的列表。

```python
# 列表推导式
squares = [x**2 for x in range(10)]
print(squares)  # 输出: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

类似地，字典和集合也可以使用推导式来创建：

```python

# 字典推导式
squared_dict = {x: x**2 for x in range(10)}
print(squared_dict)  # 输出: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81}
# 集合推导式
unique_squares = {x**2 for x in range(10)}
print(unique_squares)  # 输出: {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}
```

## 生成器表达式（Generator Expressions）

生成器表达式是一种延迟计算的方式，它允许你在需要时才生成值，而不是立即生成所有值。这在处理大型数据集时非常有用，因为它可以节省内存。

```python
# 生成器表达式
squares_gen = (x**2 for x in range(10))
print(squares_gen)  # 输出: <generator object <genexpr> at 0x...>
# 可以使用 next() 函数来获取生成器的下一个值
print(next(squares_gen))  # 输出: 0
print(next(squares_gen))  # 输出: 1
# 或者使用 for 循环来遍历生成器
for square in squares_gen:
    print(square) # 输出: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81
```

## 条件表达式（Conditional Expressions）

条件表达式，也称为三元表达式，允许你在一行代码中根据条件选择值。

```python
# 条件表达式
age = 20
# 使用条件表达式来判断是否成年
is_adult = '成年' if age >= 18 else '未成年'
print(is_adult)  # 输出: '成年'
```

## 链式比较（Chained Comparisons）

Python 支持链式比较，这意味着你可以在一个表达式中进行多个比较。

```python
# 链式比较
x = 5
if 0 < x < 10:
    print(f"{x} 在 0 和 10 之间")  # 输出: 5 在 0 和 10 之间
```

## 解包赋值（Unpacking Assignments）

解包赋值允许你将可迭代对象的元素直接赋值给多个变量。

```python
# 解包赋值
point = (3, 4)
x, y = point
print(f"x: {x}, y: {y}")  # 输出: x: 3, y: 4
# 交换变量值
a, b = 1, 2
a, b = b, a
print(f"a: {a}, b: {b}")  # 输出: a: 2, b: 1
# 元组/列表解包
a, b = [1, 2]

# 函数参数解包
def foo(x, y):
    return x + y
args = (1, 2)
foo(*args)

# 字典解包
kwargs = {'x': 1, 'y': 2}
foo(**kwargs)
```

## f字符串（f-Strings）

f字符串是一种格式化字符串的简洁方式，允许你在字符串中嵌入表达式。

```python
# f字符串
name = 'Alice'
age = 25
# 使用 f 字符串来格式化输出
print(f"我的名字是 {name}，我今年 {age} 岁。")  # 输出: 我的名字是 Alice，我今年 25 岁。
```

## 上下文管理器（Context Managers）

上下文管理器允许你在代码块执行前后自动处理资源管理（如文件操作）。

```python
# 上下文管理器
with open('example.txt', 'w') as file:
    file.write('Hello, World!')
# 文件在退出 with 块时会自动关闭
```

## 装饰器（Decorators）
装饰器是一种用于修改函数或方法行为的高级功能。

```python
# 装饰器
def decorator(func):
    def wrapper():
        print("函数开始执行")
        func()
        print("函数执行结束")
    return wrapper

@decorator
def my_function():
    print("这是我的函数")

@app.route('/')
def home():
    return "Hello World"
```

## Walrus 操作符
Walrus 操作符（:=）允许你在表达式中赋值。

```python
# Walrus 操作符
if (x := 5) > 0:
    print(f"{x} 是一个正数")  # 输出: 5 是一个正数

if (n := len(data)) > 10:
    print(f"Data is too long: {n}")
```

## async / await
async / await 是 Python 中用于异步编程的关键字。它们允许你在函数中暂停执行，等待异步操作完成，而不会阻塞其他代码的执行。

```python
# async / await 示例
import asyncio

async def fetch_data(url):
    # 模拟异步操作，如网络请求
    await asyncio.sleep(1)
    return f"Data from {url}"

async def main():
    url = "https://example.com"
    # 调用异步函数并等待结果
    data = await fetch_data(url)
    print(data)

# 运行异步主函数
asyncio.run(main())
```

## enumerate() / zip()
`enumerate()` 和 `zip()` 是两个内置函数，用于简化迭代操作。

```python
# enumerate() 示例
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"Index: {index}, Fruit: {fruit}")
     # 输出:
     # Index: 0, Fruit: apple
     # Index: 1, Fruit: banana
     # Index: 2, Fruit: cherry

# zip() 示例
numbers = [1, 2, 3]
letters = ['a', 'b', 'c']
for num, letter in zip(numbers, letters):
    print(f"Number: {num}, Letter: {letter}")
    # 输出:
    # Number: 1, Letter: a
    # Number: 2, Letter: b
    # Number: 3, Letter: c
```