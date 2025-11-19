const best_choice = (graph = {}, start = '', goal = '') => {
  const steps = [[start]]

  while (steps.at(steps.length - 1).at(steps.at(steps.length - 1).length - 1) != goal) {
    const step = steps.at(steps.length - 1)

    const nexts = graph[step.at(step.length - 1)]

    for (const next of nexts) {
      steps.push([...step, next])
    }
  }

  return steps.find((step) => {
    return step.at(0) == start && step.at(step.length - 1) == goal
  })
}

const cidades = {
  "Campinas": ["Jundiaí", "Indaiatuba"],
  "Jundiaí": ["São Paulo"],
  "Indaiatuba": ["São Paulo"],
  "São Paulo": []
}

const caminho = best_choice(cidades, "Campinas", "São Paulo")
console.log(caminho)
