import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Shipping";

const CardDeal = () => (
  <section id="shipping" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Ship your package <br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      We work with businesses to create customized delivery solutions based on specific needs and requirements.

      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
