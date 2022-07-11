import { useCombobox, resetIdCounter } from 'downshift';

// Styled components:
import {
  DropDownItemStyles,
  DropDownStyles,
  SearchStyles,
} from './styles/DropDownStyles';

export default function Search() {
  resetIdCounter();
  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log('Input changed!');
    },
    onSelectedItemChange() {
      console.log('Selected Item Changed');
    },
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDownStyles {...getMenuProps()}>
        <DropDownItemStyles>Hey</DropDownItemStyles>
        <DropDownItemStyles>Hey</DropDownItemStyles>
        <DropDownItemStyles>Hey</DropDownItemStyles>
        <DropDownItemStyles>Hey</DropDownItemStyles>
      </DropDownStyles>
    </SearchStyles>
  );
}
