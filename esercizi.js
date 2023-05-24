// ESERCIZIO 1***************************************************************

const nameList = ['giulia', 'mattia', 'sergio', /*'giuseppe'*/];

const [giuliaName, mattiaName, sergioName, giuseppeName = 'non definito'] = nameList

console.log(giuliaName, mattiaName, sergioName, giuseppeName)


// ESERCIZIO 2***************************************************************

const userObj = {
  name: 'giulia',
  age: 21,
  surname: 'pluto',
  // sesso: 'femmina'
};

const { name, age, surname, sesso = 'fluid' } = userObj;

console.log(name, age, surname, sesso);