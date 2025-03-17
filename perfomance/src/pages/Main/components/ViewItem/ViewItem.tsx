import styles from './ViewItem.module.css';

type ViewItemProps = {
  country: {
    population: number;
    region: string;
    flagImageUrl: string;
    name: string;
  };
};

export const ViewItem: React.FC<ViewItemProps> = ({
  country,
}: ViewItemProps) => {
  const { population, region, flagImageUrl, name } = country;
  return (
    <div className={styles.viewItemWrapper}>
      <div className={styles.viewItem}>
        <div className={styles.nameWrapper}>
          <span>{name}</span>
        </div>
        <div className={styles.populationWrapper}>
          <span>{population}</span>
        </div>
        <span>{region}</span>
        <img
          className={styles.flagImage}
          src={flagImageUrl}
          width={100}
          height={60}
          alt={name}
        />
      </div>
    </div>
  );
};
