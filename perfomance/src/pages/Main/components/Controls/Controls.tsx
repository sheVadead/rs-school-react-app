import styles from './Controls.module.css';
import { Search } from './components/Search/Search';
import { Filter } from './components/Filter/Filter';
import { Sort } from './components/Sort/Sort';
import { SortOrder } from '../TableView/hooks/useLogic';

type ControlsProps = {
  params: {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setFilterOption: React.Dispatch<React.SetStateAction<string>>;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
    sortBy: string;
    regions: string[];
  };
};

export const Controls = ({ params }: ControlsProps) => {
  const {
    setSearchTerm,
    setFilterOption,
    setSortBy,
    setSortOrder,
    sortBy,
    regions,
  } = params;
  return (
    <div className={styles.controlsWrapper}>
      <Search params={{ setSearchTerm }} />
      <div>
        <Filter
          params={{
            setFilterOption,
            options: Array.from(regions) as string[],
          }}
        />
        <Sort params={{ setSortBy, setSortOrder, sortBy }} />
      </div>
    </div>
  );
};
