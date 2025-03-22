from os import path, listdir

RAW_DIR = path.join("./", "raw", "epac")
CLEANED_DIR = path.join("./", "cleaned", "epac")

if __name__ == "__main__":
    for filename in listdir(RAW_DIR):
        with open(path.join(CLEANED_DIR, filename.replace(".pdf", ".txt")), "w") as file:
            file.write("")
