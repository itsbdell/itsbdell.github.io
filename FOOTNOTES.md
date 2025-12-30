# Footnote Syntax Guide

This site uses Kramdown's native footnote support. Footnotes are automatically styled to match the site's aesthetic.

## Syntax

### Inline Reference
Place a footnote reference in your text using square brackets with a caret:

```markdown
This is a sentence with a footnote reference.[^1]
```

### Footnote Definition
Define the footnote content anywhere in your post (typically at the bottom):

```markdown
[^1]: This is the footnote content that will appear at the bottom of the post.
```

### Named Footnotes
You can also use named footnotes for better readability:

```markdown
This sentence references a named footnote.[^my-note]

[^my-note]: This footnote has a custom name instead of a number.
```

## Example

```markdown
The very first universities in the world taught seven subjects collectively known as the 'liberal arts'.[^1] These were divided into the 'trivium' (grammar, logic, and rhetoric) and the 'quadrivium' (music, arithmetic, geometry, and astronomy).[^2]

[^1]: The very first universities in the world taught seven subjects collectively known as the 'liberal arts'.

[^2]: These were divided into the 'trivium' (grammar, logic, and rhetoric) and the 'quadrivium' (music, arithmetic, geometry, and astronomy).
```

## Notes

- Footnotes are automatically numbered in the order they appear in your text
- You can place footnote definitions anywhere in your post, but it's common to put them at the end
- Multiple references to the same footnote are supported
- Footnotes will appear at the bottom of the post with proper styling and back-links

