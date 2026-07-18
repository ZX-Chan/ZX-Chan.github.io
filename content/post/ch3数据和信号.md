---
title: "CH3数据和信号"
description: "Computer Networks 笔记"
slug: "ch3数据和信号"
date: "2025-12-25"
categories:
    - "Computer Networks"
tags:
    - "notes"
---

- ==重点：Shannon定理  奈奎斯特速率==
- 物理层考虑怎样在连接各种计算机的传输媒体上传输数据比特流
- 尽可能屏蔽掉不同传输媒体的传输手段的差异

## 模拟与数字
- 数据要进行传输，必须被转换成电磁信号

## 信号
- 模拟信号与数字信号
- 周期 非周期
### 复合信号
- 第一谐波


## 数字信号
- 信号有$L$ 个电平，则每个信号位可以携带$log_2L$个bit
### 比特率
- 1秒内发送的位数
### 数字信号的传输
#### 基带传输
通过通道发送数字信号，不转换成模拟信号。需要一个带宽下限频率为0的低通通道。![](/images/notes/computer-networks/Pasted_image_20241226152005.png)
只有我们有无穷大或非常大带宽的低通通道，保持数字信号形状的数字信号基带传输才是可能的。
#### 宽带传输
把数字信号转换成模拟信号传输，允许使用带通通道。
- 带通通道：带宽不从0开始的通道
![](/images/notes/computer-networks/Pasted_image_20241226152412.png)
如果可用通道是带通通道，我们不能直接发送数字信号到通道；
我们需要在传输前把数字信号转换成模拟信号。

## 传输减损
### 衰减
![](/images/notes/computer-networks/Pasted_image_20241226152642.png)
- 分贝：dB
一个纯计数单位，没有单位
$dB=10log_{10} \frac{P_1}{P_2}$
### 失真
![](/images/notes/computer-networks/Pasted_image_20241226153022.png)
### 噪声
![](/images/notes/computer-networks/Pasted_image_20241226153039.png)
- 信噪比 SNR

## 数据速率限制
### 奈奎斯特速率  无噪
$比特率= 2 \times 带宽 \times log_2L$
增加信号电平数会减弱系统的可靠性
### Shannon 有噪
$通道容量=带宽 \times log_2(1+SNR)$
当SNR很大时，假定1+SNR=SNR

- 奈氏准则和Shannon公示的意义不同
奈氏准则：激励工程人员不断探索更加先进的编码技术，使每一个码元携带更多比特的信息量。
香农公式：告诫工程人员，在实际有噪声的信道上，不论采用多么复杂的编码技术，都不可能突破信息传输速率的绝对极限。
