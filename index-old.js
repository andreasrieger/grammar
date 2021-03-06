/**
 * Lösung zur unten gestellten Aufgabe
 * 
 * @author Andreas Rieger, s82456@bht-berlin.de
 * Date: 2021-12-08
 * 
 * Aufgabenstellung:  
 * 
 * Erzeugen Sie mit Hilfe eine Grammatik zufällige arithmetische Ausdrücke
 * über einstelligen natürlichen Zahlen mit den Operanden "+,-,*,/" und 
 * beliebig geschachtelten runden Klammeren, z.B.: 
 * 
 * 2*(3*(4+7)-9) oder 9+2 
 * 
 * oder (3) oder nur 7 sind gültig, 
 * 
 * ungültig sind 12 oder () oder (+3) oder -1. 
 * 
 * Nutzen Sie die folgenden Abkürzungen: 
 * A = Ausdruck, 
 * O = Operator = + | - | * | / ,
 * Z = Zahl/Ziffer = 0 | 1| 2| ... | 9.
 * 
 * 
 * Anwendung und Abgabe: 
 * 
 * Es wird eine Web-Anwendung erstellt, siehe Kursplan.
 * 
 * 
 * Visualisierung: 
 * 
 * Die Generierung der Ausdrücke mittels der Grammatik wird schrittweise angezeigt. 
 * Dabei soll (z.B. durch farbliche Hervorhebung) ersichtlich sein welche Regel angewandt wird,
 * und was sich dadurch im bisher erzeugten Ausdruck verändert hat (vorher -> nachher). 
 * Sie können dabei mit HTML-Text [und CSS] als Darstellung arbeiten.
 * 
 * 
 * Interaktion: 
 * 
 * (1) Über einen Button können zufällige Ausdrücke generiert werden. 
 * (2) Die Erzeugung an Hand der Produktionsregeln kann schrittweise nachvollzogen und 
 *      alternativ automatisch animiert werden. 
 * (3) Die Animationsgeschwindigkeit ist einstellbar. 
 * (4) Die Länge des zu erzeugenden Ausdrucks ist einstellbar.
 * 
 */

const rules = {
    S: "$Z | $B | $C | $D ",
    B: "($C) | ($D)",
    C: "$Z$O$S",
    D: "$S$O$Z"
};

const
    Z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    O = ['+', '-', '*', '/'],
    T = [],
    eL = 10 // expression length
    ;

let counter = 0;
let prevExpression = 0;


/**
 * Helper method to return the smallest value of an array
 * 
 * @param {*} array 
 * @returns the smallest value of an array
 */
Array.min = (array) => {
    return Math.min.apply(Math, array);
};


/**
 * Helper method to return the largest value of an array
 * 
 * @param {*} array 
 * @returns the largest value of an array
 */
Array.max = (array) => {
    return Math.max.apply(Math, array);
};


/**
 * This method is returning a random digit from $Z
 * 
 * @returns a random digit from $Z array
 */
const randomDigit = () => {
    const min = Math.ceil(Array.min(Z));
    const max = Math.floor(Array.max(Z));
    const digit = Math.floor(Math.random() * (max - min + 1)) + min;
    // T.push({ state: 'Z', term: digit });
    return { state: 'Z', term: digit };
};


/**
 * This method is returning a random operator from $O
 * 
 * @returns a random operator from $O array
 */
const randomOperator = () => {
    const min = 0;
    const max = O.length - 1;
    const operator = O[Math.floor(Math.random() * (max - min + 1)) + min];
    // T.push({ state: 'O', term: operator });
    return { state: 'O', term: operator };
};


/**
 * Returning an expression consisting of a single digit or 
 * a combination of operands and operators
 * 
 * @param {*} expression 
 * @returns the arithmetical expression with the defined length
 */
const A = (expression) => {
    // if (counter == 0) expression = { state: 'Z', term: expression };
    // if (counter == 0) expression = { state: 'Z', term: expression };
    // if (counter > 0) T.push(expression);
    T.push(expression);
    // console.log(expression)
    while (counter + 1 < eL) {
        prevExpression = expression.term;
        counter += 1;
        A(C(prevExpression));
        // A((counter < 2) ? C(prevExpression) : C(B(prevExpression)));

        // if (Math.random() < 0.5) A((counter < 2) ? C(prevExpression) : C(B(prevExpression)));
        // else A((counter < 2) ? D(prevExpression) : D(B(prevExpression)));
    }
};


/**
 * Returning a given expression in round brackets / parantheses
 * 
 * @param {*} expression 
 * @returns a given expression in round brackets / parantheses
 */
const B = (expression) => {
    expression = `(${expression})`;
    // T.push({ state: 'B', term: expression })
    return { state: 'B', term: `(${expression})` };
};


/**
 * Returning a given expression expanded by an additional 
 * operator and operand on the right side
 * 
 * @param {*} expression 
 * @returns a new expression
 */
const C = (expression) => {
    const operator = randomOperator();
    // console.log(operator)
    T.push(operator);
    const digit = randomDigit();
    // console.log(digit)
    T.push(digit);

    if (counter == 1) expression = { state1: 'Z', term: expression };
    else expression = (counter < 2) ? expression : B(expression);
    console.log(expression)
    T.push(expression);

    expression = expression.term + operator.term + digit.term;
    // expression = expression + randomOperator() + randomDigit();
    return { state: 'C', term: expression };
};


/**
 * Returning a given expression expanded by an additional 
 * operator and operand on the left side
 * @param {*} expression 
 * @returns a new expression
 */
const D = (expression) => {
    expression = randomDigit() + randomOperator() + expression;
    return { state: 'D', term: expression };
};


/**
 * Calling the A method and logging its result
 */
// console.log(A(randomDigit()))
A(randomDigit())
console.log(T)


document.addEventListener("DOMContentLoaded", function (event) {
    // console.log("DOM fully loaded and parsed");
    // console.log(T)

    let i = -1;

    document.getElementById("prevButton").addEventListener("click", () => {
        if (i > 0) {
            i--;
            console.log(T[i])
            document.getElementById("output").innerText = T[i].term;
        }
    })

    document.getElementById("nextButton").addEventListener("click", () => {
        if (i + 1 < T.length) {
            i++;
            console.log(T[i])
            document.getElementById("output").innerText = T[i].term;
            // document.getElementById("rules").innerText = rules[i].term;
        }
    })
});