from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Teller Rehab API")

# Configure CORS for Expo dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Teller Rehab API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Example AI endpoint
@app.post("/api/analyze-speech")
async def analyze_speech(audio_data: dict):
    # Your AI model logic here
    return {"result": "Speech analysis result"}