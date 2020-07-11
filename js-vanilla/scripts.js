// Data (State)
let state = {
  movies: [
    {
      title: "Filme XPO",
      image: "https://lorempixel.com/350/150",
      categories: ["001", "002"],
    },
    {
      title: "Filme XYZ",
      image: "https://lorempixel.com/350/150",
      categories: ["003", "006"],
    },
    {
      title: "Filme ABC",
      image: "https://lorempixel.com/350/150?2",
      categories: ["006", "004", "002", "001"],
    },
    {
      title: "Filme TOP",
      image: "https://lorempixel.com/350/150",
      categories: ["002"],
    },
  ],
  categories: [
    { id: "001", title: "Drama" },
    { id: "002", title: "Suspense" },
    { id: "003", title: "Terrorr" },
    { id: "004", title: "Nacional" },
    { id: "005", title: "Animação" },
    { id: "006", title: "Ação" },
  ],
};

/*
 * Components
 */
function CardComponent(props) {
  const getCategory = (id) =>
    `<a href="#" class="badge badge-secondary"> 
      ${state.categories.find((item) => id === item.id).title}
    </a>
   `;

  return `
      <div class="card">
        <img
          src="${props.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${props.title}</h5>
          <p class="card-text">
          ${props.categories.map((category) => getCategory(category)).join(" ")}
          </p>
        </div>
      </div>
    `;
}

function CardsComponent() {
  return state.movies
    .map((movie) => {
      return CardComponent(movie);
    })
    .join("");
}

function RenderCards() {
  const cardsContainer = document.querySelector("#cards-container");
  cardsContainer.innerHTML = CardsComponent();
}

RenderCards();

/*
 * Categories
 */
function SelectCategory() {
  return state.categories
    .map((category) => {
      return `<option value="${category.id}">${category.title}</option>`;
    })
    .join("");
}

const categories = document.querySelector("#categories");
categories.innerHTML = SelectCategory();

/*
 * Form
 */
function handleSubmit(event) {
  event.preventDefault();

  const title = event.target.title.value;
  const image = event.target.picture.value;
  const categories = event.target.categories.options;

  const categoriesArr = [...categories];
  const selectdCategories = categoriesArr
    .filter((category) => category.selected === true)
    .map((option) => option.value);

  state.movies.push({
    title,
    image,
    categories: selectdCategories,
  });

  event.target.title.value = "";
  event.target.picture.value = "";
  event.target.categories.options = "";

  RenderCards();
}

const form = document.querySelector("#form-movie");
form.addEventListener("submit", handleSubmit);
