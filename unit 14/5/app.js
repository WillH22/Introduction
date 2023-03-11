// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }
//   }

const createInstructor = (firstName, lastName) => ({ firstName, lastName });

// var favoriteNumber = 42;

// var instructor = {
//   firstName: "Colt"
// }

// instructor[favoriteNumber] = "That is my favorite!"

let favoriteNumber = 42;

const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "that is my favorite!",
};

// var instructor = {
//     firstName: "Colt",
//     sayHi: function(){
//       return "Hi!";
//     },
//     sayBye: function(){
//       return this.firstName + " says bye!";
//     }
//   }

const instr = {
  firstName: "Colt",
  sayHi() {
    return "Hi!";
  },
  sayBye() {
    return `${this.firstName} says bye!`;
  },
};

const createAnimal = (species, verb, noise) => ({
  species,
  [verb]() {
    return noise;
  },
});
