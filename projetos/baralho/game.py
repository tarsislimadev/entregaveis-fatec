SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']

class Card:
  def __init__(self, rank, suit):
    self.rank = rank
    self.suit = suit

  def __str__(self):
    return f"{self.rank} of {self.suit}"

class CardsGame:
  def __init__(self):
    self.cards = [Card(rank, suit) for suit in SUITS for rank in RANKS]

def main():
  print("Welcome to Cards Game!")
  game = CardsGame()

  print("\nHere are all the cards in the deck:")
  for card in game.cards:
    print(card)

if __name__ == "__main__":
  main()
