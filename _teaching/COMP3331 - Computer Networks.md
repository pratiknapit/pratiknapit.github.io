---
title: "COMP3331 - Computer Networks and Applications"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/COMP3331
venue: "UNSW"
date: 2023-01-01
location: "City, Country"
---

This course is an introductory course on computer networks, focused on common paradigms and protocols used in present data communication. Through lectures, in-class activities, labs and assignments, you will learn the theory and application of 

1. medium access control, congestion control, flow control, and reliable transmission,
2. addressing and naming,
3. routing and switching,
4. widely used protocols such as Ethernet, IP, TCP, UDP, HTTP, etc.
5. special purpose networks such as content delivery networks and wireless networks.

Advanced topics to study from here are: cloud computing, distributed systems and internet of things. Computer network is also important in designing systems and scalability issues. Other important related ideas include caching, APIs, asynchronous processing & queues, etc.
- A distributed system is a collection of computer programs that utilize computational resources across multiple, separate computation nodes to acheive a common, shared goal. 
- In computing, a cache is a high-speed data storage layer which stores a subset of data, typically transient in nature, so that future requests for that data are served up faster than is possible by accessing the data's primary stoage location. Cashing allows you to efficiently reuse previously retrieved or computed data. 


Introduction to Computer Networks
======

Internet protocal stack:
- application: supporting network applications e.g. FTP, SMTP, HTTP, Skype.
- transport: process-process data transfer e.g. TCP, UDP.
- network: routing of datagrams from source to destination, e.g. IP, routing protocols.
- link: data transfer between neighboring network elements, e.g. Ethernet, 802.111 (WiFi), PPP.
- physical: bits "on the wire"

Applications and the Web 
======

## Principles of Network Applications

Two predominant architectural paradigms used in modern network applications: the **client-server architecture** or the **peer-to-peer (P2P) architecture**.

In a **client-server architecture**, there is an always-on host, called the *server*, which services requests from many other hosts, called *clients*. A classic example is the Web application for which an always-on Web server services requests for an object from a client host, it responds by sending the requested object to the client host. Another characteristic of the client-server architecture is that the server has a fixed, well-known address, called an IP address. 

In **P2P** architecture, there is minimal (or no) reliance on dedicated servers in data centers. Instead the application exploits direct communication between pairs of intermittently connected hosts, called *peers*. One example of a popular P2P application is the file-sharing application BitTorrent. 

Heading 3
======