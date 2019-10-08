# `tabindex`

An optional numeric value that defines both whether or not the input should be focusable through use of the `Tab` key as well as whether or not the element participates in sequential focus navigation. This value also establishes the order in which the element is reached using the `Tab` key.

The values of `tabindex` have special meanings depending on sign:

- A negative value of `tabindex` indicates that the element should be focusable by the user, but not using sequential keyboard navigation. It's recommended to always use a value of -1 as using other values can be complicated.
- A `tabindex` of 0 means that the element should be focusable and should be reachable by sequential keyboard navigation, but that the tab order is left up to the [user agent](/en-US/docs/Glossary/user_agent), which should apply the user's platform conventions. This is usually the best value to use when you want an element to be focusable and to participate in keyboard navigation rather than trying to manage the tab order yourself.
- A positive value of `tabindex` indicates the tabbing order of the element. Each time the user presses the `Tab` key, the element with the next sequentially higher `tabindex` is focused. Most platforms provide a reverse-tab feature, typically using the combination of `Shift` + `Tab`, which reverses the tabbing order.

If `tabindex` is omitted or is not a valid integer, the user agent follows platform conventions to determine what to do.

## Type

Number
