from os import path, listdir

RAW_DIR = path.join("./", "raw", "eqe", "02-Paper D")
CLEANED_DIR = path.join("./", "cleaned", "eqe", "paper_d")

if __name__ == "__main__":
    for filename in listdir(RAW_DIR):
        with open(path.join(CLEANED_DIR, filename.replace(".pdf", ".txt")), "w") as file:
            file.write("")
