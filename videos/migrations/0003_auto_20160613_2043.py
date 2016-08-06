# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-13 17:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0002_auto_20160613_2041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='thumbnail',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='actortag',
            name='thumbnail',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='scene',
            name='thumbnail',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='scenetag',
            name='thumbnail',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
