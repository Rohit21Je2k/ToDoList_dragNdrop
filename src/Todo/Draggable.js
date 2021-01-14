export default function Draggable() {
  const draggables = document.querySelectorAll(".list-item");
  const containers = document.querySelectorAll(".list");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggable = document.querySelector(".dragging");
      console.log(draggable);
      container.appendChild(draggable);
    });
  });
}
