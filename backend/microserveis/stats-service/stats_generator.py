import mysql.connector
import json
import matplotlib.pyplot as plt
from collections import defaultdict
from datetime import datetime, date

conn = mysql.connector.connect(
    host='dam.inspedralbes.cat',
    user='a23salassass_mariobros',
    password='L-280013-h',
    database='a23salassass_mariobros'
)

cursor = conn.cursor(dictionary=True)
cursor.execute("SELECT puntuacio, temps, DATE(data) as dia, data FROM partides")
resultados = cursor.fetchall()

estadisticas = defaultdict(lambda: {'partides': 0, 'puntuacio_total': 0, 'temps_total': 0})

puntuacio_max = {'puntuacio': 0}
temps_min = {'temps': float('inf')}
dia_mas_actiu = ''
contador_dias = defaultdict(int)

for row in resultados:
    dia = row['dia']
    estadisticas[dia]['partides'] += 1
    estadisticas[dia]['puntuacio_total'] += row['puntuacio']
    estadisticas[dia]['temps_total'] += row['temps']

    contador_dias[dia] += 1

    if row['puntuacio'] > puntuacio_max['puntuacio']:
        puntuacio_max = row

    if row['temps'] < temps_min['temps']:
        temps_min = row

dia_mas_actiu = max(contador_dias.items(), key=lambda x: x[1])[0]

estadisticas_finales = [
    {
        'dia': dia.strftime('%Y-%m-%d') if hasattr(dia, 'strftime') else str(dia),
        'nombre_partides': datos['partides'],
        'puntuacio_mitjana': round(datos['puntuacio_total'] / datos['partides'], 2),
        'temps_mitja': round(datos['temps_total'] / datos['partides'], 2)
    }
    for dia, datos in sorted(estadisticas.items())
]

with open('estadistiques_diaries.json', 'w') as f:
    json.dump(estadisticas_finales, f, indent=4)

resum_top = {
    "millor_puntuacio": {
        "puntuacio": puntuacio_max['puntuacio'],
        "temps": puntuacio_max['temps'],
        "data": puntuacio_max['data'].strftime('%Y-%m-%d %H:%M:%S') if hasattr(puntuacio_max['data'], 'strftime') else str(puntuacio_max['data'])
    },
    "partida_mes_rapida": {
        "puntuacio": temps_min['puntuacio'],
        "temps": temps_min['temps'],
        "data": temps_min['data'].strftime('%Y-%m-%d %H:%M:%S') if hasattr(temps_min['data'], 'strftime') else str(temps_min['data'])
    },
    "dia_mes_actiu": {
        "dia": dia_mas_actiu.strftime('%Y-%m-%d') if hasattr(dia_mas_actiu, 'strftime') else str(dia_mas_actiu),
        "nombre_partides": contador_dias[dia_mas_actiu]
    }
}

with open('resum_top.json', 'w') as f:
    json.dump(resum_top, f, indent=4)

dias = [item['dia'] for item in estadisticas_finales]
partides = [item['nombre_partides'] for item in estadisticas_finales]

plt.figure(figsize=(12, 6))
plt.bar(dias, partides, label='Nombre de partides', color='skyblue')
plt.xlabel('Dia')
plt.ylabel('Nombre de partides')
plt.title('Nombre de partides per dia')
plt.xticks(rotation=45)
plt.tight_layout()
plt.legend()
plt.savefig('estadistiques.png')

print(" Estadístiques stats generator")

cursor.close()
conn.close()
