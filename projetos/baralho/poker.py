import random

SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']

class Card:
  def __init__(self, rank, suit):
    self.rank = rank
    self.suit = suit

  def __str__(self):
    return f"{self.rank} of {self.suit}"

class Deck:
  def __init__(self):
    self.cards = [Card(rank, suit) for suit in SUITS for rank in RANKS]
    random.shuffle(self.cards)

  def deal(self, num):
    dealt_cards = self.cards[:num]
    self.cards = self.cards[num:]
    return dealt_cards

class PokerHand:
  def __init__(self, cards):
    self.cards = cards

  def __str__(self):
    return ', '.join(str(card) for card in self.cards)

class PokerGame:
  def __init__(self, num_players):
    if num_players < 2 or num_players > 10:
      raise ValueError("Poker requires 2 to 10 players.")
    self.num_players = num_players
    self.deck = Deck()
    self.players_hands = {f"Player {i+1}": PokerHand(self.deck.deal(2)) for i in range(num_players)}
    self.community_cards = []

  def deal_community_cards(self, num):
    self.community_cards.extend(self.deck.deal(num))

  def show_hands(self):
    for player, hand in self.players_hands.items():
      print(f"{player}: {hand}")

  def show_community_cards(self):
    print("Community Cards:", ', '.join(str(card) for card in self.community_cards))

def main():
  print("Welcome to Poker Texas Hold'em!")
  num_players = int(input("Enter the number of players (2-10): "))
  game = PokerGame(num_players)

  print("\nDealing hands...")
  game.show_hands()

  print("\nDealing the flop...")
  game.deal_community_cards(3)
  game.show_community_cards()

  print("\nDealing the turn...")
  game.deal_community_cards(1)
  game.show_community_cards()

  print("\nDealing the river...")
  game.deal_community_cards(1)
  game.show_community_cards()

if __name__ == "__main__":
  main()
