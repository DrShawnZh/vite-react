import styles from "./index.module.less";

console.log(styles);

const TC = () => {
  return (
    <div className={styles.text}>
      <span className={styles["text-inner"]}>cessa</span>
    </div>
  );
};

export default TC;
