# Generated by Django 3.1.3 on 2021-02-17 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('etest', '0002_knowledgespace_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='real',
            field=models.BooleanField(default=False),
        ),
    ]