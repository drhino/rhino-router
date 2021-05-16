### Example route patterns

Regex       | Example             | Info
------------|---------------------|---------------------------------------------------------
`[^/]+`     | `{myVar}`           | Default — Matches the value until the first found slash.
`[^-]+`     | `{from:[^-]+}-{to}` | Anything until the first dash.
`[0-9]+`    | `{id:[0-9]+}`       | Matches numeric values only.
`\d+`       | `{id:\\d+}`         | Same as above. Backslashes must be escaped.
`.*`        | `{route:.*}`        | Match everything.
`[a-zA-Z]+` | `{title:[a-zA-Z]+}` | Match uppercase and lowercase A-z only.
`[A-z]+`    | `{title:[A-z]+}`    | Same as above.
`[a-z-]+`   | `{title:[a-z-]+}`   | Match lowercase characters and a dash.
`[a-z0-9-]+`| `{title:[a-z0-9-]+}`| Match lowercase, numeric and a dash.
`[A-z0-9-]+`| `{title:[A-z0-9-]+}`| Match "A-z" & numeric & "-".
`en\|nl`    | `{lang:en\|nl}`     | Matches 'en' or 'nl'.
`(en\|nl)`  | `{lang:(en\|nl)}`   | Same as above.
`(?:en\|nl)`| `{lang:(?:en\|nl)}` | Same as above.
`en\|nl\|fr`| `{lang:en\|nl\|fr}` | Matches 'en' or 'nl' or 'fr'.
