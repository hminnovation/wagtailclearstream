from django import forms
from django.apps import apps
from django.template.loader import render_to_string
from django.contrib.staticfiles.templatetags.staticfiles import static

from wagtail.wagtailcore.blocks import StreamBlock
from wagtail.wagtailcore.blocks import RichTextBlock


class ClearBlock(StreamBlock):
    def render_list_member(
            self, block_type_name, value, prefix, index, errors=None
            ):
        """ This is extending the StreamBlock render """
        child_block = self.child_blocks[block_type_name]
        child = child_block.bind(
            value, prefix="%s-value" % prefix, errors=errors
            )
        return render_to_string('block_forms/clear_stream_member.html', {
            'child_blocks': self.child_blocks.values(),
            'block_type_name': block_type_name,
            'prefix': prefix,
            'child': child,
            'index': index,
        })
