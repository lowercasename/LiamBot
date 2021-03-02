import nltk

# nltk.download('punkt')

with open('./corpora/hobbit.txt', 'r') as file:
  data = file.read()
  sentence_list = nltk.tokenize.sent_tokenize(data)
  # print(sentence_list)
  print('\n-----\n'.join(nltk.tokenize.sent_tokenize(data)))