function Person(name) {
  this.name = name || "gg";
}
Person.prototype.getName = function () {
  return this.name;
};

function Korean(name) {}

Korean.prototype = new Person();

var kor1 = new Korean();
kor1.getName();

//
const Dog = {
  name: "ddoddo",
};
Object.prototype.sayHello = () => console.log(`Hello ${this.name}`);

Dog.sayHello();
