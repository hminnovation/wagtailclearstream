from pkg_resources import parse_version

from django.utils.html import format_html
from django.conf import settings

from wagtail.wagtailcore import hooks
from wagtail.wagtailcore import __version__ as WAGTAIL_VERSION

@hooks.register('insert_global_admin_css')
def global_admin_css():
    elem = '<link rel="stylesheet" href="%swagtailclearstream/css/wagtailclearstream.css">' % settings.STATIC_URL
    return format_html(elem)

@hooks.register('insert_global_admin_js')
def global_admin_js():
    return format_html(
        '<script src="/static/wagtailclearstream/js/clear_stream.js"></script>',
    )

# New Wagtail versions support importing CSS throughout the admin.
# Fall back to the old hook (editor screen only) for older versions.
if parse_version(WAGTAIL_VERSION) >= parse_version('1.4'):
    admin_stylesheet_hook = 'insert_global_admin_css'
else:
    admin_stylesheet_hook = 'insert_editor_css'