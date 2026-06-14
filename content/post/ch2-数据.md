---
title: "CH2 数据"
description: "Machine Learning 笔记"
slug: "ch2-数据"
date: "2025-12-25"
categories:
    - "Machine Learning"
tags:
    - "notes"
---

# CH2 数据
- [!]  数据变换 。。好像这一章都挺重要的？

## 数据获取
- 没有数据就找 找不到就生成数据
### 数据整合
把不同来源的数据整合成连贯的数据
### 数据生成
GAN
Data augmentation

## 数据标注
使用无label数据需要对数据分布做假设：
- 连续性：相似特征样本有相同label
- 聚类：数据有内在cluster，相同cluster内有相同label
- 流形：数据可降维
### 自训练
模型预测无label数据后，保留高置信度样本并加入训练数据集
### Active Learning + self-training
在上述步骤中，那些最不置信的交给人工标注后加入训练数据集
### 弱监督
半自动生成标注

## 数据清理
- 异常值
- 规则冲突
- 模式冲突

## 数据变换
- 实数进行标准化
- 图片：裁剪 下采样 压缩
- 图片白化：去除冗余信息
- 视频：使用短的视频片段；一个片段只包含一个连贯事件；切片化；帧采样
- 文本：词根化；语法化；tokenization

## 特征工程
- Word2vec
- Bert