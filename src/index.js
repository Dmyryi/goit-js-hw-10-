import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Sqoyk3jiZtbn586tdur5xMg5WUjuyz2fJe4ujNr0gNf3zLt7osZHAflT7fotFRWf";


// Функція для отримання та відображення списку порід
function fetchBreeds() {
  axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      const breeds = response.data;
      const breedSelect = document.querySelector(".breed-select");
      breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
      console.log(breeds)
    })
    .catch((error) => {
      showError("Помилка при завантаженні порід");
    });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchBreeds();
});

const breedSelect = document.querySelector(".breed-select");
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    showLoader();
    fetchCatByBreed(selectedBreedId);
  } else {
    hideCatInfo();
  }
});

// Функція для відображення завантажувача
function showLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
}

// Функція для приховування інформації про кота
function hideCatInfo() {
  const catInfo = document.querySelector(".cat-info");
  catInfo.style.display = "none";
}

// Функція для відображення інформації про кота
function showCatInfo(catData) {
  const catInfo = document.querySelector(".cat-info");
   const catImage = document.createElement("img");
  const catName = document.createElement("h2");
  const catDescription = document.createElement("p");
  const catTemperament = document.createElement("p");

  // Заповнення створених елементів даними про кота
  catImage.src = catData.url;
  catImage.alt = "Зображення кота";
 catName.textContent = catData.name;
  catDescription.textContent = `Опис: ${catData.description}`;
  catTemperament.textContent = `Темперамент: ${catData.temperament}`;

  // Очищення вмісту блоку .cat-info перед вставкою нової інформації
  catInfo.innerHTML = "";

  // Вставка створених елементів в блок .cat-info
  catInfo.appendChild(catImage);
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);
  catInfo.appendChild(catTemperament);

  catInfo.style.display = "block";
}

function fetchCatByBreed(breedId) {
  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catData = response.data[0];
      showCatInfo(catData);
    })
    .catch((error) => {
      showError("Помилка при отриманні інформації про кота");
    })
    .finally(() => {
      hideLoader();
    });
}

// Функція для приховування завантажувача
function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
}

// Функція для відображення помилки
function showError(message) {
  const error = document.querySelector(".error");
  error.textContent = message;
  error.style.display = "block";
}