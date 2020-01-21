---
title: Microdata example
height: 100
---
This example defines the following structured data:

| `itemscope` | `itemtype`              | `SoftwareApplication (http&#x3A;//schema.org/SoftwareApplication)`   |
| ----------- | ----------------------- | -------------------------------------------------------------------- |
| `itemprop`  | `name`                  | `Angry Birds `                                                       |
| `itemprop`  | `operatingSystem`       | `ANDROID`                                                            |
| `itemprop`  | `applicationCategory`   | `GameApplication (http://schema.org/GameApplication)`                |
| `itemscope` | `itemprop`\[`itemtype`] | `aggregateRating \[AggregateRating]`                                 |
| `itemprop`  | `ratingValue`           | `4.6`                                                                |
| `itemprop`  | `ratingCount`           | `8864`                                                               |
| `itemscope` | `itemprop`\[`itemtype`] | `offers \[Offer]`                                                    |
| `itemprop`  | `price`                 | `1.00`                                                               |
| `itemprop`  | `priceCurrency`         | `USD`                                                                |

```html
<div itemscope itemtype="http://schema.org/SoftwareApplication">
  <span itemprop="name">Angry Birds</span> -

  REQUIRES <span itemprop="operatingSystem">ANDROID</span><br>
  <link itemprop="applicationCategory" href="http://schema.org/GameApplication"/>

  <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
    RATING:
    <span itemprop="ratingValue">4.6</span> (
    <span itemprop="ratingCount">8864</span> ratings )
  </div>

  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    Price: $<span itemprop="price">1.00</span>
    <meta itemprop="priceCurrency" content="USD" />
  </div>
</div>
```
