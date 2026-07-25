# Contributing to Linux MCSR Resources

## Guidelines

Before adding a resource, there are some rules about which resources are allowed to be added.

The resource should be Linux specific, meaning a resource that is also used on Windows, will not be accepted. Something like [Prism Launcher](https://prismlauncher.org/) or [Ninjabrain Bot](https://github.com/Ninjabrain1/Ninjabrain-Bot) would not be accepted. If a resource is *primarily* used by the Linux MCSR community, then that's fine too.

It is fine if the resource isn't made by you.

## Adding a resource

1. Create a new `.json` file inside `resources/data/`.
2. Name the file after your resource (use dashes instead of spaces).
3. Use this format in the file:

```json
{
  "name": "<resource name>",
  "author": "<author name>",
  "link": "<link to the resource>",
  "source": "<link to source code, leave as an empty string if there isn't>",
  "description": "<description of the resource>",
  "category": "<category id>"
}
```
You can add hyperlinks in the description by using `[text](link)`, same as in markdown.

4. `category` must be one of these below:
    - `docs`
    - `programs`
    - `waywall-configs`
    - `waywall-config-snippets`
    - `waywall-tools`
    - `websites`
    - `wm`
    - `obs`
    - `tutorials`

   If none of the above categories fit your resource, you're welcome to suggest a new category in your pull request (just don't edit the `categories.json` file).

   For `waywall-config-snippets`, you need to add a `.lua` file to `resources/data/code-snippets` and set `link` to the full path of that file (e.g. `"link": "resources/data/code-snippets/oneshot-crosshair.lua"`). Leave `source` as an empty string.
   

When you're done, create a pull request.
