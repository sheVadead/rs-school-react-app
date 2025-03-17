type SearchProps = {
  params: {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
  };
};

export const Search: React.FC<SearchProps> = ({
  params: { setSearchTerm, searchTerm },
}: SearchProps) => {
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };
  return (
    <div>
      <input
        onChange={(e) => handleOnchange(e)}
        type="text"
        placeholder="Search"
      />
    </div>
  );
};
