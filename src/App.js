import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://api.spoonacular.com/recipes/random?number=12&apiKey=7fad2a6a88e04a528bd58946213150b0"
      );
      const data = await response.json();
      setRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Recipe Page</h1>
      </header>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="recipe-container">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <h3 className="recipe-title">{recipe.title}</h3>
              <div className="recipe-text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: recipe.summary.slice(0, 200),
                  }}
                ></p>
                <div className="scrollable-text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: recipe.summary,
                    }}
                  ></p>
                </div>
              </div>
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="recipe-link"
              >
                View Full Recipe
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
