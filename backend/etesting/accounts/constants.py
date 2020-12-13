# For constants that will only be used by one module, just define them in that module. 
# For constants that are used by the whole project, the convention is to add them to your settings file. 
# For constants used throughout a single app, I think your approach of having a constants.py per app is fine.
ROLES = (("STUDENT", "STUDENT"),
        ("TEACHER", "TEACHER"),
        ("ADMIN", "ADMIN"),)