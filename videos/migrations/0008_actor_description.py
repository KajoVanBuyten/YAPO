# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-16 11:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0007_auto_20160615_2009'),
    ]

    operations = [
        migrations.AddField(
            model_name='actor',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
