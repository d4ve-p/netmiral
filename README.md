# netmiral
Network device managing interface for monitoring and configurating

Requirements:
- npm
- python (be)
- mongodb (be)

Quick setup:
cd frontend
npm install

cd fast-api
python -m venv .venv
`Activate venv`
.venv\Scripts\activate
pip install -r requirements.txt

go to root

npm run dev

this should start both, frontend and backend

env variable:
copy .env.example and modify

database connection variable:
fast-api/src/database.py
