# Generated by Django 3.1.5 on 2021-02-03 11:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usercostumer', '0004_auto_20210203_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfollowing',
            name='following_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to='usercostumer.userprofil'),
        ),
        migrations.AddConstraint(
            model_name='userfollowing',
            constraint=models.UniqueConstraint(fields=('user_id', 'following_user_id'), name='unique_followers'),
        ),
    ]