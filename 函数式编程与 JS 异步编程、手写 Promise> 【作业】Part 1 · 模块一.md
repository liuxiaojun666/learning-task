![作业题](https://s0.lgstatic.com/i/image/M00/1F/4B/CgqCHl7m3iuAC31fAC18FIagZlY698.png)

### 简答题

#### 一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？

JS是单线程的，在处理执行任务的时候，同时只能执行一个任务。JS异步可以在遇到异步API代码时，发起一个异步调用（交给Web APIs处理，js是单线程，但运行环境web浏览器是多线程的），直接进入下一个任务。然后在回调函数或者事件监听触发时在处理后续逻辑。同步执行还是异步执行不是写代码的方式，而是运行环境提供的API是同步工作还是异步工作。

EventLoop 用来监听调用栈与消息队列，当调用栈为空时，就会依次执行消息队列里的回调函数。

消息队列存放的就像是异步执行的回调函数，在异步任务完成后讲回调函数插入消息队列，排队等候执行。

JS中宏任务是消息队列中的回调，排队等待执行。微任务在当前宏任务执行完后立即执行。微任务比宏任务优先执行。JS中宏任务有，setTimeout setInterval，微任务有process.nextTick、Promise.resolve、MutationObserver、queueMicrotask

### 代码题

