const dfs = (graph = {}, start = '', goal = '') => {
  const steps = [[start]]

  while (steps.at(steps.length - 1).at(steps.at(steps.length - 1).length - 1) != goal) {
    const step = steps.at(steps.length - 1)

    const nexts = graph[step.at(step.length - 1)]

    for (const next of nexts) {
      steps.push([...step, next])
    }
  }

  return steps.find((step) => {
    const start_ok = step.at(0) == start
    const goal_ok  = step.at(step.length - 1) == goal
    return start_ok && goal_ok
  })
}

const cities = {
  "Campinas": ["Jundiaí", "Indaiatuba"],
  "Jundiaí": ["São Paulo"],
  "Indaiatuba": ["São Paulo"],
  "São Paulo": []
}

const flow = dfs(cities, "Campinas", "São Paulo")
console.log(flow)
