from rest_framework import serializers
from accounts.models import User,Student,Teacher


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_teacher')
class CreateNewUserSerializer(serializers.ModelSerializer):
    

    def create(self, validated_data):
        # Hashing passwords. If you don't use the create_user function on the user object, 
        # a password will be stored in plain text. Your password will be exposed in a database. 
        # If your passwords aren't hashed you will not be able to log in. 
        # Because during login hashed passwords are being compared one from login and another from the database.   
        user = User.objects.create_user(**validated_data)
        new_student = Student()
        if validated_data.get('is_student') == True:
            new_student = Student()
            new_student.user = user
            new_student.save()
        return user

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_teacher')
        extra_kwargs = {'password': {'write_only': True}}