import csv
import os

# File path for users.csv (stored in the same directory as this script)
USER_FILE = os.path.join(os.path.dirname(__file__), "users.csv")
FIELDNAMES = ["email", "password"]

# Ensure users.csv exists and has headers
if not os.path.exists(USER_FILE):
    with open(USER_FILE, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writeheader()
# This file will be user to store user credentials 
def authenticate_user(email, password):
    """Check if the given email and password match a user."""
    if not os.path.exists(USER_FILE):
        return False
    with open(USER_FILE, mode='r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["email"] == email and row["password"] == password:
                return True
    return False
# This function will be used to register a new user
def register_user(email, password):
    """Register a new user if the email is not already taken."""
    if not os.path.exists(USER_FILE):
        # Should never happen, but handle just in case
        with open(USER_FILE, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
            writer.writeheader()
    
    with open(USER_FILE, mode='r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["email"] == email:
                return False  # User already exists

    with open(USER_FILE, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writerow({"email": email, "password": password})
    return True

