# 图形的人机交互（拖拽）

---

### 使用说明：

程序可在线运行，访问地址为：[Human-Computer Interaction for Figures](https://sorosliu1029.github.io/Computer_Graphics/graph_human-computer_interaction/hci.html)

可以在网页上拖拽移动两个圆形。

### 程序说明：

交互过程使用了d3.js。

初始在画布上绘制了两个圆形。

定义了一个监听拖拽事件的函数。当产生拖拽时，相应地更新圆形的圆心到拖拽的鼠标位置。d3会自动重新在新位置绘制。

### 参考：

[d3.js](https://d3js.org/)

