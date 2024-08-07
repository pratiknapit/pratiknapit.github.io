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

Notes:
**USE TIME COMMAND IN TERMINAL TO CHECK REAL, USER AND SYS SPEED OF PROGRAM.**

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

## Floats

### Union

```java
union overlay_float {
    float f;
    uint32_t u;
}
```
A union data type either contains 4 bytes of a float or 4 bytes of a uint32_t, it does not contain both like a struct.
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

Functions in <stdio.h> are also optimised, e.g. when calling fgetc(), the function actually stores the buffer of 4096 bytes and therefore we only need 1 read call for every 4096 bytes. Unlike if we used read() syscall which does a read call each byte.

Other functions as well such as fflush() and setbuf(). 


## File Systems

Metadata for file system objects is stored in **inodes**, which hold:
- location of file contents in file system
- file type (regular file, directory, ...)
- file size in bytes
- file ownership
- file access permissions
- file timestamps

You can think of inode numbers are stored in an array of inodes. Then if we want a file, we look at its inode number and then looking the value in the array of inodes. It will locate where the fill actually lives on the hard disk, update timestamps, etc.  

*ls -li file* on terminal will show some metadata. 

If 2 files point to the same inode, then they are the same. 

### Permissions as set of bits

Set permissions with 700 = 111 000 000 in 3-bit. 111 == r-x permission for user. 000 == no permission for group. 000 == no permission for others. 

If we wanted to change permissions of file f.txt to - rw- r-- --- (or we can think of this as 110 100 000). Remember that first three rw-r is the permission for user, then next 3 are for group and next 3 are for others. So here other people will have no access to this file. 

The permission we want to change f.txt to using the permission bits are 110 = 6, 100 = 4, 000 = 0. Therefore in octal we want to change this to 640 permission.

Use chmod and some otcal code and then f.txt, to change permissions.

Thus, the command-line code to change permission is **chmod 640 f**.

To get information about file -- use *stat* or *lstat* or from command file we use *ls -l*. 

*lstat* is a different in how it uses links. 

Use bitmasks from inode on the struct from stat to extract information from stat.st_mode to check for example if the file is a directory or file. 

**man 7 inode** will also provide functions such as S_ISREG() which tells us if a file is a regular file without having to use bitmasks. 

## Processes

A process is the OS's abstraction for a running program. Multiple processes can run concurrently on the same system, and each process appears to have exclusive use of the hardware. 

Bash shell is a process on your terminal waiting for a command.

**ps** on terminal will show current processes. 
**top** on terminal will show resources. 

A process is a program executing in an environment. A process is an instance of an executing program.

Processes share same resources (RAM, CPU) and the OS manages all of that so that there is no overwriting of variables and that resources are allocated efficiently. 

./process_example > out ==> use this command at terminal to put the output in a file
./process_example 2 > out ==> puts the output of the file to stderr

echo $? ==> echoes the return value of main

Each process has a *parent* process.

A process may have *child* processes, these are processes that are created.

PID = process ID

**sleep** will give time to write before the process finishes. 

Each process has an **execution state**, defined by:
- current values of CPU registers
- current contents of its memory
- information about opne fiels (and other results of system calls)

### PID

On UNIX/Linux:
- eaqch process has a unique process ID, or PID: a positive integers type pid_t defined in <unistd.h>
- PID 1: init, used to boot the system.
- low-numbered processes usually system-related, but PIDs are recycled so this isn't always true.

### Environment variables

**env** will give information about current environment.

PATH variable in **env** will give all the files you want to search for when running. 

When run, a program is passed a set of environment variables.
An array of strings of the form name=value, terminated with NULL.

Access via global variable *environ*.

Many C implementations also provide as 3rd parameter to main:

```java
int main(int argc, char *argv[], char *env[]);
```

In this course we instead will be using the following code:

```java
extern char **environ; // extern means that the variable is being declared somewhere else. char ** == array of strings
for (int i = 0; environ[i] != null; i++) {
    printf("%s\n", environ[i]);
}
```

**echo $PATH** ==> on terminal will return PATH environment variable value
 
### Multitasking

On a typical modern OS, 
- multiple process are active "simultaneously" (multi-tasking)
- OS provides a virtual machine to each process
    - each process executes as if the only process running on the machine
    - e.g. each process has its own address space (N bytes, addressed 0...N-1)

When there are multiple processes running on the machine,
- A processes uses the CPU, until it is preempted or exits
- then, another process uses the CPU, until it too is preempted
- eventually, the first process will get another run on the CPU. 

Which process runs next after a process is preempted? 

The *scheduler* answers this. The OS process scheduling attempts to:
- fairly sharing the CPUs among competing processes,
- minimise response delays (lagginess) for interactive users,
- meet other real-time requirements (e.g. self-driving car),
- minimise the number of expensive context switches.

The time divisions between processes and there "turn" using the CPU are imperceptibly small, such that humans cannot realise these changes. 

### Creating processes

- System(), popen() : create a new process via a shell - convenient but major security risk
- posix_spawn() : create a new process.
- fork(), vfork() : duplicate current process. (do not use in new code)
- exec() family : replace current process.

### Destroying processes:

- exit() : terminate current process. See also _exit() : terminate immediately. 
- waitpid() : wait for state change in child process.

## Concurrency, parralelism and threads

*Throughout the history of digital computers, 2 demands have been constant forces in driving improvements: we want them to do more, and we want them to run faster.*

Both of these factors improve when the processor does more things at once. We use the term *concurrency* to refer to the general concept of a system with multiple, simultaneous activities, and the term *parallelism* to refer to the use of concurrency to make a system run faster. 

Concurrency: multiple computations in overlapping time periods, does NOT have to be simultaneous. 

Parrallelism: multiple computations executing simultaneousy.

Although we normally think of a process as having a single control flow, in modern systerms a process can actually consist of multiple execution units, called **threads**, each running in the context of the process and sharing the same code and global data.

Parallelism can be exploited at multiple levels of abstraction in a computer system. 

Common classifications of types of parrallelism (Flynn's taxonomy):
- SISD: Single Instruction, Single Data ("no parallelism")
    - e.g. our code in mipsy
- SIMD: Single Instruction, Multiple Data ("vector processing")
    - multiple cores of a CPU executing (part of) same instruction
    - e.g., GPUs rendering pixels
- MISD: Multiple Instruction, Single Data ("pipelining")
    - data flows through multiple instructions, very rare in the real world
    - e.g., fault tolerance in space shuttles (task replication), sometimes AI.
- MIMD: Multiple Instruction, Multiple Data ("multiprocessing")
    - multiple cores of a CPU executing different instructions

Both parallelism and concurrency need to deal with *synchronisation*.

#### Data Parallel Computing: Parallelism Across An Array

Multiple identical processors. Each given one element of a data structure from main memory. Each performing same computation on that element: SIMD.
Results copied back to the data structure in main memory. 

But not totally independent: need to *synchronise* on completion.
**Graphics Processing Units (GPUs)** provides this form of parallelism: 
- used to compute the same calculation for every pixel in an image quickly
- popularity of computer gaming has driven availability of powerful hardware
- there are tools & libraries to run some general-purpose programs on GPUs 
- if the algorithm fits this model, it might run 5-10x faster on a GPU.
- e.g. GPUs used heavily for neural network training (deep learning)

#### Distributed Parallel Computing: Parallelism Across Many Computers

Parallelism can also occur between multiple computers. 

Example: Map-Reduce is a popular programming model for manipulating very large data sets. On a large network of computers - local or distributed, spread across a rack, data center or even across continents. 

The map filters data and distributes it to nodes:
- data distributed as (key, value) pairs
- each node receives a set of pairs with common key

Nodes then perform calculation on received data items. 

The reduce step computes the final result.
- by combining outputs (calculation results) from the nodes.

There also needs a way to determine when all calculations completed.

#### Parallelism across processes

One method for creating parallelism: creating multiple processes, each doing part of a job.

- Child executes concurrently with parent.
- Runs in its own address space.
- Inherits some state information from parent, e.g. open fd's

Processes have some disadvantages:

- Process switching is *expensive*
- Each require a *significant* amount of state - memory usage
- Communication between processes potentially limites and/or slow

But one big advantage:

- Seperate address spaces make processes more robust. 

The web server providing the class website uses process-level parallelism. 

An android phone will have several hundred processes running.

### Threads: Parallelism within processes

**Threads** allow us parallelism within a process. 
- Threads allow simultaneous exception. 
- Each thread has its own execution state often called Thread Control Block (TCB)
- Threads within a process share address space: 
    - Threads share code: functions
    - Threads share global/static variables
    - Threads share heap: malloc
- But a seperate stack for each thread:
    - local variables not shared
- Threads in a process share file descriptors, signals.



### Dining Philosophers Problem - OS Resource Allocation Problem

Round table with 5 philosophers. Philosophers can either be in eating or thinking state. Only 5 forks on the table and a philosophers needs to use 2 forks on each side of them to eat.
Look at this diagram for visual understanding.

[Insert diagram]

We have limited resources (forks) that needs to be shared by processes (philosophers) in a synchronized manner without violating any rules. 

1. Simple solution - each fork/chopstick is represented with a semaphore.

A philosopher tries to grab a fork/chopstick by executing a wait() operation on that semaphore. 










