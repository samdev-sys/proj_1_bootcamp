import streamlit as st
import string
import random

st.set_page_config(page_title="Generador de Contraseñas", page_icon="🔐")

st.title("🔐 Generador de contraseñas seguras")

passlen = st.number_input("Longitud de la contraseña", min_value=4, step=1, value=12)

if st.button("Generar"):
    caracteres = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choices(caracteres, k=passlen))
    st.success(f"Tu contraseña generada es:\n\n`{password}`")
