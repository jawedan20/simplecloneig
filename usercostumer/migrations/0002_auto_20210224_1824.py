# Generated by Django 3.1.5 on 2021-02-24 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usercostumer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofil',
            name='profil',
            field=models.ImageField(default='media/image/profil/default.png', upload_to='media/image/profil'),
        ),
    ]
