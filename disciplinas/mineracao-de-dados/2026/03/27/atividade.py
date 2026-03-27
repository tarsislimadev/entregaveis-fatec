print('-- atividade -- mineracao de dados --')

import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA

df = pd.read_csv('https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/SIM/DO23OPEN.csv', encoding='latin1', sep=';')
df.info()
df.describe

print("Formato dos dados:", df.shape)
print("\nTipos das variáveis:\n", df.dtypes)
print("\nPrimeiras 5 linhas:\n", df.head()) 
print("\nValores ausentes:\n", df.isnull().sum())

cols_num = ['IDADE', 'PESO_NASC', 'QTDE_EMB']
cols_cat = ['RACACOR', 'ESTCIVIL', 'ESC', 'OCUP', 'CAUSABAS', 'LOCOCOR']

im_num = SimpleImputer(strategy="median")
im_cat = SimpleImputer(strategy="most_frequent")

for col in cols_num:
  if col in df.columns:
    df[col] = im_num.fit_transform(df[[col]])

cols_cat_to_encode = ['RACACOR', 'ESC', 'OCUP', 'CAUSABAS']
enc = OneHotEncoder(handle_unknown="ignore", sparse_output=False)

df_processed = pd.concat([df.drop(columns=cols_cat_to_encode).reset_index(drop=True)], axis=1)

cols_num_to_scale = ['IDADE']
scaler = StandardScaler()

df_processed[cols_num_to_scale] = scaler.fit_transform(df_processed[cols_num_to_scale])

X = df_processed.drop(columns=['ORIGEM', 'TIPOBITO', 'SEXO'])
y = df_processed['SEXO']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"\nTamanho do conjunto de treino: {X_train.shape}")
print(f"Tamanho do conjunto de teste: {X_test.shape}")

print("\n--- 20 primeiros registros de X_train (características de treino) ---")
print(X_train.head(20))

print("\n--- 20 primeiros registros de y_train (rótulos de treino) ---")
print(y_train.head(20))

print("\n--- 20 primeiros registros de X_test (características de teste) ---")
print(X_test.head(20))

print("\n--- 20 primeiros registros de y_test (rótulos de teste) ---")
print(y_test.head(20))
