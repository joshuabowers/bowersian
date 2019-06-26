Renders a blog article. Has two modes of operation:

1. preview: a truncated version of the article which shows the title and a synopsis.
2. full: the article contents displayed in a columnar layout.

Given the (otherwise) same set of props, to switch to preview mode, just use the preview props flag:

```jsx
<Article preview title="In the Upside-Down" synopsis="..." />
```

A full article, on the otherhand, should omit this flag:

```jsx
<Article title="In the Upside-Down" content="..." />
```
