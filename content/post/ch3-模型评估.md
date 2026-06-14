---
title: "CH3 模型评估"
description: "Machine Learning 笔记"
slug: "ch3-模型评估"
date: "2025-12-25"
categories:
    - "Machine Learning"
tags:
    - "notes"
---

# CH3 模型评估
## 经验误差 VS 泛化误差
- $M$个样本，$a$个分类错误，错误率$E = \frac{a}{M}$ 
- 准确率$P=1-E$
- **经验误差**：在training set上的误差
- **泛化误差**：在新样本上的误差

## 过拟合 欠拟合
无需多言，我很清楚
- [!] Cross validation

| 数据复杂性 | 模型复杂性 | 结果  |
| ----- | ----- | --- |
| 低     | 低     | 正常  |
| 高     | 高     | 正常  |
| 低     | 高     | 过拟合 |
| 高     | 低     | 欠拟合 |
## 模型评估/选择
- 均方误差：$$E(f;D) = \frac{1}{m} \sum\limits_{i=1}^{m} (f(x_i) - y_i)^2$$
- 查准率$P$recision：你打上x的label的样本里有多少真的是x？
- 查全率$R$ecall：所有x的label里面你找出来了多少？
- $F1 score=2\times \frac{PR}{P+R}$
- $AUC$是$ROC$曲线下的面积