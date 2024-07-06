// 1-	 Write a program that allow to user enter number then print it
let userNumber = prompt("Please enter a number:");
document.write("You entered: " + userNumber + "<br>");


// 2-	Write a program that take number from user then print yes if that number can divide by 3 and 4 otherwise print no
let number = prompt("Please enter a number:");
document.write("Number divisible by 3 and 4: " + (number % 3 === 0 && number % 4 === 0 ? "yes" : "no") + "<br>");


// 3-	Write a program that allows the user to insert 2 integers then print the max
let num1 = prompt("Please enter the first number:");
let num2 = prompt("Please enter the second number:");
document.write("The max number is: " + (num1 > num2 ? num1 : num2) + "<br>");


// 4-	Write a program that allows the user to insert an integer then print negative if it is negative number otherwise print positive.
let integer = prompt("Please enter an integer:");
document.write("The number is: " + (integer < 0 ? "negative" : "positive") + "<br>");


// 5-	Write a program that take 3 integers from user then print the max element and the min element.
let numA = prompt("Please enter the first number:");
let numB = prompt("Please enter the second number:");
let numC = prompt("Please enter the third number:");
let max = Math.max(numA, numB, numC);
let min = Math.min(numA, numB, numC);
document.write("The max number is: " + max + "<br>");
document.write("The min number is: " + min + "<br>");


// 6-	Write a program that allows the user to insert integer number then check If a number is oven or odd
let num = prompt("Please enter an integer:");
document.write("The number is: " + (num % 2 === 0 ? "even" : "odd") + "<br>");


// 7-	Write a program that take character from user then if it is vowel chars (a,e,I,o,u) then print vowel otherwise print consonant
let char = prompt("Please enter a character:");
document.write("The character is: " + (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u' ? "vowel" : "consonant") + "<br>");


// 8-	Write a program that allows user to insert integer then print all numbers between 1 to that’s number
let endNumber = prompt("Please enter an integer:");
document.write("Numbers between 1 and " + endNumber + ": ");
for (let i = 1; i <= endNumber; i++) {
    document.write(i + " ");
}
document.write("<br>");


// 9-	Write a program that allows user to insert integer then print a multiplication table up to 12.
let tableNumber = prompt("Please enter a number:");
document.write("Multiplication table of " + tableNumber + ":<br>");
for (let i = 1; i <= 12; i++) {
    document.write(tableNumber + " x " + i + " = " + (tableNumber * i) + "<br>");
}


// 10-	Write a program that allows to user to insert number then print all even numbers between 1 to this number
let maxNumber = prompt("Please enter a number:");
document.write("Even numbers between 1 and " + maxNumber + ": ");
for (let i = 1; i <= maxNumber; i++) {
    if (i % 2 === 0) {
        document.write(i + " ");
    }
}
document.write("<br>");


// 11-	Write a program that take two integers then print the power
let base = prompt("Please enter the base number:");
let exponent = prompt("Please enter the exponent number:");
document.write("Power of " + base + " to the " + exponent + " is: " + Math.pow(base, exponent) + "<br>");


// 12-	 Write a program to enter marks of five subjects and calculate total, average and percentage.
let marks1 = prompt("Please enter marks for subject 1:");
let marks2 = prompt("Please enter marks for subject 2:");
let marks3 = prompt("Please enter marks for subject 3:");
let marks4 = prompt("Please enter marks for subject 4:");
let marks5 = prompt("Please enter marks for subject 5:");
let total = parseFloat(marks1) + parseFloat(marks2) + parseFloat(marks3) + parseFloat(marks4) + parseFloat(marks5);
let average = total / 5;
let percentage = (total / 500) * 100;
document.write("Total marks: " + total + "<br>");
document.write("Average marks: " + average + "<br>");
document.write("Percentage: " + percentage + "%<br>");


// 13-	Write a program to input month number and print number of days in that month.
let month = prompt("Please enter the month number (1-12):");
let days;
switch (parseInt(month)) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:
        days = 30;
        break;
    case 2:
        days = 28;
        break;
    default:
        days = "Invalid month";
}
document.write("Number of days in month " + month + ": " + days + "<br>");


// 14-	Write a program to input marks of five subjects 
// Physics, Chemistry, Biology, Mathematics and Computer, Find percentage and grade
let physics = prompt("Please enter marks for Physics:");
let chemistry = prompt("Please enter marks for Chemistry:");
let biology = prompt("Please enter marks for Biology:");
let mathematics = prompt("Please enter marks for Mathematics:");
let computer = prompt("Please enter marks for Computer:");
let totalMarks = parseFloat(physics) + parseFloat(chemistry) + parseFloat(biology) + parseFloat(mathematics) + parseFloat(computer);
let percentageMarks = (totalMarks / 500) * 100;
let grade;
if (percentageMarks >= 90) {
    grade = 'A';
} else if (percentageMarks >= 80) {
    grade = 'B';
} else if (percentageMarks >= 70) {
    grade = 'C';
} else if (percentageMarks >= 60) {
    grade = 'D';
} else {
    grade = 'F';
}
document.write("Percentage: " + percentageMarks + "%<br>");
document.write("Grade: " + grade + "<br>");


// 15-	Switch case:
// o	Write a program to print total number of days in month
let monthNumber = prompt("Please enter the month number (1-12):");
let totalDays;
switch (parseInt(monthNumber)) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        totalDays = 31;
        break;
    case 4: case 6: case 9: case 11:
        totalDays = 30;
        break;
    case 2:
        totalDays = 28;
        break;
    default:
        totalDays = "Invalid month";
}
document.write("Total number of days in month " + monthNumber + ": " + totalDays + "<br>");

// o Write a program to check whether an alphabet is vowel or consonant
let alphabet = prompt("Please enter an alphabet:");
document.write("The alphabet is: " + (alphabet === 'a' || alphabet === 'e' || alphabet === 'i' || alphabet === 'o' || alphabet === 'u' ? "vowel" : "consonant") + "<br>");

// o Write a program to find maximum between two numbers
let number1 = prompt("Please enter the first number:");
let number2 = prompt("Please enter the second number:");
document.write("The max number is: " + (number1 > number2 ? number1 : number2) + "<br>");

// o Write a program to check whether a number is even or odd
let checkNumber = prompt("Please enter a number:");
document.write("The number is: " + (checkNumber % 2 === 0 ? "even" : "odd") + "<br>");

// o Write a program to check whether a number is positive or negative or zero
let checkInteger = prompt("Please enter an integer:");
document.write("The number is: " + (checkInteger > 0 ? "positive" : checkInteger < 0 ? "negative" : "zero") + "<br>");

// o Write a program to create Simple Calculator
let firstNumber = prompt("Please enter the first number:");
let operation = prompt("Please enter the operation (+, -, *, /):");
let secondNumber = prompt("Please enter the second number:");
let result;
switch (operation) {
    case '+':
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
        break;
    case '-':
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
        break;
    case '*':
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
        break;
    case '/':
        result = parseFloat(firstNumber) / parseFloat(secondNumber);
        break;
    default:
        result = "Invalid operation";
}
document.write("Result of " + firstNumber + " " + operation + " " + secondNumber + " is: " + result + "<br>");


// 16-	Print Numbers 1 to 10: Use a loop to print numbers from 1 to 10
document.write("Numbers from 1 to 10: ");
for (let i = 1; i <= 10; i++) {
    document.write(i + " ");
}
document.write("<br>");


// 17-	Sum of First 10 Natural Numbers: Calculate the sum of the first 10 natural numbers using a loop
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
document.write("Sum of first 10 natural numbers: " + sum + "<br>");


// 18-	Print Even Numbers Between 1 and 20: Use a loop to print all even numbers between 1 and 20
document.write("Even numbers between 1 and 20: ");
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        document.write(i + " ");
    }
}
document.write("<br>");


// 19-	Factorial of a Number: Calculate the factorial of a given number using a loop
let factorialNumber = prompt("Please enter a number:");
let factorial = 1;
for (let i = 1; i <= factorialNumber; i++) {
    factorial *= i;
}
document.write("Factorial of " + factorialNumber + " is: " + factorial + "<br>");


// 20-	Reverse a String: Reverse a given string using a loop
let inputString = prompt("Please enter a string:");
let reversedString = "";
for (let i = inputString.length - 1; i >= 0; i--) {
    reversedString += inputString[i];
}
document.write("Reversed string: " + reversedString + "<br>");


// 21-	Print Elements of an Array: Print all elements of an array using a loop.
let array = [1, 2, 3, 4, 5];
document.write("Elements of array: ");
for (let i = 0; i < array.length; i++) {
    document.write(array[i] + " ");
}
document.write("<br>");


// 22-	Find Maximum in an Array: Find the maximum number in an array using a loop.
let numbersArray = [1, 2, 3, 4, 5];
let maxNumberInArray = numbersArray[0];
for (let i = 1; i < numbersArray.length; i++) {
    if (numbersArray[i] > maxNumberInArray) {
        maxNumberInArray = numbersArray[i];
    }
}
document.write("Maximum number in array: " + maxNumberInArray + "<br>");


// 23-	Print Multiplication Table: Print the multiplication table of a given number up to 10 using a loop.
let multiplicationNumber = prompt("Please enter a number:");
document.write("Multiplication table of " + multiplicationNumber + ":<br>");
for (let i = 1; i <= 10; i++) {
    document.write(multiplicationNumber + " x " + i + " = " + (multiplicationNumber * i) + "<br>");
}


// 24-	Count Vowels in a String: Count the number of vowels in a given string using a loop.
let inputStr = prompt("Please enter a string:");
let vowelCount = 0;
for (let i = 0; i < inputStr.length; i++) {
    if ('aeiouAEIOU'.indexOf(inputStr[i]) !== -1) {
        vowelCount++;
    }
}
document.write("Number of vowels in the string: " + vowelCount + "<br>");


// 25-	Check Prime Number: Check if a given number is prime using a loop.
let primeNumber = prompt("Please enter a number:");
let isPrime = true;
if (primeNumber <= 1) {
    isPrime = false;
} else {
    for (let i = 2; i < primeNumber; i++) {
        if (primeNumber % i === 0) {
            isPrime = false;
            break;
        }
    }
}
document.write(primeNumber + " is " + (isPrime ? "a prime number" : "not a prime number") + "<br>");
