from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/suggestions_lists")
async def create_suggestions_list():
    return ["a", "b", "t"]
