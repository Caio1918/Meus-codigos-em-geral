import pandas as pd
import numpy as np
from math import ceil
import matplotlib.pyplot as plt

dados = pd.Series([35,51,44,42,37,38,36,39,44,43,40,40,32,39,41,38,42,39,40,46,37,35,41,39])

# Valores importantes
total = dados.count()
v_max = dados.max()
v_min = dados.min()
amp = v_max - v_min
qtde_classes = 5
h = ceil(amp/qtde_classes)

# print(f"Total: {total} \nMax: {v_max} \nMin: {v_min} \nAmplitude: {amp} \nTotal de classes: {qtde_classes} \nAmplitude de classe: {h}")

# Definindo a frequência e criando DataFrame
freq = dados.value_counts(bins=qtde_classes).sort_index()
df = pd.DataFrame(freq)
df = df.reset_index()
df.columns = ["Classe", "Frequência"]

# Definindo o intervalo
end = v_min + h * qtde_classes
intervalos = pd.interval_range(start= v_min, end= end, freq= h)
df["Classe"] = intervalos

pts_medios = [inter.mid for inter in intervalos]
df["Pontos Médios"] = pts_medios

df["Frequência Relativa"] = df["Frequência"] / total
df["Frequência Acumulado"] = df["Frequência"].cumsum()

print(df)

# --------------- Histograma ---------------
# Frequência
classes = []
for intervalo in intervalos:
    classes.append(intervalo.left)

plt.figure(figsize=(6,5))
plt.hist(x=df["Pontos Médios"], bins=classes, weights=df["Frequência"], edgecolor="black")
plt.title("Histograma de frequência")
plt.xlabel("Nivel de Ardência")
plt.ylabel("Frequência")
plt.xticks(np.concatenate([classes, df["Pontos Médios"]]), rotation=45)


# Frequência Relativa
plt.figure(figsize=(6,5))
plt.hist(x=df["Pontos Médios"], bins=classes, weights=df["Frequência Relativa"], edgecolor="black")
plt.title("Histograma de frequência relativa")
plt.xlabel("Nível de Ardência")
plt.ylabel("Frequência Relativa")
plt.xticks(np.concatenate([classes, df["Pontos Médios"]]), rotation=45)

plt.show()