from rest_framework import permissions

# Teacher Permission
class IsTeacherUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'TEACHER':
            return True
        return False
    
# Student Permission
class IsStudentUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'STUDENT':
            return True
        return False

# Admin Permission
class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'ADMIN':
            return True
        return False
