export const dayCard = async ({ day, icon, index, max, min, onTap }) => {
  const card = document.createElement("div");
  card.classList.add("day-card");
  card.dataset.index = index;
  const theIcon = await import(`../assets/icons/${icon}.svg`);

  card.innerHTML = `
                    <p>${day}</p>
                    <div class="img">
                    <img src="${theIcon.default}" alt="" />
                    </div>
                    <p class="temps"><span>${Math.round(max)}°</span> <span>${Math.round(min)}°</span></p>`;
  card.addEventListener("click", onTap);
  return card;
};
