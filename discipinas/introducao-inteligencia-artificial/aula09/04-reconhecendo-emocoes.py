# 4. Reconhecendo emoções
## Peça ao usuário como ele está se sentindo (feliz, triste, com sono, etc.) e responda de forma diferente para cada emoção.

emoção = input("Como você está se sentindo? ")

if emoção == "feliz":
    print("Que bom que você está feliz!")
elif emoção == "triste":
    print("Que pena que você está triste!")
elif emoção == "com sono":
    print("Ah, você está com sono...")
else:
    print("Não sabemos como você está se sentindo, mas estamos aqui para te ajudar!")
