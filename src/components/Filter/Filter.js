// react
import { useSelector, useDispatch } from 'react-redux';
// redux
import { changeFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
// styles
import { Label, Input } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = e => dispatch(changeFilter(e.target.value));

  return (
    <Label>
      Find contacts by name
      <Input type="text" name="filter" onChange={handleChange} value={filter} />
    </Label>
  );
};
