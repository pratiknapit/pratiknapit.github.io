---
title: "COMP2511 - Object Oriented Principles"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/COMP2511
venue: "UNSW"
date: 2024-01-01
location: "Sydney, Australia"
---
Objected Oriented Programming.

Best way to program a software -- code up a solution when passes requirements first as fast as possible. Then refactor using design principles and design patterns to improve the software. 

## Running gradle for simple applications

Simply run **gradle init** to build the gradle configuration files, etc. Then run **gradle build** to build and **gradle run** to run all tests. This will build and run a basic demo which can be used to build small java applications.  

## Design Principles

Building good software is all about
1. Making sure your software does what the customer wants it to do - use-case diagrams, feature list, prioritise them.
2. Applying OO design principles to: 
- Ensure the system is flexible and extensible to accomodate changes in requirements.
- To strive for maintainable, reusable, extensible design.

Changes are not the issue for bad code, it is the fact that changes requires refactoring and refactoring requires time and usually we say we do not have the time due to business pressures. Thus we employ "quick and dirty" solutions. Changes may be made by developers not familiar with the original design philosophy.

### Design Smells
- Tendency of the software being too difficult to change even in simple ways. 
- A single change causes a cascade of changes to other dependent modules.
- Tendency of the software to break in many places when a single change is made. 
- Needless complexity.
- Needless repetition. 

### Common Bad Code Smells - requires refactoring
- Duplicated code
- Long method
- Large class
- Long parameter list
- Divergent changes (when one class is commonly changed in different ways for different reasons)
- Shotgun surgery (The opposite of divergent change, when you have to make a lot of little changes to a lot of different classes).

### Improving the design

1. Extract Method
- Identify the changing and non-changing local variables. Non-changing variable can be passed in as a parameter. 
2. Renaming the variable
3. Move method

- Replacing conditional logic with polymorphism. The switch statement - an obvious problem. Look to replace the switch statement with polymorphism. 

- Options besides inheritance: composition (reuse behavious using one or more classes with composition) and delegation (delegate the functionality to another class). 

### Characteristics of good design
- Loose coupling - allows components to be used and modified independently of each other
- High cohesion - easier to maintain and less frequently changes and have higher probablity of reusablity. 

### Solid Principles
- Single responsiblity principle
- Open-closed principles - software entities should be open for extension, but closed for modification
- Liskov substitution principle: objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.
- Interface segregation principle: many client-specific interfaces are better than one general-purpose interface. 
- Dependency inversion principle: One should "depend upon abstractions, (not) concretions".

### The principle of least knowledge (Law of Demeter) 

Classes should know about and interact with as few classes as possible.

### LSP (Liskov substitution principle)

Subtypes must be substitutable for their base types. 

If heritance does not make sense, then we should **favour composition over inheritance**. If you favour delegation, composition over inheritance, your software will be more flexible, easier to maintain and extend. 

### Strategy pattern

Allows you to encapsulate a family of algorithms. Enables you to "change behaviour" at run-time.

Favour composition over inheritance. 

Note that the given duck example in the lecture slides is not great design. Since a subclass cannot contain less than the class it inherits from, ducks who cannot fly are forced to implement a CannotFly() method. This is bad design as the Interface Segregation Principle (ISP) basically states that "no client should be forced to depend on methods it does not use". This is broken in the example since some Ducks that don't fly implement the fly() method even if they don't need it. A better way to use interfaces is the following:

```java
class Duck 
{ 
    swim();
}

class MallardDuck extends Duck implements IFlyable 
{
    fly();
}

class ReheadDuck extends Duck implements IFlyable, IQuackable
{
    fly();
    quack();
}
```

To implement the Strategy Pattern, we can use the template below.

```java
class Context {
    IStrategy strategy;

    public Context {
        setStrategy();
    }
}

interface IStrategy {
    behaviourInterface(): void
}

class StrategyA implements IStrategy {
    behaviousInterface(): void
}

class StrategyB implements IStrategy {
    behaviousInterface(): void
}

class StrategyC implements IStrategy {
    behaviousInterface(): void
}

```

### State pattern

A *state* is a description of the status of a system that is waiting to execute a *transition*. 

A *transition* is a set of actions to be executed when a condition is fulfilled or when an event is received. 

**Identical stimuli trigger different actions depending on the current state.**

For example,

- When using an audio system to listen to the radio (the system is in the "radio" state), receiving a "next" stimulus results in moving to the next station.

- When the system is in the "CD" state, the "next" stimulus results in moving to the next track.

Refer to the Gumball example on the lecture slides. Essentially, we define a State interface that contains a method for every action in the Gumball Machine. Then we implement a State class for every state of the machine, such that each class will be responsible for the behaviour of the machine when it is in the correspondingState allowing polymorphism. 

Finally, we're going to get rid of all of our conditional code and instead delegate to the State class to do the work for us.

### Observer Pattern 

The **Observer Pattern** is used to implement distributed event handling system, in "event driven" programming. 

In the observer pattern,
- an object, called the subject, maintains a list of its dependents called observers and 
- notifies the observes automatically of any state changes in the subject, usually by calling one of their methods. 
- i.e. notifies multiple objects, or subscribers about any events that happen to the object they're observing.

Example

```java
public class Store {
    private final NotificationService notificationService;

    public Store() {
        notificationService = new NotificationService();
    }

    public void newItemPromotion() {
        notificationService.notify();
    }

    public NotificationService getService() {
        return notificationService;
    }
}

public class NotificationService {
    private final List<EmailMsgListener> customers;

    public NotificationService() {
        customers = new ArrayList<>();
    }

    public void subscribe(EmailMsgListener listener) {
        customers.add(listener);
    }

    public void unsubscribe(EmailMsgListener listener) {
        customers.remove(listener);
    }

    public void notify() {
        customers.forEach(listener -> listener.update());
    }
}

public class EmailMsgListener{
    private final String email;

    public EmailMsgListener(String email) {
        this.email = email;
    }

    public void update() {
        // Actually sends the email
    }
}

// The observer pattern helps with extensibility and we can simple add another type of listener, i.e. a MobileApp listener which extends a common interface with the EmailMsgListener.

public interface EventListener {
    void update();
}

public class EmailMsgListener implements EventListener {
    private final String email;

    public EmailMsgListener(String email) {
        this.email = email;
    }

    @Override
    public void update() {
        // Actually sends the email
    }
}

public class MobileAppListener implements EventListener {
    private final String username;

    public MobileAppListener(String email) {
        this.email = email;
    }

    @Override
    public void update() {
        // Actually sends the email
    }
}

```


### Composite Pattern 

In OO programming, a composite is an object designed as a composition of one-or-more similar objects (exhibiting similar functionality). 

Aim is to be able to manipulate a single instance of the object just as we would manipulate a group of them. For example
- operation to resize a group of Shapes should be same as resizing a single Shape.
- calculating the size of a file should be the same as a directory.

### Creational Patterns: Factory Method & Abstract Factory Pattern

Creational patterns provide various **object creation** mechanisms, which increase flexibity and reuse of existing code. 

- Factory Method
    - provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

- Abstract Factory
    - produce families of related objects without specifying their concrete classes. 

### Decorator Pattern

Intent: "attach additional responsibilities to an object dynamically." 
- Decorators provide a flexible alternative to sub-classing for extending functionality. 

Decorator design patterns allow us to selectively add functionality to an object (not the class) at runtime, based on the requirements. 

Original class is not changed (Open-Closed principle).

The decorator design pattern prefers a composition over an inheritance. Its a structural pattern, which provides a wrapper to the existing class. Objects can be decorated multiple times, in different order, due to the recursion involved with this design pattern. 

### Creational Pattern: Singleton Pattern 

We want only one instance of the class to be created. Should be used when multiple instances of the same class will lead to some conflict or errors. For example for configuration settings we want this to be instantiated only once and to be static across the program. Or writing to a log file. 

#### von Neumann Architecture 

The von Neumann architecture is a design architecture for an electronic digital computer with these components:
- A processing unit with both an arithmetic logic unit and processor registers
- A control unit that includes an instruction register and a program counter
- Memory that stores data and instructions
- External mass storage
- Input and output mechanisms

Sequential computing. One instruction at a time. The von Neumann architecture has evolved to refer to any stored-program computer in which an instruction fetch and a data operation cannot occur at the same time (since they share a common bus). This is referred to as the von Neumann bottleneck, which often limits the performance of the corresponding system.

#### Concurrency

Several modern langauges, including Java, allow for concurrent execution of multiple threads. Threads are just subprocesses. To make the most of today's multi-core hardware, we must create applications that employ multiple threads. 

Threading problems: when threads read and write at the same time to the same resource (for example an array). 
If different threads are reading and writing at the same time, there is no consistency, no control and we may print values that have been updated already. Reading at the same time is fine, but modifying at the same time is dangerous. 

Thread safe: many threads can access the same resources without exposing incorret behaviour or causing unpredictable outcomes. 

**So how do we manage threading and concurrency problems?**

#### Threading

Consider the below example, 

```java
public class Test2 {

	public static void main(String[] args) {
		
        MyThread th1 = new MyThread("AAA");
        th1.start();


        MyThread th2 = new MyThread("BBB");  
        th2.start();

        (new MyThread("CCC")).start(); 
        (new MyThread("DDD")).start();         
        (new MyThread("EEE")).start(); 
	
        System.out.println(" -- End of program --");
		
	}

}
```

In the above program, java will concurrently run each thread. For example, it will not wait until thread AAA is completed before starting thread BBB. Likewise with the other 3 threads. All these subprocesses will run in parallel/concurrently. Time slicing will create no control in the program and threads will run concurrently and not in sequence. Rerunning the program may cause the program to run differently each time as well.

#### Solving threading problems

Time slicing in Java refers to the process of allocating time to threads. The order in which threads run is uncertain. It is also unpredictable how many statements of one thread run before some of the other thread's statements run. Two threads modifyng the same object (data) may operate in parallel.

A possible solution using *synchronized*. 

A *synchronized method* acquires the lock of the object or class at the start, executes the method and then releases the lock at the end. 

The use of *synchronized* key word allows **only one thread** to execute the method, avoiding concurrency issues. 

To make the most efficient use of the several CPUs available, a portion of the code (under synchronized) that accesses a shared resource must be kept to a minimum. I.e. only synchronize what will create concurrency problems, if we synchronise everything then that is just a sequential program. 

Note that synchronized does not mean that we execute in order, it only affirms that only one thread will execute the method at one time.

### Behavioural Pattern: Template Pattern

Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

A *template method* defines the skeleton (structure) of a behaviour (by implementing the invariant parts). 

## Refactoring

Code refactoring is the process of restructuring existing computer code without changing its external behaviour. 
Advantages include: 
- improved code readability
- reduced complexity
- improved maintenance
- extensibility

Automatic **unit tests** should be set up before refactoring to ensure routines still behave as expected.

Refactoring is an iterative cycle of making a small program transformation, testing it to ensure correctness, and making another small transformation. 

Software systems evolve over time to meet new requirements and features. 

Example

**Code Smell: Switch statements**

Problem: switch statements are bad from an OO design point of view.

Solution: replace switch statements with a polymorphic solution based on *Strategy Pattern* applying a series of refactoring techniques - Extract Method, Move Method, Extract Interface, etc., refer to lecture demo for complete solutions. 


## Exceptions in Java

EXAMPLE

```java

public void writeList() {
    PrintWriter out = null;

    try {
        System.out.println("Entering" + " try statement");

        out = new PrintWriter(new FileWriter("OutFile.txt"));
        for (int i = 0; i < SIZE; i++) {
            out.println("Value at: " + i + " = " list.get(i));
        }
    } catch (IndexOutOfBoundsException e) {
        System.err.println("Catch IndexOutOfBoundsException: " + e.getMessage());
    }
}

```

## Generic Programming

Generics enable types (classes and interfaces) to be parameters when defining:
- classes
- interfaces 
- methods.

Generics remove casting and offers stronger type checks at compile time. It also allows implementation of generic algorithms, that work on collections of different types, can be customised, and are type safe. 

A generic class is defined with the following format:
```java
class name<T1, T2, ..., Tn> {/* */};
```

The most commonly used type parameter names are:
- E - Element (used extensively by the Java Collections Framework)
- K - Key
- N - Number
- T - Type
- V - Value
- S, U, V, et.c - 2nd, 3rd, 4th types

For example:
```java
Box<Integer> integerBox = new Box<Integer>();
vs
Box<Integer> integerBox = new Box<>();
```

### Generic Methods

Generic methods are methods that introduce their own type parameters.

```java
public class Util {
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) &&
               p1.getValue().equals(p2.getValue());
    }
}
```

### Wildcard character

*When to use ? (wildcard character) or generic T type?*

Let's look at an example,

Let's have m1(? v1, ? v2) or m1(T v1, T v2), here we want to use T for both arguments because we want the arguments of the function to be of the same type. If we do not need them to be the same type we can use ?. 

So when there is a relationship between types we want to use character T. 





