---
title: "MATH3161 - Optimisation"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/MATH3161
venue: "UNSW"
date: 2023-01-01
location: "Sydney, Australia"
---


In MATH2501, you will review the material from first year, so that vector spaces and linear transformations become familiar friends rather than uneasy acquaintances. You will learn about geometric transformations: projections
(which can also be viewed as least squares approximations), rotations and reflections. You will see how to view many linear transformations as being made up of "stretches" in various directions, (the diagonalisation process), and the more general Jordan form. This will allow you to calculate functions of matrices (such as the exponential of a matrix) and hence to solve systems of linear differential equations.

### How to find General Solution to SLE (System of Linear Equations)

The method is based on Gaussian Elimination and back substitution. 

### Matrix notations and conventions

$$ A = \begin{bmatrix} 
a_{11} & a_{12} & ... & a_{1n}\\
a_{21} & a_{22} & ... & a_{2n}\\
... & ... & ... & ...\\
a_{m1} & a_{m2} & ... & a_{mn}
\end{bmatrix}$$

Matrix is an m x n table of numbers (m -- rows; n -- columns). For example, $a_{jk}$ is the matrix entry at j-th row and k-th column. 

### Multiplying matrices

The **matrix product** of matrices **A** and **B** is a third matrix **C**. In order for this product to be defined, **A** must have the same number of columns as **B** has rows. If **A** is of shape $m \times n$ and **B** is the shape of $n \times p$, the **C** is of shape $m \times p$. The product operation is defined by
$$ C_{i,j} = \sum_{k}^{} A_{i,k} B_{k,j} $$.

Note that the standard product of 2 matrices is *not* just a matrix containing the product of the individual elements. Such an operation exists and is called the element-wise product or **Hadamard product**, and is denoted as $ A \odot B $.

Matrixc product operations have many useful properties that make mathematical analysi of matrices more convenient. For example, matrix multiplication is distributive and associative. But it is *not* commutative. 


