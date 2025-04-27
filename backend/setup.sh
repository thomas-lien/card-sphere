#!/bin/bash

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "pip3 is not installed. Please install pip3 first."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Verify installation
echo "Verifying installation..."
python3 -c "import fastapi; import uvicorn; import pydantic; import jose; import passlib; import bcrypt; print('All packages installed successfully!')"

echo "Setup complete! You can now run the backend server with:"
echo "source venv/bin/activate"
echo "uvicorn app.main:app --reload"

curl -X POST http://localhost:8000/auth/login -H "Content-Type: application/json" -d '{"username":"John Doe","password":"password123"}' 