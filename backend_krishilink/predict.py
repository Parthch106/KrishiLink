import sys
import pickle
import numpy as np

# Load your trained model
with open('price_predictor_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Receive inputs
category = sys.argv[1]
unit = sys.argv[2]
stock = float(sys.argv[3])
rating = float(sys.argv[4])

# Dummy encoding for category and unit (for example)
category_mapping = {
    "Vegetables": 0,
    "Fruits": 1,
    "Dairy & Eggs": 2,
    "Herbs": 3,
    "Honey & Preserves": 4,
    "Bakery": 5
}

unit_mapping = {
    "kg": 0,
    "g": 1,
    "dozen": 2,
    "litre": 3,
    "ml": 4,
    "piece": 5,
    "bunch": 6,
    "packet": 7,
    "box": 8
}

# Map string input to numbers
category_num = category_mapping.get(category, 0)
unit_num = unit_mapping.get(unit, 0)

# Prepare input for model
X = np.array([[category_num, unit_num, stock, rating]])

# Predict
predicted_price = model.predict(X)[0]

print(predicted_price)
