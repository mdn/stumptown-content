---
width: 300
height: 110
---
This works fine as long as the names are LTR, but when you insert an RTL
name, then the "`- 1`", which consists of characters with neutral or
weak directionality, will adopt the directionality of the RTL text, and
the result will be garbled:
