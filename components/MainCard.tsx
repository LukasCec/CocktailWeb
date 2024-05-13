import React, { useState, ChangeEvent } from "react";

export default function MainCard() {
    const [inputValue, setInputValue] = useState("");
    const [cocktailName, setCocktailName] = useState("");
    const [cocktailCategory, setCocktailCategory] = useState("");
    const [cocktailInstructions, setCocktailInstructions] = useState("");
    const [cocktailImage, setCocktailImage] = useState("");
    const [ingredients, setIngredients] = useState<{ ingredient: string, measure: string }[]>([]);
    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`);
        const data = await response.json();

        if (data.drinks) {
            setCocktailName(data.drinks[0].strDrink);
            setCocktailCategory(data.drinks[0].strCategory);
            setCocktailInstructions(data.drinks[0].strInstructions);
            setCocktailImage(data.drinks[0].strDrinkThumb);

            const drink = data.drinks[0];
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredients.push({ ingredient, measure });
                }
            }
            setIngredients(ingredients);
        } else {
            console.log('Invalid cocktail name');
            setCocktailName('');
            setCocktailCategory('');
            setCocktailInstructions('');
            setCocktailImage('');
            setIngredients([]);
        }
    };


    return (
        <div className="main bg-transparent bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 text-gray-900 w-full h-[100vh] duration-300">
            <div className="flex justify-center items-center h-full duration-300">
                <div className="text-center m-2 p-6 rounded-2xl max-w-[500px] duration-300 bg-gray-100 ">
                    <h1 className="text-4xl font-bold hover:scale-[102%] cursor-alias duration-300 " style={{background: 'linear-gradient(to right, red, blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>🍸CocktailWeb</h1>
                    <form>
                        <input
                            type="text"
                            className="bg-gradient-to-l from-red-50 via-white to-blue-50 text-gray-900 mt-5 p-2 rounded-lg w-80 border-b border-red-200"
                            placeholder="Search for a cocktail"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </form>
                    {cocktailName ?  (
                        <>
                            <h2 className="mt-10 text-3xl font-bold" style={{background: 'linear-gradient(to right, red, blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{cocktailName}</h2>
                            <p className="text-gray-400">{cocktailCategory}</p>
                            <img src={cocktailImage} alt={cocktailName} className="w-40 mx-auto mb-7 h-40 rounded-lg mt-5" />

                            <h3 className="text-xl font-bold mb-2" style={{background: 'linear-gradient(to right, red, blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                Ingredients
                            </h3>
                            <ul className="list-disc list-inside text-gray-500 mb-7">
                                {ingredients.map((item, index) => (
                                    <li key={index}>{item.ingredient}: {item.measure}</li>
                                ))}
                            </ul>
                            <p className="text-gray-400"> {cocktailInstructions}</p>
                        </>
                    ) : inputValue && (
                        <p className="text-gray-400 mt-3">There is no such a drink</p>
                    )}
                </div>
            </div>
        </div>
    );
}