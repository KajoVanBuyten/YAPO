# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-13 17:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scene',
            name='date_fav',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='scene',
            name='date_runner_up',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='scene',
            name='thumbnail',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
