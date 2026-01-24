agenda_maria = [
  ("Ana", "1111-1111"),
  ("Bruno", "2222-2222"),
  ("Igor", "9999-9999"),
  ("João", "0000-0000"),
]

agenda_ana = [
  ("Ana", "1111-1111"),
  ("Bruno", "2222-2222"),
  ("Carlos", "3333-3333"),
  ("Felipe", "6666-6666"),
  ("Gabriel", "7777-7777"),
  ("Henrique", "8888-8888"),
  ("Igor", "9999-9999"),
  ("João", "0000-0000"),
]

agenda_beatriz = [
  ("Ana", "1111-1111"),
  ("Bruno", "2222-2222"),
  ("Carlos", "3333-3333"),
  ("Daniel", "4444-4444"),
  ("Emanuel", "5555-5555"),
  ("Felipe", "6666-6666"),
  ("Gabriel", "7777-7777"),
  ("João", "0000-0000"),
]

# crie um programa que apresente quais contatos estão nas tres agendas
print(set(agenda_maria) & set(agenda_ana) & set(agenda_beatriz))
