import { Parser } from '@json2csv/plainjs';
import { StarWarsState } from '../../../../../slices/starWarsItems';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export const useJsonToCsv = () => {
  const [url, setUrl] = useState('');

  const selectedItems = useSelector(
    (state: { starWars: StarWarsState }) => state.starWars.selectedItems
  );
  useEffect(() => {
    if (selectedItems.length === 0) return;

    const csvString = new Parser({}).parse(selectedItems);
    const blob = new Blob([csvString], { type: 'text/csv' });
    setUrl(URL.createObjectURL(blob));
  }, [selectedItems]);

  return { url };
};
