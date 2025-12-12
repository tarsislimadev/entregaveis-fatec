grafo = [
  [0, 1, 0, 1, 0], # A
  [1, 0, 1, 0, 0], # B
  [0, 1, 0, 0, 0], # C
  [1, 0, 0, 0, 1], # D
  [0, 0, 0, 1, 0], # E
]

# from C to E

initial_position = 'C'
final_position = 'E'

# way = ['C', 'B', 'A', 'D', 'E']

signs = { 'A' : 0, 'B' : 1, 'C' : 2, 'D' : 3, 'E' : 4 }

letters = ['A', 'B', 'C', 'D', 'E']

def walk(walking): # ['C']
  steps = [walking]
  walking_ix = [signs[x] for x in walking]
  index = walking_ix[-1] # ix = 2
  point = grafo[index] # [0, 1, 0, 0, 0]

  for conn in point:
    ix = point.index(conn)
    if letters[ix] in walking:
      continue

    if conn == 1: # 0 = not a connection, 1 = a connection
      step = []
      step.extend(walking)
      step.append(letters[ix])
      steps.append(step)

  return steps # [['C', 'B']]

print(walk(['C', 'B']))
