from pkg_resources import parse_version

from django.utils.html import format_html
from django.contrib.staticfiles.templatetags.staticfiles import static

from wagtail.wagtailcore import hooks
from wagtail.wagtailcore import __version__ as WAGTAIL_VERSION


@hooks.register('insert_global_admin_css')
def global_admin_css():
    return format_html(
        '<link rel="stylesheet" href="{}">',
        static('wagtailclearstream/css/wagtailclearstream.css')
    )


@hooks.register('insert_global_admin_js')
def global_admin_js():
    return format_html(
        '<script src="{}"></script>',
        static('wagtailclearstream/js/clear_stream.js')
    )


# New Wagtail versions support importing CSS throughout the admin.
# Fall back to the old hook (editor screen only) for older versions.
if parse_version(WAGTAIL_VERSION) >= parse_version('1.4'):
    admin_stylesheet_hook = 'insert_global_admin_css'
else:
    admin_stylesheet_hook = 'insert_editor_css'
