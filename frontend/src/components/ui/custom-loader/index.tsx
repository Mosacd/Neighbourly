import styles from './index.module.css';

const EnhancedLoader = () => {
  return (
    <div className={`${styles.loader} text-main dark:text-yellow-600`}>
      <span className={styles.l}>L</span>
      <span className={styles.o}>o</span>
      <span className={styles.a}>a</span>
      <span className={styles.d}>d</span>
      <span className={styles.i}>i</span>
      <span className={styles.n}>n</span>
      <span className={styles.g}>g</span>
      <span className={styles.svg}>
      <svg className={`${styles.animatedSvg} shrink-0 w-full mb-5 max-w-[40px] -rotate-5 fill-main dark:fill-yellow-600 sm:max-w-[80px]`} width="" height="" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={`${styles.heartPath} fill-red-500 dark:fill-red-600 -rotate-3`} d="M64 12.92C66.84 9.64 70.44 8 74.8 8C78.44 8 81.48 9.32 84 12C86.52 14.68 87.84 17.72 88 21.2C88 24 86.68 27.24 84 31.04C81.32 34.84 78.72 38 76.12 40.6C73.52 43.16 69.48 46.96 64 52C58.44 46.96 54.36 43.16 51.76 40.6C47.86 36.76 46.52 34.84 43.88 31.04C41.24 27.24 40 24 40 21.2C40 17.56 41.28 14.52 43.88 12C46.48 9.48 49.6 8.16 53.24 8C57.52 8 61.08 9.64 64 12.92Z" fill=""/>
        <path d="M88 76V80L56 90L28 82.24V88H4V44H35.88L60.52 53.2C62.7156 54.0282 64.6072 55.505 65.9433 57.4342C67.2794 59.3633 67.9967 61.6534 68 64H76C82.64 64 88 69.36 88 76ZM20 80V52H12V80H20ZM79.6 74.28C78.96 72.96 77.56 72 76 72H54.6C52.44 72 50.32 71.68 48.28 71L38.76 67.84L41.28 60.24L50.8 63.4C52 63.8 60 64 60 64C60 62.52 59.08 61.2 57.72 60.68L34.44 52H28V74L55.88 81.64L79.6 74.28Z" fill=""/>
      </svg>
      </span>
    </div>
  );
};

export default EnhancedLoader;