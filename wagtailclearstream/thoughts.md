# Blocks
BlockQuoteBlock
BooleanBlock
CharBlock
ChoiceBlock
DateBlock
DateTimeBlock
DecimalBlock
DocumentChooserBlock
EmailBlock
EmbedBlock
FloatBlock
ImageChooserBlock
IntegerBlock
PageChooserBlock
RawHTMLBlock
RegexBlock
RichTextBlock
SnippetChooserBlock
StaticBlock
TextBlock
TimeBlock
URLBlock

# Structural blocks
StructBlock
ListBlock
StreamBlock


Could we expand the StreamBlock?

### stream.html

```
{% extends "wagtailadmin/block_forms/sequence.html" %}

{% block sequence_type_class %}stream{% endblock %}

{% block header %}
    {% if list_members_html %}
        {% include "wagtailadmin/block_forms/stream_menu.html" with menu_id=prefix|add:"-prependmenu" state="closed" %}
    {% else %}
        {% include "wagtailadmin/block_forms/stream_menu.html" with menu_id=prefix|add:"-prependmenu" state="open" %}
    {% endif %}
{% endblock %}
```


### stream_member.html

```
{% extends "wagtailadmin/block_forms/sequence_member.html" %}
{% load i18n %}

{% block hidden_fields %}
    <input type="hidden" id="{{ prefix }}-type" name="{{ prefix }}-type" value="{{ child.block.name }}">
{% endblock %}

{% block header_controls %}
    <div class="sequence-controls">
        <h3><label{% if child.id_for_label %} for="{{ child.id_for_label }}"{% endif %}>{{ child.block.label }}</label></h3>
        <div class="button-group button-group-square">
            <button type="button" id="{{ prefix }}-moveup" title="{% trans 'Move up' %}" class="button icon text-replace icon-order-up">{% trans 'Move up' %}</button>
            <button type="button" id="{{ prefix }}-movedown" title="{% trans 'Move down' %}" class="button icon text-replace icon-order-down">{% trans 'Move down' %}</button>
            <button type="button" id="{{ prefix }}-delete" title="{% trans 'Delete' %}" class="button icon text-replace hover-no icon-bin">{% trans 'Delete' %}</button>
        </div>
    </div>
{% endblock %}

{% block footer_controls %}
    {% include "wagtailadmin/block_forms/stream_menu.html" with menu_id=prefix|add:"-appendmenu" state="closed" %}
{% endblock %}
```
