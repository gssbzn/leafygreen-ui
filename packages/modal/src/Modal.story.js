import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import Modal, { ModalSize } from './Modal';

function Example() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive(active => !active)}>Open Modal</button>
      {active && (
        <Modal
          active={active}
          usePortal={boolean('usePortal', true)}
          onRequestClose={() => setActive(active => !active)}
          size={select('size', Object.values(ModalSize), ModalSize.Normal)}
          title={text('title', 'Modal Title')}
        >
          Modal Content goes here
        </Modal>
      )}
    </>
  );
}

storiesOf('Modal', module).add('Default', () => <Example />);
