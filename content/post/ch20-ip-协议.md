---
title: "CH20 IP 协议"
description: "Computer Networks 笔记"
slug: "ch20-ip-协议"
date: "2025-12-25"
categories:
    - "Computer Networks"
tags:
    - "notes"
---

## IPv4
- IPv4是不可靠的
- best-effort
### IPv4 Datagram
![](/images/notes/computer-networks/Pasted_image_20241231120223.png)
- Version：定义IPv4版本
- HeaderLength：由于数据报的头长度是可变的，需要定义总长度
	- 需要$\times 4$
	- 0001代表4字节长
- TypeofService：服务类型
	- 前面三位称为优先位，后面四位是服务类型，最后一位不使用
	- 。。。
- TOtalPacketLength：整个IPv4Datagram的总长度
- TTL：允许的跳数，防止一个数据报在路由器之间一直循环占用资源，超过某个特定跳数之后数据报会被丢弃
- Protocol ID：不同的值代表使用不同的协议，如TCP等
- Checksum：校验和
- SourceIP：源IPv4地址
- Dest IP:目的IP地址
#### 分段
##### 最大传输单元MTU
- PacketID：确定几个分段的数据报是否源于同一个一个大的数据报
- Flag：第一位保留，第二位“不分段位”如果是1，说明这个数据报不能被分段，第三位“多分段位”，如果是1说明他不是最后的分段，后面还有更多分段
- FragmentOffset：这个分段在整个原数据报中的位置，以8字节为单位
