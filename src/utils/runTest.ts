type DescriptionGetter<TypeInput, TypeOutput> = (
  input: TypeInput,
  output: TypeOutput,
  defaultDescription?: string,
  index?: number
) => string;

type Test<TypeInput extends Array<any>, TypeOutput> = {
  input: TypeInput;
  description?: string;
  expectedOutput: TypeOutput;
};

type Tests<TypeInput extends Array<any>, TypeOutput> = Test<
  TypeInput,
  TypeOutput
>[];

function runGivenTest<TypeInput extends Array<any>, TypeOutput>(
  tests: Tests<TypeInput, TypeOutput>,
  fn: (...args: TypeInput) => TypeOutput,
  getDescription?: DescriptionGetter<TypeInput, TypeOutput>,
  generator?: boolean
): void {
  for (const [index, test] of tests.entries()) {
    let description: string = "";

    if (test.description) {
      description = test.description;
    }
    if (getDescription) {
      description = getDescription(
        test.input,
        test.expectedOutput,
        test.description,
        index
      );
    }

    description =
      description === "" ? "NO description could be determined" : description;

    it(description, () => {
      const result = fn(...test.input);
      expect(result).toEqual(test.expectedOutput);
    });
  }
  return;
}

/**
 *
 * @param tests tests to run of the form {input, output, description}
 * @param fn function to run to verify result
 * @param getDescription
 */
export function runTest<TypeInput extends Array<any>, TypeOutput>(
  tests: Tests<TypeInput, TypeOutput>,
  fn: (...args: TypeInput) => TypeOutput,
  getDescription?: DescriptionGetter<TypeInput, TypeOutput>
) {
  runGivenTest<TypeInput, TypeOutput>(tests, fn, getDescription);
}
