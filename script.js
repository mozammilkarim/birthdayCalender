// birthday of random people
const birthdayPeople = [
  {
    name: "Tyrion Lannister",
    birthday: "12/02/1978"
  }, {
    name: "Cersei Lannister",
    birthday: "11/30/1975"
  }, {
    name: "Daenerys Targaryen",
    birthday: "11/24/1991"
  }, {
    name: "Arya Stark",
    birthday: "11/25/1996"
  }, {
    name: "Jon Snow",
    birthday: "12/03/1989"
  }, {
    name: "Sansa Stark",
    birthday: "10/08/1992"
  }, {
    name: "Jorah Mormont",
    birthday: "12/16/1968"
  }, {
    name: "Jaime Lannister",
    birthday: "12/06/1975"
  }, {
    name: "Sandor Clegane",
    birthday: "11/07/1969"
  }, {
    name: "Tywin Lannister",
    birthday: "10/12/1951"
  }, {
    name: "Theon Greyjoy",
    birthday: "12/31/1989"
  }, {
    name: "Samwell Tarly",
    birthday: "12/07/1990"
  }, {
    name: "Joffrey Baratheon",
    birthday: "06/12/1992"
  }, {
    name: "Catelyn Stark",
    birthday: "12/03/1962"
  }, {
    name: "Bran Stark",
    birthday: "12/02/1995"
  }, {
    name: "Petyr Baelish",
    birthday: "11/20/1974"
  }, {
    name: "Robb Stark",
    birthday: "11/28/1986"
  }, {
    name: "Brienne of Tarth",
    birthday: "11/27/1985"
  }, {
    name: "Margaery Tyrell",
    birthday: "12/02/1989"
  }, {
    name: "Stannis Baratheon",
    birthday: "09/14/1971"
  }, {
    name: "Davos Seaworth",
    birthday: "02/13/1973"
  }, {
    name: "Tormund Giantsbane",
    birthday: "12/14/1974"
  }, {
    name: "Jeor Mormont",
    birthday: "11/01/1955"
  }, {
    name: "Eddard Stark",
    birthday: "12/02/1963"
  }, {
    name: "Khal Drogo",
    birthday: "12/05/1980"
  }, {
    name: "Ramsay Bolton",
    birthday: "12/05/1976"
  }, {
    name: "Robert Baratheon",
    birthday: "12/02/1965"
  }, {
    name: "Daario Naharis",
    birthday: "12/02/1985"
  }, {
    name: "Viserys Targaryen",
    birthday: "12/06/1984"
  }
  , {
    name: "MK",
    birthday: "01/27/2013"
  }
]

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const colors = ["#7f8387", "#b2f14d", "#eda8e4", "#cdf0f5", "#f7a566", "#f383e9", "#235e9d", "#f44d18"]
var inputYearBirthday;
// see documentation in css file regarding class tags
const displayBirthday = document.createElement("div")
displayBirthday.classList.add("displayBirthday")
const inputYear = document.querySelector("#inputYear")
const inputYearBtn = document.querySelector("#inputYearBtn")

const findInputYearBirthday = () => {
  displayBirthday.innerHTML = ""
  const inputyear = inputYear.valueAsNumber
  // stores the data for real representation inside card
  inputYearBirthday = birthdayPeople.map((person) => {
    // converts date string to Date
    const tempDate = new Date(Date.parse(person.birthday))
    const month = tempDate.getMonth()
    const date = tempDate.getDate()
    // gives birthDate day in input year 
    const inputYearDay = new Date(inputyear, month, date).getDay()
    // just take the initial of person'S name
    const personInitials = person.name.slice(0, 2).toUpperCase()
    return (
      { personInitials, inputYearDay }
    )
  })
  // console.log(inputYearBirthday)
  for (const day of weekdays) {
    // searching for each day, which person has birthday on that day
    // for a particular day
    let birthdayCount = 0;
    const weekdayElement = document.createElement("div")
    weekdayElement.innerHTML = `<p class="weekDay">${day}</p>`
    weekdayElement.classList.add("birthdayCard")
    const personInitialContainer = document.createElement("div")
    personInitialContainer.classList.add("personInitialContainer")

    let empty = true;//for knowing if no birthday on that day
    for (const person of inputYearBirthday) {
      if (person.inputYearDay === weekdays.indexOf(day)) {
        empty = false
        birthdayCount++;
        // create an element to put inside displayBirthday
        // added a person to a weekday element
        const birthdayPerson = document.createElement("div");
        birthdayPerson.classList.add("personInitials")
        birthdayPerson.innerText = person.personInitials;
        // gives random colors to the elements
        birthdayPerson.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        personInitialContainer.append(birthdayPerson)
      }
      weekdayElement.append(personInitialContainer)
    }
    // nobody has birthday on that day
    if (empty) {
      const emptyElement = document.createElement("div");
      emptyElement.innerText = "Sorry!, No body is there.";
      weekdayElement.append(emptyElement)
    }
    let matrixCount = 1;//for knowing matrix size of a weekday
    while (1) {
      // to know real needed matrix value
      // according to elements(birthdayPersons)
      if (matrixCount * matrixCount >= birthdayCount) {
        break
      }
      matrixCount++;
    }
    // making weekday matrix 
   { let gridMatrixString = "";
    while (matrixCount) {
      matrixCount--;
      gridMatrixString += "1fr "
    }
    personInitialContainer.style.gridTemplateColumns = gridMatrixString
    personInitialContainer.style.gridTemplateRows = gridMatrixString
   }
    // add child to weekday
    displayBirthday.append(weekdayElement)
    // add weekday to displayBirthday
  }
  const body = document.querySelector("body")
  body.append(displayBirthday)
}

inputYearBtn.addEventListener("click", findInputYearBirthday)
