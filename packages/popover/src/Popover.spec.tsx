import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Popover from './Popover';
import Align from './Align';
import Justify from './Justify';

afterAll(cleanup);

describe('packages/Popover', () => {
  const { container, unmount } = render(
    <>
      <button>Trigger Element</button>
      <Popover justify={Justify.Start} align={Align.Top} active>
        Content to appear inside of Popover component
      </Popover>
    </>,
  );

  function isElement(node: Node | null): node is Element {
    return node != null && node.nodeType === Node.ELEMENT_NODE;
  }

  test('should show popover when trigger is clicked', () => {
    const { firstChild } = document.body.children[1];

    if (!isElement(firstChild)) {
      throw new Error('Could not find element');
    }

    expect(firstChild.innerHTML).toBe(
      'Content to appear inside of Popover component',
    );
  });

  test('renders children inside of a portaled component', () => {
    expect(
      container.innerHTML.includes('<button>Trigger Element</button>'),
    ).toBe(true);

    expect(
      container.innerHTML.includes(
        'Content to appear inside of Popover component',
      ),
    ).toBe(false);
  });

  test('does not render children when active is false', () => {
    const wrapper = render(
      <>
        <button>Trigger Element</button>
        <Popover justify={Justify.Start} align={Align.Top}>
          Content to appear inside of Popover component
        </Popover>
      </>,
    );

    expect(
      wrapper.container.innerHTML.includes(
        'Content to appear inside of Popover component',
      ),
    ).toBe(false);
  });

  test('does not Portal Popover component, when usePortal is false', () => {
    const { container } = render(
      <>
        <button>Trigger Element</button>
        <Popover
          active
          usePortal={false}
          justify={Justify.Start}
          align={Align.Top}
        >
          Popover in DOM
        </Popover>
      </>,
    );

    expect(container.innerHTML.includes('Popover in DOM')).toBe(true);
  });

  test('removes Popover instance on unmount', () => {
    unmount();
    expect(container.innerHTML).toBe('');
  });
});
