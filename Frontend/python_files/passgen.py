import string 
import random 

def genPass(length=12):
    caracteres = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(caracteres) for _ in range(int(length)))

if __name__ == "__main__":
    length = sys.argv[1] if len(sys.argv) > 1 else 12
    print(genPass(length))
