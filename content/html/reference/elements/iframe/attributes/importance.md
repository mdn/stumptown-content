---
browser-compatibility: html.elements.iframe.importance
spec_url: https://wicg.github.io/priority-hints/#solution-0
---

# `importance`

The download priority of the resource in the `<iframe>`'s `src` attribute.

## Values

### `auto`
No preference. The browser uses its own heuristics to decide the priority of the resource. This is the default.

### `high`
The resource should be downloaded before other lower-priority page resources.

### `low`
The resource should be downloaded after other higher-priority page resources.

## Type

String
