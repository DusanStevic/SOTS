from rest_framework import serializers
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'username', 'role')
class CreateNewUserSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        # Hashing passwords. If you don't use the create_user function on the user object, 
        # a password will be stored in plain text. Your password will be exposed in a database. 
        # If your passwords aren't hashed you will not be able to log in. 
        # Because during login hashed passwords are being compared one from login and another from the database.   
        user = User.objects.create_user(**validated_data)
        return user

    # something like DTO in java
    class Meta:
        model = User
        # fields in DTO
        fields = ('id','email', 'username', 'role','first_name', 'password','last_name')
        # You can not read the password, you can only write the password.
        extra_kwargs = {'password': {'write_only': True}}