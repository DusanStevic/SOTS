# Responsible for controlling the response data returned after login or refresh. 
# Override to return a custom response such as including the serialized representation of the User.
# Defaults to return the JWT token.
def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'username': user.username,
        'user_id' : user.id,
        'email' : user.email,
        'role' : user.role
    }