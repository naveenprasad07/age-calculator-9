const dayEl = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const arrowBtn = document.getElementById("arrow");

const errorElements = {
  day: dayEl.nextElementSibling,
  month: monthEl.nextElementSibling,
  year: yearEl.nextElementSibling,
};

function calculateAge(birthDate) {
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months -= 1;
    // Borrow days from the previous month
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

const isInvalidInput = (val, min, max) => {
  if (val === "") return "This Field cannot be empty";
  if (/\D/.test(val)) return "This Field must contain only numbers";
  if (val < min || val > max) return `This range is from ${min} and ${max}`;
  return null;
};

const displayError = (el, message) => {
  el.classList.remove("hidden");
  el.innerText = message;
};

const hideAllErrors = () => {
  Object.values(errorElements).forEach((el) => el.classList.add("hidden"));
};

const validateInput = () => {
  const dayVal = dayEl.value;
  const monthVal = monthEl.value;
  const yearVal = yearEl.value;

  hideAllErrors();

  const dayError = isInvalidInput(dayVal, 1, 31);
  const monthError = isInvalidInput(monthVal, 1, 12);
  const yearError = isInvalidInput(yearVal, 1900, 3000);

  if (dayError) {
    displayError(errorElements.day, dayError);
    return false;
  }
  if (monthError) {
    displayError(errorElements.month, monthError);
    return false;
  }
  if (yearError) {
    displayError(errorElements.year, yearError);
    return false;
  }

  return true;
};

const calcAge = () => {
  if (validateInput()) {
    const birthDate = new Date(yearEl.value, monthEl.value - 1, dayEl.value);
    const age = calculateAge(birthDate);

    document.getElementById("year-span").innerText = age.years;
    document.getElementById("month-span").innerText = age.months;
    document.getElementById("day-span").innerText = age.days;
    console.log(
      `Age: ${age.years} years, ${age.months} months, and ${age.days} days.`
    );
  }
};

arrowBtn.addEventListener("click", calcAge);

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calcAge();
  }
});
