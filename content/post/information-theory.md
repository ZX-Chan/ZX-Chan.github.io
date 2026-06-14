---
title: "Information Theory"
description: "学习笔记"
slug: "information-theory"
date: "2024-09-01"
categories:
    - "Notes"
tags:
    - "notes"
---

好的，下面是 **Fano 不等式**的一个**纯粹、简洁的数学证明**，不带解释和多余语言。

---

## ✅ Fano 不等式（离散情况）

设 $$ X \in \mathcal{X} $$，$$ Y $$ 为观测变量，$$ \hat{X} = g(Y) $$ 是对 $$ X $$ 的估计，定义错误概率：

$$$$
P_e = \Pr(\hat{X} \ne X)
$$$$

令 $$ M = |\mathcal{X}| $$，定义误差指示变量：

$$$$
E =
\begin{cases}
1, & \text{if } \hat{X} \ne X \\
0, & \text{otherwise}
\end{cases}
$$$$

---

### 证明：

考虑联合熵 $$ H(E, X \mid Y) $$，按链式法则展开：

$$$$
H(E, X \mid Y) = H(X \mid Y) + H(E \mid X, Y)
$$$$
$$$$
H(E, X \mid Y) = H(E \mid Y) + H(X \mid E, Y)
$$$$

由于 $$ \hat{X} = g(Y) $$，已知 $$ X $$ 和 $$ Y $$ 后 $$ E $$ 确定，故：
$$$$
H(E \mid X, Y) = 0
\Rightarrow H(X \mid Y) = H(E \mid Y) + H(X \mid E, Y)
$$$$

又因 $$ H(E \mid Y) \leq H(E) \leq H(P_e) $$，且：

$$$$
H(X \mid E, Y) \leq \Pr(E=1)\log(M - 1) = P_e \log(M - 1)
$$$$

所以：

$$$$
H(X \mid Y) \leq H(P_e) + P_e \log(M - 1)
$$$$

---

### 结论：

$$$$
\boxed{H(X \mid Y) \leq H(P_e) + P_e \log(M - 1)}
$$$$

证毕。