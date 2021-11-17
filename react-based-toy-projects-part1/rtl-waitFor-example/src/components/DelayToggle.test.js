import React from 'react';
import DelayToggle from './DelayToggle';
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import DelayedToggle from './DelayToggle';

describe('<DelayToggle />', () => {
    it('reveals text when toggle is ON', async () => {
        const { getByText} = render(<DelayToggle />)
        const toggleButton = getByText('토글')
        fireEvent.click(toggleButton)
        await waitFor(() => getByText('야호!!'))
    })

    it('toggles text ON/OFF', async () => {
        const {getByText} = render(<DelayedToggle />)
        const toggleButton = getByText('토글')
        fireEvent.click(toggleButton)
        const text = await waitFor(() => getByText('ON'))
        expect(text).toHaveTextContent('ON')
    })

    it('changes something when button is clicked', async () => {
        const {getByText, container} = render(<DelayedToggle />)
        const toggleButton = getByText('토글')
        fireEvent.click(toggleButton)
        await waitFor(()=> getByText('ON') ,{container})
    })

    it('removes text when toggle is OFF', async () => {
        const {getByText, container} = render(<DelayedToggle />)
        const toggleButton = getByText('토글')
        fireEvent.click(toggleButton)
        await waitFor( () =>getByText('야호!!'), {container})
        fireEvent.click(toggleButton)
        await waitForElementToBeRemoved(()=> getByText('야호!!'))
    })
}) 