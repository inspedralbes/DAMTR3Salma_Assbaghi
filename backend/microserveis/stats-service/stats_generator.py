import mysql.connector
import json
import matplotlib.pyplot as plt
from collections import defaultdict
from datetime import datetime
import os
output_dir = './backend/microserveis/stats-service'
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, 'estadistiques.png')

conn = mysql.connector.connect(
    host='dam.inspedralbes.cat',  
    user='a23salassass_mariobros',
    password='L-280013-h',
    database='a23salassass_mariobros'
)

cursor = conn.cursor(dictionary=True)

cursor.execute("SELECT puntuacio, temps, DATE(data) as dia FROM partides")

resultados = cursor.fetchall()

estadisticas = defaultdict(lambda: {'partides': 0, 'puntuacio_total': 0, 'temps_total': 0})

for row in resultados:
    dia = row['dia'] 
    estadisticas[dia]['partides'] += 1 
    estadisticas[dia]['puntuacio_total'] += row['puntuacio'] 
    estadisticas[dia]['temps_total'] += row['temps'] 

estadisticas_finales = [
    {
        'dia': dia.strftime('%Y-%m-%d'), 
        'nombre_partides': datos['partides'],
        'puntuacio_mitjana': round(datos['puntuacio_total'] / datos['partides'], 2),
        'temps_mitja': round(datos['temps_total'] / datos['partides'], 2)
    }
    for dia, datos in sorted(estadisticas.items())
]

with open('estadistiques_diaries.json', 'w') as f:
    json.dump(estadisticas_finales, f, indent=4)

dias = [item['dia'] for item in estadisticas_finales]
partides = [item['nombre_partides'] for item in estadisticas_finales]

# Crear un gráfico de barras
plt.figure(figsize=(12, 6))
plt.bar(dias, partides, color='skyblue', label='Nombre de partides')

# Etiquetas y título
plt.xlabel('Dia')
plt.ylabel('Nombre de partides')
plt.title('Nombre de partides per día')
plt.xticks(rotation=45)  # Rotar etiquetas del eje X

# Mostrar el gráfico
plt.tight_layout()  
plt.legend()
plt.savefig(output_path, format='png')

# Cerramos la conexión
cursor.close()
conn.close()
