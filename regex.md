### Example route patterns

Regex             | Example                   | Info
------------------|---------------------------|---------------------------------------------------------
`[^/]+`           | `{myVar}`                 | Default — Matches the value until the first found slash.
`[^-]+`           | `{from:[^-]+}-{to}`       | Anything until the first dash.
`[0-9]+`          | `{id:[0-9]+}`             | Matches numeric values only.
`\d+`             | `{id:\\d+}`               | Same as above. Backslashes must be escaped.
`.*`              | `{route:.*}`              | Match everything.
`[A-Za-z]+`       | `{title:[A-Za-z]+}`       | Match uppercase and lowercase a-z.
`[-0-9A-Za-z]+`   | `{title:[-0-9A-Za-z]+}`   | Match e.g: "My-Article-1", not "My_Article_1".
`[-a-z]+`         | `{title:[-a-z]+}`         | Match lowercase characters and a dash.
`[-0-9a-z]+`      | `{title:[-0-9a-z]+}`      | Match lowercase, numeric and a dash.
`[0-9A-Z_a-z]+`   | `{title:[0-9A-Z_a-z]+}`   | Numeric, capitals, underscore, lowercase.
`\w+`             | `{title:\\w+}`            | Same as above. Backslashes must be escaped.
`[-.0-9A-Z_a-z]+` | `{title:[-.0-9A-Z_a-z]+}` | Dash, point, numeric, capitals, underscore, lowercase.
`[-.\w]+`         | `{title:[-.\\w]+}`        | Same as above. Backslashes must be escaped.
`[-.0-9A-Z_a-z]+` | `{file:[-.0-9A-Z_a-z]+}`  | Matches a filename e.g: "My-filename_1.ext".
`en\|nl`          | `{lang:en\|nl}`           | Matches 'en' or 'nl'.
`(en\|nl)`        | `{lang:(en\|nl)}`         | Same as above.
`(?:en\|nl)`      | `{lang:(?:en\|nl)}`       | Same as above.
`en\|nl\|fr`      | `{lang:en\|nl\|fr}`       | Matches 'en' or 'nl' or 'fr'.

---

### ASCII table

![ASCII Table and Description](https://www.asciitable.com/index/asciifull.gif)

<sup>Source: https://www.asciitable.com/</sup>
