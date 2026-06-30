// Booking an Appointment
function bookAppointmentSlot(requestedSlot: string): Promise<string> {
  const bookedSlots: string[] = ["a1", "b3", "c5"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bookedSlots.includes(requestedSlot.toLowerCase())) {
        reject(new Error(`Slot ${requestedSlot} is already booked.`));
      } else {
        resolve(`Appointment successfully booked for slot: ${requestedSlot}`);
      }
    }, 1000);
  });
}

async function handleBooking(slot: string): Promise<void> {
  try {
    const successMessage = await bookAppointmentSlot(slot);
    console.log(successMessage);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

// Check Server Status with Retry
function pingServer(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isOnline = Math.random() > 0.7;
      if (isOnline) {
        resolve(true);
      } else {
        reject(new Error("Server unreachable."));
      }
    }, 500);
  });
}

async function monitorServerStatus(): Promise<void> {
  const maxRetryAttempts = 5;

  for (
    let currentAttempt = 1;
    currentAttempt <= maxRetryAttempts;
    currentAttempt++
  ) {
    try {
      const isConnected = await pingServer();
      if (isConnected) {
        console.log("Server is online and stable.");
        return;
      }
    } catch (error) {
      console.warn(`Attempt ${currentAttempt} failed. Retrying...`);
    }
  }

  console.error("Critical Error: Server is offline after 5 attempts.");
}

// Meal Search by Ingredient
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealApiResponse {
  meals: Meal[] | null;
}

const searchInputElement = document.getElementById(
  "search-input",
) as HTMLInputElement;
const searchButtonElement = document.getElementById(
  "search-button",
) as HTMLButtonElement;
const mealsContainerElement = document.getElementById(
  "meals-container",
) as HTMLDivElement;

async function fetchMealsByIngredient(ingredient: string): Promise<Meal[]> {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(ingredient)}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: MealApiResponse = await response.json();
  return data.meals || [];
}

function renderMeals(meals: Meal[]): void {
  mealsContainerElement.innerHTML = "";

  if (meals.length === 0) {
    mealsContainerElement.innerHTML = `<p class="no-results-message">No meals found for this ingredient. Try another one!</p>`;
    return;
  }

  for (const meal of meals) {
    const mealCard = document.createElement("div");
    mealCard.className = "meal-card";

    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.className = "meal-image";

    const mealTitle = document.createElement("h3");
    mealTitle.textContent = meal.strMeal;
    mealTitle.className = "meal-title";

    mealCard.appendChild(mealImage);
    mealCard.appendChild(mealTitle);
    mealsContainerElement.appendChild(mealCard);
  }
}

searchButtonElement.addEventListener("click", async () => {
  const query = searchInputElement.value.trim();
  if (!query) return;

  try {
    const meals = await fetchMealsByIngredient(query);
    renderMeals(meals);
  } catch (error) {
    mealsContainerElement.innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
  }
});
