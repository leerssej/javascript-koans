var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      
      // .any variant
      // const isAnyIngredientMushrooms = item =>
      //   !_(item.ingredients).any(ingredient => ingredient === 'mushrooms');
      // productsICanEat = productsICanEat.filter(isAnyIngredientMushrooms);
      
      // .all variant
      // const areAllIngredientsNotMushrooms = item =>
      //   _(item.ingredients).all(ingredient => ingredient !== 'mushrooms');
      // productsICanEat = productsICanEat.filter(areAllIngredientsNotMushrooms);
      
      // functionally expressed
      const nutFree = item => item.containsNuts === false;
      
      const mushroomFree = item => !item.ingredients.includes('mushrooms');
      
      productsICanEat = products.filter(mushroomFree).filter(nutFree);
      
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    // multipleTester Factory
    const isMultipleOf = number => numberToCheck => numberToCheck % number === 0; 

    // multipleTesters
    const isMultipleOf3 = isMultipleOf(3);
    const isMultipleOf5 = isMultipleOf(5);

    const sum = _
      .range(1, 1000)
      .filter(x => (isMultipleOf3(x) || isMultipleOf5(x)))
      .reduce((sum, num) => sum + num);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    
    _(products).chain()
      .map(item => item.ingredients)
      .flatten()
      .reduce((count, ingredient) => {
        ingredientCount[ingredient] = (ingredientCount[ingredient] ||  0) + 1;
        return ingredientCount;
      }, ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    // my qd functional approach
    const factor = x => {
      let factArr = [];
      let number = x;
      const primes = [2,3,5,7,11,13];
      while (number > 1) {
        primes.forEach(prime => {
          if (number % prime === 0) {
            factArr.push(prime);
            number /= prime;
          }
        });
      }
      return Math.max(...factArr); 
    }

    // per https://gist.github.com/nefarioustim/3215506
    // if array of factors desired then initialize and add
    // push of factor into array at end of if statement
        function getLargestPrimeFactor(n) {
        let largestPrimeFactor;
        let factor = 2;

        while (n > 1) {
          if (n % factor === 0) {
            largestPrimeFactor = factor;
            n = n / factor;
            // to keep a lock up from squares happening
            while (n % factor === 0) {
              n = n / factor;
            }
          }
          // to skip all evens after two
          factor += (factor === 2) ? 1 : 2;
        }

        return largestPrimeFactor;
      };      
    // expect(factor(63)).toBe(7);
    expect(getLargestPrimeFactor(75)).toBe(5);
  });
  it("should find the largest palindrome made from the product of two 3 digit numbers/n(imperatively)", function () {

    
    // detect if product is palindrome
        // split into array and reverse array
      const reverseNumber = number => number.toString().split('').reverse().join('');
      // check if reverse array is same as array
    const isPalindrome = number => number.toString() === reverseNumber(number);

    const isLargestPalindromeSoFar = (product, largestPalindrome) =>  
      // if (palindrome > largestPalindrome) make largestPalindrome = palindrome;
      isPalindrome(product) && (product > largestPalindrome);
  
    
    function findLargestPalindrome() {
      let largestPalindrome = 111;
      // generate 3 digit number
      for(let i = 100; i <= 999; i++) {
        // generate second 3 digit number inside of first generator
        for (let j = 100; j <= 999; j++) {
          // multiply two 3 digit numbers
          let product = i * j
          // console.log(product);
          // if palindrome, then test against saved palindrome
          if (isLargestPalindromeSoFar(product, largestPalindrome)) {
            largestPalindrome = product;
          }
          // if (isPalindrome(product) && (product > largestPalindrome)) {
          //     largestPalindrome = product;
          // }
        }
      }
      return largestPalindrome;
    }

    expect(reverseNumber(1234)).toBe('4321');``
    expect(isPalindrome('1231')).toBe(false);
    expect(isPalindrome('1221')).toBe(true);
    expect(isLargestPalindromeSoFar(122,123)).toBe(false)
    expect(isLargestPalindromeSoFar(222,123)).toBe(true)
    expect(findLargestPalindrome()).toBe(906609)
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  
});
