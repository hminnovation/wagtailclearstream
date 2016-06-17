from pkg_resources import parse_version

from django.utils.html import format_html
from django.conf import settings

from wagtail.wagtailcore import hooks
from wagtail.wagtailcore import __version__ as WAGTAIL_VERSION


@hooks.register('insert_editor_css')
def import_wagtailbettereditor_stylesheet():
    elem = '<link rel="stylesheet" href="%swagtailbettereditor/css/wagtailbettereditor.css">' % settings.STATIC_URL
    return format_html(elem)
