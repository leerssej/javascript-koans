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

    // main function
    const factor = x => {
      let factArr = [];
      let number = x;
      
      // factorizer factory
      // const factorOut = number => numberToCheck => {
      //   if (numberToCheck % number === 0) {
      //     factArr.push(numberToCheck);
      //     number /= numberToCheck;
      //   }
      // } 
            
      // singleton
      // const factorOut3 = x => {
        //   if(isMultipleOf3(x)) {
      //     factArr.push(3);
      //     num /= 3;
      //   }
      // }
      // factorized 
      
      const primes = [2,3,5,7,11,13]
      // console.log(x, num, isMultipleOf3(x))
      while (number > 1) {
        // console.log(x, num, isMultipleOf3(x))
        primes.forEach(prime => {
          // factorOut(prime);
          if (number % prime === 0) {
            factArr.push(prime);
            number /= prime;
          }
        });
        // factorOut2(x);
        // factorOut3(x);
        // factorOut5(x);
        // factorOut7(x);
        // factorOut11(x);
        // factorOut13(x);
        // if (isMultipleOf3(x)) {
        //   factArr.push(3);
        //   num /= 3; 
        // }
      }
      return Math.max(...factArr);
    }  
    
    // check divisibility 
    
     // if is true then add to the factArr & divide number
     // do while the number is greater than 1
    // find largest prime factor
      // find max of factorArr


    expect(factor(21)).toBe(7);
    expect(factor(24)).toBe(2);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  
});
