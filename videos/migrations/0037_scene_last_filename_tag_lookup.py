# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-08-13 14:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0036_folder_path_with_ids'),
    ]

    operations = [
        migrations.AddField(
            model_name='scene',
            name='last_filename_tag_lookup',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]