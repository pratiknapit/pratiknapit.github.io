---
title: "COMP1521 - Computer Systems"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/COMP1521
venue: "UNSW"
date: 2024-01-01
location: "Sydney, Australia"
---

Computer Systems.

## Integers

Modern computing uses binary numbers. Because digital devices can easily produce high or low level voltages which can produce 1 or 0. 

The base or radix is 2. Digits is 0 or 1. To write the number 1011 in base 2, we intepret this as:

$$ 1011_{2} == 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 $$.

Binary numbers is hard for humans to read - too many digits. Conversion to decimal is awkward and hides bit values. 
Solution: write numbers in hexadecimal!

The base or radix is 16 ... digits 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F.
For example, the number 

$$ 3AF1_{16} == 3 \times 16^3 + 10 \times 16^2 + 15 \times 16^1 + 1 \times 16^ 0 == 15089_{10} $$

In C, 0x prefix denotes hexadecimal, e.g. 0x34F1.

In hexadecimal, each digit represents 4 bits. 

The **unsigned int** data type on cse machines is 32 bits, storing values in the range 0 ... $2^{32}$-1. 

The **int** data type on cse machines is 32 bits, storing values in the range $ -2^{31} ... 2^{31}-1 $

1st bit for positive numbers is 0, and 1st bit for negative numbers is 1. 

## Operating System

### What does it do?

Operating system sits between the user and the hardware, and effectively provides a virtual machine to each user. This VM is much simpler than a real machine. 
- Much easier for user to write code.
- Difficult (bug-prone) code implemented by OS. 
- Let's us write portable code. 

For example, if I didn't have an OS, I wouldn't have a file system where I can simply name files and save them. I would only have some hardware where I would need to figure out how to store a file using bytes.

OS can coordinate/share access to resources between users.
OS can provide priveleges/security.

### What does it need from the hardware.

Needs hardware to provide a *privileged* mode. 
- Code running in privileged mode can access all hardware and memory.
- Code running in privileged mode has unlimited access to memory.

Needs hardware to provide a *non-privileged* mode.
- Code running in non-privileged mode can not access hardware directly.
- Code running in non-privileged mode has limited access to memory.
- Provides mechanism to make requests to OS.

OS (kernel) code runs in privileged mode.

OS runs user code in non-privileged mode.
- with memory restrictions so user code can only use memory allocated to it.

User code can make requests to OS called system calls.
- A system call transfers execution to OS code in privileged mode.
- At completion of request OS (usually) returns execution back to user code in non-privileged mode.

### System Call 

System call allows programs to request hardware operations. 

Linux provides 400+ system call. 

Examples of operations that might be provided by system call:
- read or write bytes to a file
- request more memory
- create a process (run a program)
- terminate a process
- send information via a network

Some important Unix system calls:
0 - read - read some bytes from a file descriptor
1 - write - write some bytes to a file descriptor
2 - open - open a file system object, returning a file descriptor
3 - close - stop using a file descriptor
4 - stat - get file system metadata for a pathname
8 - lseek - move file descriptor to a specified offset within a file

The above system calls manipulate files as a stream of bytes accessed via a **file descriptor**.
- File descriptor are small integers.
- Really index to a per-process array maintained by OS

On Unix-like systems: a **file** is a sequence (array) of zero or more bytes.
- There is no meaning for bytes associated with the file.
- File metadata does not record that it is e.g. ASCII, MP4, JPG, etc. 
- Unix-like files are just bytes.

### C Library Wrappers for System Calls

On Unix-like systems there are C library functions corresponding to each system call, 
- e.g. open, read, write, close
- the syscall function is not used in normal coding

These functions are not portable. C used on many non-Unix systems provide implementations of these functions. 

POSIX standardises a few of these functions, but it is better to use functions from standard C library, which is available everywhere.
- e.g. fopen, fgets, fputc from stdio.h
- on Unix-like systems these will call open, read, write
- on other platforms, will call other low-level functions

But sometimes we need to use lower level non-portable functions
- e.g. a database implementations need precise control over I/O applications

If we want to open file at **pathname**, accourding to **flags** we can run the below function.

```java
int open(char *pathname, int flags);
```

Flags is a bit-mask defined in <fcntl.h>. 


