const fs = require('fs');
const path = require('path');
const { RandomForestRegressor } = require('scikit-learn');

let model;

// Load the model once
async function loadModel() {
  if (!model) {
    const modelPath = path.join(__dirname, '../models/fair_price_model.pkl');
    const buffer = fs.readFileSync(modelPath);
    model = await load(buffer);
  }
  return model;
}

async function predictPrice(stock, unit, rating) {
  await loadModel();

  // Basic encoding for 'unit'
  const unitMapping = {
    'kg': 0, 'g': 1, 'dozen': 2, 'litre': 3, 'ml': 4, 'piece': 5, 'bunch': 6, 'packet': 7, 'box': 8,
  };

  const unitEncoded = unitMapping[unit] ?? 0; // Default to 0

  const inputFeatures = [[parseFloat(stock), parseFloat(unitEncoded), parseFloat(rating)]];

  const predicted = model.predict(inputFeatures);

  return predicted[0];
}

module.exports = { predictPrice };

