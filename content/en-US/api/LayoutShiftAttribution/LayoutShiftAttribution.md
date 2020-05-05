---
recipe: api-feature
title: 'LayoutShiftAttribution'
mdn_url: /en-US/docs/Web/API/LayoutShiftAttribution
specifications: https://wicg.github.io/layout-instability/#layoutshiftattribution
browser_compatibility: api.LayoutShiftAttribution
---

## Description

The `LayoutShiftAttribution` interface of the Layout Instability API provides debugging information about elements which have shifted.

## Properties

**`LayoutShiftAttribution.Node`**

Returns the element that has shifted (null if it has been removed).

**`LayoutShiftAttribution.previousRect`**

Returns a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) representing the position of the element before the shift.

**`LayoutShiftAttribution.currentRect`**

Returns a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) representing the position of the element after the shift.
