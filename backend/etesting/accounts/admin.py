from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from accounts.models import User

class UserAdmin(BaseUserAdmin):
    # add user form in django admin panel (all fields = columns in add user form in django admin panel)
    add_fieldsets = (
        (None, {
            'fields': ('email', 'username', 'role', 'password','first_name','last_name')
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )
    fieldsets = (
        # current user in djanog admin panel (all fields = columns for current user in django admin panel )
        (None, {
            'fields': ('email', 'username', 'role', 'password','first_name','last_name')
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )
    # list of users in django admin panel (all fields = coulumns for all users in django admin panel)
    list_display = ['id','email', 'username', 'role','first_name','last_name']
    # you can search users by email or username
    search_fields = ('email', 'username')
    # users are sorted by email
    ordering = ('email',)

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)