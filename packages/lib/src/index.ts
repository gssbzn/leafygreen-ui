/**
 * Utility for making it easier to couple a React Component to a css selector.
 * Useful when writing css selectors that rely on interactivity, i.e. :hover.
 * Example:
 *  const checkBoxWrapper = createDataProp('checkbox-wrapper');
 *  // Used as selector:
 *  css`&:hover ${checkboxWrapper.selector} { }`
 *  // Used on React Component
 *  <div {...checkboxWrapper.prop} />
 * @param {string} name Name of element we want to reference.
 */
export function createDataProp(name: string) {
  // ts:emit throws an error if this is not typed. Usually this can be inferred.
  const prefix: string = 'data-leafygreen-ui';

  return {
    prop: {
      [prefix]: name,
    },
    selector: `[${prefix}="${name}"]`,
  };
}
