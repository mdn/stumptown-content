
# Experiment: HTML docs in GitHub as structured content

Description:

* Port the entire HTML documentation set into GitHub as structured content, including one non-en-US locale (fr).
* Publish the structured content as an npm package.
* Build the content as a set of web pages and start serving them to MDN users.
* Switch the contribution workflow for HTML from the Wiki into GitHub.

## Overview

### High-level breakdown 

1. Migration:
    1. Migrate element reference (except input elements) into structured content
    2. Migrate input elements into structured content
    3. Migrate attributes into structured content
    4. Migrate guides
    5. Migrate 1 non-en-US locale


2. Linting and packaging:
    1. Write a linter for the content
    2. Write a packager to build the reference docs as an NPM package
    3. Start publishing the package


3. Building a website:
    1. Design and build structures for sidebar and landing pages
    2. Build MDN HTML web pages out of the content
    3. Automate rebuilding pages when the sources change 
    4. Serve it to MDN users (only for the supported locales)


4. Switching contribution workflow:
    1. Disable Wiki edit button for HTML pages: send users to GitHub
    2. Design and implement tools to help ease review (e.g. auto-merge for whitespace changes?)

### Justification

HTML is big enough to help test our assumptions without being too big (214 pages) and gets enough traffic but not too much. HTML offers a decent cross-section of the kinds of things we want to test:

* Several different types of structured reference content (elements, input elements, attributes)
* Guide/tutorial content
* Landing pages
* Sidebar

With this experiment we should to be able to approach an answer to all of our most important assumptions:

1. Markdown is a good enough format for our docs
2. We can support localization
3. PR review workload will be sustainable
4. Structured content offers advantages over just migrating to GitHub
5. We can keep structures simple enough
6. We can support other MDN features (sidebars, examples, landing pages)

### Alternatives

This represents a very "depth-first" approach, where we build essentially a complete vertical slice of MDN. The main advantage of that is that it enables us to test critical assumptions that we couldn't reach with less completeness: for example, PR review workload or localization support.

The main disadvantages are that:

* It gives us less good coverage for other assumptions. For example, we're not testing a very wide range of document structures, or a large set of tutorial docs, or a range of sidebar types.

* We're not getting a clear idea of the total amount of effort it would be to port "all of MDN" (we're not even getting a clear idea of what "all of MDN" really means).

* It's quite a lot of work, because we have to do everything. But note that we can collect answers to some assumptions - for example the suitability of Markdown - before we get to the end.

Alternatives could include:
1. Migrating a wider range of different docs (CSS, JS, Web API, LA) rather than all the HTML docs
2. Deep-dive individual aspects of the problem (e.g. sidebars)
3. A more analysis-based approach: working out what the total scope of "MDN" is, how many pages, how many doc types, what volume of edits to expect.

These are complementary to this work, and it would be helpful to do them in parallel. A sidebar deep-dive would be useful even in the context of Kuma, so it's very unlikely to be wasted effort.

We could also reduce the scope of this experiment, but that would lead to us testing fewer assumptions:

1. Not including localization in this experiment to reduce scope
2. Not switching the contribution workflow

## Detailed breakdown

In this section we'll start breaking this down into pieces that could eventually become user stories.

### Migrating HTML pages to structured content

The output of this work is to have the entire HTML reference in GitHub in a structured form, in two locales: en-US and fr.

**Note that currently this proposal only considers en-US: hopefully we might get a better idea of localization support after the All-Hands.**

There are in total 211 pages under /en-US/docs/Web/HTML:

```
Reference docs:
* elements (excluding input types):    140
* elements (input types):               23
* attributes:                           28

Guides:                                 15

Landing pages/index docs:                5

Total:                                 211
```

Landing pages are more built than written - they're more like sidebars than like normal docs pages, and in the high-level breakdown above they're listed alongside sidebars, under "building a website". So we're not including them at this stage.

For each of the other four types we have to:

1. describe and document how we will represent that type as structured content,
2. migrate the docs
3. document any problems we've encountered, and any solutions we've invented.

This gives us the following detailed breakdown.

* Element pages migration
    * describe and document structure for element pages
    * migrate element pages
    * document problems and solutions


* Input element migration
    * describe and document structure for input element pages
    * migrate input elements pages
    * document problems and solutions


* Attribute migration
    * describe and document structure for attribute pages
    * migrate attribute pages
    * document problems and solutions


* Guide migration
    * describe and document structure for guide pages[1]
    * migrate guide pages
    * document problems and solutions

 Some of these are still too big to be individual user stories, and should be broken up some more.

[1] Note that guides are a quite different sort of thing from the other three. Guides don't have any formal structure, which brings its own challenges: we have to figure out how to embed "rich content" (browser compat tables, or live examples, say) at arbitrary points in the document. This looks more like a KumaScript "directives-based" model than the much more formal model for reference docs. But either way, we need to be able to describe how to represent this kind of document.
