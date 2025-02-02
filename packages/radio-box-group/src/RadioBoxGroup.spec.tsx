import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RadioBox from './RadioBox';
import RadioBoxGroup from './RadioBoxGroup';

afterAll(cleanup);

const className = 'test-radio-box-class';

const { container } = render(
  <RadioBox value="radio-1" className={className} checked={true}>
    Input 1
  </RadioBox>,
);

function isElement(el: Node | null): el is HTMLElement {
  return el != null && el.nodeType === Node.ELEMENT_NODE;
}

function isInput(el: Node | null): el is HTMLInputElement {
  return isElement(el) && el.tagName.toLowerCase() === 'input';
}

describe('packages/RadioBox', () => {
  const radioBoxContainer = container.firstChild;

  if (!isElement(radioBoxContainer)) {
    throw new Error('Could not find radio box container element');
  }

  const radioBox = radioBoxContainer.firstChild;

  if (!isInput(radioBox)) {
    throw new Error('Could not find radio box input element');
  }

  test(`renders "${className}" in RadioBox's classList`, () => {
    expect(radioBoxContainer.classList.contains(className)).toBe(true);
  });

  test('renders as checked, when the checked prop is set', () => {
    expect(radioBox.checked).toBe(true);
    expect(radioBox.getAttribute('aria-checked')).toBe('true');
  });

  test('renders as disabled, when the disabled prop is set', () => {
    const { container } = render(
      <RadioBox value="option-disabled" disabled>
        Input 2
      </RadioBox>,
    );

    const radioBoxContainer = container.firstChild;

    if (!isElement(radioBoxContainer)) {
      throw new Error('Could not find radio box container element');
    }

    const radioBox = radioBoxContainer.firstChild;

    if (!isInput(radioBox)) {
      throw new Error('Could not find radio box input element');
    }

    expect(radioBox.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('packages/RadioBoxGroup', () => {
  const { container } = render(
    <RadioBoxGroup>
      <RadioBox value="option-1">Input 1</RadioBox>
      <h1>Will Remain As Text</h1>
      <RadioBox value="option-2">Input 2</RadioBox>
    </RadioBoxGroup>,
  );

  const radioBoxGroupContainer = container.firstChild;

  if (!isElement(radioBoxGroupContainer)) {
    throw new Error('Could not find radio box group container element');
  }

  const text = radioBoxGroupContainer.children[1];

  test('renders children of Radio Box Group, that are not themselves Radio Boxes, as is, without converting them to RadioBoxes', () => {
    expect(text.tagName.toLowerCase()).toBe('h1');
  });

  describe('when controlled', () => {
    const controlledOnChange = jest.fn();

    render(
      <RadioBoxGroup value="option-1" onChange={controlledOnChange}>
        <RadioBox value="option-1">Option 1</RadioBox>
        <RadioBox value="option-2">Option 2</RadioBox>
      </RadioBoxGroup>,
      { container },
    );

    const radioBoxGroup = container.firstChild;

    if (!isElement(radioBoxGroup)) {
      throw new Error('Could not find radio box group element');
    }

    const firstRadioBoxLabel = radioBoxGroup.firstChild;

    if (!isElement(firstRadioBoxLabel)) {
      throw new Error('Could not find label element');
    }

    const firstRadioBoxInput = firstRadioBoxLabel.firstChild;
    const secondRadioBoxInput = radioBoxGroup.children[1].firstChild;

    if (!isInput(firstRadioBoxInput) || !isInput(secondRadioBoxInput)) {
      throw new Error('Could not find input element');
    }

    fireEvent.click(secondRadioBoxInput);

    test('initial value set by radio box group when prop provided', () => {
      expect(firstRadioBoxInput.checked).toBe(true);
      expect(firstRadioBoxInput.getAttribute('aria-checked')).toBe('true');
    });

    test('onChange fires once when the label is clicked', () => {
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('radio input does not become checked when clicked', () => {
      expect(secondRadioBoxInput.checked).toBe(false);
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnChange = jest.fn();

    render(
      <RadioBoxGroup onChange={uncontrolledOnChange}>
        <RadioBox value="option-1">Option 1</RadioBox>
      </RadioBoxGroup>,
      { container },
    );

    const radioBoxGroup = container.firstChild;

    if (!isElement(radioBoxGroup)) {
      throw new Error('Could not find radio box group element');
    }

    const radioBoxLabel = radioBoxGroup.firstChild;

    if (!isElement(radioBoxLabel)) {
      throw new Error('Could not find label element');
    }

    const radioBoxInput = radioBoxLabel.firstChild;

    if (!isInput(radioBoxInput)) {
      throw new Error('Could not find radio box input element');
    }

    fireEvent.click(radioBoxLabel);

    test('onChange fires once when the label is clicked', () => {
      expect(uncontrolledOnChange.mock.calls.length).toBe(1);
    });

    test('radio button becomes checked when clicked', () => {
      expect(radioBoxInput.getAttribute('aria-checked')).toBe('true');
      expect(radioBoxInput.checked).toBe(true);
    });
  });
});
