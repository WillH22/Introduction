class Vehicle {
  constructor(a, b, c) {
    this.make = a;
    this.model = b;
    this.year = c;
  }
  honk() {
    console.log("Beep");
  }
  toString() {
    console.log(
      `The vehicle is a ${this.make} ${this.model} from ${this.year}`
    );
  }
}

class Car extends Vehicle {
  constructor(a, b, c) {
    super(a, b, c);
  }
  numWheels = 4;
}

class Motorcycle extends Vehicle {
  constructor(a, b, c) {
    super(a, b, c);
  }
  numWheels = 2;
  revEngine() {
    console.log("VROOM!!!");
  }
}

class Garage {
  constructor(a) {
    this.cap = a;
    this.vehicles = [];
  }
  add(newcar) {
    if (!(newcar instanceof Vehicle)) {
      return "Only vehicles are allowed in here!";
    }
    if (this.vehicles.length >= this.cap) {
      return "Sorry we're full.";
    }
    this.vehicles.push(newcar);
    return "Vehicle added!";
  }
}
