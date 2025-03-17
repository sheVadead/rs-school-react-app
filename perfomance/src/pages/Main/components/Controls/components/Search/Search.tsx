import styles from './Search.module.css';

type SearchProps = {
  params: {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const Search: React.FC<SearchProps> = ({
  params: { setSearchTerm },
}: SearchProps) => {
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };
  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search">Search By Name:</label>
      <input
        id="search"
        onChange={(e) => handleOnchange(e)}
        type="text"
        placeholder="Search"
      />
    </div>
  );
};
