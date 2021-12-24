import styles from "./App.module.less";

const app: React.FC<{ name: string }> = ({ name }) => {
  return <div>{name}</div>;
};

export default () => {
  return (
    <div className={styles.app}>react + vite + antd + react-router + redux</div>
  );
};
