# Generated by Django 3.1.4 on 2021-01-30 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('etest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='type_of_test',
            field=models.CharField(choices=[('expected', 'Expected'), ('real', 'Real')], default='expected', max_length=50),
        ),
    ]
