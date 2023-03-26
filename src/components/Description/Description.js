import styles from './Description.module.css';

const Description = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>A pinch of passion in every dish</h3>
            <p className={styles.description}>
                We are always here to serve you our best healthy and fresh
                meals. We are fresher! We are tastier!
            </p>
            <ul>
                <li>
                    <span>Monday:</span>
                    <span>10am - 10pm</span>
                </li>
                <li>
                    <span>Tuesday:</span>
                    <span>10am - 10pm</span>
                </li>
                <li>
                    <span>Wednesday:</span>
                    <span>10am - 10pm</span>
                </li>
                <li>
                    <span>Thursday:</span>
                    <span>10am - 10pm</span>
                </li>
                <li>
                    <span>Friday:</span>
                    <span>10am - 10pm</span>
                </li>
                <li>
                    <span>Saturday:</span>
                    <span>10am - 12pm</span>
                </li>
                <li>
                    <span>Sunday:</span>
                    <span>10am - 10pm</span>
                </li>
            </ul>
        </div>
    );
};

export default Description;
