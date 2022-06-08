// to get userInput
const jsInput = document.querySelector("#json-input");
const updateYearBtn = document.querySelector("#updateYearBtn");
const updateYear = document.querySelector("#updateYear");

// html containers for storing personInitials in respective days
const dayContainer = document.querySelectorAll(".cal__day")
const day__people = document.querySelectorAll(".day__people")

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const colors = ["#555e7a", "#a0d203", "#c87e99","#e64a33","#e91e63","#f44336","#ff5722"]
// for storing input year birthday records of all persons
var inputYearBirthday;

const findInputYearBirthday = () => {
    // let displayBirthday = ""
    const birthdayInput = JSON.parse(jsInput.value)
    const inputYear = updateYear.value;
    // stores the data for real representation inside card
    inputYearBirthday = birthdayInput.map((person) => {
        // converts date string to Date
        const tempDate = new Date(Date.parse(person.birthday))
        const month = tempDate.getMonth()
        const date = tempDate.getDate()
        // gives birthDate day in input year 
        const inputYearDay = new Date(inputYear, month, date).getDay()
        // just take the initial of person'S name
        const personInitials = person.name.slice(0, 2).toUpperCase()
        return (
            { personInitials, inputYearDay }
        )
    })
    let i=0;//for colors
    for (const day of weekdays) {
      // searching for each day, which person has birthday on that day
      // for a particular day
      day__people[i].innerHTML='';
      let birthdayCount = 0;
      let empty = true;//for knowing if no birthday on that day
      for (const person of inputYearBirthday) {
        if (person.inputYearDay === weekdays.indexOf(day)) {
          empty = false
          birthdayCount++;
          // create an element to put inside displayBirthday
          // added a person to a weekday element
          const personInitials = document.createElement("div");
          personInitials.classList.add("personInitials")
          personInitials.innerText = person.personInitials;
          // gives sequential colors to the elements
          personInitials.style.backgroundColor = colors[birthdayCount>=colors.length?0:birthdayCount]
          day__people[i].append(personInitials)
        }
      }
      // nobody has birthday on that day
      if (empty) {
        dayContainer[i].classList.add("day--empty")
      }
      else dayContainer[i].classList.remove("day--empty")
      let matrixCount = 0;//for knowing matrix size of a weekday
      while (matrixCount * matrixCount < birthdayCount) {
        // to know real needed matrix value
        // according to elements(birthdayPersons)
        matrixCount++;
      }
      // making weekday matrix 
     { let gridMatrixString = "";
      while (matrixCount) {
        matrixCount--;
        gridMatrixString += "1fr "
      }
      day__people[i].style.display='grid'
      day__people[i].style.gridTemplateColumns = gridMatrixString
      day__people[i].style.gridTemplateRows = gridMatrixString

     }
      
     i++;
    }
}

updateYearBtn.addEventListener("click", findInputYearBirthday)
