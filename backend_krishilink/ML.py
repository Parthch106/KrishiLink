# train_model.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import pickle

# 1. Load Dataset
data = pd.read_csv('products_dataset.csv')

# 2. Encode Categorical Variables
le_name = LabelEncoder()
le_unit = LabelEncoder()

data['Name_encoded'] = le_name.fit_transform(data['Name'])
data['Unit_encoded'] = le_unit.fit_transform(data['Unit'])

# 3. Features and Target
X = data[['Name_encoded', 'Unit_encoded', 'Stock', 'Rating']]
y = data['Price']

# 4. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Model
model = RandomForestRegressor(n_estimators=150, random_state=42)
model.fit(X_train, y_train)

# 6. Evaluate
y_pred = model.predict(X_test)
print(f"Mean Absolute Error: {mean_absolute_error(y_test, y_pred):.2f}")

# 7. Save model and encoders
with open('price_predictor_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('label_encoders.pkl', 'wb') as f:
    pickle.dump((le_name, le_unit), f)

print("Model and encoders saved successfully!")
