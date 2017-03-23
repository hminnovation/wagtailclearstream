Wagtail Clear StreamField
============================
This is an amended version of Wagtail's StreamField interface that introduces a new class called `ClearField`

 - Improved UI for nested StreamFields
 - Always visible help text
 - Confirmation on delete of StreamField items 

![Screenshot](screenshot1.png)
![Screenshot](screenshot2.png)

Install
-------

 - `pip install wagtailclearstream`
 - Add `wagtailclearstream` to your installed apps
 - Use `from wagtailclearstream import ClearBlock` to import
 - Replace `StreamBlock` with `ClearBlock`


Examples
--------

### Separate blocks.py file

```
#blocks.py
from wagtailclearstream import ClearBlock

 class GlobalStreamBlock(ClearBlock):
    paragraph = RichTextBlock(
        icon="pilcrow",
        template="blocks/paragraph.html"
    )
    ...

#models.py
from .blocks import GlobalStreamBlock

class ExamplePage(Page):
    body = StreamField(
        GlobalStreamBlock(), blank=True
        )

content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        ]
```
