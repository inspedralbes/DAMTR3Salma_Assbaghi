import mysql.connector
import json
import matplotlib.pyplot as plt
from collections import defaultdict
from datetime import datetime

conn = mysql.connector.connect(
    host='dam.inspedralbes.cat',  
    user='a23salassass_mariobros',
    password='L-280013-h',
    database='a23salassass_mariobros'
)

cursor = conn.cursor(dictionary=True)

cursor.execute("SELECT DATE(timeStamp) as dia, COUNT(*) as total FROM usuaris GROUP BY dia")
resultados = cursor.fetchall()

estadisticas = [
    {
        'dia': row['dia'].strftime('%Y-%m-%d'), 
        'total_usuaris': row['total']
    }
    for row in resultados
]

with open('estadistiques_usuaris.json', 'w') as f:
    json.dump(estadisticas, f, indent=4)

dias = [item['dia'] for item in estadisticas]
usuaris = [item['total_usuaris'] for item in estadisticas]

plt.figure(figsize=(12, 6))
plt.plot(dias, usuaris, marker='o', linestyle='-', color='mediumseagreen', label="Usuaris registrats")

plt.xlabel('Dia')
plt.ylabel("Nombre d'usuaris registrats")
plt.title("Evolució diària d'usuaris registrats")
plt.xticks(rotation=45)
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.savefig('estadistiques_usuaris.png', format='png')


cursor.close()
conn.close()
