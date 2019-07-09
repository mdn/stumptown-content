# Markdown usage

In the stumptown project, we write content in [GitHub Flavored Markdown](https://github.github.com/gfm/) (GFM).

To transform Markdown into other formats (especially HTML), we use [remark](https://github.com/remarkjs/remark) or its parent library, [unified](https://github.com/unifiedjs/unified). Do not introduce dependencies on other Markdown parsers.

## Background, or why we chose GFM

We have to specify what variant of Markdown we're using and how we're extending it because Markdown was not originally specifed. To quote the GFM specification:

> John Gruber’s canonical description of Markdown’s syntax does not specify the syntax unambiguously. […] Because there is no unambiguous spec, implementations have diverged considerably. As a result, users are often surprised to find that a document that renders one way on one system (say, a GitHub wiki) renders differently on another (say, converting to docbook using pandoc). To make matters worse, because nothing in Markdown counts as a “syntax error,” the divergence often isn’t discovered right away.

We evaluated several different specifications and implementations of  Markdown. To learn more about this process, read [mdn/sprints#1505](https://github.com/mdn/sprints/issues/1505). What follows is a summary of our conclusions.

We concluded that GFM meets many of our requirements:

* GFM is well specified and there are several implementations of the spec.
* GFM is natively supported by many tools (e.g., spellcheck).
* GFM is already well-documented by and familiar to contributors on GitHub.
* GFM and its implementations support features we already recognize as desirable beyond those offered by CommonMark (or other Markdown specifications), such as fenced code blocks (with language annotation) and tables.
* GFM bars certain dangerous raw HTML, such as `<script>` tags (useful to minimize the risks associated publishing user generated content).

We chose remark as our implementation of GFM:

* remark has built-in support for GFM, which appears to conform well to the spec.
* The project appears to be well maintained, with releases recently published and active issue trackers.
* It appears to be well-documented, particularly with sample code.
* The API has hooks for inspecting and modifying the parsing and rendering of Markdown documents (e.g., to lint source, natural language, and resulting HTML). It also includes an abstract syntax tree for Markdown documents.

## Extending Markdown

We use some Markdown and Markdown-adjacent features which are not in the GFM specification. They're documented in this section.

In general, we strive for compatibility with, if not strict adherence to, GitHub Flavored Markdown, to get the benefit of GFM-compatible tools, such as rich diffs and Markdown renders on GitHub itself. stumptown content may not be complete as processed by pure-GFM tools, but they should be legible.

### Front matter

For front matter in `.md` files, use YAML between `---` fencing, like this:

```yaml
---
some: yaml
goes: here
---
```

GFM itself does not specify a front matter format, though GitHub itself appears to parse and render YAML-formatted front matter.
