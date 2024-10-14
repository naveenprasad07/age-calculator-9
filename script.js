const dayEl = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");

const arrowBtn = document.getElementById("arrow");

const isBlank = (val) => "" === val;

const notNumber = (input) => {
  const regex = /[^\d]/;
  return regex.test(input);
};

const isRange = (input, min, max) => {
  return min <= input && input <= max;
};

const displayNumberError = (el) => {
  el.classList.remove("hidden");
  el.innerText = "This Field must contain only number";
};

const displayErrorEmpty = (el) => {
  el.classList.remove("hidden");
  el.innerText = "This Field cannot be empty";
};

const displayRangeError = (el, min, max) => {
  el.classList.remove("hidden");
  el.innerText = `This range is from ${min} and ${max}`;
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

const checkDay = (dayVal) => {
  if (isBlank(dayVal)) {
    displayErrorEmpty(dayEl.nextElementSibling);
    return false;
  } else if (notNumber(dayVal)) {
    displayNumberError(dayEl.nextElementSibling);
    return false;
  }
  if (!isRange(dayVal, 1, 31)) {
    displayRangeError(dayEl.nextElementSibling, 1, 31);
    return false;
  }

  return true;
};

const checkYear = (yearVal) => {
  if (isBlank(yearVal)) {
    displayErrorEmpty(yearEl.nextElementSibling);
    return false;
  } else if (notNumber(yearVal)) {
    displayNumberError(yearEl.nextElementSibling);
    return false;
  }
  if (!isRange(yearVal, 1900, 3000)) {
    displayRangeError(yearEl.nextElementSibling, 1900, 3000);
    return false;
  }
  return true;
};

const checkMonth = (monthVal) => {
  if (isBlank(monthVal)) {
    displayErrorEmpty(monthEl.nextElementSibling);
    return false;
  } else if (notNumber(monthVal)) {
    displayNumberError(monthEl.nextElementSibling);
    return false;
  }
  if (!isRange(+monthVal, 1, 12)) {
    displayRangeError(monthEl.nextElementSibling, 1, 12);
    return false;
  }
  return true;
};

const removeAllError = () => {
  dayEl.nextElementSibling.classList.add("hidden");
  monthEl.nextElementSibling.classList.add("hidden");
  yearEl.nextElementSibling.classList.add("hidden");
};

arrowBtn.addEventListener("click", function () {
  const dayVal = dayEl.value;
  const monthVal = monthEl.value;
  const yearVal = yearEl.value;

  removeAllError();

  if (checkDay(dayVal) && checkMonth(monthVal) && checkYear(yearVal)) {
    const birthDate = new Date(yearVal, monthVal, dayVal); // 31st July 2002 (Note: month is 0-indexed, so 6 = July)
    const age = calculateAge(birthDate);

    document.getElementById("year-span").innerText = age.years;
    document.getElementById("month-span").innerText = age.months;
    document.getElementById("day-span").innerText = age.days;
    console.log(
      `Age: ${age.years} years, ${age.months} months, and ${age.days} days.`
    );
  }
});
