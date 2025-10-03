alunos = [
  {"nome":"Ana", "notas":   [9,8,7]},
  {"nome":"Bruno", "notas":[6,7,8]},
  {"nome":"Carlos", "notas":[5,6,7]},
  {"nome":"Daniel", "notas":[4,5,6]},
  {"nome":"Emanuel", "notas":[3,4,5]},
  {"nome":"Felipe", "notas":[2,3,4]},
  {"nome":"Gabriel", "notas":[1,2,3]},
  {"nome":"Henrique", "notas":[0,1,2]},
  {"nome":"Igor", "notas":[9,10,11]},
  {"nome":"João", "notas":[8,9,10]},
]

melhor_aluno = None
notas_melhor_aluno = []
maior_media = -1

# calcular a media de cada aluno
for aluno in alunos:
  notas = aluno["notas"]
  media = sum(notas) / len(notas)
  if media > maior_media:
    maior_media = media
    melhor_aluno = aluno["nome"]
    notas_melhor_aluno = notas
# calcular a media de cada aluno

print("aluno com a maior nota: " + melhor_aluno)
print("notas: " + str(notas_melhor_aluno))
print("media: " + str(maior_media))