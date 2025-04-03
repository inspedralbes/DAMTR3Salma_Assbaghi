import mysql.connector
import matplotlib.pyplot as plt

conn = mysql.connector.connect(
    host='dam.inspedralbes.cat',
    user='a23salassass_mariobros',
    password='L-280013-h',
    database='a23salassass_mariobros'
)

cursor = conn.cursor(dictionary=True)

cursor.execute("""
    SELECT u.nom, u.usuari, COUNT(p.id) AS total_partides
    FROM partides p
    JOIN usuaris u ON p.JugadorId = u.id
    GROUP BY p.JugadorId
    ORDER BY total_partides DESC
    LIMIT 5
""")
top_jugadors = cursor.fetchall()

cursor.close()
conn.close()

nombres = [f"{j['usuari']}" for j in top_jugadors]
partides = [j['total_partides'] for j in top_jugadors]

plt.figure(figsize=(8, 8))
plt.pie(partides, labels=nombres, autopct='%1.1f%%', startangle=140)
plt.title('Top 5 jugadors amb més partides')
plt.axis('equal')  
plt.tight_layout()
plt.savefig('jugadors.png', format='png')
print("jugadors.png fet")
