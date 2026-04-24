# Matematica - 2026/04/24

## Weekday by Date

```python
def getCodeByYear(year) -> int:
  return int(year) - 2023

def getCodeByMonth(month) -> int:
  months = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
  return months[int(month)]

def getWeekdayByDate(date = ['2026', '04', '24']) -> int:
  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  weekday = sum([int(date[2]), getCodeByMonth(date[1]), getCodeByYear(date[0])]) % len(weekdays)
  return weekday, weekdays[weekday]

print(getWeekdayByDate(['2026', '01', '01'])) # (1, 'Seg')
```
