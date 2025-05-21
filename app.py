import streamlit  as st
import string 
import random 


st.title("Generador de contraseñas")

passlen = st.number_input("longitud  de la contraseña", min_value=1,step=1)

if st. button("Generar"):

    s1 = string.ascii_uppercase
    s2 = string.ascii_lowercase
    s3 = string.digits
    s4 = string.punctuation

    s = list(s1 + s2 + s3 + s4)
    random.shuffle(s)

    pas = "".join(s[:passlen])
    st.success(f"Tu contraseña: {pas}")



    