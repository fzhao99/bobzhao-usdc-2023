/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 *
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} book - JSON object with Title, ISBN, and Content
 * key / values representing the optical character matching output of a book
 * @returns An array of matched content JSON objects in which the
 * search term was found
 */
function matchSearchTermInSingularBook(searchTerm, book) {
  try {
    const matchedContent = [];
    const contentToParse = book?.Content;
    contentToParse.forEach((scannedLine) => {
      const textToParse = scannedLine?.Text;
      if (textToParse.includes(searchTerm)) {
        const formattedMatchedExample = formatMatchedContent(book, scannedLine);
        matchedContent.push(formattedMatchedExample);
      }
    });
    return matchedContent;
  } catch (e) {
    console.error(
      "Finding matching search term to a specific book failed with error: ",
      e
    );
  }
}

/**
 *
 * @param {JSON} book - A JSON with ISBN, Title, and Content key / values that represent
 * the output from the optical character output for an entire book
 * @param {JSON} scannedLine  - A JSON with Page, Line, and Text key / values that represent
 * the output from the optical character output for an individual line
 * @returns A JSON with ISBN, Page, and Line key / values needed for the output.
 */
function formatMatchedContent(book, scannedLine) {
  try {
    return {
      ISBN: book.ISBN,
      Page: scannedLine.Page,
      Line: scannedLine.Line,
    };
  } catch (e) {
    console.error(
      "Formatting formatting matched line object for return failed with error: ",
      e
    );
  }
}
/**
 *
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {Array[JSON]} matchedContentArray - Array of matched content results
 * from the optical character scanning output
 * @returns A formatted JSON with SearchTerm and Results keys, where Results
 * is an array of JSON objects with ISBN, Page, and Line key / values where the
 * search term was found
 */
function formatMatchedListForReturn(searchTerm, matchedContentArray) {
  try {
    let result = {
      SearchTerm: searchTerm,
      Results: matchedContentArray.flat(),
    };
    return result;
  } catch (e) {
    console.error(
      "Formatting final result object for return failed with error: ",
      e
    );
  }
}

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  const resultArray = scannedTextObj.map((book) => {
    return matchSearchTermInSingularBook(searchTerm, book);
  });
  return formatMatchedListForReturn(searchTerm, resultArray);
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
function runTest1() {
  const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
  if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    // Bob would rename this test's names / constants to something more descriptive or human readable
    // to make it easier to parse test log output in the event we have 100's of tests
    // (example name: Test for the value of the results object when we have one match)
    console.log("PASS: Test 1");
  } else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
  }
}

// /** We could choose to check that we get the right number of results. */
function runTest2() {
  const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
  if (test2result.Results.length == 1) {
    // Bob would rename this test's names / constants to something more descriptive or human readable
    // to make it easier to parse test log output in the event we have 100's of tests
    // (example name: Test for the length of the results object)
    console.log("PASS: Test 2");
  } else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
  }
}

function runTestForCasesSensitiveInput() {
  const expectedOutputForCaseSensitiveInput = {
    SearchTerm: "The",
    Results: [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 8,
      },
    ],
  };
  const resultForCaseSensitiveInput = findSearchTermInBooks(
    "The",
    twentyLeaguesIn
  );
  if (
    JSON.stringify(resultForCaseSensitiveInput) ===
    JSON.stringify(expectedOutputForCaseSensitiveInput)
  ) {
    console.log("PASS: Test for a case sensitive input");
  } else {
    console.log("FAIL: Test for a case sensitive input");
    console.log("Expected:", expectedOutputForCaseSensitiveInput);
    console.log("Received:", resultForCaseSensitiveInput);
  }
}

function runTestWithMultipleBookInput() {
  const testInputWithMultipleBooks = [
    {
      Title: "Twenty Thousand Leagues Under the Sea",
      ISBN: "9780000528531",
      Content: [
        {
          Page: 31,
          Line: 8,
          Text: "now simply went on by her own momentum.  The dark-",
        },
        {
          Page: 31,
          Line: 9,
          Text: "ness was then profound; and however good the Canadian's",
        },
        {
          Page: 31,
          Line: 10,
          Text: "eyes were, I asked myself how he had managed to see, and",
        },
      ],
    },
    {
      Title: "The Great Gatsby",
      ISBN: "9780333791035",
      Content: [
        {
          Page: 176,
          Line: 2,
          Text: "this line should be matched with the search term: asked",
        },
        {
          Page: 176,
          Line: 2,
          Text: "this line shouldn't be matched with the test search term",
        },
      ],
    },
  ];
  const expectedOutputForMultipleBookInput = {
    SearchTerm: "asked",
    Results: [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 10,
      },
      {
        ISBN: "9780333791035",
        Page: 176,
        Line: 2,
      },
    ],
  };
  const testOutputForMultipleBookInput = findSearchTermInBooks(
    "asked",
    testInputWithMultipleBooks
  );
  if (
    JSON.stringify(testOutputForMultipleBookInput) ===
    JSON.stringify(expectedOutputForMultipleBookInput)
  ) {
    console.log("PASS: Test for a search term with a multiple book input");
  } else {
    console.log("FAIL: Test for a search term with a multiple book input");
    console.log("Expected:", expectedOutputForMultipleBookInput);
    console.log("Received:", testOutputForMultipleBookInput);
  }
}

function runTestWithMultipleMatchInput() {
  const testInputWithMultipleMatches = twentyLeaguesIn;
  const expectedOutputForMultipleMatchInput = {
    SearchTerm: "w",
    Results: [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 8,
      },
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 9,
      },
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 10,
      },
    ],
  };
  const testOutputForMultipleMatchInput = findSearchTermInBooks(
    "w",
    testInputWithMultipleMatches
  );
  if (
    JSON.stringify(expectedOutputForMultipleMatchInput) ===
    JSON.stringify(testOutputForMultipleMatchInput)
  ) {
    console.log(
      "PASS: Test for a search term that has multiple matches within a book"
    );
  } else {
    console.log(
      "FAIL: Test for a search term that has multiple matches within a book"
    );
    console.log("Expected:", expectedOutputForMultipleMatchInput);
    console.log("Received:", testOutputForMultipleMatchInput);
  }
}

function runTestWithEmptyContentArray() {
  const inputWithEmptyContentArray = [
    {
      Title: "Twenty Thousand Leagues Under the Sea",
      ISBN: "9780000528531",
      Content: [],
    },
  ];
  const testOutputForEmptyContentArray = findSearchTermInBooks(
    "the",
    inputWithEmptyContentArray
  );
  if (testOutputForEmptyContentArray.Results.length === 0) {
    console.log(
      "PASS: Test for an input with matched content but with zero matched lines"
    );
  } else {
    console.log(
      "FAIL: Test for an input with matched content but with zero matched lines"
    );
    console.log("Expected:", 0);
    console.log("Received:", testOutputForEmptyContentArray.Results.length);
  }
}

function runTestWithEmptyInput() {
  const inputWithEmptyInput = [];
  const testOutputWithEmptyInput = findSearchTermInBooks(
    "the",
    inputWithEmptyInput
  );
  const expectedResultForInputWithEmptyInput = {
    SearchTerm: "the",
    Results: [],
  };
  if (
    JSON.stringify(testOutputWithEmptyInput) ===
    JSON.stringify(expectedResultForInputWithEmptyInput)
  ) {
    console.log("PASS: Test for an empty input");
  } else {
    console.log("FAIL: Test for an empty input");
    console.log("Expected:", expectedResultForInputWithEmptyInput);
    console.log("Received:", testOutputWithEmptyInput);
  }
}
// Unit tests for the helper subfunctions I wrote. Each of these tests
// could also expanded with similar tests in the above for the main function
function runTestForformatMatchedContent() {
  const bookJSONForTest = {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  };
  const scannedLineJSONForTest = {
    Page: 31,
    Line: 8,
    Text: "now simply went on by her own momentum.  The dark-",
  };

  const testOutputForFormatMatchedContent = formatMatchedContent(
    bookJSONForTest,
    scannedLineJSONForTest
  );
  const expectedOutputForFormatMatchedContent = {
    ISBN: bookJSONForTest.ISBN,
    Page: scannedLineJSONForTest.Page,
    Line: scannedLineJSONForTest.Line,
  };
  if (
    JSON.stringify(testOutputForFormatMatchedContent) ===
    JSON.stringify(expectedOutputForFormatMatchedContent)
  ) {
    console.log(
      "PASS: Test for formatting a book / content level input subfunction"
    );
  } else {
    console.log(
      "FAIL: Test for formatting a book / content level input subfunction"
    );
    console.log("Expected:", expectedOutputForFormatMatchedContent);
    console.log("Received:", testOutputForFormatMatchedContent);
  }
}

function runTestForformatMatchedListForReturn() {
  const matchedContentArray = [
    [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 9,
      },
    ],
  ];
  const testOutputForFormatMatchedListForReturn = formatMatchedListForReturn(
    "the",
    matchedContentArray
  );
  const expectedOutputForFormatMatchedList = {
    SearchTerm: "the",
    Results: [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 9,
      },
    ],
  };
  if (
    JSON.stringify(testOutputForFormatMatchedListForReturn) ===
    JSON.stringify(expectedOutputForFormatMatchedList)
  ) {
    console.log("PASS: Test for formatting the final result array");
  } else {
    console.log("FAIL: Test for formatting the final result array");
    console.log("Expected:", expectedOutputForFormatMatchedList);
    console.log("Received:", testOutputForFormatMatchedListForReturn);
  }
}

function runTestForMalformedInputWithMispelledKey() {
  const malformedInputWithMispelledKey = [
    {
      Title: "Twenty Thousand Leagues Under the Sea",
      ISBN: "9780000528531",
      Contnt: [
        {
          Page: 31,
          Line: 8,
          Text: "now simply went on by her own momentum.  The dark-",
        },
      ],
    },
  ];
  console.log(
    "Test not implemented: See comment in the runTestForMalformedInputWithMispelledKey for more info"
  );
  // In a real environment with a more robust testing suite,
  // I'd also have tests to ensure something like the above input
  // error handles gracefully given I've written try / catch handling for
  // each of the subfunctions. I've left it out here because the below
  // would throw an error.

  // Input:
  // const testResultWithAMalformedInput = findSearchTermInBooks(
  //   "the",
  //   malformedInputWithMispelledKey
  // );
  // Output: assert that the expected error log is found in
  // the stack trace with the following message:

  /** Finding matching search term to a specific book failed with error:
   *  TypeError: Cannot read property 'forEach' of undefined
   * */
}

function runAllTests() {
  runTest1();
  runTest2();
  runTestForCasesSensitiveInput();
  runTestWithMultipleBookInput();
  runTestWithMultipleMatchInput();
  runTestWithEmptyContentArray();
  runTestWithEmptyInput();
  runTestForformatMatchedContent();
  runTestForformatMatchedListForReturn();
  runTestForMalformedInputWithMispelledKey();
}
runAllTests();
